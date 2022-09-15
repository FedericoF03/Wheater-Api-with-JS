const conteinerVideo = getId("conteinerVideo");
const AUTO = ()=> {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => Weather(false, pos.coords.latitude, pos.coords.longitude), 
        () => {
        let incompatibilidad = d.createElement("div");
        let incompatibilidadMes = d.createElement("p");
        incompatibilidad.classList.add("incompatibility"); 
        incompatibilidadMes.classList.add("incompatibility-message");
        incompatibilidadMes.textContent = "Su maquina o telefono celular no es compatible con la geocalizacion o no la tiene tiene activada";
        incompatibilidad.appendChild(incompatibilidadMes);
        conteinerVideo.appendChild(incompatibilidad);
        }, { enableHighAccuracy: true } ); 
    } else {
        let incompatibilidad = d.createElement("div");
        let incompatibilidadMes = d.createElement("p");
        incompatibilidad.classList.add("incompatibility"); 
        incompatibilidadMes.classList.add("incompatibility-message");
        incompatibilidadMes.textContent = "Su maquina o telefono celular no es compatible con la geocalizacion o no la tiene tiene activada";
        incompatibilidad.appendChild(incompatibilidadMes);
        conteinerVideo.appendChild(incompatibilidad);
    }    
}
AUTO();
