# earthbound-battle-backgrounds-rollup

This project acts as a library to render Earthbound's battle backgrounds. You can render the results in a browser or even on the server.

> This fork is an updated version of the original library by kdex, I've also migrated the codebase away from webpack to rollup for performance and code size reasons.

<!---
## What is this?

Earthbound, also known as *Mother 2* in Japan, is a SNES game released in 1994. This project displays Earthbound's battle backgrounds. In order to render the frames, currently a [Canvas 2D context](https://www.w3.org/TR/2dcontext/) is used. I'd be happy to use a [WebGL 2 context](https://www.khronos.org/registry/webgl/specs/latest/2.0/) once support is more wide-spread.

## Is there a demo?

Yes. You can find a full-screen demo [here](https://kdex.github.io/earthbound-battle-backgrounds).

- Use `[←]` and `[→]` to change layer 1.
- Use `[↑]` and `[↓]` to change layer 2.

If you edit the URL manually, you can also add/remove layers.

The source code for the demo can be found [here](https://github.com/kdex/kdex.github.io/tree/master/earthbound-battle-backgrounds).
--->

## Installation

```bash
npm i -S earthbound-battle-backgrounds-rollup
```

## Example

This code is more or less equivalent to the demo from above, minus the key events.

```js
import { BackgroundLayer, Engine } from "earthbound-battle-backgrounds-rollup";

/* Create animation engine  */
const engine = new Engine([new BackgroundLayer(153), new BackgroundLayer(298)], {
 canvas: document.querySelector("#target-canvas");
});
engine.animate();
```

## API

There are two exports in the package, namely `BackgroundLayer` and `Engine`.

### BackgroundLayer

#### `constructor(entry)`

##### Description

Creates a new `BackgroundLayer` displaying `entry`.

##### Signature

- entry: `number`

 The index of the layer to render. It is bounded by `BackgroundLayer.MINIMUM_LAYER` and `BackgroundLayer.MAXIMUM_LAYER`.

### Engine

#### `constructor(layers, options)`

##### Description

Constructs a new `Engine`, which can be used to render `BackgroundLayer`s.

##### Signature

- layers: `Array<BackgroundLayer>` (default: `[]`)

The array of `BackgroundLayer` instances to render.

- options: `object`

An object containing rendering options.

- options.fps: `number` (default: `30`)

The framerate to render with.

- options.aspectRatio: `number` (default: `0`)

The aspect ratio to render with.

- options.frameSkip: `number` (default: `1`)

The engine is time-dependent and uses an internal clock that will be incremented after each frame. This number decides by which constant the clock is incremented.
  
- options.alpha: `Array<number>` (default: `Engine.computeAlphas(layers.map(layer => layer.entry))`)

An array that specifies the opacity for each `BackgroundLayer` in `layers`. The default is to give each layer the same opacity so that all alphas sum up to `1`. Layer `0` is ignored, as it does not display anything.
  
- options.canvas: `CanvasElement` (default: `document.querySelector("canvas")`)

The canvas element to render to.

#### `static computeAlphas(entries)`

##### Description

Computes an array of `alpha` values so that every valid layer gets the same opacity.

##### Signature

- entries: `Array<number>`

 An array where every number must be a number must be at least `BackgroundLayer.MINIMUM_LAYER`, and at most `BackgroundLayer.MAXIMUM_LAYER`.

#### `rewind()`

##### Description

Resets the internal engine timer to `0`. This will cause all `BackgroundLayer`s to be rendered in their initial state.

##### Signature

*Nullary.*

#### `animate()`

##### Description

Runs the engine. This will cause frames to be drawn on the instance's `canvas`.

##### Signature

*Nullary.*

## Project maintenance history

- In 2008, the code for this project started out on [PK Hack](http://starmen.net/pkhack/) as a [Windows screensaver](https://forum.starmen.net/forum/Fan/Games/Kraken-EB-Battle-Animation-Screensaver/first), written in C# by [Mr. Accident](https://forum.starmen.net/members/168). Mr. Accident's source code has been published [here](https://github.com/gjtorikian/kraken).
- In 2010, [gjtorikian](https://github.com/gjtorikian) ported Mr. Accident's Windows screensaver from C# to [Java](https://github.com/gjtorikian/Earthbound-Battle-Backgrounds) to support Android Live screensavers.
- In 2013, gjtorikian ported his own project from Java to [ECMAScript 5](https://github.com/gjtorikian/Earthbound-Battle-Backgrounds-JS) to support all devices with a web browser. He is well aware that his port is terrible (in fact, he even wrote a [dedicated section](https://github.com/gjtorikian/Earthbound-Battle-Backgrounds-JS/blob/a82659ddf7a893cc46c2ba05ddf310d32ca21a17/README.md#why-is-this-code-so-terrible) in his README.md, just to reflect that).
- In 2016, [kdex](https://github.com/kdex) rewrote the latter in [ES2015+](https://github.com/kdex/earthbound-battle-backgrounds) for it to stay maintainable.
- In 2017, gjtorikian [copy-and-pasted kdex's source code into his repository](https://github.com/gjtorikian/Earthbound-Battle-Backgrounds-JS/issues/7).
- In 2021, [I](https://github.com/Kaleidosium) updated the codebase to use Rollup and removed/replaced some old dependencies to keep the project maintainable as was kdex's vision.
