
const generateAndDownloadTextFile = (textContent, fileName) => {
    const file = new Blob([textContent], {type: 'text/plain'});
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
}

export default generateAndDownloadTextFile;