
    let gameSeq = [];
    let userSeq = [];

    let btns = ["yellow", "red", "blue", "green"];
    let started = false;
    let level = 0;
    
    let highScore = JSON.parse(localStorage.getItem('highScore')) || 0;


    let levelShow = document.querySelector(".level");

    document.addEventListener("keypress", () => {
        if(started == false){
            started = true;

            levelUp();
        }
    })


    function buttonFlash(btn){
        btn.classList.add("flash");

        setTimeout(() => {
            btn.classList.remove("flash");
        }, 200);
    }

    function checkBtn(idx) {

        if(level > highScore){
            highScore = level;
            localStorage.setItem('highScore',JSON.stringify(highScore));
        }

        if(idx == gameSeq.length-1){

            if(userSeq[idx] === gameSeq[idx]){
                setTimeout(levelUp, 1000);
            }
            else{
                levelShow.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press Any Key To Start Again <br> HighScore: ${highScore}`;
                gameOver();
            }
        }

        if(userSeq[idx] !== gameSeq[idx]){
            levelShow.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press Any Key To Start Again <br> HighScore: ${highScore}`;
            gameOver();
        }
           
    }

    function gameOver() {
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        },150);

         gameSeq = [];
         userSeq = [];
         started = false;
         level = 0;
    }

    function randomFlash() {
        let randIdx = Math.floor(Math.random() * 4);

        let randomColor = btns[randIdx];
        let randBtn = document.querySelector(`.${randomColor}`);

        gameSeq.push(randomColor);
        buttonFlash(randBtn);
    }

    function levelUp(){
        userSeq = [];
        level++;
        levelShow.innerHTML = `Level ${level}`;
        randomFlash();
    }

    function btnPress() {
        let btn = this;
        buttonFlash(btn);
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkBtn(userSeq.length-1);
    }

    let allBtns = document.querySelectorAll(".btn");

    for(btn of allBtns){
        btn.addEventListener('click', btnPress);
    }
