//simple calculator
let price = 120;
let quantity = 3;

console.log("add:",price + quantity);
console.log("sub:",price - quantity);
console.log("mul:",price * quantity);
console.log("div:",price / quantity);
console.log("mod:",price % quantity);

//bmi calculator
h=prompt("Enter your height in meters");
w=prompt("Enter your weight in kg");
bmi=w/(h*h);
console.log("Your BMI is:",bmi);

//temperature converter
let celsius = 30;
let fahrenheit = (celsius * 9 / 5) + 32;

console.log("Celsius:", celsius);
console.log("Fahrenheit:", fahrenheit);

//simple interest calculator
let P = 1000;
let R = 5;
let T = 2;
let SI = (P * R * T) / 100;

console.log("Simple Interest:", SI);

//string operations
let name = " web development is best";

console.log("remove space:", name.trim());
console.log("length:", name.length);
console.log("uppercase:", name.toUpperCase());
console.log("lowercase:", name.toLowerCase());
console.log("replace:" , name.replace("web","app"));
console.log("substring",name.substring(0,3));
console.log("split by:",name.split(" "));

//number operations
let price1 = parseFloat("149.567");

console.log(price1.toFixed(2));
console.log(Math.round(price1));
console.log(Math.ceil(price1));
console.log(Math.floor(price1));

let randomItem = Math.floor(Math.random() * 5) + 1;

console.log(randomItem);
console.log("Price type:", typeof price1);
console.log("Is price invalid?", Number.isNaN(price1));