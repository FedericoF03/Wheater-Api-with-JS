let button = getId("searchInputButton");
d.addEventListener("click", e=>{
    
    if(e.target == button) {
        Weather(true)
    }
})

