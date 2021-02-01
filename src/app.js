const path = require('path')
const express = require('express')
const hbs = require('hbs')
const e = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Alex Tomoiaga'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About Us',
        name:'Alex Tomoiaga'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        message:'What do you need help with?',
        title: 'Help',
        name: 'Alex Tomoiaga'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        res.send({
            error: 'Address must be provided'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if (error)
             return res.send({
                 error: error
                })
            
            forecast(latitude, longitude, (error, forecastdata) => {
              if (error)
               return res.send({
                   error: error
                })
              res.send({
                  address: location,
                  forecast: forecastdata
              })
            })
          })
    }
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }else{
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req,res) =>{
    res.render('error', {
        title: 'Help article not found',
        name: 'Alex Tomoiaga'
    })
})

app.get('*', (req, res) =>{
    res.render('error',{
        title: 'Page not found',
        name: 'Alex Tomoiaga'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})