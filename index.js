let cards = document.querySelectorAll('.card');
let flipedCard = false;
let lockBoard =  false
let firstCard,secondCard;
let time = 10;
let flipCount = 0;
let score = 0;
let hasFlippedCard = false;



cards.forEach(card=> card.addEventListener('click',flipCard))

function flipCard(){
    checkWin()
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
    if (isMatch) {
        score += 10; 
        disableCards();
    } else {
        score -= 2;   
        unflipCards();
    }

    updateScoreDisplay();
    checkWin();
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

function checkWin() {
    if (flipCount >= 30) {
        const popUp = document.querySelector('.popUpMsg');
        const layerGround = document.querySelector('.layerGround');
        const totalCards = cards.length;
        const flippedCards = document.querySelectorAll('.card.flip').length;

        // Show overlay and popup
        popUp.style.display = 'flex';
        layerGround.style.display = 'flex';

        cards.forEach(card => card.removeEventListener('click', flipCard));
        let resultHTML = '';

        if (flippedCards === totalCards) {
            resultHTML = `
                <p class="winMsg">🎉 You Win! 😊</p>
                <p class="scoreMsg">Score: ${score}</p>
                <button class="replay">Replay</button>
            `;
        } else {
            resultHTML = `
                <p class="lostMsg">😒 You Lost!</p>
                <p class="scoreMsg">Score: ${score}</p>
                <button class="replay">Replay</button>
            `;
        }

        popUp.innerHTML = resultHTML;
        const replayBtn = popUp.querySelector('.replay');
        replayBtn.addEventListener('click', () => {
            popUp.style.display = 'none';
            layerGround.style.display = 'none';
            resetGame();
        });
    }
}


function resetGame(){
    window.location.reload()
}

