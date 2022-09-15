const AUTO = ()=> {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            Weather(false, pos.coords.latitude, pos.coords.longitude);
        })
        
    }
    else console.log("No tiene compatibilidad");
    
}

AUTO();
