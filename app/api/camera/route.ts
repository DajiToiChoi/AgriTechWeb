import { stat } from "fs/promises";
import { createReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const videoPath = path.join(process.cwd(), "camera", "camera.mp4");
const chunkSize = 1024 * 1024;

export async function GET(request: Request) {
  try {
    const videoStat = await stat(videoPath);
    const fileSize = videoStat.size;
    const range = request.headers.get("range");

    if (range) {
      const match = range.match(/bytes=(\d+)-(\d*)/);
      const start = match?.[1] ? Number.parseInt(match[1], 10) : 0;
      const requestedEnd = match?.[2] ? Number.parseInt(match[2], 10) : start + chunkSize - 1;
      const end = Math.min(requestedEnd, fileSize - 1);
      const contentLength = end - start + 1;
      const fileStream = createReadStream(videoPath, { start, end });

      return new Response(Readable.toWeb(fileStream) as ReadableStream, {
        status: 206,
        headers: {
          "Accept-Ranges": "bytes",
          "Content-Length": String(contentLength),
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Content-Type": "video/mp4",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const fileStream = createReadStream(videoPath);

    return new Response(Readable.toWeb(fileStream) as ReadableStream, {
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Length": String(fileSize),
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Camera video not found.", { status: 404 });
  }
}
