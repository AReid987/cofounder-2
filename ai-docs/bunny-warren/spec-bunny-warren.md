
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                        bunny-warren-web-app-spec.md                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                          Bunny Warren Web App Spec                                                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


                                                                   Overview

Bunny Warren is a real-time player vs player card game web app built using a monorepo with Turborepo, PNPM, uv by Astra:sh, Python, FastAPI,
Next.js, Tailwind, and Framer Motion.


                                                                   Features

                                                             V1: Player vs Player

                                                                Authentication

 • User account creation and management
 • Password recovery and reset
 • Session management (login, logout)
 • API endpoint:POST /users`

                                                                Social Features

 • Follow and friend request system
 • Friend list management
 • API endpoints:GET /friends,POST /friend-request

                                                                   Gameplay

 • Real-time player vs player matchmaking
 • Lobby system (join, create, manage)
 • Matchmaking with strangers
 • API endpoints:GET /lobbies,POST /join-lobby,POST /create-lobby`

                                                                Card Management

 • Upload and manage custom card images
 • Deck building and management
 • API endpoints:POST /cards,GET /deck

                                                                  Leaderboard

 • Real-time leaderboard with player stats
 • API endpoint:GET /leaderboard`

                                                                 Miscellaneous

 • Link to purchase physical card game

                                             V2: AI Agent Integration (Implementation in parallel)

 • AI Agent Players
    • Integration of AI-powered agents as players
    • AI agent difficulty levels (easy, medium, hard)

                                             V3: Voice-Enabled Agents (Implementation in parallel)

 • Voice-Enabled AI Agents
    • Integration of voice-enabled AI agents
    • Voice commands for gameplay and interactions

                                               V4: 3D Avatar Agents (Implementation in parallel)

 • 3D Avatar Agents
    • Integration of 3D avatar agents
    • Customizable 3D avatar appearances


                                                            Technical Requirements

 • Monorepo
    • Turborepo for monorepo management
    • PNPM for package management
 • Backend
    • Python as backend language
    • FastAPI for API development
 • Frontend
    • Next.js for frontend development
    • Tailwind for styling
    • Framer Motion for animations
 • Database
    • uv by Astra:sh for database management
 • Real-Time Communication
    • WebSocket for real-time communication


                                                               API Documentation

 • API documentation will be generated using OpenAPI (Swagger)


                                                              Component Structure

 • Components will be organized using a modular approach
 • Each feature will have its own module with separate components and API endpoints


                                                                  Deployment

 • Deployment will be handled using PNPM and Turborepo scripts
 • Environment variables will be managed using a .env file


                                                                   Security

 • Authentication and authorization will be handled using JWT and cookies
 • API endpoints will be secured using rate limiting and IP blocking


                                                                    Roadmap

 • Implementation of V1 in 5 working days
 • Implementation of V2, V3, and V4 in parallel, in the remaining 4 working days

Note: To implement V1 in 1 week, we need to prioritize the core functionalities of the game and deliver a minimal viable product that meets the
required features. Once the MVP is implemented, we can continue working on the additional features as the project requires.
