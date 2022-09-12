const DATACURRENT = getId("temp")
const DATACURRENTFl = getId("feelsLike")
const DATACURRENTH = getId("humidity")
const DATACURRENTW = getId("windSpeed")
const DATACURRENTP = getId("probRain")

const Weather = async(zone)=> {
    let pet = await fetch(`http://api.weatherstack.com/current?access_key=6cfe1c9029e4eff281620177e2fdf54d&query=${zone}`);
    let res = await pet.json()
    DATACURRENT.textContent = 'Temperature:' + res.current.temperature + "°";
    DATACURRENTFl.textContent = 'FeelsLike:' + res.current.feelslike + "°";
    DATACURRENTH.textContent = 'humidity:' + res.current.humidity + "°";
    DATACURRENTW.textContent = 'wind speed:' + res.current.wind_speed + "°";
    DATACURRENTP.textContent = 'precip:' + res.current.precip + "°";
    console.log(res);
}

