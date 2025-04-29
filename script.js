let results = document.querySelector("#result")
let button = document.querySelector(".btn")

let select = document.querySelector("select")
let input = document.querySelector("input")



let offsetvalue = 20;
let limitvalue = 0;

let pokimondata = [];
let selectarr = [];

button.addEventListener("click", () => {
    fetchpokimon()
});


async function fetchpokimon() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitvalue}&offset=${offsetvalue}`);
        //console.log(response)
        let result = await response.json();
    // console.log(result.results)
    getdata(result.results);
    offsetvalue = offsetvalue + 20;
}


async function fetchTypes() {
    let types = await fetch(" https://pokeapi.co/api/v2/type/?limit=21");
    let typesresponse = await types.json();
    // console.log(typesresponse.results)
    pokimontypes(typesresponse.results);
}
fetchTypes();

function pokimontypes(arr) {
    arr.forEach((object) => {
        let option = document.createElement("option");
        option.value = object.name;
        option.innerText = object.name;
        select.append(option);
    })
}

fetchpokimon();


async function getdata(arr) {
    //  console.log(arr)
    for (let x of arr) {
        let fetcheing = await fetch(x.url);
        let resutlfetch = await fetcheing.json();
        pokimondata.push(resutlfetch);
        // pokimondata.push(resutlfetch)
        // console.log(pokimondata)

    }
    // console.log(pokimondata)
    getfecthing(pokimondata);
}
// console.log(pokimondata)



function getfecthing(obj) {
    results.innerHTML = " "
    obj.forEach((element) => {
        // console.log(element)
        let divmain = document.createElement("div");
        divmain.classList.add("flip-card");
        divmain.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                <img src="${element.sprites.other.dream_world.front_default}" alt="Avatar" >
                <p class="name">Name:   ${element.name}</p>
                <p class="type">type:  ${element.types[0].type.name}  </p>
                </div>
                <div class="flip-card-back">
                <p>height: ${element.height}</p>
                <p>Weight: ${element.weight}</p>
                <p>hp : ${element.stats[0].base_stat}</p>
                <p>attack: ${element.stats[1].base_stat}</p>
                <p>defence: ${element.stats[2].base_stat}</p>
                <p>special_attack: ${element.stats[3].base_stat}</p>
                <p>special_defence: ${element.stats[4].base_stat}</p>
                <p>speed: ${element.stats[5].base_stat}</p>
                </div>
            </div>`;
        results.append(divmain)
    })

    // console.log(arr.types[0].type.name);
}
input.addEventListener("input", (e) => {
    let searchvariable = e.target.value
    let value = pokimondata.filter((obj) => {
        return obj.name.includes(searchvariable)
    })
    //  console.log(value)
    getfecthing(value)
})

select.addEventListener("change", (e) => {
    selectarr = []
    let searching = e.target.value
    pokimondata.forEach((element, index) => {
        element.types.forEach((obj) => {
            if (obj.type.name === searching) {
                // console.log("milgya")
                selectarr.push(element)
            }
        })
        console.log(selectarr)
    })
    getfecthing(selectarr)
})