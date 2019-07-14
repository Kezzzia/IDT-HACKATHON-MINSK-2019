let audioBlob = [];

navigator.mediaDevices.getUserMedia({ audio: true})
       .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
    
      document.querySelector('#start').addEventListener('click', function(){
        mediaRecorder.start();
      });
    var audioChunks = [];
    mediaRecorder.addEventListener("dataavailable",function(event) {
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", function() {
       audioBlob = new Blob(audioChunks, {
            type: 'audio/wav'
        });
    audioUrl = URL.createObjectURL(audioBlob);
      var audio = document.createElement('audio');
      audio.src = audioUrl;
      audio.controls = true;
      audio.autoplay = false;
    document.querySelector('#audio').appendChild(audio);
       audioChunks = [];
});
    document.querySelector('#stop').addEventListener('click', function(){
         mediaRecorder.stop();
      });
});

const button = document.getElementById('click');

button.addEventListener("click", function(event) {
    var xhr = new XMLHttpRequest();
    // xhr.onload = function(e) {
    //     if (this.readyState === 4) {
    //         console.log("Server returned: ", e.target.responseText);
    //     }
    // };
    console.log('Hello')

    var fd = new FormData();
    // fd.append("audio_data", 'blob', filename);
    fd.append("audio_data", audioBlob);

    xhr.open("POST", "http://127.0.0.1:8000/api/bugs", true);
    xhr.send(fd);
});
