
let panier = JSON.parse(localStorage.getItem("panier")); 
let cartSelect = document.getElementById("cart__items");
main();

function main (){
console.log(panier)
    displayCart ();
    displayTotal ()

}

function displayCart (){

    for (let i in panier){
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", `${panier[i]._id}`);
        article.setAttribute("data-color", `${panier[i].color}`);
        cartSelect.appendChild(article);
        let divCartItemImag = document.createElement("div");
        divCartItemImag.classList.add("cart__item__img");
        let img = document.createElement("img");
        article.appendChild(divCartItemImag);
        console.log(article.innerHTML);
        fetch(`http://localhost:3000/api/products/${panier[i]._id}`).then(function(res){

            if (res.ok){
                return res.json();
            }
    
        }).then(function(reponse){
            console.log(reponse);
            img.src = reponse.imageUrl;
            img.alt = reponse.altTxt;
            console.log(reponse.imageUrl)
            
            divCartItemImag.appendChild(img);
            console.log(article.innerHTML);
        }).catch(function(err){
            console.log(err)
        })
        divCartItemImag.classList.add("cart__item__img");
        article.appendChild(divCartItemImag);
        let divCart__item__content = document.createElement("div");
        divCart__item__content.classList.add("divCart__item__content");
        article.appendChild(divCart__item__content);
        let divCart__item__content__description = document.createElement("div");
        divCart__item__content__description.classList.add("cart__item__content__description");
        divCart__item__content.appendChild(divCart__item__content__description);
        let h2= document.createElement("h2");
        let p_color= document.createElement("p");
        let p_price= document.createElement("p");
        h2.textContent = panier[i].name;
        p_color.textContent = panier[i].color;
        p_price.textContent = panier[i].price + " €";
        divCart__item__content__description.appendChild(h2);
        divCart__item__content__description.appendChild(p_color);
        divCart__item__content__description.appendChild(p_price);
        let divCart__item__content__settings = document.createElement("div");
        divCart__item__content__settings.classList.add("cart__item__content__settings");
        divCart__item__content.appendChild(divCart__item__content__settings);
        let divCart__item__content__settings__quantity = document.createElement("div");
        divCart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
        divCart__item__content__settings.appendChild(divCart__item__content__settings__quantity);
        let p_quantity = document.createElement("p");
        p_quantity.textContent = "Qté : " ;
        let inputNumber = document.createElement("input");
        inputNumber.setAttribute("type", "number");
        inputNumber.setAttribute("name", "itemQuantity");
        inputNumber.setAttribute("min", "1");
        inputNumber.setAttribute("max", "100");
        inputNumber.setAttribute("value", `${panier[i].quantity}`);
        divCart__item__content__settings__quantity.appendChild(p_quantity);
        divCart__item__content__settings__quantity.appendChild(inputNumber);

        let divCart__item__content__settings__delete = document.createElement("div");
        divCart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
        divCart__item__content__settings.appendChild(divCart__item__content__settings__delete);
        let p_delete = document.createElement("p");
        p_delete.classList.add("cart__item__content__settings__delete");
        p_delete.textContent = "Supprimer"
        divCart__item__content__settings__delete.appendChild(p_delete);

    }


}

function displayTotal (){
    let quantity_total= 0;
    let price_total = 0;
    for (let i in panier){
         quantity_total += panier[i].quantity;
         price_total +=  panier[i].price
    }
    document.getElementById("totalQuantity").textContent = quantity_total
    document.getElementById("totalPrice").textContent= price_total

}