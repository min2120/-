// code리팩토링 1차  
// 드랍다운 목록 스타일추가 


const p1 = {
    score: 0,
    button: document.querySelector('#player1'),
    display: document.querySelector('#스팬1')
};

const p2 = {
    score: 0,
    button: document.querySelector('#player2'),
    display: document.querySelector('#스팬2')
};

const winScoreSelect = document.querySelector('#winValue');
let WScore = parseInt(winScoreSelect.value);

winScoreSelect.addEventListener('change', function () {
    //this.value !!
    WScore = parseInt(this.value);
    resetfuc();
});

let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1
        if (player.score === WScore) {
            isGameOver = true;

            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
            player.button.classList.add('un');
            opponent.button.classList.add('un');
        }
        player.display.textContent = player.score;
    }
};

p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
});

p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
});

const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', resetfuc);

function resetfuc() {
    isGameOver = false;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('winner', 'loser');
        p.button.classList.remove('un');
    };

    // p1.score = 0;
    // p2.score = 0;
    // p1.display.textContent = 0;
    // p2.display.textContent = 0;

    // p1.display.classList.remove('winner', 'loser');
    // p2.display.classList.remove('winner', 'loser');

    // p1.button.classList.remove('un');
    // p2.button.classList.remove('un');
};