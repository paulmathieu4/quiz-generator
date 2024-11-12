# Quizz Generator Back

This is the back-end of the Quiz Generator project. It uses Firebase cloud functions

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: Version 10 or later. [Download Node.js](https://nodejs.org/)
- **Firebase CLI**: To manage and deploy Firebase services. Install using the command:
  ```bash
  npm install -g firebase-tools
  ```
  
## Install dependencies

  ```bash
  cd functions
  pnpm install
  ```

## Running locally, watch mode

```bash
  cd functions
  firebase emulators:start --only functions
  #then in separate console window
  cd functions
  pnpm build:watch
  ```

## Deploying to production

```bash
  cd functions
  firebase deploy --only functions
  ```


