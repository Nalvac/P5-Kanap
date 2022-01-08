
let panier = JSON.parse(localStorage.getItem("panier")); 


function main (){
    displayCart ();
    displayTotal ();
    deleteProductRoCart();
    modifyQtt();
    getForm();
    postForm();
 
}

function displayCart (){
    if (panier == null || panier == 0){
        
    }else{

            for (let i in panier){

        
         let cartSelect = document.querySelector("#cart__items");
        let article = document.createElement("article");
        cartSelect.appendChild(article);
        article.classList.add("cart__item");
        article.setAttribute("data-id", `${panier[i]._id}`);
        article.setAttribute("data-color", `${panier[i].color}`);
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
        p_delete.classList.add("deleteItem");
        p_delete.textContent = "Supprimer"
        divCart__item__content__settings__delete.appendChild(p_delete);

    }
    }




}

function displayTotal (){
    let quantity_total= 0;
    let price_total = 0;
    for (let i in panier){
         quantity_total += parseFloat( panier[i].quantity);
         price_total +=  parseFloat(panier[i].price * panier[i].quantity);
    }
    document.getElementById("totalQuantity").textContent = quantity_total;
    document.getElementById("totalPrice").textContent= price_total;

}
function  deleteProductRoCart() {
    
    let buttonDelete = document.querySelectorAll(".deleteItem");
    let articleSelector = document.querySelectorAll(".cart__item");
    for (let i =  0 ; i < buttonDelete.length ; i++){

        buttonDelete[i].addEventListener('click', function(e){
            e.preventDefault();
            let idDelete = panier[i]._id;
            let colorDelete = panier[i].color;

            panier = panier.filter( element => element._id !== idDelete || element.color !== colorDelete );
            localStorage.setItem("panier", JSON.stringify(panier));

            articleSelector[i].remove();
            displayTotal();
            location.reload();
            })

    }
    
}
function modifyQtt() {
    let qttModif = document.querySelectorAll("input[min]");
    panier = JSON.parse(localStorage.getItem("panier"));
    for (let i = 0; i< qttModif.length; i++){
        console.log("hkjhg");
        qttModif[i].addEventListener("change" , function(e)  {
            e.preventDefault();
            //Selection de l'element à modifier en fonction de son id ET sa couleur

            console.log("hkjhg");
            panier[i].quantity =  qttModif[i].valueAsNumber;
            console.log(panier[i].quantity);
            localStorage.setItem("panier",JSON.stringify(panier));
           
             displayTotal();
            // refresh rapide
            location.reload();
        })
    }
}
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let NameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    })

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (NameRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (NameRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (NameRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }


function postForm(){
        const buttonCommande = document.getElementById("order");

        buttonCommande.addEventListener('click', function(e){
            //e.stopPropagation();
        e.preventDefault();
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');
            console.log('bonjour');
        //Construction d'un array depuis le local storage
        let Products = [];
        for (let i = 0; i<panier.length;i++) {
            Products.push(panier[i]._id);
        }
        console.log(Products);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: Products,
        } 
        console.log(order);

        const options = {
            method : 'POST',
            body : JSON.stringify(order),
            headers :{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            
        };

        fetch("http://localhost:3000/api/products/order", options).then(function(res){
            if(res.ok){
                return res.json();
            }
        }).then(function(data){
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            document.location.href = "confirmation.html";
        }).catch((e)=>{
            console.log(e);
        })
        })

}
main();