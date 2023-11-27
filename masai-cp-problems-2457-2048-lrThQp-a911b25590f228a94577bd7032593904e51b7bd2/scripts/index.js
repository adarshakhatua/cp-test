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
