import ROM from "./rom/ROM";
import data from "../data/backgrounds-truncated.dat";

export { default as Engine } from "./Engine";
export { default as BackgroundLayer } from "./rom/BackgroundLayer";

// const backgroundData = new Uint8Array(
//   Array.from(data).map((x) => x.charCodeAt(0))
// );
const backgroundData = new Uint8Array(data);
new ROM(backgroundData);
