const DATACURRENT = getId("temp");
const DATACURRENTFl = getId("feelsLike");
const DATACURRENTH = getId("humidity");
const DATACURRENTW = getId("windSpeed");
const DATACURRENTP = getId("probRain");
const UBI = getId("ubi");
let search = getId("searchInputText");
const space = getId("space");
const TEMPLATEDAILY = getId("template").content;
let frag = document.createDocumentFragment();
const message = getId("message");
let error = d.createElement("p");
error.classList.add("error");
error.textContent = "No matches found! Try again with other Words.";

const Weather = async (query, lat="", lon="") => {

    let stateZone = "";
    let countryZone = "";  

    const DATENOW = new Date();
    let day = DATENOW.getDay() + 1;
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (query) {
        let petCoord = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search.value}&lang=es&appid=3fa0f591a653264d619986f2c14b8507&units=metric`);
        let resCoord = await petCoord.json();
        if (resCoord.cod === '404') {
            message.appendChild(error);
            return setTimeout(()=>{message.removeChild(error);}, 8000)
        }
        PEXELS(search.value);
        lat = resCoord.coord.lat;   
        lon = resCoord.coord.lon;
    } 

    let requestWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=3fa0f591a653264d619986f2c14b8507`;
    let petWeather = await fetch(requestWeather);
    let resWeather = await petWeather.json(); 
    
    let petZone = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    let resZone = await petZone.json();

    if(resZone.address.state !== undefined) stateZone = resZone.address.state;
    if(resZone.address.country !== undefined) countryZone = resZone.address.country;

    if(!query) PEXELS(stateZone + " " + countryZone);
    if(stateZone === "") UBI.textContent = countryZone;
    else UBI.textContent = stateZone + ", " + countryZone;

    DATACURRENT.textContent = 'Temperature: ' + resWeather.current.temp + "°C";
    DATACURRENTFl.textContent = 'FeelsLike: ' + resWeather.current.feels_like + "°C";
    DATACURRENTH.textContent = 'Humidity: ' + resWeather.current.humidity + "%";
    DATACURRENTW.textContent = 'Wind speed: ' + resWeather.current.wind_speed + " Km/h";

    if (space.children.length === 8) {
        while (1 !== space.children.length ) {
            space.removeChild(space.children[1]);
        }
    }
    
    let today = true;
    resWeather.daily.forEach((element, index) => {
        if(index < 7) {
            if(day > 6) day = 0 
            if(today) {
                TEMPLATEDAILY.getElementById("daytest").textContent = "Today";
                TEMPLATEDAILY.getElementById("daytest").style.color = "#efa630"; 
                today = false;                            
            } else {
                TEMPLATEDAILY.getElementById("daytest").style.color = "";
                TEMPLATEDAILY.getElementById("daytest").textContent = DAYS[day++];
            }
            
            if(DATENOW.getHours() > 18 || DATENOW.getHours() < 7 ) element.weather[0].icon = element.weather[0].icon.replace("d", "n")
            TEMPLATEDAILY.getElementById("clime").src = "http://openweathermap.org/img/wn/" + element.weather[0].icon + "@2x.png";
            TEMPLATEDAILY.getElementById("min").textContent = "min " + element.temp.min + "°C";
            TEMPLATEDAILY.getElementById("max").textContent = "max " + element.temp.max + "°C";
            clone = document.importNode(TEMPLATEDAILY, true);
            frag.appendChild(clone);
        }
        
    });  
        space.appendChild(frag);     
        today = true;        
}


