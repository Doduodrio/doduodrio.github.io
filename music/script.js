const allSongs = document.getElementsByClassName('song');
var songData = {};

for (let i=0; i<allSongs.length; i++) {
    // add song to songData
    songData[allSongs[i].id] = {
        'title': allSongs[i].id,
        'playing': false,
        'durationString': allSongs[i].children[0].children[1],
        'button': allSongs[i].children[1].children[0],
        'bar': allSongs[i].children[1].children[1],
        'progressBar': allSongs[i].children[1].children[1].children[1],
        'audio': allSongs[i].children[2],
        'duration': allSongs[i].dataset.duration
    };
    let song = songData[allSongs[i].id];

    // add timeupdate event listener to audio
    song.audio.addEventListener('timeupdate', function(){
        song.durationString.textContent = `${Math.floor(song.audio.currentTime/60)}:${String(Math.floor(song.audio.currentTime%60)).padStart(2, '0')} / ${Math.floor(song.duration/60)}:${String(Math.floor(song.duration%60)).padStart(2, '0')}`;
        song.progressBar.setAttribute('style', `width: ${song.audio.currentTime/song.duration*100}%`);
    });
    song.audio.addEventListener('ended', function(){
        // change button appearance when song finishes
        song.button.firstChild.textContent = '⏵︎';
        song.playing = false;
    });

    // add event listeners to buttons
    song.button.onclick = function(){
        if (song.playing) {
            song.button.firstChild.setAttribute('src', 'play.svg');
            song.audio.pause();
        }
        else {
            if (song.audio.currentTime === song.audio.duration) {
                // if song ended, restart it
                song.audio.currentTime = 0;
            }
            song.button.firstChild.setAttribute('src', 'pause.svg');
            song.audio.play();

            // pause other songs that are playing
            for (let [title, s] of Object.entries(songData)) {
                if (s !== song && s.playing) {
                    s.button.click();
                }
            }
        }
        song.playing = !song.playing;
    };

    // add event listeners to progress bars
    song.bar.addEventListener('click', function(e){
        let progress = e.offsetX/this.clientWidth;
        song.progressBar.setAttribute('style', `width: ${progress*100}%`);
        song.audio.currentTime = progress*song.duration;
    });
}