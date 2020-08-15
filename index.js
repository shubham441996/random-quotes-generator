async function fetchQuotes() {
  try {
    hideShowLoader(true);
    let apiUrl =
      "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let res = await fetch(proxyUrl + apiUrl);
    let quotesData = await res.json();
    setQuotes(quotesData);
  } catch (ex) {
    fetchQuotes();
  }
}

function setQuotes(quote) {
  const { quoteText, quoteAuthor } = quote;
  let quoteTextEle = document.getElementById("quote-text");
  let authorText = document.getElementById("author-text");
  authorText.textContent = quoteAuthor;
  quoteTextEle.textContent = quoteText;
  hideShowLoader(false);
}

function registerNextAuthorEvent() {
  let btn = document.getElementById("next-quote");
  btn.addEventListener("click", () => {
    fetchQuotes();
  });
  let tweetBtn = document.getElementById("tweet");
  tweetBtn.addEventListener("click", () => {
    console.log("am i calling");
    handleTwitterAction();
  });
}

function hideShowLoader(isShow) {
  let loader = document.getElementById("loader");
  loader.style.visibility = isShow ? "visible" : "hidden";
}

function handleTwitterAction() {
  let quoteTextEle = document.getElementById("quote-text").textContent;
  let tweetUrl = "https://twitter.com/intent/tweet?text=" + quoteTextEle;
  window.open(tweetUrl, "_blank");
}

fetchQuotes();
registerNextAuthorEvent();
hideShowLoader();
