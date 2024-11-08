import fs from "fs";
import path from "path";
import yaml from "yaml-js";
import yml from "yaml";
import { merge, fromPairs } from "lodash-es";
import retry from "async-retry";
import pqueue from "p-queue";
import { EventEmitter } from "node:events";
import { promisify } from "util";
import { readdir } from "fs";
import delay from "delay";

const functionsDir = `./system/functions`;
const unitsDir = `./system/structure`;
const LOGS_ENABLED = true;

async function build({ system }) {
  console.dir({ build: system.functions });

  if (!system.nodes) system.nodes = {};
  if (!system.functions) system.functions = {};
  if (!system.sequences) system.sequences = {};

  const queues = {};
  const events = {
    main: new EventEmitter(),
    log: {
      node: new EventEmitter(),
      sequence: new EventEmitter(),
    },
  };

  if (LOGS_ENABLED) {
    events.log.node.on(`enqueue`, ({ id, context, data }) => {
      console.log(
        `\x1b[36mlog:enqueue:  node:${id}\t${JSON.stringify({ context, data }).slice(0, 150)}\x1b[0m`,
      );
    });
    events.log.node.on(`start`, ({ id, context, data }) => {
      console.log(
        `\x1b[33mlog:start:    node:${id}\t${JSON.stringify({ context, data }).slice(0, 150)}\x1b[0m`,
      );
    });
    events.log.node.on(`end`, ({ id, context, data, response }) => {
      console.log(
        `\x1b[32mlog:complete: node:${id}\t${JSON.stringify({ context, response, data }).slice(0, 150)}\x1b[0m`,
      );
    });
  }

  system.run = async ({ id, context, data }) => {
    // console.dir({ __debug__system__run : { input : { id, context, data }, system_nodes: system.nodes, } })
    try {
      return await system.nodes[id].run({ context, data });
    } catch (err) {
      console.dir({ SYSTEM_RUN_ERR: { err, id } });
    }
  };

  events.main.on(`run`, async ({ id, context, data }) => {
    if (LOGS_ENABLED) {
      console.log(`\x1b[31mevent:\`run\` →id:${id}\x1b[0m`);
    }
    await system.run({ id, context, data });
  });

  system.nodes = fromPairs(
    await Promise.all(
      Object.keys(system.functions)
        .filter((id) => Object.keys(system.nodes).includes(id))
        .map(async (id) => {
          queues[id] = new pqueue({
            concurrency: parseInt(system.nodes[id].queue?.concurrency) || Infinity,
            intervalCap:
              parseInt(system.nodes[id].queue?.interval?.limit) || Infinity,
            interval: parseInt(system.nodes[id].queue?.interval?.time) || 0,
            timeout: parseInt(system.nodes[id].queue?.timeout) || undefined,
          });
          // this is the function to be ran
          const fn = async ({ context = {}, data = {} }) => {
            events.log.node.emit(`enqueue`, { id, context, data });
            return await queues[id].add(async () => {
              events.log.node.emit(`start`, { id, context, data });
              const response = await retry(
                async (bail) => {
                  try {
                    const fnresponse = await system.functions[id]({
                      context: { ...context, run: system.run },
                      data: system.nodes[id].in?.length
                        ? system.nodes[id].in.reduce(
                            (acc, inp) => ({ ...acc, [inp]: data[inp] || null }),
                            {},
                          ) // higher perf than fromPairs ?
                        : data,
                    });

                    return !fnresponse
                      ? { success: false }
                      : system.nodes[id].out?.length
                      ? system.nodes[id].out.reduce(
                            (acc, inp) => ({ ...acc, [inp]: fnresponse[inp] || null }),
                            {},
                          )
                      : fnresponse;
                  } catch (error) {
                    console.dir({ asyncretry_error: { id, error } }, { depth: null });
                    throw new Error(error);
                  }
                },
                {
                  retries: parseInt(system.nodes[id].queue?.retry) || 5,
                },
              );
              events.log.node.emit(`end`, { id, context, data, response });
              return response;
            });
          };

          return [
            id,
            {
              type: `node`,
              meta: system.nodes[id],
              run: fn,
            }, // to have same format as sequence : system.sequences[id].run and system.functions[id].run
          ];
        }),
    ),
  );

  system.functions = {
    // ...
    mlxlm: {
      type: `node`,
      meta: {
        // ...
      },
      run: async ({ context = {}, data = {} }) => {
        // ...
      },
    },
    ollama: {
      type: `node`,
      meta: {
        // ...
      },
      run: async ({ context = {}, data = {} }) => {
        // ...
      },
    },
    // ...
    cerebras: {
      type: `node`,
      meta: {
        // ...
      },
      run: async ({ context = {}, data = {} }) => {
        // ...
      },
    },
    groq: {
      type: `node`,
      meta: {
        // ...
      },
      run: async ({ context = {}, data = {} }) => {
        // ...
      },
    },
    // ...
  };
}
