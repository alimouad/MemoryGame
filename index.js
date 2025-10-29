let cards = document.querySelectorAll('.card');
let flipedCard = false;
let lockBoard =  false
let firstCard,secondCard;
let time = 10;
let flipCount = 0;
let hasFlippedCard = false;



cards.forEach(card=> card.addEventListener('click',flipCard))

function flipCard(){

    if (lockBoard) return;
    if (this === firstCard) return;

    flipCount++;
    document.querySelector('.flips').textContent = flipCount;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;  
    } else {
        secondCard = this;
        hasFlippedCard = false;
        checkForMatch();   // now compare both cards
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.frame === secondCard.dataset.frame;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Matched cards stay flipped and unclickable
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function shuffle(){
    cards.forEach(card => {
        let randwPo = Math.floor(Math.random() * 16);
        card.style.order = randwPo;
    })
};
shuffle();


// function startPlay(){
//      let generate = setInterval(() => {
//         //  const minute = Math.floor(time / 60)
//          let seconds = time % 60;
//          time--;
          
//             if(seconds === 0){
//                time = 0;
//                     clearInterval(generate)                  
//                    cards.forEach(card => {
//                     card.removeEventListener('click',flipCard)
//                     if(!card.classList.contains('flip')){
//                          console.log('ali you lose')
//                     }               
//                 })
//             }
//         }, 1000);
// }