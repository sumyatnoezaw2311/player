const list = document.querySelector('.list');
const trackImg = document.querySelector('.track-img');
const olTag = document.querySelector('ol');
const audioTag = document.querySelector('audio');
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const trackTitle = document.querySelector('.trackTitle');
const displayDuration = document.querySelector('.displayDuration');
const currentProgress = document.querySelector('.current-progress');
const listIcon = document.querySelector('.listIcon');
const playArea = document.querySelector('.playArea');
const listArea = document.querySelector('.listArea');


let liTag = "";
let isPlaying = false;
let playId = -1;
let first = listIcon.children[0];
let second = listIcon.children[1];

let tracks =[
    {src:"BAEKHYUN(Beautiful).mp3",title:'Baekhyun - Beautiful',img: 'one.jpg'},
    {src:"EXO(Call ME BABY).mp3",title:'Exo - Call me baby',img:'two.jpg'},
    {src:"EXO(Don't Fight the feeling).mp3",title:'Exo - Don\'t fight the feeling', img:'three.jpg'},
    {src:"EXO(Don't Go).mp3",title:'Exo - Don\'t go', img:'four.jpg'},
    {src:"EXO(Growl).mp3",title:'Exo - Growl',img: 'five.jpg'},
    {src:"EXO(Lotto).mp3",title:'Exo - Lotto', img:'six.jpg'},
    {src:"EXO(Love Me Right).mp3",title:'Exo - Love me right', img:'seven.jpg'},
    {src:"EXO(Love Shop).mp3",title:'Exo - Love Shop', img:'eight.jpg'},
    {src:"EXO(Lucky).mp3",title:'Exo - Lucky', img: 'nine.jpg'},
    {src:"EXO(Monster).mp3",title:'Exo - Monster', img: 'ten.jpg'},
    {src:'EXO(Obsession).mp3',title:'Exo - Obsession', img: 'eleven.jpg'},
    {src:"EXO(Overdose).mp3",title:'Exo - Overdose', img: 'twelve.jpg'},
    {src:"EXO(Tempo).mp3",title:'Exo - Tempo', img: 'thirteen.jpg'},
];

trackImg.style.backgroundImage = `url("img/one.jpg")`;
trackTitle.textContent = tracks[0].title;
//insert liTag
tracks.map(el=>{
    liTag = `<li class="list-group-item" id="${tracks.indexOf(el)}">${el.title}</li>`
    list.innerHTML += liTag;
})
//addeventlistener for each of lists
olTag.addEventListener('click',(event)=>{
    let toPlayId = event.target.id;
    play(toPlayId);
    let x = parseInt(audioTag.id);
    nextId = x;
    if(window.innerWidth < 400){
        listClose();
    }
})
//clicking play button
playBtn.addEventListener('click',()=>{
    runTrackImgAndTitle();
    updatePlayAndPauseButton();
    if(audioTag.src == 'http://localhost:52330/index.html'){
        play(0);
    }else{
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseButton();
    }
})
//clicking pause button
pauseBtn.addEventListener('click',()=>{
    isPlaying = false;
    pauseTrackImgAndTitle();
    updatePlayAndPauseButton();
    audioTag.pause();
})
//clicking next button
nextBtn.addEventListener('click',()=>{
    playId += 1;
    if(playId == tracks.length){
        playId = 0;
    }
    play(playId);
})
//clicking previous button
previousBtn.addEventListener('click',()=>{
    playId -= 1;
    if(playId < 0){
        playId = tracks.length-1;
    }
    play(playId);
})
//clicking icon
listIcon.addEventListener('click',()=>{
    if(listIcon.classList.contains('isOpened')){
        listClose();
    }else{
        listOpen();
    }
})

//functions
function play(id){
    isPlaying = true;
    let src = tracks[id].src;
    audioTag.src = "playList/" + src;
    audioTag.id = id;
    trackImg.style.backgroundImage = `url("img/${tracks[id].img}")`;
    trackTitle.textContent = tracks[id].title;
    audioTag.play();
    trackImg.classList.add('spinner');
    trackTitle.classList.add('animateTitle');
    runTrackImgAndTitle();
    updatePlayAndPauseButton();
    setInterval(()=>{
        let totalMin = Math.floor(audioTag.duration/60);
        let totalSec = Math.floor(audioTag.duration%60);
        let currentMin = Math.floor(audioTag.currentTime/60);
        let currentSec = Math.floor(audioTag.currentTime%60);
        let totalMinText = textFormat(totalMin);
        let totalSecText = textFormat(totalSec);
        let currentMinText = textFormat(currentMin);
        let currentSecText = textFormat(currentSec);
        let percentage = (audioTag.currentTime/audioTag.duration)*100;
        currentProgress.style.width = percentage+"%";
        displayDuration.textContent = `${currentMinText}:${currentSecText} / ${totalMinText}:${totalSecText}`
        if(percentage == 100){
            nextBtn.click();
        }
    },1000)
}

function textFormat(duration){
    let text = duration < 10 ? "0"+ duration : duration;
    return text;
}

function runTrackImgAndTitle(){
    trackImg.classList.remove('pauseState');
    trackImg.classList.add('runState');
    trackTitle.classList.remove('pauseState');
    trackTitle.classList.add('runState');
}

function pauseTrackImgAndTitle(){
    trackImg.classList.remove('runState');
    trackImg.classList.add('pauseState');
    trackTitle.classList.remove('runState');
    trackTitle.classList.add('pauseState');
}

function updatePlayAndPauseButton(){
    if(isPlaying){
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    }else{
        playBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';
    }
}
function listOpen(){
    first.classList.remove('d-flex');
    first.classList.add('d-none');
    second.classList.remove('d-none');
    second.classList.add('d-flex');
    playArea.style.display = 'none';
    listArea.style.display = 'block';
    listIcon.classList.add('isOpened');
}
function listClose(){
    first.classList.add('d-flex');
    first.classList.remove('d-none');
    second.classList.add('d-none');
    second.classList.remove('d-flex');
    playArea.style.display = 'block';
    listArea.style.display = 'none';
    listIcon.classList.remove('isOpened');
}