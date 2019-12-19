const request = require('request');

const geocode = (location, callback) => {
    const infoObj = {
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiZG1haGFqYW45OCIsImEiOiJjazQ5bnVxN24wNmN2M2xtNzJpaDYzcTR6In0.Kf-BciModMzcnFr04ug8xA&limit=1',
        json: true
    }

    request(infoObj, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        }
        else if (body.error || !body.features.length) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;