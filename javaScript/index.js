let wordLimit = document.querySelector("#wordlimit").value;
let multipleFacts = document.querySelector("#multiplefacts").value;
let factOutput = document.querySelector("#factoutput");
let factContainer = document.querySelector("#factcontainer");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";

function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
}

function replaceAllElementsClassName(prevClassName, newClassName) {
    let elementArray = document.querySelectorAll(`.${prevClassName}`);
    if (elementArray) {
        elementArray.forEach((element) => {
            element.classList.remove(prevClassName);
            element.classList.add(newClassName);
        });
    }
}

// function removeAllElementsByClassName (className) {
//     let elementArray = document.querySelectorAll(`.${className}`);
//     if (elementArray) {
//         elementArray.forEach((element) => element.remove());
//     }
// }

// function removeOldDivSlideOut (oldClassName, newClassName) {
//         replaceAllElementsClassName(oldClassName, newClassName);
//         onanimationend = () => {
//             removeAllElementsByClassName(newClassName);
//         }       
// }

// function printToNewDiv (factObject) {
//     let timeoutCounter = 0;
//     let dataCount = 1;
//     factOutput.classList.add("d-out");
//     factObject.data.forEach((element) => {
//         (async () => {
//             const newElement = document.createElement("div");
//             newElement.setAttribute("class", "section-offwhite d-in");
//             newElement.setAttribute("data-count", dataCount);
//             factContainer.append(newElement);
//             await timeout(`${timeoutCounter}0`);
//             factOutput.remove();
//             newElement.classList.remove("d-out");
//             newElement.classList.add("extradiv");
//             newElement.innerText = element.fact;
//         })();
//         timeoutCounter += 9;
//         dataCount++;
//     })
// }

function printToNewDiv (factObject) {
    let timeoutCounter = 0;
    let dataCount = 0;
    factObject.data.forEach((element) => {
        const newElement = document.createElement("div");
        newElement.setAttribute("class", "section-offwhite extradiv d-in");
        newElement.setAttribute("style", `--animation-order:${dataCount};`);
        factContainer.append(newElement);
        newElement.innerText = element.fact;
        timeoutCounter += 9;
        dataCount++;
    })
}

function generateLink() {
    wordLimit = document.querySelector("#wordlimit").value;
    multipleFacts = document.querySelector("#multiplefacts").value;
    if (wordLimit != "" && multipleFacts === "") {
        catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit}`
    } else if (wordLimit === "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}s?limit=${multipleFacts}`
    } else if (wordLimit != "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}s?max_length=${wordLimit}&limit=${multipleFacts}`
    } else {
        catApiUrlComplete = initialCatApiUrl;
    }
    return catApiUrlComplete;
}

function generateFact() {
    fetch(generateLink())
    .then(response => response.json())
    .then(responseJson => {
        factContainer.classList.remove("d-none");
        if(responseJson.fact){
            factOutput.classList.add("animateIn");
            factOutput.innerText = responseJson.fact;
        } else {
            if(!generateFact.didRun) {
                factOutput.classList.add("d-out");
                factOutput.onanimationend = () => {
                    factOutput.remove();
                    factContainer.classList.remove("animateIn");
                }
                printToNewDiv(responseJson);
                generateFact.didRun = true;
                factContainer.classList.add("animateIn");
            } else {
                factOutput.classList.add("d-out");
                factOutput.onanimationend = () => {
                    factOutput.remove();
                    factContainer.classList.remove("animateIn");
                }
                replaceAllElementsClassName("d-in", "d-out");
                dOutDiv = document.querySelectorAll(".d-out");
                dOutDiv.forEach((element) => element.onanimationend = () => {
                    element.remove();
                });
                printToNewDiv(responseJson);
                factContainer.classList.add("animateIn");
                // (async () => {
                //     await removeOldDivSlideOut("d-in", "d-out", 1500);
                //     printToNewDiv(responseJson); 
                // })()
            }
        }
    }).catch(error => factOutput.innerText = `${error}`)
}