const needle = require('needle');

const fetchMyIP = function() {
  return needle('get', 'https://api.ipify.org?format=json')
  .then((response) => {
    const body = response.body;    //retrive the body value from the response object
    const ip = body.ip;    //retrieve the ip from the body object
    return ip;
  });
};


const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
  .then((response) => {
    const body = response.body;
    const latitude = body.latitude
    const longitude = body.longitude
    return {latitude, longitude}
  });
};


const fetchISSFlyOverTimes = function(coords) {
  const latitude = coords.latitude
  const longitude = coords.longitude
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return needle('get', url)
  .then((response) => {
    const body = response.body;
    const passtimes = body.response;
    return passtimes;
  });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });
};


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass: ${datetime}, Duration: ${duration}sec`);
  }
};


module.exports = { printPassTimes, nextISSTimesForMyLocation };