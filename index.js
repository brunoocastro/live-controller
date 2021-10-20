import { config } from "dotenv";
import client from "./bot.js";
import getLight from "./light.js";
config();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
await sleep(5000);

const lamp = getLight();

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
await client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!blue") {
    setLampBlue()
  } else if (commandName === "!green") {
    setLampGreen()
  } else if (commandName === "!red") {
    setLampRed()
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

async function setLampBlue() {
  await lamp.setRGB([0, 0, 255]);
}
async function setLampRed() {
  await lamp.setRGB([255, 0, 0]);
}
async function setLampGreen() {
  await lamp.setRGB([0, 255, 0]);
}

// if (lamp) {
//   // console.log("light:", light);
//   await lamp.setRGB([50, 130, 201]);
//   const actualRGB = await lamp.rgb;
//   const actualBright = await lamp.bright;
//   console.log(actualRGB);
//   await lamp.setBright(0);
//   await sleep(2000);
//   await lamp.setRGB([255, 0, 0]);
//   await sleep(2000);
//   await lamp.setBright(100);
//   await sleep(2000);
//   await lamp.setBright(0);
//   await sleep(2000);
//   await lamp.setRGB([0, 255, 0]);
//   await sleep(2000);
//   await lamp.setBright(100);
//   await sleep(2000);
//   await lamp.setBright(0);
//   await sleep(2000);
//   await lamp.setRGB([0, 0, 255]);
//   await sleep(2000);
//   await lamp.setBright(100);

//   await sleep(2000);
//   await lamp.setBright(0);

//   await sleep(2000);

//   await lamp.setRGB(actualRGB);
//   await lamp.setBright(100);
// }
