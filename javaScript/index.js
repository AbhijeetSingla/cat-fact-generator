let wordLimit = document.querySelector("#wordlimit").value;
let multipleFacts = document.querySelector("#multiplefacts").value;
let factOutput = document.querySelector("#factoutput");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";
let x = 0;

function replaceAllElementsClass (prevClassName, newClassName) {
    let a = 0;
    let elementArray = document.getElementsByClassName(prevClassName);
    if (elementArray) {
        console.log(elementArray);
        console.log(elementArray.length);
        for (let index = 0; index < elementArray.length; index++) {
            console.log(index);
            console.log(a);
            a++;
            console.log(elementArray[index]);
            elementArray[index].setAttribute("class", newClassName);
            console.log(elementArray[index]);
            console.log("idhar hai");
        }
        console.log(elementArray);
        return 1
    }
}

function removeAllElementsByClassName (className) {
    let element = document.getElementsByClassName(className);
    if (element) {
        console.log(element);
        for (const index of element) {
            console.log(index);
            console.log("udhane laga");
            index.remove();
            console.log(index);
            console.log("idhar hai2");
        }
        return 1
    }
}

function printToNewDiv (factArray) {
    factOutput.remove();
    replaceAllElementsClass("extradiv", "d-out")
    .then(removeAllElementsByClassName("d-out"))
    .then(() => {
        console.log("inside");
        let i = 0; 
        factArray.data.forEach((element) => {
            const newElement = document.createElement("div");
            newElement.setAttribute("class", "container-center section-offwhite d-out");      
            const newDivMarker = document.getElementById("newfactmarker");
            document.body.insertBefore(newElement, newDivMarker);
            this.timeoutID1 = setTimeout(() => {
                newElement.setAttribute("class", "container-center section-offwhite extradiv");
            }, `${i}0`);
            i += 9;
            let extraFact = element.fact;
            newElement.innerText = extraFact;
        })
    })
}
    // let i = 0;
    // factArray.data.forEach((element) => {
    //     console.log(i);
    //     i++;
    //     const newElement = document.createElement("div");
    //     newElement.setAttribute("class", "container-center section-offwhite d-none");      
    //     const newDivMarker = document.getElementById("newfactmarker");
    //     document.body.insertBefore(newElement, newDivMarker);
    //     newElement.setAttribute("class", "container-center section-offwhite extradiv");
    //     let extraFact = element.fact;
    //     newElement.innerText = extraFact;

function generateFact() {
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
    
    fetch(catApiUrlComplete)
    .then(response => response.json())
    .then(resJson => {if(x > 0) {printToNewDiv(resJson)
    } else {let i = 0; resJson.data.forEach((element) => {
        factOutput.remove();
        i += 9;
        const newElement = document.createElement("div");
        newElement.setAttribute("class", "container-center section-offwhite d-out");      
        const newDivMarker = document.getElementById("newfactmarker");
        document.body.insertBefore(newElement, newDivMarker);
        setTimeout(() => {
            newElement.setAttribute("class", "container-center section-offwhite extradiv");
        }, `${i}0`);
        let extraFact = element.fact;
        newElement.innerText = extraFact; x++;
    })}; console.log(resJson.data)})
    .catch(error => factOutput.innerText = `${error}`)
}

//     fetch(catApiUrlComplete)
//     .then(response => {console.log(response); return response.json()})
//     .then(data => factOutput.innerText = data.fact)
//     .catch(error => factOutput.innerText = `${error}`)

fetch(initialCatApiUrl)
.then(response => response.json())
.then(data => factOutput.innerText = data.fact)
.catch(error => factOutput.innerText = `${error}`)