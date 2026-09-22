# Chill Guy

A mobile anger management app (Expo + React Native), designed as an MA thesis project in Social Design at SRH Berlin.

V1 helps people calm down in the moment and understand why their anger comes back. It is a **self-help and reflection tool, not therapy**.

- All data stays on the device: no accounts, no servers, no analytics.
- In crisis? Call **112**, or TelefonSeelsorge **0800 111 0 111** / **0800 111 0 222**.

See [`CLAUDE.md`](CLAUDE.md) for the stack, scope and roadmap.

## Run it on your phone

1. Install [Node.js](https://nodejs.org) (LTS) on your computer, and **Expo Go** on your phone.
2. In a terminal:
   ```bash
   git clone https://github.com/laminema0/chill-guy.git
   cd chill-guy
   npm install
   npx expo start
   ```
3. Scan the QR code: with the Camera app on iPhone, or from inside Expo Go on Android. Phone and computer must be on the same Wi-Fi (if that doesn't work, try `npx expo start --tunnel`).
