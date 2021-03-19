const fs = require('fs');

const writeFile = (to, text) =>
  new Promise((resolve, reject) => {
    fs.writeFile(to, text, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

module.exports = writeFile;
