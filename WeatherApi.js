
const Background = ()=> {
    let lat = null;
    let long = null;
    if(navigator.geolocation) {

        let options = { enableHighAccuracy: true }
        const err = (error)=>{
            PEXELS("rain");
        }
        const success = async (pos)=>{
            let pet = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
            let res = await pet.json();
            PEXELS(res.address.state);
        }
        navigator.geolocation.getCurrentPosition( success, err, options)   
    }
    
    
    
    
    
}

Background();
