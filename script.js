// ================================
// MY MUSIC - SCRIPT PART 1
// ================================

const homePage = document.getElementById("homePage");
const playlistPage = document.getElementById("playlistPage");
const playerPage = document.getElementById("playerPage");

const artistCards = document.querySelectorAll(".artist-card");

const artistTitle = document.getElementById("artistTitle");
const artistName = document.getElementById("artistName");
const artistPhoto = document.getElementById("artistPhoto");
const artistSongs = document.getElementById("artistSongs");

const songList = document.getElementById("songList");

const artistSearch = document.getElementById("artistSearch");
const songSearch = document.getElementById("songSearch");

const backHome = document.getElementById("backHome");
const backPlaylist = document.getElementById("backPlaylist");

const audio = document.getElementById("audio");

let currentArtist = "";
let currentPlaylist = [];
let currentSongIndex = 0;

// ================================
// OPEN PLAYLIST
// ================================

artistCards.forEach(card => {

    card.addEventListener("click", () => {

        currentArtist = card.dataset.id;

        homePage.classList.add("hidden");
        playlistPage.classList.remove("hidden");
        playerPage.classList.add("hidden");

        loadPlaylist(currentArtist);

    });

});

// ================================
// LOAD PLAYLIST
// ================================

function loadPlaylist(id){

    const artist = artists[id];

    artistTitle.textContent = artist.name;
    artistName.textContent = artist.name;

    artistPhoto.src = artist.image;

    currentPlaylist = songs[id];

    artistSongs.textContent =
    currentPlaylist.length + " Songs";

    songList.innerHTML = "";

    currentPlaylist.forEach((song,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${song.title}</span>
            <i class="fa-solid fa-play"></i>
        `;

        li.onclick = ()=>{

            currentSongIndex = index;

            openPlayer();

        };

        songList.appendChild(li);

    });

}

// ================================
// OPEN PLAYER
// ================================

function openPlayer(){

    playlistPage.classList.add("hidden");
    playerPage.classList.remove("hidden");

    loadSong(currentSongIndex);

}

// ================================
// BACK BUTTONS
// ================================

backHome.onclick = ()=>{

    playlistPage.classList.add("hidden");
    homePage.classList.remove("hidden");

}

backPlaylist.onclick = ()=>{

    playerPage.classList.add("hidden");
    playlistPage.classList.remove("hidden");

}

// ================================
// SEARCH ARTIST
// ================================

artistSearch.addEventListener("keyup",()=>{

    const value = artistSearch.value.toLowerCase();

    artistCards.forEach(card=>{

        const name =
        card.querySelector("h2")
        .innerText
        .toLowerCase();

        card.style.display =
        name.includes(value)
        ? "block"
        : "none";

    });

});

// ================================
// SEARCH SONG
// ================================

songSearch.addEventListener("keyup",()=>{

    const value = songSearch.value.toLowerCase();

    document.querySelectorAll("#songList li")
    .forEach(li=>{

        li.style.display =
        li.innerText
        .toLowerCase()
        .includes(value)
        ? "flex"
        : "none";

    });

});

// ======================================
// PLAYER CONTROLS
// ======================================

const playPause = document.getElementById("playPause");
const nextSong = document.getElementById("nextSong");
const prevSong = document.getElementById("prevSong");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const playerImage = document.getElementById("playerImage");

const progressBar = document.getElementById("progressBar");

const currentTimeText =
document.getElementById("currentTime");

const durationText =
document.getElementById("duration");

const volume =
document.getElementById("volume");

const cover =
document.querySelector(".cover");

let isPlaying = false;

// ======================================
// LOAD SONG
// ======================================

function loadSong(index){

    const song = currentPlaylist[index];

    audio.src = song.file;

    songTitle.innerText = song.title;

    songArtist.innerText =
    artists[currentArtist].name;

    playerImage.src =
    artists[currentArtist].image;

    progressBar.style.width = "0%";

    currentTimeText.innerText = "0:00";

    durationText.innerText = "0:00";

}

// ======================================
// PLAY
// ======================================

function playSong(){

    audio.play();

    isPlaying = true;

    playPause.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

}

// ======================================
// PAUSE
// ======================================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playPause.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

}

// ======================================
// PLAY BUTTON
// ======================================

playPause.onclick = ()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

};

// ======================================
// NEXT SONG
// ======================================

nextSong.onclick = ()=>{

    currentSongIndex++;

    if(currentSongIndex >= currentPlaylist.length){

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();

};

// ======================================
// PREVIOUS SONG
// ======================================

prevSong.onclick = ()=>{

    currentSongIndex--;

    if(currentSongIndex < 0){

        currentSongIndex =
        currentPlaylist.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

};

// ======================================
// AUTO NEXT
// ======================================

audio.addEventListener("ended",()=>{

    nextSong.click();

});

// ======================================
// VOLUME
// ======================================

audio.volume = 1;

volume.addEventListener("input",()=>{

    audio.volume =
    volume.value / 100;

});

// ======================================
// SONG DURATION
// ======================================

audio.addEventListener("loadedmetadata",()=>{

    durationText.innerText =
    formatTime(audio.duration);

});

// ======================================
// FORMAT TIME
// ======================================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const min =
    Math.floor(time/60);

    const sec =
    Math.floor(time%60);

    return `${min}:${sec<10?"0":""}${sec}`;

}

// ======================================
// PROGRESS BAR UPDATE
// ======================================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percent =
    (audio.currentTime / audio.duration) * 100;

    progressBar.style.width = percent + "%";

    currentTimeText.innerText =
    formatTime(audio.currentTime);

});

// ======================================
// CLICK TO SEEK
// ======================================

const progress =
document.querySelector(".progress");

progress.addEventListener("click", (e)=>{

    const width = progress.clientWidth;

    const clickX = e.offsetX;

    audio.currentTime =
    (clickX / width) * audio.duration;

});

// ======================================
// LOADER
// ======================================

window.addEventListener("load",()=>{

    const loader =
    document.getElementById("loader");

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

    },1200);

});

// ======================================
// FLOATING HEARTS
// ======================================

const heartBox =
document.getElementById("hearts");

function createHeart(){

    const heart =
    document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=
    Math.random()*100+"vw";

    heart.style.fontSize=
    Math.random()*18+18+"px";

    heart.style.animationDuration=
    Math.random()*4+5+"s";

    heartBox.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },9000);

}

setInterval(createHeart,700);

// ======================================
// GLASS MOUSE EFFECT
// ======================================

document.addEventListener("mousemove",(e)=>{

    document.documentElement.style.setProperty(
    "--mouse-x",
    e.clientX+"px"
    );

    document.documentElement.style.setProperty(
    "--mouse-y",
    e.clientY+"px"
    );

});

// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        playPause.click();

    }

    if(e.code==="ArrowRight"){

        nextSong.click();

    }

    if(e.code==="ArrowLeft"){

        prevSong.click();

    }

});

// ======================================
// AUTO PLAY FIRST SONG
// ======================================

function openPlayer(){

    playlistPage.classList.add("hidden");

    playerPage.classList.remove("hidden");

    loadSong(currentSongIndex);

    playSong();

}

// ======================================
// IMAGE ERROR
// ======================================

playerImage.onerror=()=>{

    playerImage.src=
    "images/Logo.png";

};

// ======================================
// AUDIO ERROR
// ======================================

audio.onerror=()=>{

    alert("Song file not found.");

};

// ======================================
// END
// ======================================

