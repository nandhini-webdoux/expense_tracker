//remove duplicates:
let numbers = [1, 2, 2, 3, 3, 4];

let unique = [...new Set(numbers)];

console.log(unique);


//max and min in an array:
let numbers1 = [12, 5, 30, 8, 2];

console.log(Math.max(...numbers1));
console.log(Math.min(...numbers1)); 


//sort numbers
let numbers2 = [40, 10, 30, 20, 5];

numbers2.sort((a, b) => a - b);

console.log(numbers2);

//even numbers in array
let numbers3 = [1, 2, 3, 4, 5, 6];

let even = numbers3.filter(num => num % 2 === 0);

console.log(even);

//calculate total using reduce
let numbers4 = [10, 20, 30, 40];

let total = numbers4.reduce((sum, num) => sum + num, 0);

console.log(total);
