const fileInput = document.getElementById('image-picker');
fileInput.addEventListener('change', (e) => doOcrOnFile(e.target.files));


function doOcrOnFile(files) {

	document.getElementById('loader').style.display = "block";

	const worker = Tesseract.createWorker({
			logger: m => console.log(m)
	});

	Tesseract.setLogging(true);

	(async () => {
	  await worker.load();
	  await worker.loadLanguage('eng');
	  await worker.initialize('eng');
	  const { data: { text } } = await worker.recognize(files[0]);
	  console.log(text);
	  document.getElementById('ocr-contents').innerHTML = text;
	  await worker.terminate();
	  document.getElementById('loader').style.display = "none";
	  document.getElementById('listen-button').classList.toggle("disabled");
	})();

}