import { ActiveGeo } from "./GetGeo.js";
import { Timer } from './Time.js'
import { Weather } from './WeatherApi.js'

const button = document.getElementById("searchSubmit");

ActiveGeo(Weather)
Timer()

document.addEventListener("click", e =>  {
    if (e.target === button) Weather()
} );

document.addEventListener("keydown", e =>  {
    if (e.keyCode === 13) Weather()
} );