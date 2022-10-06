const conteinerVideo = document.getElementById("conteinerVideo");
export const ActiveGeo = (cb)=> {
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (pos) => {
            let geo = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }
            cb(geo)
        }, (err) => {
            if(err) {
                if (err = 'User denied Geolocation') {
                    let geo = {
                        lat: -34.603722,
                        lon: -58.381592
                    }
                    cb(geo)
                } else {
                    let incompatibilidad = document.createElement("div"),
                    incompatibilidadMes = document.createElement("p");
                incompatibilidad.classList.add("incompatibility"); 
                incompatibilidadMes.classList.add("incompatibility-message");
                incompatibilidadMes.textContent = err.message;
                incompatibilidad.appendChild(incompatibilidadMes);
                conteinerVideo.appendChild(incompatibilidad);
                }
                
            }
        }, { enableHighAccuracy: true } ); 
    }

}

