let url = "http://localhost:3000/api/products" 
let params = new URL (document.location).searchParams;
let id = params.get("id");

let img = document.createElement("img");

document.querySelector("div.item__img").appendChild(img);



function main (){
    getProduct();
    addToCart ();/// dans get Product
}


function getProduct(){

    fetch(`http://localhost:3000/api/products/${id}`).then(function(res){

        if (res.ok){
            return res.json();
        }

    }).then(function (responseAPI){
        img.src = responseAPI.imageUrl;
        document.getElementById("title").textContent = responseAPI.name;
        document.getElementById("price").textContent = responseAPI.price;
        document.getElementById("description").textContent = responseAPI.description;



        for (colors of responseAPI.colors){
            
            let option = document.createElement("option");    
            document.getElementById("colors").appendChild(option);
            option.value = colors;
            option.textContent = colors;
        }
    }).catch(function(error){
        console.log(error);
    })
}

function addToCart(){
    const addToCartButton = document.getElementById("addToCart");

    console.log("1")
    addToCartButton.addEventListener("click", function(){ 
    
    const productTitle = document.getElementById("title").innerHTML;
    const productPrice = document.getElementById("price").innerHTML;   
    const productQuantity = document.getElementById("quantity").value;
    const productColors = document.getElementById("colors").value;
        if (productQuantity > 0 && productQuantity < 100  && productColors !=""){ 
            console.log("3")
            let productAddToCart = {
                name: productTitle ,
                price: parseFloat(productPrice),
                quantity: parseFloat(productQuantity),
                color :  productColors,
                _id: id,
            }
            console.log(productAddToCart.color);
            let arrayProductsInCart = [];
      
            // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
            if (localStorage.getItem("panier") !== null) {
              arrayProductsInCart = JSON.parse(localStorage.getItem("panier"));

              const getProduct = arrayProductsInCart.find((element)=> element._id === productAddToCart._id && element.color === productAddToCart.color);
                if(getProduct){
                    getProduct.quantity += productAddToCart.quantity;
                    localStorage.setItem("panier", JSON.stringify(arrayProductsInCart));
                    console.log(arrayProductsInCart);
                    console.log("return");
                    return;
            
                }
                
                arrayProductsInCart.push(productAddToCart);
                localStorage.setItem("panier", JSON.stringify(arrayProductsInCart));
                console.log(arrayProductsInCart);
            }else{
                const cart = [];
                cart.push(productAddToCart);
                localStorage.setItem("panier", JSON.stringify(cart));
                console.log(cart);
            }
            

        }else{
            
        }
    })
}
main();