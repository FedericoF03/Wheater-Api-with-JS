import { DAYS} from "./Time.js";
import { PexelsApi } from './PexelsApi.js'
import { WeatherData } from "./WeatherData.js";

const $DATACURRENT = document.getElementById("temp"),
    $DATACURRENTFl = document.getElementById("feelsLike"),
    $DATACURRENTH = document.getElementById("humidity"),
    $DATACURRENTW = document.getElementById("windSpeed"),
    $LOC = document.getElementById("location"),
    $SPACE = document.getElementById("backgroundTemplate"),
    $TEMPLATEDAILY = document.getElementById("template").content,
    $SEARCHINPUT = document.getElementById("searchInputText"),
    $ERRORSPACE = document.getElementById("searchBox"),
    $FRAG = document.createDocumentFragment()

export const Weather = async ({lat, lon} = "") => {
    try {
        let data = null,
            today = new Date().getDay(),
            query = $SEARCHINPUT.value.trim()
        if ((!lat || !lon) && (query) ) {
            let petCoord = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&lang=es&appid=3fa0f591a653264d619986f2c14b8507&units=metric`),
                resCoord = await petCoord.json();
                console.log(resCoord)
            if(resCoord.cod !== 200) {
                $SEARCHINPUT.value = ""
                throw new Error(`no match found with the input ${query}`)
            }
            PexelsApi(query)
            $SEARCHINPUT.value = ""
            data = await WeatherData(resCoord.coord.lat, resCoord.coord.lon);    
        } else if (lat && lon) data = await WeatherData(lat, lon)
        else {
            $SEARCHINPUT.value = ""
            throw new Error('insert city name, state, country in the input')
        }

        let stateZone = data.resZone.address.state,
            countryZone = data.resZone.address.country;
        
        if (lat && lon) PexelsApi(stateZone + " " + countryZone);
        if(stateZone === "") $LOC.textContent = countryZone;
        else $LOC.textContent = stateZone + ", " + countryZone;

        $DATACURRENT.textContent = 'Temperature: ' + data.resWeather.current.temp + "°C";
        $DATACURRENTFl.textContent = 'FeelsLike: ' + data.resWeather.current.feels_like + "°C";
        $DATACURRENTH.textContent = 'Humidity: ' + data.resWeather.current.humidity + "%";
        $DATACURRENTW.textContent = 'Wind speed: ' + data.resWeather.current.wind_speed + " Km/h";

        $SPACE.innerHTML = ""
        data.resWeather.daily.forEach((element, index) => {
            if(index < 7) {
                today > 6 ? today = 0 : today;
                $TEMPLATEDAILY.getElementById("daytest").textContent = DAYS[today++];
                if(new Date().getHours() > 18 || new Date().getHours() < 7 ) element.weather[0].icon = element.weather[0].icon.replace("d", "n")
                $TEMPLATEDAILY.getElementById("clime").src = "http://openweathermap.org/img/wn/" + element.weather[0].icon + "@2x.png";
                $TEMPLATEDAILY.getElementById("min").textContent = "min " + element.temp.min + "°C";
                $TEMPLATEDAILY.getElementById("max").textContent = "max " + element.temp.max + "°C";
                let clone = document.importNode($TEMPLATEDAILY, true);
                $FRAG.appendChild(clone);
            }
            
        });  
            $SPACE.appendChild($FRAG);    
            const $TODAYSTLYE = document.querySelectorAll(".card_d"), 
                $MIN = document.querySelectorAll(".min"),
                $MAX = document.querySelectorAll(".max") 
            
            $TODAYSTLYE[0].style.backgroundColor = "#ffa808"
            $MAX[0].style.color = "#000000"
            $MIN[0].style.color = "#000000"

            today = 0; 
    } catch (err) {
        let $ERROR = document.createElement("p");
        $ERROR.classList.add("error");
        $ERROR.textContent = err;
        $ERRORSPACE.appendChild($ERROR);
        return setTimeout(()=>{ $ERRORSPACE.removeChild($ERROR);}, 8000)
    }          
}


