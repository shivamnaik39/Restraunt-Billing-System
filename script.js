// variables

// box-1
billno = document.querySelector("#billno");
var menu = document.querySelectorAll("#items .menu");

// box-2
var price = document.querySelector("#price");
var vat = document.querySelector("#vat");
var Tprice = document.querySelector("#Tprice");
var resetb = document.querySelector("#resetb");
var calculateb = document.querySelector("#calculateb");

// box-3
var rates = document.querySelectorAll("#pricing .rates");

// Functions

function reset() {
    bn = parseInt(billno.value, 10);
    if (price.value !== "")
        bn++;

    billno.value = bn.toString(10);

    for (var i = 0; i < menu.length; i++)
        menu[i].value = "0";


    price.value = Tprice.value = "";


}


function billing() {

    var sum = 0;

    for (var i = 0; i < menu.length; i++)
        sum += menu[i].value * rates[i].value;


    return sum;
}

function calculate() {


    var p = billing(),
        v = parseInt(vat.value, 10);
    var tp = p * (1 + v / 100);
    tp = tp.toFixed(2);

    if (p !== 0) {
        price.value = p.toString(10);
        Tprice.value = tp.toString(10);
    }


}



// Procedure

resetb.addEventListener("click", reset);
calculateb.addEventListener("click", calculate);