const request = require('postman-request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=985a87dc1650d4f1ba82892919280a52&query=' + lat + ',' + long
    request({ url, json:true}, (error, {body}) =>{
      if (error){
        callback('Unable to connect to forecast service', undefined)
      }
      else if (body.error)
      {
        callback(body.error.info, undefined)
      }
      else
      {
        const forecast = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is currently ' + body.current.humidity + '%.'
        callback(undefined, forecast)
      }
    })
  }

  module.exports = forecast