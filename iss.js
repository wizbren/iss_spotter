const needle = require('needle');


const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);;
    }
    const bodyObj = JSON.parse(body);
    const ip = bodyObj.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} while fetching coordinates: ${body}`), null);
    }
    const bodyObj = typeof body === 'string' ? JSON.parse(body) : body;

    if (!bodyObj.success) {
      const message = `Success status was ${bodyObj.success}. Server message says: ${bodyObj.message} when fetching for IP ${ip}`;
      callback(Error(message), null);
      return;
    }
    const coords = {
      latitude: bodyObj.latitude,
      longitude: bodyObj.longitude
    };

    callback(null, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };