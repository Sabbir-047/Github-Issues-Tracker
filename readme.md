1️⃣ What is the difference between var, let, and const?
Answer: 
=======
-> Var is global variable declaration. It can be accessed through out the whole script file of js.
-> Let is scope based we can not use it outside of it's scope but if it's declared globally then we can access it throughout the whole code. 
-> const is also scope based. We can use just like let. but One simple difference which is. Const can not be reinitialized. But other two can be reinitialized. 



2️⃣ What is the spread operator (...)?
Answer:
=======
-> Spread operator is a javascript syntax which is used for expand or unpacking of an iterable (string or array) properties of an object into individuals part.
example: const copy = [...originalArray];



3️⃣ What is the difference between map(), filter(), and forEach()?
Answer:
=======
-> map, filter, forEach are array iteration method but they differ in purposes.

#map() => Returns a new array of the same length. But, it worked with each element and returns it. We use it when we have to do something with each element.
#filter() => Returns a new array which only passed the specific condition.
#forEach() => return undefined.  it executes callback function for each element. But does not transform like filter array




4️⃣ What is an arrow function?
Answer:
======
-> An arrow function is a compact or shorter version of the main function. But it does have some variations.
If we write one parameter then we don't have to return anything. But if we have more than one parameter Then must return in case of need. We can also send without parameters. 
example: const add = (a, b) => a+b; 



5️⃣ What are template literals?
Answer:
=======
-> Javascript backticks which is powerful than quotes. Allow embedding expressions ${} for dynamic update on the UI. MultiLine strings and advanced string formatting. 
example:
let name = "josim";
console.log(`Hello, ${name}!`); // Output: Hello, josim!
