const d = document;
const getId = id => d.getElementById(id);
let background2 = getId("video");

const test = () => {
    let fun = async (searching)=> {  
        
        let pet = await fetch(`https://api.pexels.com/videos/search?query=${searching}, aerial&total_results=1&page=1&per_page=1&size=large`, {
            method: "GET",
            headers: { authorization: "563492ad6f917000010000013ea3a5d197f94a3bab2ef413713dda13" }});
        let res = await pet.json();
        background2.setAttribute("type", res.videos[0].video_files[0].file_type );
        background2.src = res.videos[0].video_files[0].link;
    }
    fun()
}

export default test