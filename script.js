// all of our quotes
const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
  "Hey"
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// starting time
let startTime = new Date().getTime();

// elements in the page
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");
const errorMessage = document.getElementById("error-message");

document.getElementById("start").addEventListener("click", () => {
  // get the quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];

  // Put the quote into an array of words
  words = quote.split(" ");

  // reset the word index for tracking
  wordIndex = 0;

  // UI Updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map((word) => `<span>${word} </span>`);

  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");

  // highlighting the first word
  quoteElement.childNodes[0].className = "highlight";

  // clear any prior message
  messageElement.innerText = "";

  // set the textbox
  // to clear textbox
  typedValueElement.value = "";

  // set focus and also event handler
  typedValueElement.focus();

  // Start the timer
  startTime = new Date().getTime();
  typedValueElement.style.display = "flex";
  quoteElement.style.background = "#407E78";
  errorMessage.style.display = "none";
});

typedValueElement.addEventListener("input", () => {
  document.getElementById("start").style.display = "none";
  // getting the current word
  const currentWord = words[wordIndex];
  // getting the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    console.log(typedValue, currentWord);

    // display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `Congrats!! You finished in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
    quoteElement.innerText = "";
    quoteElement.style.background = "#333137";
    document.getElementById("start").style.display = "flex";
    errorMessage.style.display = "none";
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reseting the class name for elements in the quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the next word
    quoteElement.childNodes[wordIndex].className = "highlight";
    errorMessage.style.display = "none";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    quoteElement.childNodes[wordIndex].className = "highlight";
    typedValueElement.className = "";
    errorMessage.style.display = "none";
  } else {
    quoteElement.childNodes[wordIndex].className = "error";
    errorMessage.style.display = "block";
    
  }
});
