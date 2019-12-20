const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Static path setting
const dirPath = path.join(__dirname, '../public');
app.use(express.static(dirPath));

// Views path setting
app.set('views', path.join(__dirname, '../templates/views'));

// Partials path setting
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Set up template engine
app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'DM'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'DM',
        message: 'Hope this works at the time you\'re using it :P'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'DM'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address;
    const jsonData = {
        title: 'Weather',
        name: 'DM',
        location
    };

    // res.send(jsonData)

    if(!location) {
        jsonData.location = 'No address is entered.'
        // res.render('weather', jsonData);
        res.send(jsonData)
    }
    else {
        geocode(location, (error, { latitude, longitude, location } = {}) => {
            jsonData.location = location;
            if (error) {
                jsonData.forecast = error;
                res.send(jsonData)
                // res.render('weather', jsonData);
            }
            else {
                forecast({ latitude, longitude }, (error, { daily, currently }) => {
                    if (error) {
                        jsonData.forecast = error;
                        res.send(jsonData)
                        // res.render('weather', jsonData);
                    }
                    else {
                        jsonData.forecast = `${daily.summary} It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability}% chance of rain.`;
                        // res.render('weather', jsonData);
                        res.send(jsonData)
                    }
                })
            }
        })
    }
    
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Something went wrong with the page you are looking for',
        title: '404',
        name: 'DM'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', { message: 'Help articles not found' });
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})