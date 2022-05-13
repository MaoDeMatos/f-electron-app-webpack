# Desktop app - made with Electron

## Introduction

Studying project.

This app is a simple "Guess the number" game, the constraints were :

- The player has 5 tries to find a hidden randomly generated number
- The number must be between 0 and 50 included
- The app displays the number of tries remaining
- The app tells the player if the generated number is smaller, greater or equal to his input
- You can play multiple times without restarting the app

## ❗❗❗ Caution ❗❗❗

### Windows

If you use the `.exe` in `./out/make/<your_maker>/<your_architecture>/`, the installer will start immediately without asking for administrator permissions and the software will be installed in `%LOCALAPPDATA%`.

## Requirements

- Node 16+

## Quick start

```bash
yarn && yarn start
```

## Commands :

You can use npm, but yarn is recommanded by `electron`

### `yarn`

Install project dependencies listed in the `package.json`.

### `yarn start`

Start the app in development mode.

### `yarn make`

Build the app for your platform.

### `yarn test`

Run tests with `jest`.

eg:

```bash
yarn test
# or
yarn test --watch
```
