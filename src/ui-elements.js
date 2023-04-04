const getVoicesSelect = () => {
    const select = createElementWithAttributes({type: 'select', attributes: {id: 'voicesSelect'}});
    
    const voices = window.speechSynthesis.getVoices();

    voices.map(({name, lang}, index) => {
        const innerText = `[${index}] ${name} (${lang})`;
        const option = createElementWithAttributes({type: 'option', attributes: {value: index, innerText}});

        select.appendChild(option);
    })

    select.addEventListener('change', ({target}) => voiceId = target.value);

    return select;
}

// Add a select for the voice
const voicesSelect = getVoicesSelect();
document.getElementsByTagName('body')[0].appendChild(voicesSelect);