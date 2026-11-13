# Lactalink

An educational mobile prototype that explores how breastmilk donors and recipients could discover compatible listings and communicate in one application.

> [!IMPORTANT]
> Lactalink is a student portfolio project, not a medical service or production donation platform. Its compatibility score is not medical screening or advice. Use synthetic data only when running the project; do not upload real identity documents or sensitive health information.

## Features

- Donor and recipient registration flows
- User profiles with dietary and compatibility information
- Breastmilk listing creation and discovery
- Location and compatibility sorting
- Real-time chat backed by Firebase
- Indonesian identity-card text extraction through Google Vision

## Architecture

- `client/`: Expo, React Native, TypeScript, React Navigation, Firebase, and Secure Store
- `server/`: Express, MongoDB, Mongoose, JWT authentication, Multer, and Google Vision

The mobile client calls the Express API for account, profile, and listing data. Chat data is handled separately by Firebase. The optional identity-card flow sends an uploaded image to Google Vision for text extraction; this is included as a technical demonstration and should only be exercised with synthetic fixtures.

## Run locally

Requirements:

- Node.js 20+
- npm
- MongoDB
- Expo Go or an Android/iOS simulator
- Firebase project configuration
- Google Vision service-account credentials for the optional OCR flow

### API

```sh
cd server
cp .env.template .env
npm ci
npm start
```

### Mobile client

```sh
cd client
cp env-template.txt .env
npm ci
npm start
```

Set `EXPO_PUBLIC_API_URL` to an address reachable from the simulator or physical device. `localhost` on a physical phone refers to the phone itself, not the development computer.

## Configuration

The checked-in templates list every required variable:

- `client/env-template.txt`: API and Firebase public project configuration
- `server/.env.template`: MongoDB, JWT, and Google Vision credentials

Firebase client configuration identifies a Firebase project but does not grant database access by itself. Security still depends on the project’s Firestore, Storage, and authentication rules. Never commit service-account private keys.

## Tests

The server includes Jest and Supertest integration tests:

```sh
cd server
npm test
```

They require a disposable MongoDB test database. The OCR integration also requires Google Vision credentials.

## Team

Lactalink was created as a Hacktiv8 final project by:

- [Margery Olethea](https://github.com/MargeryOlethea)
- [Reinardus Kinadaman](https://github.com/reinardusk)
- [Ridzki Permadi](https://github.com/rizzdKy)

Margery built the mobile client: the screens and navigation, registration and login, milk listings, profile editing, and the live chat, plus the initial client and server setup.
