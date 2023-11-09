// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
// const URL = "https://teachablemachine.withgoogle.com/models/VOqGCZ31b/"; First Model


function reload() {
    window.location.reload(true);
}
var ifConnected = window.navigator.onLine;
if (ifConnected) {
    // alert('Connection available');
} else {
    alert('Please Turn On Your Data Connection And Try Again ');
}
const URL = "https://teachablemachine.withgoogle.com/models/VXLjAEv3Dm/";

let model, webcam, labelContainer, maxPredictions;
var percent, prediction, i, classPrediction, audio;
var b = 1;



// Load the image model and setup the webcam
async function init() {

    let g = document.getElementById('btn');
    g.style.display = 'none';
    let om = document.getElementById('sente1');
    let omm = document.getElementById('sente2');
    let ommm = document.getElementById('sente3');
    om.style.display = 'none';
    omm.style.display = 'none';
    ommm.style.display = 'none';

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(325, 325, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        let p = labelContainer.appendChild(document.createElement("div"));
        p.style.display = "none";

    }
}


let v = prompt("Please Enter Your Name");
document.getElementById('h3').innerHTML = "Welcome" + " " + v + " " + "!";
console.log(v)
if (v === null) {
    document.getElementById('h3').innerHTML = "Welcome" + " " + "User" + " " + "!";
}
if (v === "") {
    document.getElementById('h3').innerHTML = "Welcome" + " " + "User" + " " + "!";
}

// init();

// function callFunction() {
//     timeValue = setInterval(function() {
//         console.log("The call() is being executed....");
//     }, 1000);
// }

// function haltFunction() {
//     clearInterval(timeValue);
// }ction







async function loop() {
    webcam.update(); // update the webcam frame
    await predict();

    window.requestAnimationFrame(loop);

}



// run the webcam image through the image model
async function predict() {
    let om = document.getElementById('sente1');
    let omm = document.getElementById('sente2');
    let ommm = document.getElementById('sente3');



    let green = document.getElementById('green');
    let j = document.getElementById('red');
    let r = document.getElementById('yellow');


    let sen1 = document.getElementById('se1');
    let sen2 = document.getElementById('se2');
    let sen3 = document.getElementById('se3');

    // predict can take in an image, video or canvas html element
    var prediction = await model.predict(webcam.canvas);
    for (var i = 0; i < maxPredictions; i++) {
        classPrediction = prediction[i].className;
        let obtained = prediction[i].probability.toFixed(1);
        let total = 1;
        percent = obtained * 100 / total;
        // console.log(percent);



        let f = labelContainer.childNodes[i].innerHTML = classPrediction + " : " + percent + "%";

        if (classPrediction === "Face With Mask") {
            if (percent > 75) {
                console.log("60 ++");

                green.style.backgroundColor = 'green';
                j.style.backgroundColor = 'grey';
                r.style.backgroundColor = 'grey';
                sen1.style.fontSize = '2vw';
                sen2.style.fontSize = '1.3vw';
                sen3.style.fontSize = '1.3vw';

                om.style.display = 'block';
                omm.style.display = 'none';
                ommm.style.display = 'none';
                om.style.fontSize = '2vw';


            }
        }

        if (classPrediction === "Face Without Mask") {

            if (percent > 75) {

                console.log("more than 55");

                audio = new Audio('5.mp3');
                j.style.backgroundColor = 'red';

                green.style.backgroundColor = "grey";
                r.style.backgroundColor = 'grey';
                sen2.style.fontSize = '2vw';
                sen1.style.fontSize = '1.3vw';
                sen3.style.fontSize = '1.3vw';

                om.style.display = 'none';
                omm.style.display = 'block';
                ommm.style.display = 'none';
                omm.style.fontSize = '2vw';
                //  // 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                audio.play();
            }
        }
        if (classPrediction === "No Anyone") {
            if (percent > 75) {

                r.style.backgroundColor = 'black';

                green.style.backgroundColor = "grey";
                j.style.backgroundColor = 'grey';
                sen3.style.fontSize = '2.3vw';
                sen2.style.fontSize = '1.3vw';
                sen1.style.fontSize = '1.3vw';
                om.style.display = 'none';
                omm.style.display = 'none';
                ommm.style.display = 'block';
                ommm.style.fontSize = '2vw';
            }
        }
    }
}