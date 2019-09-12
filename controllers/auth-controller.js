const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');
const cModel = require('../models/credentials-model.js');
const sModel = require('../models/sessions-model.js');

const authController = (module.exports = {});

authController.register = async (req, res) => {
  try {
    const credentials = req.body;
    checkCredentials(credentials);

    const hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash;

    try {
      const registrationSuccess = await cModel.insert(credentials);
      registrationSuccess &&
        res.status(201).json({
          success: true,
          message: `Registration successful.`,
          credential_id: registrationSuccess.credential_id,
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Registration failed.\n${err}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
};

authController.login = async (req, res) => {
  try {
    const loginAttempt = req.body;
    checkCredentials(loginAttempt);

    const credentials = await cModel.findBy(credentials.username);

    if (credentials) {
      if (bcrypt.compareSync(loginAttempt.password, credentials.password)) {
        const token = genToken(credentials);
        try {
          const newSession = {
            isValid: true,
            token,
          };
          const session = await sModel.insert(newSession);
          session &&
            res.status(200).json({
              success: true,
              message: `Login Successful. Welcome ${credentials.username}`,
              session,
            });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: `Unable to create session.`,
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: `Incorrect Password.`,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: `Invalid Username.`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
};

authController.verify = async (req, res) => {
  try {
    const storedSession = await sModel.find(req.session.session_id);
    storedSession.isValid
      ? res.status(200).json({
          success: true,
          message: `Session is still valid.`,
        })
      : res.status(400).json({
          success: false,
          message: `Session is no longer valid.`,
        });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
};

authController.logout = async (req, res) => {
  try {
    const storedSession = await sModel.find(req.session.session_id);
    if (storedSession.isValid) {
      try {
        await sModel.update(storedSession.session_id, {
          ...storedSession,
          isValid: false,
        });
        res.status(200).json({
          success: true,
          message: `Successfully logged out.`,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Unable to log out.\n${err}`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Session has already been ended.`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fatal Error.\n${err}`,
    });
  }
};

/* HELPER FUNCTIONS */
function checkCredentials(credentials) {
  (!credentials.username || !credentials.password) &&
    res.status(400).json({
      success: false,
      message: `Invalid request.\nMust contain username and password.`,
    });
}

function genToken(credentials) {
  const payload = {
    subject: 'credentials',
    credential_id: credentials.credential_id,
  };
  const secret = secrets.AUTH_SECRET;
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}
