// variables

// box-1
var billno = document.querySelector("#billno");



var menu = document.querySelectorAll("#items .menu");
menu = Array.from(menu);

// box-2
var price = document.querySelector("#price");
var vat = document.querySelector("#vat");
var discount = document.querySelector("#discount");
var Tprice = document.querySelector("#Tprice");
var resetb = document.querySelector("#resetb");
var calculateb = document.querySelector("#calculateb");


// box-3
var rates = document.querySelectorAll("#pricing .rates");
rates = Array.from(rates);

var stocks = document.querySelectorAll("#stock .stocks");
stocks = Array.from(stocks);


// Nav-buttons
var HOMEb = document.querySelector("#HOME");
var PRICINGb = document.querySelector("#PRICING");

// Page
var page1 = document.querySelector("#page1");
var page2 = document.querySelector("#page2");

// warning 1
var warn1 = document.querySelector("#warning1");

// Payment
var online = document.querySelector("#online");
var offline = document.querySelector("#offline");
var closeB = document.querySelector(".closeB");
var payment = document.querySelector("#payment");
var paymentBox = document.querySelector("#paymentBox");
var onlineB = document.querySelector("#onlineB");
var cashB = document.querySelector("#cashB");
var cashRecived = document.querySelector("#cashRecived");
var cashReturned = document.querySelector("#cashReturned");




onlineB.addEventListener("click", function () {
    offline.style.display = "none";
    online.style.display = "block";
    closeB.style.display = "block";
})

cashB.addEventListener("click", function () {
    online.style.display = "none";
    offline.style.display = "block";
    closeB.style.display = "block";

})

closeB.addEventListener("click", function () {
    alert("Payment window will close.")
    online.style.display = "none";
    offline.style.display = "none";
    paymentBox.style.display = "none";
    stockUpdate();
    reset();
})


// Dark Mode
var nightM = document.querySelector("#nightM");
var isNight = false;
var mainNav = document.querySelector(".mainNav");
nightM.addEventListener("click", function () {

    if (isNight) {
        document.documentElement.style.setProperty('--dark-primary-color', '#040F3D');
        document.documentElement.style.setProperty('--light-primary-color', '#4BFFA5');


    }
    else {
        document.documentElement.style.setProperty('--dark-primary-color', '#4BFFA5');
        document.documentElement.style.setProperty('--light-primary-color', '#040F3D');
    }

    isNight = !isNight;

})


// Functions

function strToint(str) {

    return parseInt(str, 10);
}



function isNegative() {
    for (var i = 0; i < menu.length; i++) {
        var im = parseInt(menu[i].value, 10);
        var ir = parseInt(rates[i].value, 10);
        var is = parseInt(stocks[i].value, 10);
        var ivat = parseInt(vat.value, 10);

        if (im < 0 || ir < 0 || is < 0 || ivat < 0)
            return 1;

    }
    return 0;
}



function reset() {
    alert("You will loose your entered data.")
    bn = parseInt(billno.value, 10);
    if (price.value !== "")
        bn++;

    billno.value = bn.toString(10);

    for (var i = 0; i < menu.length; i++) {
        menu[i].value = "";
        menu[i].style.background = "#ffffff";
    }



    price.value = Tprice.value = "";

    if (isNegative()) {
        warn1.style.display = "block";
    }
    else {
        warn1.style.display = "none";

    }

    online.style.display = "none";
    offline.style.display = "none";
    paymentBox.style.display = "none";

}

function checkStock() {

    for (var i = 0; i < menu.length; i++) {

        var menu1 = strToint(menu[i].value);
        var stock1 = strToint(stocks[i].value);

        if (menu1 > stock1)
            return 1;



    }
    return 0;
}

function stockUpdate() {




    for (var i = 0; i < menu.length; i++) {
        stocks[i].value -= menu[i].value;
    }


}


function billing() {

    var sum = 0;

    if (isNegative() || checkStock()) {
        return 0;
    }

    for (var i = 0; i < menu.length; i++)
        sum += menu[i].value * rates[i].value;


    return sum;
}

function calculate() {


    var p = billing(),
        v = parseInt(vat.value, 10), d = strToint(discount.value);
    p = p * (1 - d / 100);
    p = p.toFixed(2);

    var tp = p * (1 + v / 100);
    tp = tp.toFixed(2);

    if (p !== 0) {
        price.value = p.toString(10);
        Tprice.value = tp.toString(10);
        paymentBox.style.display = "block";
        payment.style.display = "block";

    }


}

function homef() {
    page2.style.display = "none";
    page1.style.display = "block";
}



function pricingf() {
    page1.style.display = "none";
    page2.style.display = "block";

}





// Procedure


resetb.addEventListener("click", reset);
calculateb.addEventListener("click", calculate);

HOMEb.addEventListener("click", homef);

PRICINGb.addEventListener("click", pricingf);

var ipArray = [vat];
ipArray = ipArray.concat(menu, rates, stocks);

for (var i = 0; i < ipArray.length; i++) {

    ipArray[i].addEventListener("change", function () {
        var ia = parseInt(this.value, 10);
        if (ia < 0) {
            warn1.textContent = " Neagtive values have been entered in some fields!!";
            this.style.background = "#ff7070";
            warn1.style.display = "block";

        }
        else {
            warn1.style.display = "none";
            this.style.background = "#ffffff";
        }
    });
}


for (var i = 0; i < menu.length; i++) {
    menu[i].addEventListener("change", function () {

        if (checkStock()) {
            warn1.textContent = "Selected item(s) are Out Of Stock!!";
            this.style.background = "#ff7070";
            warn1.style.display = "block";
        }
        else {
            warn1.style.display = "none";
            this.style.background = "#ffffff";
        }

    })
}


cashRecived.addEventListener("change", function () {
    cashReturned.value = strToint(cashRecived.value) - strToint(Tprice.value);
})