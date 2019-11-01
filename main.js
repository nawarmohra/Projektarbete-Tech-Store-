var listOfProducts;

var atKundvagn = [];

function loadProducts() {
  fetch("./products.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(products) {
      listOfProducts = products;
      addProductsToWebpage();
    });
}

function initSite() {

  loadProducts();
  var cart = localStorage.kundVagn;
  if (cart) {
    atKundvagn = JSON.parse(cart);
  }
  document.getElementById("pruduct-count").innerHTML = atKundvagn.length;
}


function addProductsToWebpage() {
  var body = document.getElementsByTagName("body")[0];

  var container = document.createElement("div");
  container.classList = "container";
  body.appendChild(container);


  for (var i = 0; i < listOfProducts.length; i++) {
    var selectedProduct = listOfProducts[i];

    var productCard = document.createElement("div");
    productCard.classList = "Mobilediv";

    var infolist = document.createElement("div");
    infolist.classList = "product-info";

    var titleListItem = document.createElement("h1");
    var descriptionListItem = document.createElement("p");
    var imageListItem = document.createElement("img");
    imageListItem.setAttribute("src", "/assets/" + selectedProduct.image);

    imageListItem.classList = "productImage";
    var priceListItem = document.createElement("h4");
    var buttonDiv = document.createElement("div");
    buttonDiv.classList = "buttonindex";
    var buttonImg = document.createElement("img");
    buttonImg.setAttribute("src", "/assets/cart_arrow.png");
    buttonImg.classList = "imgProuduct";
    buttonImg.name = selectedProduct.title;
    buttonImg.onclick = function() {
      addToCart(this.name);
    };
    var buttonListItem = document.createElement("button");
    buttonListItem.classList = "addButton";
    buttonListItem.name = selectedProduct.title;
    buttonListItem.onclick = function() {
      addToCart(this.name);
    };

    titleListItem.innerText = selectedProduct.title;
    descriptionListItem.innerText = selectedProduct.description;
    imageListItem.innerText = selectedProduct.image;
    priceListItem.innerText = selectedProduct.price + " kr";
    buttonListItem.innerHTML = "Add to cart";

    infolist.appendChild(titleListItem);
    infolist.appendChild(descriptionListItem);
    infolist.appendChild(imageListItem);
    infolist.appendChild(priceListItem);
    infolist.appendChild(buttonDiv);
    buttonDiv.appendChild(buttonImg);
    buttonDiv.appendChild(buttonListItem);

    productCard.appendChild(infolist);
    container.appendChild(productCard);
  }
}

function addToCart(title) {
  var productToAdd = title;

  for (var i = 0; i < listOfProducts.length; i++) {
    if (productToAdd == listOfProducts[i].title) {
        atKundvagn.push(listOfProducts[i]);
      var json_str = JSON.stringify(atKundvagn);
      localStorage.kundVagn = json_str;

      count();
    }
  }
}
function count() {
  document.getElementById("pruduct-count").innerHTML = atKundvagn.length;
}
