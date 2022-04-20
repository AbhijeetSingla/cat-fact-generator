let wordLimit = document.querySelector("#wordlimit").value;
let multipleFacts = document.querySelector("#multiplefacts").value;
let factOutput = document.querySelector("#factoutput");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";

function generateFact() {
    wordLimit = document.querySelector("#wordlimit").value;
    multipleFacts = document.querySelector("#multiplefacts").value;
    if (wordLimit != "" && multipleFacts === "") {
        catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit}`
    } else if (wordLimit === "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}?facts=${multipleFacts}`
    } else if (wordLimit != "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit}&limit=${multipleFacts}`
    } else {
        catApiUrlComplete = initialCatApiUrl;
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