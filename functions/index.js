const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shortbreak-70c69.firebaseio.com",
});

const db = admin.database();

const fetchMessages = () =>
  new Promise((resolve, reject) => {
    db.ref("messages").on("value", snap => {
      const messages = snap.val();
      resolve(Object.keys(messages).map(key => messages[key]));
    });
  });

function getCurrentHour() {
  const d = new Date();
  return d.getUTCHours();
}

function sendNotificationToUsers() {
  fetchMessages().then(messages => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const payload = { notification: message, data: message };

    const topic = "notification";
    // const topic = getCurrentHour();

    console.log("Sending notification: " + message + " to topic: " + topic);
    admin
      .messaging()
      .sendToTopic(topic, payload)
      .then(res => {
        console.log("Successfully sent message:", res);
      })
      .catch(err => {
        console.log("Error sending message:", err);
      });
  });
}

exports.sendNotifications = functions.pubsub
  .topic("hourly-tick")
  .onPublish(() => sendNotificationToUsers());
