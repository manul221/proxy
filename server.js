import WebSocket from "ws";

const port = process.env.PORT || 10000;
const path = "/stream";

const wss = new WebSocket.Server({ port, path });

wss.on("connection", (ws) => {
  console.log("client connected");
  const timer = setInterval(() => {
    const msg = {
      roundId: `demo-${Date.now().toString().slice(-5)}`,
      multiplier: +(1 + Math.random() * 2).toFixed(2),
      endedAt: Date.now(),
      source: "proxy-demo",
    };
    ws.send(JSON.stringify(msg));
  }, 2000);
  ws.on("close", () => clearInterval(timer));
});

console.log(`WS proxy listening on ${port}${path}`);
