import jsBeautify from "js-beautify";

export class File {
  #content;
  path;

  constructor(path) {
    this.path = path;
  }

  get name() {
    return this.path.split(".").slice(0, -1).join(".");
  }

  get extension() {
    return this.path.split(".").pop();
  }

  async content() {
    if (this.#content) return this.#content;

    this.#content = await (
      await fetch(`https://cctv.starrpark.biz/assets/${this.path}`)
    ).text();
    return this.#content;
  }

  async formattedContent() {
    const content = await this.content();

    switch (this.extension) {
      case "js":
        return jsBeautify.js(content);
      case "css":
        return jsBeautify.css(content);
    }
  }
}
