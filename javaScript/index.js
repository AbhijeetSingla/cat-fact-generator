let wordLimit = document.querySelector("#wordlimit").value;
let factOutput = document.querySelector("#factoutput");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";

function generateFact() {
    wordLimit = document.querySelector("#wordlimit").value;
    if (wordLimit === "") {
        catApiUrlComplete = initialCatApiUrl;
    } else {
        catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit}`;
    }
    fetch(catApiUrlComplete)
    .then(response => response.json())
    .then(data => factOutput.innerText = data.fact)
    .catch(error => factOutput.innerText = `${error}`)
}

fetch(initialCatApiUrl)
.then(response => response.json())
.then(data => factOutput.innerText = data.fact)
.catch(error => factOutput.innerText = `${error}`)