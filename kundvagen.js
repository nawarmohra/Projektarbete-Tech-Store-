function getCart() {
    return JSON.parse(localStorage.getItem("kundVagn")) || [];
  }
  
  
  var emptyCart = [];
  
  function initSite() {
    addProductsToWebpage();
  }
  
  function addProductsToWebpage() {
    document.getElementById("pruduct-count").innerHTML = getCart().length;
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML = "";
    var titleContainer = document.createElement("div");
    var title = document.createElement("h1");
    var imageCartTitle = document.createElement("img");
    body.appendChild(titleContainer);
    titleContainer.appendChild(imageCartTitle);
    titleContainer.appendChild(title);
    titleContainer.classList = "cartContainer";
    imageCartTitle.classList = "cartImg";
    title.classList = "cartTitle";
    imageCartTitle.setAttribute("src", "/assets/cart_img.png");
    title.innerHTML = "Kundvagn";
    var totalPrice = 0;
    var container = document.createElement("div");
    container.classList = "container";
    body.appendChild(container);
  
    for (var i = 0; i < getCart().length; i++) {
      var selectedProduct = getCart()[i];
      totalPrice += selectedProduct.price;
  
      var infolist = document.createElement("div");
      infolist.classList = "ProuductDiv";
  
      var imageListItem = document.createElement("img");
  
      imageListItem.classList = "productImage";
      var titleListItem = document.createElement("h1");
      var priceListItem = document.createElement("h4");
      var buttonDiv = document.createElement("div");
  
      imageListItem.setAttribute("src", "/assets/" + selectedProduct.image);
      var buttonImg = document.createElement("img");
      buttonImg.setAttribute("src", "./assets/delet.png");
      var buttonListItem = document.createElement("button");
      buttonImg.classList = "imgL";
      buttonDiv.classList = "section";
      buttonListItem.classList = "addButton";
      buttonListItem.num = i;
      buttonListItem.onclick = function() {
        removeFromCart(this.num);
      };
      buttonImg.onclick = function() {
        removeFromCart(this.num);
      };
  
      titleListItem.innerText = selectedProduct.title;
  
      imageListItem.innerText = selectedProduct.image;
      priceListItem.innerText = selectedProduct.price + " kr";
      buttonListItem.innerHTML = "Ta bort";
  
      infolist.appendChild(imageListItem);
      infolist.appendChild(titleListItem);
      infolist.appendChild(priceListItem);
      infolist.appendChild(buttonDiv);
      buttonDiv.appendChild(buttonImg);
      buttonDiv.appendChild(buttonListItem);
  
      container.appendChild(infolist);
    }
   
   var totalPriceContainer = getPriceElement(totalPrice);
    body.appendChild(totalPriceContainer);
  
    if (getCart() && getCart().length) {
      var checkOutContainer = document.createElement("div");
      body.appendChild(checkOutContainer);
      var checkOutButton = document.createElement("button");
      checkOutButton.classList = "completeBut";
      checkOutButton.onclick = function() {
        checkOut();
      };
      checkOutButton.innerHTML = "Complete your purchase";
      checkOutContainer.appendChild(checkOutButton);
    }
  }
  
  function removeFromCart(title) {
    var cart = getCart();
    var productName = title;
  
    cart.splice(productName, 1);
    var json_str = JSON.stringify(cart);
    localStorage.setItem("kundVagn", json_str);
  
  }
  
  function getPriceElement(totalPrice) {
    var priceContainer = document.createElement("div");
    var finalPrice = document.createElement("p");
    finalPrice.classList = "totalPrice";
  
    if (getCart() && getCart().length) {
      finalPrice.innerText = "Total price:" + " " + " " + totalPrice + " " + "kr";
      priceContainer.appendChild(finalPrice);
      return priceContainer;
    } else {
      finalPrice.innerText = "Your cart is empty";
      priceContainer.appendChild(finalPrice);
      return priceContainer;
    }
  }

  