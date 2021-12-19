const dasha = require("@dasha.ai/sdk");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");

const expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());

const axios = require("axios").default;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const main = async () => {
  const app = await dasha.deploy(`${__dirname}/app`);

  app.setExternal("findBeds", async (args, conv) => {
      const res = await axios.get("https://api.rootnet.in/covid19-in/hospitals/beds");
      const beds = res.data.data.regional;
      const hospitals = beds.filter(obj => obj.state === args.city)
      if (hospitals[0].totalBeds === 0) {
        return(`Sorry, there are no available hospital beds in ${hospitals[0].state}.`)
      }
      else {
        return(`I was able to find ${hospitals[0].totalBeds} beds in ${hospitals[0].state} across ${hospitals[0].totalHospitals} hospitals.`)
      }
  });

  app.setExternal("contactNumber", async (args, conv) => {
    const res = await axios.get("https://api.rootnet.in/covid19-in/contacts");
    const contacts = res.data.data.contacts.regional;
    const areaContact = contacts.filter(obj => obj.loc === capitalizeFirstLetter(args.state))
    return(`The helpline number for ${areaContact[0].loc} is ${areaContact[0].number.replace(/(\d)(?=(\d{1})+$)/g, '$1 ')}.`)
  });

  await app.start({ concurrency: 10 });

  expressApp.get("/sip", async (req, res) => {
    const domain = app.account.server.replace("app.", "sip.");
    const endpoint = `wss://${domain}/sip/connect`;

    // client sip address should:
    // 1. start with `sip:reg`
    // 2.  be unique
    // 3. use the domain as the sip server
    const aor = `sip:reg-${uuidv4()}@${domain}`;

    res.send({ aor, endpoint });
  });

  expressApp.post("/call", async (req, res) => {
    const { aor, name } = req.body;
    res.sendStatus(200);

    console.log("Start call for", req.body);
    const conv = app.createConversation({ endpoint: aor, name });
    conv.on("transcription", console.log);
    conv.audio.tts = "dasha";
    conv.audio.noiseVolume = 0.9;

    await conv.execute();
  });

  const server = expressApp.listen(8000, () => {
    console.log("Api started on port 8000.");
  });

  process.on("SIGINT", () => server.close());
  server.once("close", async () => {
    await app.stop();
    app.dispose();
  });
};

main();
