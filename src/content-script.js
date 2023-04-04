const readQueuedParagraphs = () => {
    if(state.currentlyReading) {
        return;
    }

    if(state.paragraphsToRead.length === 0) {
        return;
    }

    // Mark the paragraph as read
    state.paragraphsToRead[0].classList.add('read');

    // Get text in the first paragraph from the list and remove it from the list.
    const text = state.paragraphsToRead[0].innerText;
    state.paragraphsToRead.shift();

    // console.log({text});
    // Create a new instance of SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance();

    // Set the text to be read out loud
    utterance.text = text;

    // Set the rate (default is 1)
    utterance.rate = 0.87;

    // Set the voice to use for reading the text (optional)
    utterance.voice = window.speechSynthesis.getVoices()[voiceId];

    // Inform the system that a paragraph is being read
    state.currentlyReading = true;

    // Use the speech synthesis object to read the text out loud
    window.speechSynthesis.speak(utterance);

    utterance.addEventListener('end', () => {
        // Flip a switch that indicates the app it can continue to scan for new messages to be spoken out loud.
        state.currentlyReading = false;
    });
}

const addMessagesToQueue = () => {
    const paragraphs = Array.from(document.getElementsByTagName("p")).filter(paragraph => !paragraph.classList.contains('markedToBeRead'));
    
    paragraphs.map(paragraph => {        
        if(paragraph.innerText.length <= 3) {
            return;
        }
        
        // ChatGPT is still writing to the paragraph
        if(paragraph.innerText !== paragraph.getAttribute('previousInnerText')) {
            // Set or update the previous inner text property
            paragraph.setAttribute('previousInnerText', paragraph.innerText);

            return;
        }
        
        // Paragraph finished loading
        paragraph.classList.add('markedToBeRead');
        state.paragraphsToRead.push(paragraph);
    });
};

addMessagesToQueue();
setInterval(addMessagesToQueue, 3 * 1000);
setInterval(readQueuedParagraphs, 500);