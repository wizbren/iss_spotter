const { nextISSTimesForMyLocation } = require('./iss');

/*fetchMyIP((error, IP) => {
  if (error) {
    console.log("Error fetching IP", error);
  } else {
    console.log("Your IP address is: ", IP);
  }
});*/


const sampleVanIP = "66.183.83.48";

/*fetchCoordsByIP(sampleVanIP, (error, coords) => {
  if (error) {
    console.log("Error fetching coordinates", error);
  } else {
    console.log("Coordinates: ", coords);
  }
});*/


const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

/*fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work ", error);
  } else {
    console.log("It worked, return flyover times", passTimes);
  }
});*/

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});