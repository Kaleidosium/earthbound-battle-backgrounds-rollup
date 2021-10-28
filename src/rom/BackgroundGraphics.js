import { readBlock, snesToHex } from "./ROM";

import ROMGraphics from "./ROMGraphics";

export default class BackgroundGraphics {
  constructor(index, bitsPerPixel) {
    this.arrayROMGraphics = null;
    this.romGraphics = new ROMGraphics(bitsPerPixel);
    this.read(index);
  }
  read(index) {
    /* Graphics pointer table entry */
    const graphicsPointerBlock = readBlock(0xd7a1 + index * 4);
    /* Read graphics */
    this.romGraphics.loadGraphics(
      readBlock(snesToHex(graphicsPointerBlock.readInt32()))
    );
    /* Arrangement pointer table entry */
    const arrayPointerBlock = readBlock(0xd93d + index * 4);
    const arrayPointer = snesToHex(arrayPointerBlock.readInt32());
    /* Read and decompress arrangement */
    const arrayBlock = readBlock(arrayPointer);
    this.arrayROMGraphics = arrayBlock.decompress();
  }
  draw(bitmap, palette) {
    return this.romGraphics.draw(bitmap, palette, this.arrayROMGraphics);
  }
}
