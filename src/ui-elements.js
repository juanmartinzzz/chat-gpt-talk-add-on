const addChatGptTalkContainer = () => {
    const container = createElementWithAttributes({type: 'div', attributes: {id: elementIds.chatGptTalkContainer}});

    document.getElementsByTagName('body')[0].prepend(container);
}

const addVoicesSelect = () => {
    const select = createElementWithAttributes({type: 'select', attributes: {id: elementIds.voicesSelect}});
    
    const voices = window.speechSynthesis.getVoices();

    voices.map(({name, lang}, index) => {
        const innerText = `[${index}] ${name} (${lang})`;
        const option = createElementWithAttributes({type: 'option', attributes: {value: index, innerText}});

        select.appendChild(option);
    })

    select.addEventListener('change', ({target}) => voiceId = target.value);

    document.getElementById(elementIds.chatGptTalkContainer).appendChild(select);
}

addChatGptTalkContainer();
addVoicesSelect();