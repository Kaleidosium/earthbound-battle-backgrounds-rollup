import BackgroundGraphics from "./BackgroundGraphics";
import BackgroundPalette from "./BackgroundPalette";
import BattleBackground from "./BattleBackground";
import Distorter from "./Distorter";
import DistortionEffect from "./DistortionEffect";
import PaletteCycle from "./PaletteCycle";
import { getObject } from "./ROM";

const [WIDTH, HEIGHT] = [256, 256];
export default class BackgroundLayer {
  /* TODO: Remove this; information moved to class BattleBackground */
  static MINIMUM_LAYER = 0;
  static MAXIMUM_LAYER = 326;
  constructor(entry) {
    this.graphics = null;
    this.paletteCycle = null;
    this.pixels = new Int16Array(WIDTH * HEIGHT * 4);
    this.distorter = new Distorter(this.pixels);
    this.loadEntry(entry);
  }
  /**
   * Renders a frame of the background animation into the specified Bitmap
   *
   * @param dst
   *            Bitmap object into which to render
   * @param letterbox
   *            Size in pixels of black borders at top and bottom of image
   * @param ticks
   *            Time value of the frame to compute
   * @param alpha
   *            Blending opacity
   * @param erase
   *            Whether or not to clear the destination bitmap before
   *            rendering
   */
  overlayFrame(bitmap, letterbox, ticks, alpha, erase) {
    if (this.paletteCycle !== null) {
      this.paletteCycle.cycle();
      this.graphics.draw(this.pixels, this.paletteCycle);
    }
    return this.distorter.overlayFrame(bitmap, letterbox, ticks, alpha, erase);
  }
  loadGraphics(index) {
    this.graphics = getObject(BackgroundGraphics, index);
  }
  loadPalette(background) {
    this.paletteCycle = new PaletteCycle({
      background,
      palette: getObject(BackgroundPalette, background.paletteIndex),
    });
  }
  loadEffect(index) {
    this.distorter.effect = new DistortionEffect(index);
  }
  loadEntry(index) {
    this.entry = index;
    const background = getObject(BattleBackground, index);
    /* Set graphics/palette */
    this.loadGraphics(background.graphicsIndex);
    this.loadPalette(background);
    const animation = background.animation;
    const e1 = (animation >> 24) & 0xff;
    const e2 = (animation >> 16) & 0xff;
    this.loadEffect(e2 || e1);
  }
}
