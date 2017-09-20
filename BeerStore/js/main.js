/**
 * @author A2J (Andrea, Areum, Joana)
 */

var beerArray = [{
       product_id: "Beer01",
       product_name: "Bud Light",
       image: "Beer01.jpg",
       price: "2.50",
       size: "473 mL can",
       description:"Alcohol/Vol: 4.0%, Made in: Ontario, Canada "
    }, {
       product_id: "Beer02",
       product_name: "Pabst Blue Ribbon",
       image: "Beer02.jpg",
       price: "1.90",
       size: "473 mL can",
       description:"Alcohol/Vol: 5.0%, Made in: Ontario, Canada "
    }, {
       product_id: "Beer03",
       product_name: "Wasaga Beach One Cerveza",
       image: "Beer03.jpg",
       price: "2.70",
       size: "473 mL can",
       description:"Alcohol/Vol: 4.5%, Made in: Ontario, Canada"
    }, {
       product_id: "Beer04",
       product_name: "Sol",
       image: "Beer04.jpg",
       price: "2.95",
       size: "330 mL bottle",
       description:"Alcohol/Vol: 4.5%, Made in: Mexico"
    }, {
       product_id: "Beer05",
       product_name: "Holsten Premium Pilsner",
       image: "Beer05.jpg",
       price: "2.25",
       size: "500 mL can",
       description:"Alcohol/Vol: 5.0%, Made in: Germany"
    }, {
       product_id: "Beer06",
       product_name: "Gosser Beer",
       image: "Beer06.jpg",
       price: "2.10",
       size: "500 mL can",
       description:"Alcohol/Vol: 5.2%, Made in: Austria"
    }, {
       product_id: "Beer07",
       product_name: "Beck's",
       image: "Beer07.jpg",
       price: "2.80",
       size: "500 mL can",
       description:"Alcohol/Vol: 5.0%, Made in: Germany"
    }, {
       product_id: "Beer08",
       product_name: "Super Bock",
       image: "Beer08.jpg",
       price: "2.10",
       size: "330 mL bottle",
       description:"Alcohol/Vol: 5.8%, Made in: Portugal"
    }, {
       product_id: "Beer09",
       product_name: "Schneider Weisse",
       image: "Beer09.jpg",
       price: "2.95",
       size: "500 mL can",
       description:"Alcohol/Vol: 5.4%, Made in: Germany"
    }, {
       product_id: "Beer10",
       product_name: "Newcastle Brown Ale",
       image: "Beer10.jpg",
       price: "2.90",
       size: "500 mL can",
       description:"Alcohol/Vol: 4.7%, Made in: England, United Kingdom"
    }];


var cart = {};
cart.products = [];

if (localStorage && localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
} else {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function findProductId(productId) {
  var size = cart["products"].length;
  
  for (i=0; i<size; i++){
    var currentProductId = cart["products"][i]['id'];
    if ( currentProductId == productId){
      return i;
    }
  }
  return -1;
}

function addProduct(productId, quantity, name, price){

  var product = {};
  product.id = productId;
  product.quantity = quantity;
  product.name = name;
  product.price = price;

  if (localStorage && localStorage.getItem('cart')) {
    var cart = JSON.parse(localStorage.getItem('cart'));            
    var position = findProductId(productId);
    // alert("position = "+position);
    if (position < 0){
      cart.products.push(product);
    } else {
      // alert("entrei no else");
      product.quantity = parseInt(cart["products"][i]['quantity'])+parseInt(quantity);
      // alert("nova quantidade = "+product.quantity);
      cart["products"][position] = product;
      // alert("no storage = "+cart["products"][position]);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }  
}

$(document).ready(function(){

	//mobile menu
  $('#toggle-menu').click(function(){
      $(this).next().slideToggle();
  });

	var totalBeers = beerArray.length;
	var products = "";	
	// alert(totalBeers);

	//print the products
	for(i = 0; i < totalBeers; i++) {
	    products += '<article class="prodBox">' +
      	    			  '<a href="#" class="imgBlock">' +
                      '<img src="img/' + beerArray[i]['image'] + '" alt="Product" />' +
                    '</a>' +
                    '<div class="description">' +
                      '<h1 id="name_' + beerArray[i]['product_id'] + '">' + beerArray[i]['product_name'] + '</h1>' +
                      '<p>' + beerArray[i]['description'] + '</p>' +
                      '<span class="size">' + beerArray[i]['size'] + '</span>' +
                      '<span class="price">$ <span id="price_' + beerArray[i]['product_id'] + '">' + beerArray[i]['price'] + '</span></span>' +
                      '<input type="number" min="0" value="1" class="qty" id="qty_' + beerArray[i]['product_id'] + '" />' +
        	            '<a href="#" class="addProduct" id="' + beerArray[i]['product_id'] + '">Add to Cart</a>' + 
                    '</div>' +
                    '<br clear="all">' +
      	         '</article>';
	}
	$('.list').append(products);

	$('.addProduct').click(function(event) {
		var idProduct = $(this).attr('id');
    var qty = $("#qty_" + idProduct).val();
    var name = $("#name_" + idProduct).text();
    var price = $("#price_" + idProduct).text();

		addProduct(idProduct, qty, name, price);

    alert("[ " + name + " ]" + " added in shopping cart successfully!");
	});
	
}); // end ready