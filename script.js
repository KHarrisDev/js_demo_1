/*
 * asynchronous function runs independently & doesnt stop browser from completing loading of page
 * next we need our API, the URL
 * next we add a try catch statement to attempt to retrieve information from API
    => we setup the request in the try statement
    => the response won't be populated until data is fetched from apiUrl
    => when populated, apiQuotes is populated w/json object from response from API
      - we use .json b/c response is a big string so we convert to json object to manipulate data.
    => we call/create newQuote() to generate one quote at a time from response.json
*/
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// let keyword is used due to change in quotes from API
let apiQuotes = [];

// Show Loading Spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quote From API
async function getQuotes() {
  // We run this async.
  // The loading() occurs before retrieving data and runs into newQuote()
  loading();

  // const apiUrl contains the link to the API
  const apiUrl = "https://type.fit/api/quotes";

  try {
    // const response is populated by fetch(apiUrl)
    // apiQuotes array is populated w/ json object from asynchronous call
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    //console.log(apiQuotes[234]);

    // newQuote() is called to render a random quote from the API
    newQuote();
  } catch (error) {
    //catch error here
  }
}

//function for new quotes
function newQuote() {
  // The async function getQuotes() bypasses it's loading() due to promise
  loading();

  //generate random quote w/random number
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //insert quote & author in HTML dynamically
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;

  //check if author textContent is blank (null)
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //check quote length to adjust styling
  if (quote.text.length > 100) {
    //long-quote class is defined js file & added in same span as 'quote'
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  //
  quoteText.textContent = quote.text;
  complete();
}

//tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
// We need to call loading at the beginnings of the getQuotes()
getQuotes();
