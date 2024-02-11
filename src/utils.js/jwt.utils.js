const JWT = require('jsonwebtoken');
const createError = require("http-errors");


module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN;
      const options = {
        expiresIn: "12h",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  refreshAccessToken: (userId)=>{
    return new Promise((resolve, reject) => {
         const payload = {};
         const secret = process.env.REFRESH_TOKEN;
         const options = {
           expiresIn: "1y",
           audience: userId,
         };

          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message);
              reject(createError.InternalServerError());
            }
            resolve(token);
          });
    })
  }
};
