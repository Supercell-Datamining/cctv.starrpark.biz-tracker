import { rmdir, mkdir, writeFile } from "node:fs/promises";
import { File } from "./File.js";
import simpleGit from "simple-git";

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

await writeFile(`data/main.js`, await scripts[0].content());

for (const stylesheet of stylesheets) {
  await writeFile(
    `data/stylesheets/${stylesheet.path}`,
    await stylesheet.content()
  );
}

await git.add(["data"]);

const date = new Date();
await git.commit(
  `${date.getDate()}/${date.getMonth()}/95 - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
);
await git.push();
