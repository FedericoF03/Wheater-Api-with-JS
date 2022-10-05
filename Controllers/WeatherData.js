export const WeatherData = async (lat, lon) => {
    let requestWeather = await `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=3fa0f591a653264d619986f2c14b8507`,
    petWeather = await fetch(requestWeather),
    resWeather = await petWeather.json(),
    petZone = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`),
    resZone = await petZone.json();
    let data = {resWeather, resZone}
    return data
}