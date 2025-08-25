const API_KEY = 'vk-D0rAU03dSFDB3XV0w630AE9aBRV4IVsRyGHgKSTMcpT9P';

const API_URL = 'https://api.vyro.ai/v2/image/generations';

const imageResultElement = document.getElementById('imageResult')
const imageContainer = document.getElementById('imageContainer')

// Function to generate the image
function generateImage() {
    // get the value from input fields;
    const promptValue = document.getElementById('prompt').value;
    const styleValue = document.getElementById('dropdownStyles').value;
    const ratioValue = document.getElementById('dropdownRatio').value;

    // If prompt is empty
    if (!promptValue) {
        alert('Please enter the prompt.')
        return;
    }
    
    setLoadingState(true);


    // prepare from data for the api request

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer" + API_KEY);

    const formData = new FormData();
    formData.append('prompt', promptValue);
    formData.append('style', styleValue);
    formData.append('aspect_ratio', ratioValue);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

    fetch(API_URL, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            // Create an object url for blob
            const imageUrl = URL.createObjectURL(blob);
            // set the image sourse to display
            imageResultElement.src =imageUrl;

        })
        .catch(error => {
            console.log('error', error);
            alert('An error occured while generating the image.')
        })
        .finally(() => {
            // Restore theloading status
            setLoadingState(false);
        })

}

function setLoadingState(isLoading) {
    if (isLoading) {
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('loading');
    }else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('loading');
    }
}

function downloadImage() {
    const imageUrl = imageResultElement.src;
    
    // if image url is empty
    if(!imageUrl) {
        alert('No Image is available for download.');
        return;
    }

    // create a temprory anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'ai-generated-image.jpg';
    link.click();
}