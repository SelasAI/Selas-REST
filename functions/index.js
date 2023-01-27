const functions = require("firebase-functions");
const selas = require("@selas/selas-node");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.generate_image = functions.https.onRequest(async (req, res) => {
  const client = await selas.createSelasClient({
    app_id: req.body["app_id"],
    key: req.body["key"],
    secret: req.body["secret"],
  });

  res.set("Content-Type", "application/json");

  function my_callback(response) {
    if ("result" in response) {
      res.send(response.result[0].url);
    }
  }

  await client.runStableDiffusion(req.body["prompt"], {
    callback: my_callback,
  });
});
