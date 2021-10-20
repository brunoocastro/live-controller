import { Lookup } from "node-yeelight-wifi";
import {config} from 'dotenv'
config()

let look = new Lookup();
let lamp;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

look.on("detected", async (light) => {
  lamp = light;
  console.log(
    "Lampada Yeelight detectada! [ID] " + light.id + " [Name] " + light.name
  );
  // console.log("light:", light);
  await light.setRGB([50, 130, 201]);
  const actualRGB = await light.rgb;
  const actualBright = await light.bright;
  console.log(actualRGB);
  await light.setBright(0);
  await sleep(2000);
  await light.setRGB([255, 0, 0]);
  await sleep(2000);
  await light.setBright(100);
  await sleep(2000);
  await light.setBright(0);
  await sleep(2000);
  await light.setRGB([0, 255, 0]);
  await sleep(2000);
  await light.setBright(100);
  await sleep(2000);
  await light.setBright(0);
  await sleep(2000);
  await light.setRGB([0, 0, 255]);
  await sleep(2000);
  await light.setBright(100);

  await sleep(2000);
  await light.setBright(0);

  await sleep(2000);

  await light.setRGB(actualRGB);
  await light.setBright(100);
});
