import { Lookup } from "node-yeelight-wifi";
const lookup = new Lookup();

let lamp

lookup.on("detected", async (light) => {
  lamp = light;
  console.log(
    "Lampada Yeelight detectada! [ID] " + light.id + " [Name] " + light.name
  );
});

function getLamp() {
  return lamp
}

export default getLamp