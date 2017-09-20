/**
 * @author A2J (Andrea, Areum, Joana)
 */

var cart2 = JSON.parse(localStorage.getItem('cart'));

function getProduct(productId, quantity, name, price) {

	// //print the products
	products = '<article class="prodBoxCart" id="box_' + productId + '">' +
    			    '<ul class="cartList">' +
                    	'<li class="img"><img src="img/' + productId + '.jpg" alt="Product" /></li>' +
                    	'<li class="name">' + name + '</li>' +
						'<li class="price">$ <span id="price_' + productId + '">' + price + '</span></li>' +
						'<li class="qty">' + quantity + '</li>' +
						// '<li><a href="#" class="addProduct" id="' + productId + '">Update</a></li>' + 
						'<li class="del"><a href="#" class="delProduct" id="' + productId + '">X</a></li>' +
                    '</ul>' +
      	         '</article>';
	$('.list').append(products);

}

function totalProducts() {
	var size = cart2["products"].length;
	var total = 0.0;
	
	for (i=0; i<size; i++){
		// alert("quantity = "+parseInt(cart2["products"][i]['quantity']));
		// alert("value = "+parseInt(cart2["products"][i]['price']))
		total += parseFloat(cart2["products"][i]['quantity'])*parseFloat(cart2["products"][i]['price']);
		// alert(total);
		}
	return total;
}

function delProductId(productId) {
	var size = cart2["products"].length;
	
	for (i=0; i<size; i++){
		var currentProductId = cart2["products"][i]['id'];
		if ( currentProductId == productId){
			cart2["products"].splice(i, 1);
			localStorage.setItem('cart', JSON.stringify(cart2));

			return;
		}
	}
}

function clearCart(){
    localStorage.clear();
}

$(document).ready(function(){

	//mobile menu
	$('#toggle-menu').click(function(){
	  $(this).next().slideToggle();
	});
	  
	for(i=0; i<cart2["products"].length; i++) {
		// alert(cart2["products"][i]['id'] + " teste");
		getProduct(cart2["products"][i]['id'], cart2["products"][i]['quantity'], cart2["products"][i]['name'], cart2["products"][i]['price']);
	}

	$('.delProduct').click(function(event) {
		// localStorage.removeItem(idProduct);   
        var r = confirm("Are you sure you would like to delete this order?");
        if (r == true) {
            var productId = $(this).attr('id');
            delProductId(productId);

            //remove product from the view
            $('#box_' + productId).remove();

            //update the total value
            var totalPrice = totalProducts();
			$('#total').text('TOTAL $ ' + totalPrice);
        } else {
            return;
        }
	});

	$('#finalize').click(function(event) {
		//clear the localstorage
        clearCart();

		//remove everything from the view
        $('#main').empty();

        //add the final text
        $('#main').html('<div class="final"><p>Order placed.</p><p>Thanks for visiting our site!</p></div>');
	});

	var totalPrice = totalProducts();
	$('#total').text('TOTAL $ ' + totalPrice);

}); // end ready