import { config } from "dotenv";
import client from "./bot.js";
import getLight from "./light.js";
config();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
await client.connect();
await sleep(8000);
const lamp = getLight();
// lamp.setBright(100);

function isCommand(message) {
  const nada = "";
  if (message[0] !== "!") return { nada, nada };

  const texts = message.split(" ");

  const command = texts[0].substring(1);

  const attributes = texts.slice(1, texts.length);

  return { command, attributes };
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

async function setLampBlue(commandData) {
  await lamp.setRGB([0, 0, 255]);
  client.say(
    commandData.target,
    `${commandData.username} setou a cor para AZUL!`
  );
}
async function setLampRed(commandData) {
  await lamp.setRGB([255, 0, 0]);
  client.say(
    commandData.target,
    `${commandData.username} setou a cor para VERMELHO!`
  );
}
async function setLampGreen(commandData) {
  await lamp.setRGB([0, 255, 0]);
  client.say(
    commandData.target,
    `${commandData.username} setou a cor para VERDE!`
  );
}
async function setRGBColor(commandData, r, g, b) {
  const color = [Number(r), Number(g), Number(b)];
  await lamp.setRGB(color);
  client.say(
    commandData.target,
    `${commandData.username} setou a cor para o RGB [${color}]`
  );
}
async function flashEffect(commandData) {
  const initialRGBColor = await lamp.rgb;
  const initialBright = (await lamp.bright) | 100;

  client.say(commandData.target, `${commandData.username} bangou o time!`);

  await lamp.setRGB([255, 255, 255], 500);
  await lamp.setPower(false);
  await sleep(500);
  await lamp.setPower(true);
  await sleep(200);
  await lamp.setBright(100, 500);
  await sleep(500);
  await lamp.setBright(50, 500);
  await sleep(500);
  await lamp.setBright(0, 500);
  await sleep(500);
  await lamp.setBright(100);
  await sleep(2000);

  await lamp.setBright(initialBright);
  await lamp.setRGB(initialRGBColor);
}

async function setTemperature(commandData, value) {
  await lamp.setCT(value, 500)
  client.say(commandData.target, `${commandData.username} setou a temperatura da cor para ${value}`);
}

const acceptedCommands = {
  red: setLampRed,
  blue: setLampBlue,
  green: setLampGreen,
  color: setRGBColor,
  flash: flashEffect,
  temperature: setTemperature
};

// Called every time a message comes in
async function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot
  // console.log("Target", target)
  // console.log("Context", context)
  const commandName = msg.trim("");
  // console.log("Command", commandName)

  const { command, attributes } = isCommand(commandName);

  if (command || attributes) {
    const commandData = {
      target: target,
      username: context.username,
    };

    console.log(
      `Sender: [${commandData.username}] | Command: [${command}] | Attributes: [${attributes}]`
    );
    await acceptedCommands[command](commandData, ...attributes);
  }
}

