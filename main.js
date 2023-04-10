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


addProduct.addEventListener("click",addproductsfun)
var products = [];  

if (JSON.parse(localStorage.getItem("productsList")) != null){
    products = JSON.parse(localStorage.getItem("productsList"));
    displayProducts(products);
}



// Function Add Products
function addproductsfun (){
    if (!productName.value || !productPrice.value || !productDescription.value) {
        alert("Please Enter Fill All Fields")
    }
    else{
    var product = {
    pId    : products.length==0? 0 : products.length,    
    pname  : productName.value,
    pprice : productPrice.value,
    pdec   :productDescription.value,
    }
    products.push(product)
    localStorage.setItem("productsList", JSON.stringify(products));
    displayProducts(products);
    clearInput()
    scrolltoaddProduct()
    }
}


// Function Display Products
function displayProducts (displayproducts){
    if (displayproducts == 0){
        productContainer.innerHTML = `<img src="images/NOTFOUND.PNG" class="notfound" alt="">`;
    }
    else{
    var productdata = "";
    for(var i = 0 ; i<displayproducts.length;i++)
    {
        productdata += `
        <div class="items">
        <p>${displayproducts[i].pname}</p>
        <img src="images/iphone.jpeg" alt="">
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


// Function Edit Product



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
        displayProducts([])
    }
}
}





// Function Clear Input Fields
function clearInput () {
    productName.value = ""
    productPrice.value = ""
    productDescription.value = ""
    }


// Function Scroll To After Add Product
function scrolltoaddProduct(){
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