const fs = require('fs');

const readFile = (from) =>
  new Promise((resolve, reject) => {
    fs.readFile(from, 'utf8', (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

module.exports = readFile;
