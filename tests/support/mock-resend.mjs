// Local stand-in for the Resend API (POST /emails), used only by the end-to-end tests.
// Records what the site would have sent. Never logs the Authorization header; it only
// records whether the request carried the expected fake test key.
import http from "node:http";

const port = Number(process.env.MOCK_RESEND_PORT ?? 3201);
const expectedAuth = `Bearer ${process.env.MOCK_EXPECTED_KEY}`;
const emails = [];

const send = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
};

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/emails") {
      let raw = "";
      req.on("data", (chunk) => (raw += chunk));
      req.on("end", () => {
        let body = {};
        try {
          body = JSON.parse(raw);
        } catch {}
        emails.push({
          subject: body.subject,
          to: body.to,
          text: body.text,
          usedFakeKey: req.headers.authorization === expectedAuth,
          hasIdempotencyKey: Boolean(req.headers["idempotency-key"]),
        });
        send(res, 200, { id: `mock-${emails.length}` });
      });
      return;
    }
    if (req.method === "GET" && req.url === "/__emails") return send(res, 200, emails);
    if (req.method === "GET" && req.url === "/__health") return send(res, 200, { ok: true });
    send(res, 404, { error: "not_found" });
  })
  .listen(port, "127.0.0.1");
