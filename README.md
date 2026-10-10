# Chill Guy

A mobile anger management app (Expo + React Native), designed as an MA thesis project in Social Design at SRH Berlin.

**▶ Try the live prototype: [laminema0.github.io/Chill-guy](https://laminema0.github.io/Chill-guy/)** (web version; best on a phone).

V1 helps people calm down in the moment and understand why their anger comes back. It is a **self-help and reflection tool, not therapy**.

- Reflection features remain on the device. Optional AI chat sends messages and recent replies through Cloudflare to Groq after an explicit notice. Chat is not saved as a log; no analytics are added.
- In crisis? Call **112**, or TelefonSeelsorge **0800 111 0 111** / **0800 111 0 222**.

See [`CLAUDE.md`](CLAUDE.md) for the stack, scope and roadmap.

## Run it on your phone

1. Install [Node.js](https://nodejs.org) (LTS) on your computer, and **Expo Go** on your phone.
2. In a terminal:
   ```bash
   git clone https://github.com/laminema0/Chill-guy.git
   cd chill-guy
   npm install
   npx expo start
   ```
3. Scan the QR code: with the Camera app on iPhone, or from inside Expo Go on Android. Phone and computer must be on the same Wi-Fi (if that doesn't work, try `npx expo start --tunnel`).

## AI chat

The chat uses Groq through a separate Cloudflare Worker; the API key never enters the mobile app or web bundle. See [backend/README.md](backend/README.md) for deployment and testing. The UI requires consent before sending chat messages and keeps the existing local emergency-support flow.
