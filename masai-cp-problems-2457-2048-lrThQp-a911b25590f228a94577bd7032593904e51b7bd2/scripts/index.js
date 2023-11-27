// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const artURL = `${baseServerURL}/arts`;
let mainSection = document.getElementById("data-list-wrapper");

// pagination div
let paginationWrapper = document.getElementById("pagination-wrapper");

// navbar cart count
let cart = document.getElementById("cart");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterTemperaOnCanvas = document.getElementById("filter-Tempera-on-Canvas");
let filterOilOnCanvas = document.getElementById("filter-Oil-on-Canvas");

//Arts Data
let artsData = [];
let queryParamString = null;
let pageNumber = 1;
let cart_data = JSON.parse(localStorage.getItem("cartData")) || [];
cart.innerText =`Cart : ${cart_data.length}`

async function fetchData(url){
  try{
    let res = await fetch(url);
    let data = await res.json();
    console.log(data)
    appendData(data);
  }
  catch(error){
    console.log(error);
  }
}


function appendData(data){
  mainSection.innerHTML = "";

  let card_list = document.createElement("div");
  card_list.className = "card-list";

  data.forEach(item => {card_list.append(createCard(item))});
  mainSection.append(card_list);
}

function createCard(item){

  let card = document.createElement("div");
  let card_img = document.createElement("div");
  let img = document.createElement("img");
  let card_body = document.createElement("div");
  let card_title = document.createElement('h5');
  let card_artist = document.createElement("p");
  let card_year = document.createElement("p");
  let card_paintbrush = document.createElement("p");
  let card_price = document.createElement("p");
  let card_medium = document.createElement("p");
  let card_button = document.createElement("button");

  card.className = "card";
  card_img.className = "card-img";
  img.src = item.image;
  img.alt = "art";
  card_body.className = "card-body";
  card_title.className = "card-title";
  card_title.innerText = "Art title : "+item.title;
  card_artist.className = item.artist;
  card_year.className = "card-year";
  card_year.innerText = "year : "+item.year;
  card_paintbrush.className = "card-paintbrushes";
  card_paintbrush.innerText = "paintbrushes : "+ item.details.paintbrushes.join(",");
  card_price.className = "card-price";
  card_price.innerText = item.price;
  card_medium.className = "card-medium";
  card_medium.innerText = item.medium;
  card_button.className = "card-button";
  card_button.dataset.id = item.id;
  card_button.innerText = "Add to cart";
  card_button.addEventListener("click",()=>{addToCart(item)})

  card_img.append(img);
  card_body.append(card_title,card_artist,card_year,card_paintbrush,card_price,card_medium,card_button);
  card.append(card_img,card_body);

  return card;
}

fetchData(artURL+"?_page=1&_limit=5");


function addToCart(item){
  let cardData = JSON.parse(localStorage.getItem("cartData")) || [];
  let flag = cardData.filter(ele => ele.id === item.id).length;
  if(!flag){
    cardData.push(item);
    cart.innerText =`Cart : ${cardData.length}`
    localStorage.setItem("cartData",JSON.stringify(cardData));
    alert("added to cart");
  }
  else{
    alert("Already in Cart");
  }
}

sortAtoZBtn.addEventListener("click",()=>{fetchData(`${artURL}?_page=1&_limit=5&_sort=price&_order=asc`)});
sortZtoABtn.addEventListener("click",()=>{fetchData(`${artURL}?_page=1&_limit=5&_sort=price&_order=desc`)});
filterTemperaOnCanvas.addEventListener("click",()=>{fetchData(`${artURL}?_page=1&_limit=5&medium=Tempera on Canvas`)});
filterOilOnCanvas.addEventListener("click",()=>{fetchData(`${artURL}?_page=1&_limit=5&medium=Oil on Canvas`)});