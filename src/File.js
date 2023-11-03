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
}
