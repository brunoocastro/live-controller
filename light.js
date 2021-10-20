import { Lookup } from "node-yeelight-wifi";
const lookup = new Lookup();

let lamp

lookup.on("detected", async (light) => {
  lamp = light;
  console.log(
    `-----Lampada Yeelight detectada!-----\n[ID]: ${light.id} | [Name]: ${light.name}\n`
  );
});

function getLamp() {
  return lamp
}

export default getLamp