const listenButton = document.getElementById('listen-button');
listenButton.addEventListener('click', (e) => doSpeechPlayback());


function doSpeechPlayback() {

	var synth = window.speechSynthesis;
	var contents = document.getElementById('ocr-contents').textContent;
	var utterThis = new SpeechSynthesisUtterance(contents);
	synth.speak(utterThis);

}
