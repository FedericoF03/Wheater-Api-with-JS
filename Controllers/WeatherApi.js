const DATACURRENT = getId("temp")
const DATACURRENTFl = getId("feelsLike")
const DATACURRENTH = getId("humidity")
const DATACURRENTW = getId("windSpeed")
const DATACURRENTP = getId("probRain")
const UBI = getId("ubi")
const TEMPLATEDAILY = getId("template").content
let frag = document.createDocumentFragment();
let search = getId("searchInputText")
const space = getId("space")

const Weather = async(query, lat="", lon="")=> {
    
    const DATENOW = new Date()
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = DATENOW.getDay() + 1
    let today = true

    if (query) {
        PEXELS(search.value);
        let petCoord = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.value}&lang=es&appid=3fa0f591a653264d619986f2c14b8507&units=metric`);
        let resCoord = await petCoord.json();
        if (resCoord.cod === '404') {
            console.log("no se encontro")
        }
        lat = resCoord.coord.lat    
        lon = resCoord.coord.lon
    } 

    let requestWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=3fa0f591a653264d619986f2c14b8507`;
    let petWeather = await fetch(requestWeather);
    let resWeather = await petWeather.json(); 
    let petZone = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    let resZone = await petZone.json();
    let stateZone = "";
    if(resZone.address.state !== undefined) stateZone = resZone.address.state;
    let countryZone = "";
    if(resZone.address.country !== undefined) countryZone = resZone.address.country;
    if(!query) PEXELS(stateZone + " " + countryZone);
    UBI.textContent = stateZone + ", " + countryZone;
    DATACURRENT.textContent = 'Temperature: ' + resWeather.current.temp + "°C";
    DATACURRENTFl.textContent = 'FeelsLike: ' + resWeather.current.feels_like + "°C";
    DATACURRENTH.textContent = 'Humidity: ' + resWeather.current.humidity + "%";
    DATACURRENTW.textContent = 'Wind speed: ' + resWeather.current.wind_speed + " Km/h";

    if (space.children.length === 9) {
        while (1 !== space.children.length ) {
            space.removeChild(space.children[1])
        }
    }
            
    resWeather.daily.forEach(element => {
        if(day > 6) day = 0 
        if(today) {
            TEMPLATEDAILY.getElementById("daytest").textContent = "Today"
            today = false;
        } else {
            TEMPLATEDAILY.getElementById("daytest").textContent = DAYS[day++];
            TEMPLATEDAILY.getElementById("daytest").classList.add("other-day")
        }
        
        if(DATENOW.getHours() > 18 || DATENOW.getHours() < 7 ) element.weather[0].icon = element.weather[0].icon.replace("d", "n")
        TEMPLATEDAILY.getElementById("clime").src = "http://openweathermap.org/img/wn/" + element.weather[0].icon + "@2x.png";
        TEMPLATEDAILY.getElementById("min").textContent = "min " + element.temp.min + "°"
        TEMPLATEDAILY.getElementById("max").textContent = "max " + element.temp.max + "°"
        clone = document.importNode(TEMPLATEDAILY, true);
        frag.appendChild(clone)
    });  
        space.appendChild(frag);             
}


