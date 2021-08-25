const fileInput = document.getElementById('image-picker');
fileInput.addEventListener('change', (e) => doOcrOnFile(e.target.files));


async function doOcrOnFile(files) {

	var fileName = files[0].name;
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);

	document.getElementById('loader').style.display = 'block';

    if(fileNameExt.toLowerCase() == "heic") {

        let blobURL = URL.createObjectURL(files[0]);
        let blobRes = await fetch(blobURL);
        let blob = await blobRes.blob();
        let conversionResult = await heic2any({ blob, toType: "image/jpg", quality: 0.75 });
        doOCR(conversionResult);

    } else { 

    	doOCR(files[0]);
	}
}


function doOCR(file) {
	const worker = Tesseract.createWorker({
		logger: m => console.log(m)
	});

	Tesseract.setLogging(true);

	(async () => {
	  await worker.load();
	  await worker.loadLanguage('eng');
	  await worker.initialize('eng');
  	  const { data: { text } } = await worker.recognize(file);
	  document.getElementById('ocr-contents').innerHTML = text;
	  await worker.terminate();
	  document.getElementById('loader').style.display = "none";
	  document.getElementById('listen-button').classList.toggle("disabled");
	  //progressUpdate({ status: 'done', data });
	})();
}

