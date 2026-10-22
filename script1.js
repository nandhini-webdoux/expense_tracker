//star pattern
for (let i = 1; i <= 4; i++) {
    let row = "";

    for (let j = 1; j <= i; j++) {
        row += "* ";
    }

    console.log(row);
}

//number pattern
for (let i = 1; i <= 4; i++) {
    let row = "";

    for (let j = 1; j <= i; j++) {
        row += j + " ";
    }

    console.log(row);
}

//pyramid pattern
let rows = 4;

for (let i = 1; i <= rows; i++) {
    let row = "";

    for (let j = 1; j <= rows - i; j++) {
        row += " ";
    }

    for (let k = 1; k <= 2 * i - 1; k++) {
        row += "*";
    }

    console.log(row);
}

//even or odd
let num = 8;

if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

//prime number
let num1= 7;
let isPrime = num1 > 1;

for (let i = 2; i <= Math.sqrt(num1) && isPrime; i++) {
    if (num1 % i === 0) {
        isPrime = false;
    }
}

console.log(isPrime ? "Prime" : "Not prime");

//factorial
let num2 = 5;
let factorial = 1;

for (let i = 1; i <= num2; i++) {
    factorial *= i;
}

console.log("Factorial:", factorial);

//fibonacci series
let a = 0;
let b = 1;

for (let i = 1; i <= 7; i++) {
    console.log(a);

    let next = a + b;
    a = b;
    b = next;
}

//palindrome number
let num3 = 121;
let original = num3;
let reverse = 0;

while (num3 > 0) {
    let digit = num3 % 10;
    reverse = reverse * 10 + digit;
    num3 = Math.floor(num3 / 10);
}

console.log(original === reverse ? "Palindrome" : "Not palindrome");

//armstrong number
let num4 = 153;
let digits = String(num4).length;
let temp = num4;
let sum = 0;

while (temp > 0) {
    let digit = temp % 10;
    sum += digit ** digits;
    temp = Math.floor(temp / 10);
}

console.log(sum === num4 ? "Armstrong" : "Not Armstrong");

//sum of digits
let num5 = 1234;
let sum1 = 0;

while (num5 > 0) {
    sum1 += num5 % 10;
    num5 = Math.floor(num5 / 10);
}

console.log("Sum of digits:", sum1);

//reverse a number
let num6 = 1234;
let reverse1 = 0;

while (num6 > 0) {
    let digit = num6 % 10;
    reverse1 = reverse1 * 10 + digit;
    num6 = Math.floor(num6 / 10);
}

console.log("Reverse:", reverse1);

//fizzbuzz
for (let i = 1; i <= 15; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

//grade calculator
let marks = 85;

if (marks < 0 || marks > 100) {
    console.log("Invalid marks");
} else if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 75) {
    console.log("Grade B");
} else if (marks >= 50) {
    console.log("Grade C");
} else {
    console.log("Fail");
}

//multiplication table
let num7 = 5;

for (let i = 1; i <= 10; i++) {
    console.log(num7 + " x " + i + " = " + (num7 * i));
}