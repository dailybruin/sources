const google = require('googleapis');
const url = require('url');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
);
const Profile = google.oauth2('v2'); // to obtain profile details

exports.redirectToAuthURL = (req, res, next) => {
  const authURL = oauth2Client.generateAuthUrl({ scope: 'email' });
  res.redirect(authURL);
};

exports.authCallback = (req, res, next) => {
  const response = url.parse(req.url, true).query; // get authentication code

  if (response.error) {
    console.log(response.error); // print to terminal
    res.redirect('/login'); // send user back to login to try again
  } else {
    oauth2Client.getToken(response.code, (err, tokens) => {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
        oauth2Client.credentials = tokens; // See https://github.com/google/google-api-nodejs-client/issues/869
        res.redirect('/');
      }
    });
  }
};

/**
 * Express middleware function that verifies a user is authenticated (i.e., has an @media.ucla.edu account).
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.ensureAuthenticated = (req, res, next) => {
  Profile.userinfo.v2.me.get(
    {
      auth: oauth2Client,
    },
    (err, response) => {
      if (err || response.hd !== 'media.ucla.edu') {
        res.redirect('/login');
      } else {
        return next();
      }
    }
  );
};
