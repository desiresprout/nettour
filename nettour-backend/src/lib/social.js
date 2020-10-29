const FB = require("fb");
const google = require("googleapis");
const plus = google.plus("v1");

/*
    Reference: 
    - https://developers.facebook.com/docs/javascript/reference/FB.api
    - https://developers.facebook.com/docs/graph-api/reference/v2.2/user
*/
exports.facebook = {
  getProfile: accessToken => {
    return FB.api("me", { fields: ["email"], access_token: accessToken }).then(
      auth => {
        console.log(auth);
        return {
          id: auth.id,
          email: auth.email,
        };
      }
    );
  },
};

/*
    Reference: 
    - https://developers.google.com/+/web/api/rest/latest/people/get
    - https://www.npmjs.com/package/googleapis
*/

exports.google = {
  getProfile: accessToken => {
    console.log(accessToken);
    return new Promise((resolve, reject) => {
      plus.people.get(
        {
          userId: "me",
          auth: accessToken,
        },
        (err, auth) => {
          console.log(auth);
          if (err) reject(err);
          resolve({ auth });
        }
      );
    });
  },
};
