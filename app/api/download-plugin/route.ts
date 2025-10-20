import { NextRequest } from "next/server";
import { createReadStream, statSync, existsSync, ReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

export const runtime = "nodejs";
function nodeStreamToWeb(stream: ReadStream): ReadableStream<Uint8Array> {
  const reader = Readable.toWeb(stream) as ReadableStream<Uint8Array>;
  return reader;
}



export async function GET(_req: NextRequest) {
  // Try public/plugin.zip first, then fallback to app/plugin.zip
  const publicPath = path.join(process.cwd(), "public", "pluginWebivus.zip");
  const appPath = path.join(process.cwd(), "app", "pluginWebivus.zip");

  const filePath = existsSync(publicPath) ? publicPath : appPath;

  if (!existsSync(filePath)) {
    return new Response("pluginWebivus.zip not found", { status: 404 });
  }

  const stats = statSync(filePath);
  const stream = createReadStream(filePath);
const webStream = nodeStreamToWeb(stream);
  return new Response(webStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="pluginWebivus.zip"',
      "Content-Length": stats.size.toString(),
      "Cache-Control": "no-store",
    },
  });
}
