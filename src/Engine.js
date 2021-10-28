let frameID = -1;
export const SNES_WIDTH = 256;
export const SNES_HEIGHT = 224;
export default class Engine {
  static computeAlphas(entries) {
    return entries.map((entry) =>
      entry ? 1 / entries.filter((x) => x).length : 0
    );
  }
  constructor(
    layers = [],
    {
      fps = 30,
      aspectRatio = 0,
      frameSkip = 1,
      alphas = this.constructor.computeAlphas(
        layers.map((layer) => layer.entry)
      ),
      canvas = document.querySelector("canvas"),
    } = {}
  ) {
    this.layers = layers;
    this.fps = fps;
    this.aspectRatio = aspectRatio;
    this.frameSkip = frameSkip;
    this.alphas = alphas;
    this.tick = 0;
    this.canvas = canvas;
  }
  rewind() {
    this.tick = 0;
  }
  animate() {
    let then = Date.now();
    let elapsed;
    const fpsInterval = 1000 / this.fps;
    let bitmap;
    const canvas = this.canvas;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    canvas.width = SNES_WIDTH;
    canvas.height = SNES_HEIGHT;
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const drawFrame = () => {
      frameID = requestAnimationFrame(drawFrame);
      const now = Date.now();
      elapsed = now - then;
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        for (let i = 0; i < this.layers.length; ++i) {
          bitmap = this.layers[i].overlayFrame(
            image.data,
            this.aspectRatio,
            this.tick,
            this.alphas[i],
            i === 0
          );
        }
        this.tick += this.frameSkip;
        image.data.set(bitmap);
        context.putImageData(image, 0, 0);
      }
    };
    if (frameID > 0) {
      global.cancelAnimationFrame(frameID);
    }
    drawFrame();
  }
}
