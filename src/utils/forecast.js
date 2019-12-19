const request = require('request');

const forecast = ({ latitude, longitude }, callback) => {
    const infoObj = {
        url: 'https://api.darksky.net/forecast/e3b33c12f0e10739bc54ebc402005d7b/' + latitude + ',' + longitude + '?exclude=minutely&exclude=hourly&units=si',
        json: true
    }

    request(infoObj, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            callback(undefined, body);
        }
    })
}

module.exports = forecast;