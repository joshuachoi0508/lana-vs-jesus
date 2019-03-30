let pTags = document.getElementsByClassName('content');
let readMores = document.getElementsByClassName('read-more');

for(let i = 0; i < readMores.length; i++) {
    let pTag = pTags[i];
    let readMore = readMores[i];
    readMore.addEventListener('click', () => {
        if (pTag.style.height === "100%") {
            pTag.style.height = '4.3em';
            pTag.style.cursor = 'pointer';
            readMore.innerText = "Read More";
            readMore.style.background = "linear-gradient(to bottom, #f8f8fe24, #f8f8fe)";
        } else {
            pTag.style.height = '100%';
            readMore.innerText = "Read Less";
            readMore.style.background = "none";
            pTag.style.cursor = 'auto';
        }
    })
    pTag.addEventListener('click', () => {
        if (pTag.style.height === "100%") {
            pTag.style.height = '4.3em';
            readMore.innerText = "Read More";
            readMore.style.background = "linear-gradient(to bottom, #f8f8fe24, #f8f8fe)";
        } else {
            pTag.style.height = '100%';
            readMore.innerText = "Read Less";
            readMore.style.background = "none";
        }
    })
};
