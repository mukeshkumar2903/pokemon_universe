let results = document.querySelector("#result");
let button = document.querySelector("#loadMoreBtn");
let input = document.querySelector("input");
let select = document.querySelector("#select")
const API = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";

let alldata=[];

async function fetchdata() {
    const response = await fetch(API);
    const result = await response.json();
    getdata(result.results);
    // console.log(result.results);
}
fetchdata();

async function getdata(data) {
    //console.log(arr);
    for (let x of data) {
        //let newDiv = document.createElement("div");
        let fetch_1 = await fetch(x.url);
        let fetch_2 = await fetch_1.json();
        //console.log(fetch_2);
        getfetch(fetch_2);
        console.log(fetch_2);
    }
}

async function getfetch(data) {
    let div_1 = document.createElement("div");
    div_1.innerHTML = `
    <div class="flip-box">
    <div class="flip-box-inner">
    <div class="flip-box-front">
      <img src="${data.sprites.other.dream_world.front_default}" alt="Avatar">
      <p>Name: ${data.name}</p>
      <p>Type: ${data.types[0].type.name}</p>

    </div>
    <div class="flip-box-back">
      <p>height: ${data.height}</p>
      <p>weight: ${data.weight}</p>
      <p>hp: ${data.stats[0].base_stat}</p>
      <p>attack: ${data.stats[1].base_stat}</p>
      <p>defence: ${data.stats[2].base_stat}</p>
      <p>special_attack: ${data.stats[3].base_stat}</p>
      <p>special_defence: ${data.stats[4].base_stat}</p>
      <p>speed: ${data.stats[5].base_stat}</p>
    </div>
    </div>
    </div>`
    let newDiv=document.createElement("option");
    newDiv.innerHTML=data.types[0].type.name;
    select.append(newDiv);
    results.append(div_1);
    alldata.puch(div_1);
    //results.append(div_1);
}

inputfunction(input);
function inputfunction(e){
    console.log(e.target.value);
    
}





button.addEventListener("click", () => {
    fetchdata();
});
