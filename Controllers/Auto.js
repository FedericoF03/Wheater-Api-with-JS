const AUTO = ()=> {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            Weather(true, pos.coords.latitude, pos.coords.longitude)
            PEXELS(true, pos.coords.latitude, pos.coords.longitude);
        })
        
    }
    else console.log("No tiene compatibilidad")
    
}

AUTO();
