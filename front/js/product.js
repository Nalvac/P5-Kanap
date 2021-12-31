let url = "http://localhost:3000/api/products" 
let params = new URL (document.location).searchParams;
let id = params.get("id");

let img = document.createElement("img");

document.querySelector("div.item__img").appendChild(img);



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
    console.log(responseAPI);
}).catch(function(error){
    console.log(error);
})