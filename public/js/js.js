console.log("hello")
// fetch('http://localhost:3000/weather?address=boston').then((response) =>{
//     response.json().then((data) =>{
//         if (data.error)
//             console.log(data.error)
//         else{
//             console.log(data.forecast)
//             console.log(data.address)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.getElementById('locationText')
const forecastText = document.getElementById('forecastText')
weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            if (data.error)
            {
                locationText.textContent = data.error
                forecastText.textContent = ''
                //console.log(data.error)
            }
            else{
                locationText.textContent = data.address
                forecastText.textContent = data.forecast
                console.log(data.forecast)
                console.log(data.address)
            }
        })
    })
})