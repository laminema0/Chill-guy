# Deploy Chill Guy AI chat

The existing `chill-guy.amin-ranjbar77.workers.dev` address currently serves the website. Keep that deployment. Use a separate Worker named **rough-voice-a344** for AI chat.

Backend deployed and a real Groq request verified on 2026-10-10. The frontend changes are still pending GitHub write access.

## Dashboard setup (no terminal)

1. In Cloudflare, open **Workers & Pages → Create application** and choose the **Hello World / Create Worker** option. Do not import the Expo GitHub repository for this backend.
2. Name the Worker **rough-voice-a344** and deploy it.
3. Open **Edit code**. Replace the entire starter script with the contents of [`worker.mjs`](worker.mjs), then select **Deploy**. The file is plain JavaScript and needs no packages.
4. In this new Worker's **Settings → Variables and Secrets**, add a **Secret** named `GROQ_API_KEY`, with your Groq key as the value. Select **Deploy**. A secret added to the website Worker does not automatically exist on this new Worker.
5. Visit `https://rough-voice-a344.amin-ranjbar77.workers.dev/health`. It must return JSON with `"configured": true`.
6. Merge the chat integration pull request after the backend is ready. GitHub Pages builds the app on pushes to `main`; Cloudflare's website deployment may also rebuild if linked to this repository.
7. Open Chat in the app, accept the notice, ask a question, then ask a follow-up. Check that replies address both messages. Try breathing and Help. Do not use real private or crisis information for testing.

If Cloudflare assigns a different API hostname, update `CHAT_ENDPOINT` in `lib/chat/ai.ts` before building the app. The frontend address is public; the Groq key is not. Never put the key in GitHub, Expo public environment variables, or frontend code.

## Updating the Worker

When `worker.mjs` changes (for example the AI instruction), open the **rough-voice-a344** Worker in Cloudflare, choose **Edit code**, replace everything with the new `worker.mjs`, and select **Deploy**. The `GROQ_API_KEY` secret stays as it is.

## Rate limiting

Dashboard-only deployment has bounded request sizes and best-effort in-memory limits of 6 requests per IP per minute and 20 total per minute **per running isolate**. These counters reset and do not provide a global quota guarantee. CORS only restricts browser origins; this is a public endpoint without authentication. Keep Groq on the free plan while testing. Groq's shared token and request quotas can still be exhausted.

For Cloudflare rate-limit bindings, deploy the included configuration from your computer:

```bash
cd backend
npx wrangler login
npx wrangler deploy
```

The included `wrangler.jsonc` configures `CHAT_RATE_LIMIT` and `TOTAL_RATE_LIMIT`. Existing secrets remain in Cloudflare. These limits apply within each Cloudflare location, not as a precise global daily budget. For a larger public release, add stronger abuse protection (such as Turnstile or authenticated users) and a durable shared quota. Rate limiting is not authentication.

## Privacy and scope

The Worker does not store or log chat content and returns `Cache-Control: no-store`. Cloudflare and Groq still process requests under their own policies; this is not an on-device or confidential therapy service. Chat history is held in the screen's memory and bounded before each request. The app does not send profile, reflection logs, or check-in data. No log-saving feature is implemented by AI chat.

The existing English/German safety patterns run locally before requests and are mirrored in the Worker. They are conservative keyword checks, not a complete safety classifier. The server's instruction also prioritizes human support for risk detected by the model. Validate this self-help experience with suitable domain review before relying on it for vulnerable users.

## Checks

With Node 22.18+ (Node 24 used during development):

```bash
node --test backend/worker.test.mjs
npx tsc --noEmit
npx expo lint
npx expo export --platform web --output-dir dist
```

Provider calls in automated tests are mocked. Only a real chat after deploying the Worker can confirm the Groq key, account access, model availability and live CORS configuration.
