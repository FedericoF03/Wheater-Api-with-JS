let d = document
const getId = id => d.getElementById(id);
let button = getId("searchInputButton");
const search = () => d.addEventListener('click', e => {
    if (e.target == button) weather(true)
});

export default search
