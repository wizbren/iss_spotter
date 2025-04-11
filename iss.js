const needle = require('needle');


const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      return callback(null, null);
    }
    const bodyObj = typeof body === 'string' ? JSON.parse(body) : body;
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
      return callback(null, null);
    }
    const bodyObj = typeof body === 'string' ? JSON.parse(body) : body;

    if (!bodyObj.latitude || !bodyObj.longitude) {
      return callback(null, null);
      return;
    }

    const coords = {
      latitude: bodyObj.latitude,
      longitude: bodyObj.longitude
    };

    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      return callback(null, null);
      return;
    }
    const bodyObj = typeof body === 'string' ? JSON.parse(body) : body;

    if (!bodyObj.response) {
      return callback(null, null);
      return;
    }

    callback(null, bodyObj.response);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };