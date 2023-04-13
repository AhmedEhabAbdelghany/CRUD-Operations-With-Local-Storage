/////////////////////////////////////////////////////////////////////////////// Dark Mode And Light Mode //////////////////////////////////////////////////////////////////////
var darkMode  =  document.getElementById("dmode");
var lightMode =  document.getElementById("lmode");
var text      =  document.getElementsByClassName("text");
var footer    =  document.getElementById("footer");

// Dark Mode
darkMode.addEventListener("click",function(){
        document.body.classList.add("dark-mode")
        darkMode.style.display  = "none";
        lightMode.style.display = "inline";
        footer.style.borderTop     = "2px solid white"
        productImg.style.color = "black"
})
//Light Mode
lightMode.addEventListener("click",function(){
    document.body.classList.remove("dark-mode")
    lightMode.style.display = "none";
    darkMode.style.display = "inline";
})




/////////////////////////////////////////////////////////////////////////////// Crud Operations ///////////////////////////////////////////////////////////////////////////////
// Variables And Event Click 
var productName        =   document.getElementById("productname");
var productPrice       =   document.getElementById("productprice");
var productDescription =   document.getElementById("productdescription");
var addProduct         =   document.getElementById("addproduct");
var productContainer   =   document.getElementById("outputcontent");
var searchinput        =   document.getElementById("search")
var updateproductbtn   =   document.getElementById("updateproduct")
var errorfill          =   document.getElementById("errorfill")
var productImg         =   document.getElementById("img");


addProduct.addEventListener("click",addproductsfun)
var products = [];  

if (JSON.parse(localStorage.getItem("productsList")) != null){
    products = JSON.parse(localStorage.getItem("productsList"));
    displayProducts(products);
}



// Function Add Products
function addproductsfun (){
    if (!productName.value || !productPrice.value || !productDescription.value || !productImg.value) {
        scrolltoeditProduct();
        errorfill.style.display = "block"
    }
    else{
    errorfill.style.display = "none"
    var img = productImg.files[0];
    var pname = productName.value;
    var pprice = productPrice.value;
    var pdec = productDescription.value;
    const fr = new FileReader();
    fr.readAsDataURL(img);
    fr.addEventListener("load", () => {
      var ImgSrc = fr.result;
      var product = {
        pId    : products.length==0? 0 : products.length,    
        pname  ,
        pprice ,
        pdec  ,
        img: ImgSrc,
        }
        products.push(product)
        console.log(product)
        console.log(products)
        localStorage.setItem("productsList", JSON.stringify(products));
        displayProducts(products);
    });
    clearInput()
    scrollafteraddProduct()
    }
}


// Function Display Products
function displayProducts (displayproducts){
    if(displayproducts == 0){
        productContainer.innerHTML = `<img src="images/noitemsfound.png" class="emptycart" alt="">`;
    }
    else{
    var productdata = "";
    for(var i = 0 ; i<displayproducts.length;i++)
    {
        productdata += `
        <div class="items">
        <p>${displayproducts[i].pname}</p>
        <img  src="${displayproducts[i].img}" alt="">
        <p><b>PRICE :</b> ${displayproducts[i].pprice}</p>
        <p><b>PRODUCT DESCRIPTION :</b></p><p> ${displayproducts[i].pdec} </p>
        <button class="editproduct"  onclick="updateproduct(${displayproducts[i].pId})" > Edit </button>
        <button class="deleteproduct" onclick="deletetheproduct(${displayproducts[i].pId})" > Delete </button> 
        </div>
        `
    }
    productContainer.innerHTML = productdata;
    }
}




// Function Delete Product
function deletetheproduct(id){
    var pindex = products.findIndex(function(product){
        return product.pId == id
    })
    products.splice(pindex,1);
    localStorage.setItem("productsList",JSON.stringify(products))
    displayProducts(products)
}





// Function Update Product
var pId;
function updateproduct(id){
    pId=id;
    filterProducts = products.filter(function(item){
        return item.pId == id;
    })
    productName.value        = filterProducts[0].pname
    productPrice.value       = filterProducts[0].pprice
    productDescription.value = filterProducts[0].pdec
    updateproductbtn.style.display = "block"
    addProduct.style.display = "none"
    scrolltoeditProduct()
    errorfill.style.display = "none"
}

//Submit Edit Product Information Related To Function Update Product
updateproductbtn.addEventListener("click",submiteditproduct)
function submiteditproduct(){
    if (!productName.value || !productPrice.value || !productDescription.value  || !productImg.value) {
        errorfill.style.display = "block"
        scrolltoeditProduct()
    }
    else{
    errorfill.style.display = "none"
    updateproductbtn.style.display = "none"
    var newImg = productImg.files[0];
    var pname = productName.value;
    var pprice = productPrice.value;
    var pdec = productDescription.value;
    const fr = new FileReader();
    fr.readAsDataURL(newImg);
    fr.addEventListener("load", () => {
      var ImgSrc = fr.result;
      var updatedproducts = {
        pId    : pId,    
        pname  ,
        pprice ,
        pdec  ,
        img: ImgSrc,
        }
        products[pId] = updatedproducts
        localStorage.setItem("productsList", JSON.stringify(products));
        displayProducts(products);
    });
    addProduct.style.display = "block"
    clearInput()
    scrollafteraddProduct()
    }
}




// Function Search for a Product
searchinput.addEventListener("keyup",sarching)
function sarching(){
var searchword = searchinput.value
var searchresult = [];
for(var i = 0 ; i<products.length; i++){
    if(products[i].pname.toLowerCase().includes(searchword.toLowerCase())){
        searchresult.push(products[i])
        displayProducts(searchresult)
    }
    else if(searchresult.length == 0){
        productContainer.innerHTML = `<img src="images/processing20200909-15779-7m3bwn.png" class="notfound" alt="">`;
    }
}
}





// Function Clear Input Fields
function clearInput() {
    productName.value = ""
    productPrice.value = ""
    productDescription.value = ""
    }


// Function Scroll To After Add Product
function scrollafteraddProduct(){
    window.scrollTo(0, document.body.scrollHeight);
}


// Function Scroll To After Edit Product
function scrolltoeditProduct(){
    scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
}