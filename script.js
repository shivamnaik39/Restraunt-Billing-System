// variables

// box-1
var billno = document.querySelector("#billno");
var ff = document.querySelector("#ff");
var brg = document.querySelector("#brg");
var pz = document.querySelector("#pz");
var sd = document.querySelector("#sd");

// box-2
var price = document.querySelector("#price");
var vat = document.querySelector("#vat");
var Tprice = document.querySelector("#Tprice");
var resetb = document.querySelector("#resetb");
var calculateb = document.querySelector("#calculateb");



// box-3
var ffp = document.querySelector("#ffp");
var brgp = document.querySelector("#brgp");
var pzp = document.querySelector("#pzp");
var sdp = document.querySelector("#sdp");


// Functions

function reset() {
    bn = parseInt(billno.value, 10);
    if (price.value !== "")
        bn++;

    billno.value = bn.toString(10);

    ff.value = brg.value = pz.value = sd.value = "0";
    price.value = Tprice.value = "";





}


function billing() {

    var sum = 0;
    var serving = [ff.value, brg.value, pz.value, sd.value];
    var pricing = [ffp.value, brgp.value, pzp.value, sdp.value];

    for (var i = 0; i < serving.length; i++)
        sum = sum + parseInt(serving[i], 10) * parseInt(pricing[i], 10);

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