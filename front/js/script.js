

function main (){
    getProduct();
}

// Fonction de rcupération et d'affichage des produits 
function getProduct(){
    let url = "http://localhost:3000/api/products" ;

    fetch(url).then( function(res){
        if(res.ok){
            return res.json();
        }
    }).then(function (products){
        console.log(products);
        
        // Pour chaque produit du back je mets en places les éléments du DOM
        for( let product of products){
        
           let productLink = document.createElement("a");
           let article  = document.createElement("article");
           let img = document.createElement("img");
           let h3 = document.createElement("h3");
           let p = document.createElement("p");

            document.getElementById("items").appendChild(productLink);
            productLink.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            // Lien de redirection vers la page de produit
            productLink.href =`./product.html?id=${product._id}`;

            //Mise à jours des attributs de l'image
            img.src =`${product.imageUrl}`;
            img.alt = `${product.altTxt}`;

            h3.classList.add("productName");
            h3.textContent = `${product.name}`;
            p.classList.add("productDescription");
            p.textContent = `${product.description}`

        }
    }).catch(function(err){
        console.error()
    });

}
main();