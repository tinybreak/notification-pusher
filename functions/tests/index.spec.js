const functions = require("firebase-functions");
const fns = require("../index");
const fakeEvent = {
  data: new functions.pubsub.Message({
    data: {},
  }),
};

/*
const ref = db.ref("/messages");
ref.push().set({
  title: "",
  body: ""
});


ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
*/

test("sendNotificationToUsers", () => {
  console.log(fakeEvent);
  // TODO
  // fns.sendNotifications(fakeEvent);
});
