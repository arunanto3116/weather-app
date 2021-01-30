const request = require('postman-request');
const querystring = require("querystring");

const geocode = (address, callback) => {
    const locationName = querystring.escape(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=pk.eyJ1IjoiYXJ1bmFudG8zMTYiLCJhIjoiY2trMTZqZGltMG84aDJzbWZkM3o5MDhheSJ9.HZDtfNF4CKNOf2XL_c0_WQ`;
    request({url, json: true}, function (error, response, body) {
        const locationData = body.features.length > 0 && body.features[0];
        let responseData = {
            status: '',
            data: {},
            message: ''
        };
        if(locationData) {
            responseData.status = "SUCCESS";
            responseData.data.lat = locationData.center[1];
            responseData.data.lng = locationData.center[0];
            responseData.data.location = locationData.place_name;
        } else {
            responseData.status = "ERROR";
            responseData.message = "Please Enter a valid location name."
        }
        callback(responseData);
    });
}

const weather = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a60da981f454d0050263d59cb0708ad5&query=${lat},${lng}`;
    request({url, json: true}, function (error, response, body) {
        let {temperature} = body.current;
        let {region} = body.location;
        let responseData = {
            status: '',
            data: {},
            message: ''
        };
        responseData.status = "SUCCESS";
        responseData.data = { temperature, region, info : `it is currently ${temperature} degree celcius in ${region}.` };
        callback(responseData);
    });   
};

module.exports = {
    geocode,
    weather
};