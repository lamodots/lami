//cart interactivivty
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//Open cart 
cartIcon.onclick = ()=>{
    cart.classList.add('active');
};
//Close cart
closeCart.onclick = ()=>{
    cart.classList.remove('active');
};
// Cart Interactivity Script
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
//Ready functon
function ready(){
   let  removeCartButtons = document.getElementsByClassName('fa-remove');
    for (let  i = 0; i < removeCartButtons.length; i++ ){
        let button = removeCartButtons[i]
        button.addEventListener('click' , removeCartItem)
    }
    // Quantity changes
    let  quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let  i = 0; i < quantityInputs.length; i++ ){
        let input = quantityInputs[i];
        input.addEventListener('change', qauntityChanged);
    }

    // Add To Cart
    let addCart = document.getElementsByClassName('fa-addcart');
    for (let  i = 0; i < addCart.length; i++ ){
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);

    }

    // Buy Button 
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
//Buy Button
function buyButtonClicked(){
    alert('Order placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Remove Item from cart function
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//Quantity change
 
function qauntityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    }
    updateTotal();
}
// Add to Cart
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title  = shopProducts.getElementsByClassName('product-title')[0].innerText;
   
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title , price , productImg);
    updateTotal();
};

function addProductToCart(title , price , productImg){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let  i = 0; i < cartItemsNames.length; i++ ){
        if(cartItemsNames[i].innerText == title){
            alert('You have already add this item to cart ');
            return;
        }
    }
   
    let cartBoxContent = `

<img src="${productImg}" alt="" class="cart-img">
<div class="details-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!--Delete cart item-->
<span class="material-icons fa-remove"">
delete
</span>
`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('fa-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', qauntityChanged);




}



//Update total

function updateTotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box'); 
    let total = 0;
    for ( let  i = 0; i < cartBoxes.length; i++ ){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
       let  quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

        let  price = parseFloat(priceElement.innerText.replace("$", ""));
        let  quantity = quantityElement.value;
        total = total + (price * quantity);

    }    
    //When price contain some cents value
            total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText="$" + total;
   
}