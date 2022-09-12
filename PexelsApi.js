const d = document;

const getId = id => d.getElementById(id)
let background2 = getId("video");
let search = getId("searchInputText");
let button = getId("searchInputButton");


    const PEXELS = async (query)=> {
        let pet = await fetch(`https://api.pexels.com/videos/search?query=${query}, aerial&total_results=1&page=1&per_page=1&size=large`, {
            method: "GET",
            headers: { authorization: "563492ad6f917000010000013ea3a5d197f94a3bab2ef413713dda13" }})
            let res = await pet.json();
            background2.setAttribute("type", res.videos[0].video_files[0].file_type );
            background2.src = res.videos[0].video_files[0].link
    }
        
d.addEventListener("click", e=>{
    if(e.target == button) {
        PEXELS(search.value);
    }
})