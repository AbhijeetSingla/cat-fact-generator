let wordLimit = document.querySelector("wordlimit");
let factOutput = document.querySelector("#factoutput");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";

function generateFact() {
    wordLimit = document.querySelector("wordlimit");
    if (wordLimit === null) {
        catApiUrlComplete = initialCatApiUrl;
    } else {catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit.value}`}
    console.log(catApiUrlComplete);
    fetch(catApiUrlComplete)
    .then(response => response.json())
    .then(data => factOutput.innerText = data.fact)
    .catch(error => factOutput.innerText = `${error}`)
}

fetch(initialCatApiUrl)
.then(response => response.json())
.then(data => factOutput.innerText = data.fact)
.catch(error => factOutput.innerText = `${error}`)
