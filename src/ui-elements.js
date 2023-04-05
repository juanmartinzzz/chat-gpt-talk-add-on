const addChatGptTalkContainer = () => {
    const container = createElementWithAttributes({type: 'div', attributes: {id: elementIds.chatGptTalkContainer}});

    document.getElementsByTagName('body')[0].prepend(container);
}

const getVoicesSelect = () => {
    const select = createElementWithAttributes({type: 'select', attributes: {id: elementIds.voicesSelect}});
    
    const voices = window.speechSynthesis.getVoices();

    voices.map(({name, lang}, index) => {
        const innerText = `[${index}] ${name} (${lang})`;
        const option = createElementWithAttributes({type: 'option', attributes: {value: index, innerText}});

        select.appendChild(option);
    })

    select.addEventListener('change', ({target}) => browser.storage.local.set({voiceId: target.value}));

    return select;
}

const getStopButton = () => {
    const stop = createElementWithAttributes({type: 'div', attributes: {id: elementIds.stopButton}});

    stop.addEventListener('click', () => state.paragraphsToRead = [])

    return stop;
}

const addPlayingActions = () => {
    const actions = createElementWithAttributes({type: 'actions', attributes: {id: elementIds.playingActions}});
    const voices = getVoicesSelect();
    const stop = getStopButton();

    actions.appendChild(voices);
    actions.appendChild(stop);
    document.getElementById(elementIds.chatGptTalkContainer).appendChild(actions);
}

const detectContainerClass = () => {
    const container = document.getElementById(elementIds.chatGptTalkContainer);

    if(state.currentlyReading) {
        container.classList.add(containerReadingClass);
    } else {
        container.classList.remove(containerReadingClass);
    }
}

addChatGptTalkContainer();
addPlayingActions();

setInterval(detectContainerClass, 500);