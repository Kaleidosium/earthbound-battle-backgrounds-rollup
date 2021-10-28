import BackgroundLayer from "./rom/BackgroundLayer";
import Engine from "./Engine";
import ROM from "./rom/ROM";
import data from "../data/backgrounds-truncated.dat";

const backgroundData = new Uint8Array(data);
new ROM(backgroundData);

export { BackgroundLayer, Engine }