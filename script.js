// variables
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const instructions = document.getElementById("instructions");
const instructionsButton = document.getElementById("instructions-button");
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const questionContainer = document.getElementById("questions-container");
const questionImg = document.getElementById("question-img");
const answerButtonsElement = document.getElementById("answer-buttons");
const finalScreen = document.getElementById("final-screen");
const restartButton = document.getElementById("restart-button");
var screenPoints = document.getElementById("points");
const finalPoints = document.getElementById("final-points");
const explanation = document.getElementById("explantion");
const explanationP = document.getElementById("explanation-p");
const nextButton = document.getElementById("next-button");

let questionPosition, currentQuestionIndex;

// event listeners
startButton.addEventListener("click", start);
restartButton.addEventListener("click", start);
instructionsButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", setNextQuestion);

//Start screen
function start() {
  finalScreen.classList.add("hide");
  screenPoints.classList.add("hide");
  instructions.classList.remove("hide");
  startScreen.classList.add("hide");
}
//Start quiz
function startQuiz() {
  questionContainer.classList.remove("hide");
  instructions.classList.add("hide");
  explanation.classList.add("hide");
  questionPosition = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  numberQuestion = 1;
  points = 0;

  setNextQuestion();
}

// next question
function setNextQuestion() {
  resetState();
  showQuestion(questionPosition[currentQuestionIndex]);
  explanation.innerText = "";
  explanation.classList.add("hide");
}

// show question
function showQuestion(question) {
  screenPoints.classList.remove("hide");
  screenPoints.innerText =
    "Points: " + points + " / " + questionPosition.length;
  questionImg.src = question.img;

  // show answers
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// select answer
function selectAnswer(e) {
  const clickedButton = e.target;
  const correctAnswer = clickedButton.dataset.correct;

  // prevent user from answering twice
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.removeEventListener("click", selectAnswer);
  });

  if (correctAnswer) {
    clickedButton.classList.add("correct");
    points = points + 1;
    explanation.innerText = "Correct!";
    explanation.style.color = "rgb(28, 236, 28)";
    stylesMaker();

    currentQuestionIndex++;
    numberQuestion++;
  } else {
    // make correct button green
    const correctButton = document.querySelector(`button[data-correct="true"]`);
    correctButton.classList.add("correct");
    clickedButton.classList.add("wrong");

    // prevent showing points less than 0
    if (points < 0) {
      points = 0;
    }

    explanation.innerText = "Wrong!";
    explanation.style.color = "red";
    stylesMaker();

    currentQuestionIndex++;
    numberQuestion++;
  }

  lastQuestion();
}

function lastQuestion() {
  screenPoints.innerText =
    "Points: " + points + " / " + questionPosition.length;
  if (questionPosition.length <= currentQuestionIndex) {
    questionContainer.classList.add("hide");
    finalScreen.classList.remove("hide");
    screenPoints.classList.add("hide");
    finalPoints.innerText =
      "You got: " + points + " Points out of " + questionPosition.length;
  }
}

function stylesMaker() {
  explanation.classList.remove("hide");
  document.createElement("p");
  explanationP.innerText = questions[currentQuestionIndex].explanation;
  explanationP.style.color = "black";
  explanationP.style.fontFamily = "Montserrat";
  explanation.appendChild(explanationP);
}

// reset state
function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// questions
const questions = [
  {
    img: "code1.jpg",
    answers: [
      { text: "undefined", correct: false },
      { text: "NaN", correct: false },
      { text: "true", correct: true },
      { text: "false", correct: false },
    ],
    explanation: `'We get true in the console. The tricky part is when we create an object from the constructor function Name but we DO NOT USE new keywork. That makes the variable a global one and get the value "Vuong". Remember that it is actually a property of the global object window (in the browser) or global in the nodejs
        We then get a.length ~ 5 and window.a.length ~ 5 which return 0. !0 returns true.'`,
  },
  {
    img: "code2.jpg",
    answers: [
      { text: "true", correct: true },
      { text: "1", correct: false },
      { text: "-1", correct: false },
      { text: "false", correct: false },
    ],
    explanation: `The spread operator ...x might help us obtain the parameter in the function in the form of array. Yet, in Javascript the typeof array return "object" rather than "array". It is totally odd if you are coming from PHP.

        That is said, we now have the length of the string object which returns 6. z.y() simply returns the length of the string 'freetut' (7).`,
  },

  {
    img: "code3.jpg",
    answers: [
      { text: "true true true true;", correct: false },
      { text: "false false false false;", correct: false },
      { text: " true true false false;", correct: false },
      { text: "false false true true;", correct: true },
    ],
    explanation: `Technically, x and y have the same value. Both are empty objects. However, we do not use the value to compare objects.
    
    z is x are two objects referring to the same memory position. In JavaScript, array and object are passed by reference. x and z therefore return true when being compared.`,
  },

  {
    img: "code5.jpg",
    answers: [
      { text: "true true true", correct: false },
      { text: "false false false", correct: false },
      { text: "true true false", correct: true },
      { text: "false false true", correct: false },
    ],
    explanation: `In JavaScript, all objects interact by reference when setting them equal to each other.
      First, variable c holds a value to an object. Later, we assign d with the same reference that c has to the object. When you change one object, you change all of them.`,
  },

  {
    img: "code6.jpg",
    answers: [
      { text: "true true true", correct: false },
      { text: "true true false", correct: true },
      { text: "false false false", correct: false },
      { text: "true false true", correct: false },
    ],
    explanation: `There are a couple concepts at play here. First, the array sort method sorts your original array and also returns a reference to that array. This means that when you write arr2.sort(), the arr2 array object is sorted.
      It turns out, however, the sort order of the array doesn't matter when you're comparing objects. Since arr1.sort() and arr1 point to the same object in memory, the first equality test returns true. This holds true for the second comparison as well: arr2.sort() and arr2 point to the same object in memory. 
      In the third test, the sort order of arr1.sort() and arr2.sort() are the same; however, they still point to different objects in memory. Therefore, the third test evaluates to false.`,
  },

  {
    img: "code7.jpg",
    answers: [
      { text: "You have 1 notification", correct: false },
      { text: "You have 1 notifications", correct: false },
      { text: "Something else", correct: true },
      { text: "TypeError", correct: false },
    ],
    explanation: `Short-circuit evaluation will not work as intended here: notifications !== 1 && 's' evaluates to false, meaning we will actually be logging You have 1 notificationfalse. If we want our snippet to work correctly, we could consider the ternary operator
    `,
  },

  {
    img: "code8.jpg",
    answers: [
      { text: `[{ firstName: "James" }]`, correct: false },
      { text: `[{ firstName: "Jonah" }]`, correct: true },
      { text: `Something else`, correct: false },
      { text: "undefined", correct: false },
    ],
    explanation: `Spread creates a shallow copy of the array, meaning the object contained in arr2 is still pointing to the same object in memory that the arr1 object is pointing to. So, changing the firstName property of the object in one array will be reflected by the object in the other array changing as well.`,
  },

  {
    img: "code9.jpg",
    answers: [
      { text: "Hello world", correct: false },
      { text: "ello world", correct: false },
      { text: "H", correct: false },
      { text: "d", correct: true },
    ],
    explanation: `The first time we call the function, str.length is greater than 1 ("Hello World" is 11 characters), so we return the same function called on str.slice(1), which is the string "ello World". We repeat this process until the string is only one character long: the character "d", which gets returned to the initial call of myFunc. We then log that character.`,
  },

  {
    img: "code10.jpg",
    answers: [
      { text: `{ name: "Lydia" }, { age: 21 }`, correct: false },
      { text: `name, age`, correct: true },
      { text: `"Lydia", 21`, correct: false },
      { text: `"[name, "Lydia"], [age, 21]"`, correct: false },
    ],
    explanation: `With a for-in loop, we can iterate through object keys, in this case name and age. Under the hood, object keys are strings (if they're not a Symbol). On every loop, we set the value of item equal to the current key it’s iterating over. First, item is equal to name, and gets logged. Then, item is equal to age, which gets logged.`,
  },

  {
    img: "code11.jpg",
    answers: [
      { text: `"345"`, correct: false },
      { text: `"75!"`, correct: true },
      { text: "12", correct: false },
      { text: `"12"`, correct: false },
    ],
    explanation: `3 + 4 gets evaluated first. This results in the number 7.
      7 + '5' results in "75" because of coercion. JavaScript converts the number 7 into a string, see question 15. We can concatenate two strings using the +operator. "7" + "5" results in "75".`,
  },

  {
    img: "code12.jpg",
    answers: [
      { text: `[1, 1, 2, 3, 4]`, correct: false },
      { text: `[1, 2, 3, 4]`, correct: false },
      { text: `{1, 1, 2, 3, 4}`, correct: false },
      { text: `{1, 2, 3, 4}`, correct: true },
    ],
    explanation: `The Set object is a collection of unique values: a value can only occur once in a set. We passed the iterable [1, 1, 2, 3, 4] with a duplicate value 1. Since we cannot have two of the same values in a set, one of them is removed. This results in {1, 2, 3, 4}.`,
  },

  {
    img: "code13.jpg",
    answers: [
      { text: "[[1, 2, 3, 4, 5]]", correct: false },
      { text: "[1, 2, 3, 4, 5]", correct: false },
      { text: "1", correct: true },
      { text: "[1]", correct: false },
    ],
    explanation: `We can unpack values from arrays or properties from objects through destructuring. This means that the value of y is equal to the first value in the array, which is the number 1. When we log y, 1 is returned.`,
  },

  {
    img: "code14.jpg",
    answers: [
      { text: `{ name: "Lydia", age: 21 }`, correct: true },
      {
        text: `{ name: "Lydia", age: 21, city: "Amsterdam" }!`,
        correct: false,
      },
      { text: `{ name: "Lydia", age: 21, city: undefined }`, correct: false },
      { text: `Amsterdam`, correct: false },
    ],
    explanation: `We set the variable city equal to the value of the property called city on the person object. There is no property on this object called city, so the variable city has the value of undefined.
      Note that we are not referencing the person object itself! We simply set the variable city equal to the current value of the city property on the person object.
      Then, we set city equal to the string "Amsterdam". This doesn't change the person object: there is no reference to that object.
       When logging the person object, the unmodified object gets returned.`,
  },

  {
    img: "code15.jpg",
    answers: [
      { text: `Sorry, you're too young.`, correct: false },
      { text: `Yay! You're old enough!`, correct: false },
      { text: "ReferenceError", correct: true },
      { text: "undefined", correct: false },
    ],
    explanation: `Variables with the const and let keyword are block-scoped. A block is anything between curly brackets ({ }). In this case, the curly brackets of the if/else statements. You cannot reference a variable outside of the block it's declared in, a ReferenceError gets thrown.`,
  },

  {
    img: "code16.jpg",
    answers: [
      { text: "name Lydia and age 21", correct: true },
      { text: `["name", "Lydia"] and ["age", 21]`, correct: false },
      { text: `["name", "age"] and undefined`, correct: false },
      { text: "Error", correct: false },
    ],
    explanation: `Object.entries(person) returns an array of nested arrays, containing the keys and objects.
      Using the for-of loop, we can iterate over each element in the array, the subarrays in this case. We can destructure the subarrays instantly in the for-of loop, using const [x, y]. x is equal to the first element in the subarray, y is equal to the second element in the subarray.
    The first subarray is [ "name", "Lydia" ], with x equal to "name", and y equal to "Lydia", which get logged. The second subarray is [ "age", 21 ], with x equal to "age", and y equal to 21, which get logged.`,
  },

  {
    img: "code17.jpg",
    answers: [
      { text: `{name: "Sarah", age: 22}`, correct: false },
      { text: `{name: "Sarah", age: 23}`, correct: false },
      { text: `{name: "Lydia", age: 22}`, correct: true },
      { text: `{name: "Lydia", age: 23}`, correct: false },
    ],
    explanation: `Both the changeAge and changeAgeAndName functions have a default parameter, namely a newly created object { ...person }. This object has copies of all the key/values in the person object.
      First, we invoke the changeAge function and pass the person object as its argument. This function increases the value of the age property by 1. person is now { name: "Lydia", age: 22 }.
      Then, we invoke the changeAgeAndName function, however we don't pass a parameter. Instead, the value of x is equal to a new object: { ...person }. Since it's a new object, it doesn't affect the values of the properties on the person object. person is still equal to { name: "Lydia", age: 22 }.`,
  },

  {
    img: "code18.jpg",
    answers: [
      { text: "Woah some cool data", correct: false },
      { text: "Oh finally!", correct: false },
      { text: "Woah some cool data Oh finally!", correct: true },
      { text: "Oops didn't work Oh finally!", correct: false },
    ],
    explanation: `Both the changeAge and changeAgeAndName functions have a default parameter, namely a newly created object { ...person }. This object has copies of all the key/values in the person object.
      First, we invoke the changeAge function and pass the person object as its argument. This function increases the value of the age property by 1. person is now { name: "Lydia", age: 22 }.
      Then, we invoke the changeAgeAndName function, however we don't pass a parameter. Instead, the value of x is equal to a new object: { ...person }. Since it's a new object, it doesn't affect the values of the properties on the person object. person is still equal to { name: "Lydia", age: 22 }.`,
  },

  {
    img: "code19.jpg",
    answers: [
      { text: "a,s,n,w", correct: true },
      { text: "a,n,s,w", correct: false },
      { text: "w,n,s,a", correct: false },
      { text: "None", correct: false },
    ],
    explanation: `Reverse method does not take any arguments, unlike sort(). even if we pass arguments, it simply ignores them.`,
  },

  {
    img: "code20.jpg",
    answers: [
      { text: "true true", correct: false },
      { text: "true false", correct: false },
      { text: "false true", correct: true },
      { text: "false false", correct: false },
    ],
    explanation: `In the first test, a and b are different objects in memory; it doesn't matter that the parameters and return values in each function definition are identical. Therefore, a is not equal to b. In the second test, a(7) returns the number 7 and b(7) returns the number 7. These primitive types are strictly equal to each other.
       In this case, the equality (==) vs identity (===) comparison operators don't matter; no type coercion will affect the result..`,
  },

  {
    img: "code21.jpg",
    answers: [
      { text: "1,2,3", correct: false },
      { text: "a,b,c", correct: false },
      { text: `[1,2,3]`, correct: true },
      { text: `[a,b,c]`, correct: false },
    ],
    explanation: `The map method will create a new array from an existing array by performing a specified transformation on each array item. In this example, each letter is replaced by a corresponding object's value.`,
  },

  {
    img: "code22.jpg",
    answers: [
      { text: "Border Collie, Wooh", correct: false },
      { text: "Border Collie, undefined", correct: false },
      { text: "undefined, Wooh", correct: true },
      { text: "undefined, undefined", correct: false },
    ],
    explanation: `The this inside an arrow function does not depend on how the function was called. Instead, they inherit the this of the parent scope. This is called "lexical scoping". In sloppy mode, this on the top level refers to the global object, so getBreed's this.breed refers to the breed property on the global object, which doesn't exist..`,
  },

  {
    img: "code23.jpg",
    answers: [
      { text: `[true, true]`, correct: true },
      { text: `[false, true]`, correct: false },
      { text: `[true, false]`, correct: false },
      { text: `[false, false]`, correct: false },
    ],
    explanation: `In JavaScript, both empty and non empty arrays are truthy, like all objects. This is not the same thing as comparison - for example, if the arrays were loosely compared to a Boolean, the results would be different. [] == false would evaluate to true because the empty array, when converted into a primitive, is falsey.
      The first if statement is fulfilled, so [true, true] is returned.`,
  },

  {
    img: "code24.jpg",
    answers: [
      { text: "6", correct: false },
      { text: "27", correct: true },
      { text: "15", correct: false },
      { text: "28", correct: false },
    ],
    explanation: `The comma operator (,) evaluates each of its operands (from left to right) and returns the value of the last operand. The result = (((6 + 5) * 2) - 5) + 10 = 27.`,
  },

  {
    img: "code25.jpg",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
    ],
    explanation: `The if condition within the forEach loop checks whether the value of num is truthy or falsy. Since the first number in the nums array is 0, a falsy value, the if statement's code block won't be executed. count only gets incremented for the other 3 numbers in the nums array, 1, 2 and 3. Since count gets incremented by 1 3 times, the value of count is 3.`,
  },

  {
    img: "code26.jpg",
    answers: [
      { text: "my@email.com", correct: true },
      { text: "new@email.com", correct: false },
      { text: "undefined", correct: false },
      { text: "ReferenceError", correct: false },
    ],
    explanation: `The updateEmail function is an arrow function, and is not bound to the user object. This means that the this keyword is not referring to the user object, but refers to the global scope in this case. The value of email within the user object does not get updated. When logging the value of user.email, the original value of my@email.com gets returned.
      
      `,
  },

  {
    img: "code27.jpg",
    answers: [
      { text: `{ email: "my@email.com", address: null }`, correct: false },
      { text: `{ email: "my@email.com" }`, correct: false },
      { text: `{ email: "my@email.com", address: {} }`, correct: true },
      {
        text: `"{ email: "my@email.com", address: undefined }"`,
        correct: false,
      },
    ],
    explanation: `The default value of address is an empty object {}. When we set the variable member equal to the object returned by the createMember function, we didn't pass a value for address, which means that the value of address is the default empty object {}. An empty object is a truthy value, which means that the condition of the address ? address : null conditional returns true. The value of address is the empty object {}.`,
  },

  {
    img: "code28.jpg",
    answers: [
      { text: "It's not a string!", correct: false },
      { text: "Yay it's a string!", correct: true },
      { text: "TypeError", correct: false },
      { text: "undefined", correct: false },
    ],
    explanation: `The condition within the if statement checks whether the value of !typeof randomValue is equal to "string". The ! operator converts the value to a boolean value. If the value is truthy, the returned value will be false, if the value is falsy, the returned value will be true. In this case, the returned value of typeof randomValue is the truthy value "number", meaning that the value of !typeof randomValue is the boolean value false.
      !typeof randomValue === "string" always returns false, since we're actually checking false === "string". Since the condition returned false, the code block of the else statement gets run, and Yay it's a string! gets logged.`,
  },
];
