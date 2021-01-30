const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const location = require('./utils/location');
const port = 3000;
const year = new Date().getFullYear();

// Define path for express config
const publicDir = path.join(__dirname, '../public');
const templatesDir = path.join(__dirname, '../templates');
const viewsDir = `${templatesDir}/views`;
const partialsDir = `${templatesDir}/partials`;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', { weather : true, title: "Weather", description: "weather page", pageTitle: "This is a weather page", year });
});

app.get('/about', (req, res) => {
    res.render('index', { about: true, title: "About Page", description: "about page" });
});

app.get('/weather', (req, res) => {
    if (req.query.address) {
        const { address } = req.query;
        location.geocode(address, geoCodeResponse => {
            const { status, data } = geoCodeResponse;
            if (status === "SUCCESS") {
                const { lat, lng, location: locationName } = data;
                location.weather(lat, lng, weatherResponse => {
                    weatherResponse.data.location = locationName;
                    res.send(weatherResponse);
                })
            } else {
                res.send(geoCodeResponse);
            }
        });
    } else {
        res.send({
            status: 'ERROR',
            data: {},
            message: 'Please enter a location name for getting weather information!'
        });
    }
});

app.get('/help', (req, res) => {
    res.render('index', { help: true, title: "Help Page", description: "Help page", pageTitle: "This is a help page" });
});

app.get('/help/*', (req, res) => {
    res.render('error', { title: "404 Help Page", description: "404 Help page", message: "Help page not found" });
});

app.get('*', (req, res) => {
    res.render('error', { title: "404", description: "Page Not found", message: "Page not found" });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
