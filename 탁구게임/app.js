

// 일정점수 도달하면 2 to 5에 색변환 효과. 
// 숫자 밑 문구 Use the buttons below to keep score. 
// 로 변경 점수올리는 버튼 비활성화(색변함)


// const span1, span2;
// const span1 = document.querySelector('#span1');
// const span2 = document.querySelector('#span2');

const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')

const 스팬1 = document.querySelector('#스팬1')
const 스팬2 = document.querySelector('#스팬2')


let p1Score = 0;
let p2Score = 0;


const winScoreSelect = document.querySelector('#winValue')

let WScore = parseInt(winScoreSelect.value);

winScoreSelect.addEventListener('change', function () {

    //this.value !!
    WScore = parseInt(this.value);
    resetfuc();
})



// document.querySelectorAll('option')[].value;




let isGameOver = false;

player1.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1
        if (p1Score === WScore) {
            isGameOver = true;

            스팬1.classList.add('winner');
            스팬2.classList.add('loser');
            player1.classList.add('un');
            player2.classList.add('un');
        }
        스팬1.textContent = p1Score;
    }
})

player2.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1
        if (p2Score === WScore) {
            isGameOver = true;

            스팬2.classList.add('winner');
            스팬1.classList.add('loser');
            player1.classList.add('un');
            player2.classList.add('un');

        }
        스팬2.textContent = p2Score;
    }
})


const resetBtn = document.querySelector('#resetBtn')

resetBtn.addEventListener('click', resetfuc)

function resetfuc() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    스팬1.textContent = 0;
    스팬2.textContent = 0;

    스팬2.classList.remove('winner', 'loser');
    스팬1.classList.remove('winner', 'loser');
}

// function() {
//     return span += 1;
// };

// const 버튼 = function (버튼) {
//     this.addEventListener('click', function () {

//     });

//     if (점수 달성하면) {
//     버튼 1, 2 색 바뀌고 비활성화;
//     }
// }

// const 리셋버튼 = document.querySelector('#resetBtn');
// 리셋버튼.addEventListener('click', function(){
//     span1,2 0으로 초기화되고
//     버튼 1, 2 색 바뀌고 활성화;

// })

// const btn1 = document.querySelector('#player1');
// btn1.addEventListener('click', function () {
//     console.log('hi');
// })