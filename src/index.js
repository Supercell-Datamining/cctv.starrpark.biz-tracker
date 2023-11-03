import { rmdir, mkdir, writeFile } from "node:fs/promises";
import { File } from "./File.js";
import simpleGit from "simple-git";
import path from "node:path";

const git = simpleGit();

const res = await (
  await fetch(
    "https://cctv.starrpark.biz/?webview=quTxstAcEWffgjXDaLmA&cachebust=1"
  )
).text();

const scripts = res
  .match(/<script\s+(?=[^>]*src\s*=\s*"\/assets\/[^"']*\.js")[^>]*>/gi)
  ?.map((s) => s.match(/src="[^"]+"/g)?.[0].slice(13, -1))
  .map((s) => new File(s));

const stylesheets = res
  .match(/<link\s+(?=[^>]*href\s*=\s*"\/assets\/[^"']*\.css")[^>]*>/gi)
  ?.map((s) => s.match(/href="[^"]+"/g)?.[0].slice(14, -1))
  .map((s) => new File(s));

try {
  await rmdir("data", { recursive: true });
} catch {}

await mkdir("data");
await mkdir("data/scripts");
await mkdir("data/stylesheets");

for (const script of scripts) {
  await writeFile(`data/scripts/${script.path}`, await script.content());
}

await writeFile(`data/main.js`, await scripts[0].formattedContent());

for (const stylesheet of stylesheets) {
  await writeFile(
    `data/stylesheets/${stylesheet.path}`,
    await stylesheet.formattedContent()
  );
}

await git.add(["data/"]);

const date = Intl.DateTimeFormat("ja", {
  second: "2-digit",
  minute: "2-digit",
  hour: "2-digit",
  day: "2-digit",
  month: "2-digit",
}).formatToParts(new Date());

const month = date.find((d) => d.type === "month").value;
const day = date.find((d) => d.type === "day").value;

const hours = date.find((d) => d.type === "hour").value;
const minutes = date.find((d) => d.type === "minute").value;
const seconds = date.find((d) => d.type === "second").value;

await git.commit(`${day}/${month}/95 - ${hours}:${minutes}:${seconds}`);
await git.push("origin", "main");
