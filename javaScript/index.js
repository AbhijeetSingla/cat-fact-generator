let wordLimit = document.querySelector("#wordlimit").value;
let multipleFacts = document.querySelector("#multiplefacts").value;
let factOutput = document.querySelector("#factoutput");
let factContainer = document.querySelector("#factcontainer");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";
const excludedFact = "Approximately 24 cat skins can make a coat.";

function replaceAllElementsClassName(prevClassName, newClassName) {
    let elementArray = document.querySelectorAll(`.${prevClassName}`);
    if (elementArray) {
        elementArray.forEach((element) => {
            element.classList.remove(prevClassName);
            element.classList.add(newClassName);
        });
    }
}

function printToNewDiv(factObject) {
    let timeoutCounter = 0;
    let dataCount = 0;
    let validFacts = factObject.data.filter(element => element.fact !== excludedFact);

    validFacts.forEach((element) => {
        const newElement = document.createElement("div");
        newElement.setAttribute("class", "section-offwhite opacity-zero extradiv d-in");
        newElement.setAttribute("style", `--animation-order:${dataCount};`);
        factContainer.insertBefore(newElement, document.querySelector(".extradiv.d-out"));
        newElement.innerText = element.fact;
        newElement.addEventListener("animationstart", () => {
            newElement.classList.remove("opacity-zero");
        }, { once: true });
        timeoutCounter += 9;
        dataCount++;
    });
}

function generateLink() {
    wordLimit = document.querySelector("#wordlimit").value;
    multipleFacts = document.querySelector("#multiplefacts").value;
    if (wordLimit != "" && multipleFacts === "") {
        catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit}`;
    } else if (wordLimit === "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}s?limit=${multipleFacts}`;
    } else if (wordLimit != "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}s?max_length=${wordLimit}&limit=${multipleFacts}`;
    } else {
        catApiUrlComplete = initialCatApiUrl;
    }
    return catApiUrlComplete;
}

function fetchValidFact(retryCount = 5) {
    return fetch(initialCatApiUrl)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.fact === excludedFact && retryCount > 0) {
                return fetchValidFact(retryCount - 1);
            }
            return responseJson;
        });
}

function generateFact() {
    fetch(generateLink())
        .then(response => response.json())
        .then(async responseJson => {
            factContainer.classList.remove("d-none");
            if (responseJson.fact) {
                if (responseJson.fact === excludedFact) {
                    responseJson = await fetchValidFact();
                }
                factOutput.classList.remove("d-out", "d-none");
                replaceAllElementsClassName("d-in", "d-out");
                let dOutDiv = document.querySelectorAll(".extradiv.d-out");
                dOutDiv.forEach((element) => element.addEventListener("animationend", () => {
                    element.remove();
                }, { once: true }));
                factOutput.classList.add("animateIn");
                factOutput.innerText = responseJson.fact;
            } else {
                responseJson.data = responseJson.data.filter(element => element.fact !== excludedFact);
                if (!generateFact.didRun) {
                    factOutput.classList.add("d-out");
                    factOutput.addEventListener("animationend", () => {
                        factOutput.classList.add("d-none");
                    }, { once: true });
                    printToNewDiv(responseJson);
                    generateFact.didRun = true;
                } else {
                    factOutput.classList.add("d-out");
                    if (!factOutput.classList.contains("d-none")) {
                        factOutput.addEventListener("animationend", () => {
                            factOutput.classList.add("d-none");
                            factContainer.classList.remove("animateIn");
                        }, { once: true });
                    }
                    replaceAllElementsClassName("d-in", "d-out");
                    let dOutDiv = document.querySelectorAll(".extradiv.d-out");
                    dOutDiv.forEach((element) => element.addEventListener("animationend", () => {
                        element.remove();
                    }, { once: true }));
                    printToNewDiv(responseJson);
                }
            }
        }).catch(error => factOutput.innerText = `${error}`);
}