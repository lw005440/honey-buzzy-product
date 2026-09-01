// server/index.ts
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var publicDir = path.resolve(__dirname, "public");
app.use(express.static(publicDir, { index: "index.html" }));
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});
var port = Number(process.env.PORT || 3e3);
app.listen(port, "0.0.0.0", () => {
  console.log(`Honey Buzzy server listening on port ${port}`);
});
