document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('comicForm');
    const comicDisplay = document.getElementById('comicDisplay');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        comicDisplay.innerHTML = '<p>Please wait... We are generating your comic strips. It will take a few minutes to display them. Thank you for your patience!</p>';

        // Collect text inputs from the form
        const panels = [];
        const annotations = [];
        for (let i = 1; i <= 10; i++) {
            const panelText = document.getElementById(`panel${i}`).value;
            panels.push(panelText);
        }
        for (let i = 1; i <= 10; i++) {
            const annotation = document.getElementById(`annotation${i}`).value;
            annotations.push(annotation);
        }

        // Call the API with the collected text
        generateComic(panels, annotations);
    });

    async function generateComic(panels, annotations) {
        // const apiKey = 'VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM'; // Replace with your actual API key
        const apiUrl = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';

        const requestData = {
            inputs: panels.join('\n'),
        };

        try {
            for (let i = 0; i < panels.length; i++) {
                const requestData = {
                    inputs: panels[i], // Use the text for the current panel
                };

                // POST request to the API
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error(`Failed to generate comic. Status: ${response.status}`);
                }

                // Get the image blob in response
                const imageBlob = await response.blob();
                // return imageBlob;

                displayComic(imageBlob, annotations[i]);
                console.log("processed image", i);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Failed to generate comic. Please try again.');
        }
    }

    function displayComic(imageBlob, annotation) {
        // Display the generated comic image with annotation
        const panelContainer = document.createElement('div');
        panelContainer.className = 'panel-container';

        // Image
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(imageBlob);
        imageElement.alt = 'Generated Comic';

        // Check if the annotation is not empty
        if (annotation.trim() !== '') {
            const annotationElement = document.createElement('div');
            annotationElement.className = 'speech-bubble';
            annotationElement.textContent = annotation;

            panelContainer.appendChild(annotationElement);
        }

        panelContainer.appendChild(imageElement);
        comicDisplay.appendChild(panelContainer);
    }
});


// function displayComic(imageBlob, annotations) {
//     comicDisplay.innerHTML = '';

//     // Display the generated comic image
//     const panelElement = document.createElement('img');
//     panelElement.src = URL.createObjectURL(imageBlob);
//     panelElement.alt = 'Generated Comic';
//     comicDisplay.appendChild(panelElement);

//     // display annotations
//     for (let i = 0; i < annotations.length; i++) {
//         const annotationElement = document.createElement('div');
//         annotationElement.textContent = `Panel ${i + 1} Annotation: ${annotations[i]}`;
//         comicDisplay.appendChild(annotationElement);
//     }
// }


// async function generateComic(panels) {
    //     // Use the API endpoint
    //     const apiUrl = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';
    
    //     // Prepare data for the API request
    //     const requestData = {
    //         inputs: panels.join('\n'), // Concatenate panels with newline
    //     };
    
    //     try {
    //         // Make a POST request to the API without an API key
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'image/png',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(requestData),
    //         });
    
    //         // Check if the request was successful
    //         if (!response.ok) {
    //             throw new Error(`Failed to generate comic. Status: ${response.status}`);
    //         }
    
    //         // Get the image blob from the response
    //         const imageBlob = await response.blob();
    
    //         // Display the generated comic panels
    //         displayComic(imageBlob);
    //     } catch (error) {
    //         // Handle API errors
    //         console.error('Error:', error);
    //         alert('Failed to generate comic. Please try again.');
    //     }
    // }