    // more documentation available at
    // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

    // the link to your model provided by Teachable Machine export panel
    const Link = "https://teachablemachine.withgoogle.com/models/cLfyiW92d/";

    async function createModel() {
        const checkpointLink = Link + "model.json"; // model topology
        const metadataLink = Link + "metadata.json"; // model metadata

        const recognizer = speechCommands.create(
            "BROWSER_FFT", // fourier transform type, not useful to change
            undefined, // speech commands vocabulary feature, not useful for your models
            checkpointLink,
            metadataLink);

        // check that model and metadata are loaded via HTTPS requests.
        await recognizer.ensureModelLoaded();

        return recognizer;
    }

    async function initi() {
        let y = document.getElementById('red2');
        let u = document.getElementById('yellow2');
        const recognizer = await createModel();
        const classLabels = recognizer.wordLabels(); // get class labels
        const label = document.getElementById("label");
        for (let w = 0; w < classLabels.length; w++) {
            let l = label.appendChild(document.createElement("div"));
            // l.style.display = "none";
            l.style.marginTop = '3vw';


        }

        // listen() takes two arguments:
        // 1. A callback function that is invoked anytime a word is recognized.
        // 2. A configuration object with adjustable fields
        recognizer.listen(result => {
            const scores = result.scores; // probability of prediction for each class
            // render the probability scores per class
            for (let w = 0; w < classLabels.length; w++) {
                const classP = result.scores[w].toFixed(2);

                let obtaine = classP;
                let tota = 1;
                let percen = obtaine * 100 / tota;

                let g = label.childNodes[w].innerHTML = classLabels[w];
                if (classLabels[w] === "Background Noise") {
                    if (70 < percen) {
                        u.style.backgroundColor = "black";
                        y.style.backgroundColor = "gray";


                    }
                }


                if (classLabels[w] === "Cough Sound") {

                    if (percen > 60) {
                        var audi = new Audio('b3.mp3');
                        y.style.backgroundColor = "red";
                        u.style.backgroundColor = "gray";

                        // 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');

                        audi.play();
                    }

                }
            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.5 // probably want between 0.5 and 0.75. More info in README
        });


        // Stop the recognition in 5 seconds.
        // setTimeout(() => recognizer.stopListening(), 5000);
    }
    // init();