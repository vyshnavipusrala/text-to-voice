const text = document.querySelector("textarea");
    const voicelist = document.querySelector("select");
    const convertBtn = document.querySelector("button");

    const speechSynth = window.speechSynthesis;

    function populateVoiceList() {
        const voices = speechSynth.getVoices();

        voices.forEach(function (voice, index) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = voice.name + ' (' + voice.lang + ')';
            voicelist.appendChild(option);
        });
    }

    // Wait for voices to be loaded before populating the dropdown
    speechSynth.onvoiceschanged = function () {
        populateVoiceList();
    };

    convertBtn.addEventListener('click', function () {
        const enteredText = text.value;
        const newUtter = new SpeechSynthesisUtterance(enteredText);

        // Set the selected voice
        const selectedVoice = voicelist.selectedOptions[0].value;
        newUtter.voice = speechSynth.getVoices()[selectedVoice];

        speechSynth.speak(newUtter);
    });