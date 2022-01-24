
let panier = JSON.parse(localStorage.getItem("panier")); 

let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let NameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

function main (){
    displayCart ();
    displayTotal ();
    deleteProductRoCart();
    modifyQtt();
    getForm();
    postForm();
 
}
// Fonction permettant d'affichier les produits ajoutés au panier
function displayCart (){
    // Si le panier est vide on affiche un message 
    if (panier == null || panier == 0){
        let cartSelect = document.querySelector("#cart__items");
        let p = document.createElement("p");
        cartSelect.appendChild(p);
        p.innerText="Votre panier est vide";
        //Si non on affiche les produits ajoutés au panier
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
        //Grâce à l'id su storage on effectue une requête afin de récupérer ses produits.
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

        // Mise en place du dom pour l'affiche du panier

        divCartItemImag.classList.add("cart__item__img");
        article.appendChild(divCartItemImag);
        let divCart__item__content = document.createElement("div");
        divCart__item__content.classList.add("divCart__item__content");
        article.appendChild(divCart__item__content);
        let divCart__item__content__description = document.createElement("div");
        //Description produit
        divCart__item__content__description.classList.add("cart__item__content__description");
        divCart__item__content.appendChild(divCart__item__content__description);
        let h2= document.createElement("h2");
        let p_color= document.createElement("p");
        let p_price= document.createElement("p");

        //Nom du produit
        h2.textContent = panier[i].name;

        //Prix et couleur du produit
        p_color.textContent = panier[i].color;
        p_price.textContent = panier[i].price + " €";
        divCart__item__content__description.appendChild(h2);
        divCart__item__content__description.appendChild(p_color);
        divCart__item__content__description.appendChild(p_price);
        let divCart__item__content__settings = document.createElement("div");
        divCart__item__content__settings.classList.add("cart__item__content__settings");
        divCart__item__content.appendChild(divCart__item__content__settings);
        let divCart__item__content__settings__quantity = document.createElement("div");

        // Input pour la quantité
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

        

        //Boutton supprimer
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

// Fonction d'affichage de la quatité total ainsi que le prix total du panier

function displayTotal (){
    let quantity_total= 0;
    let price_total = 0;
    // On fait la somme des quantité de produit ainsi que montant total du panier
    for (let i in panier){
         quantity_total += parseFloat( panier[i].quantity);
         price_total +=  parseFloat(panier[i].price * panier[i].quantity);
    }
    // Affichage des totaux
    document.getElementById("totalQuantity").textContent = quantity_total;
    document.getElementById("totalPrice").textContent= price_total;

}
// Fonction pour la suppression d'un produit du panier
function  deleteProductRoCart() {
    //On recupère tout les elmts ayant la class .deleteItem (bouttons)
    let buttonDelete = document.querySelectorAll(".deleteItem");
   //On recupère tout les elmts ayant la class .cart__item (Produits)
    let articleSelector = document.querySelectorAll(".cart__item");

    //Grâce à cette boucle nous plaçons un ecouteur sur toute les bouttons supprimer du panier
    for (let i =  0 ; i < buttonDelete.length ; i++){
        //lorsqu'un boutton est appuyé 
        buttonDelete[i].addEventListener('click', function(e){
            e.preventDefault();
            //On récupère son id et sa couleur
            let idDelete = panier[i]._id;
            let colorDelete = panier[i].color;
            //On filtre le panier en supprimant du storage le produit ayant cet id et cette couleur
            panier = panier.filter( element => element._id !== idDelete || element.color !== colorDelete );
            localStorage.setItem("panier", JSON.stringify(panier));
            //Si on le supprime du DOM
            articleSelector[i].remove();
            //On fait une mise à jour des totaux
            displayTotal();
            //On recharge la pgae
            location.reload();
            })

    }
    
}
// Fonction de modification de la quantité du produit
function modifyQtt() {
    //On récup
    let qttModif = document.querySelectorAll("input[min]");
    let articleSelector = document.querySelectorAll(".cart__item");
    panier = JSON.parse(localStorage.getItem("panier"));
    for (let i = 0; i< qttModif.length; i++){
        console.log("hkjhg");
        qttModif[i].addEventListener("change" , function(e)  {
            e.preventDefault();
            //Selection de l'element à modifier en fonction de son id ET sa couleur


            if ( qttModif[i].valueAsNumber == 0){
                panier = panier.filter( element => element._id !==  panier[i]._id || element.color !== panier[i].color );
                localStorage.setItem("panier", JSON.stringify(panier));
                articleSelector[i].remove();
            }else{
                console.log("hkjhg");
                panier[i].quantity =  qttModif[i].valueAsNumber;
                console.log(panier[i].quantity);
                localStorage.setItem("panier",JSON.stringify(panier));
            }
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
        const buttonCommande = document.getElementById("order");
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }


function postForm(){
        const buttonCommande = document.getElementById("order");
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');
        buttonCommande.addEventListener('click', function(e){
            //e.stopPropagation();
        e.preventDefault();
            if(NameRegExp.test(inputName.value) && NameRegExp.test(inputLastName.value) && addressRegExp.test(inputAdress.value) &&
            NameRegExp.test(inputCity.value) &&  emailRegExp.test(inputMail.value)){ 

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
                console.log(NameRegExp.test(inputName.value));

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
            }
        })

}
main();