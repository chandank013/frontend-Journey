let userScore = 0;
let compScore = 0;
let rounds = 0;


const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg")

const userScorepara=document.querySelector("#user-score");
const compScorepara=document.querySelector("#comp-score");

const getCompChoice = () => {
    const options = ["rock","paper","scissors"];
    // rock,paper, scissors
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame = ()=> {
    msg.innerText ="Game was Draw Play again."
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin,userChoice,compChoice)=> {
    if(userWin){
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText =`🎉 You Win! Your ${userChoice} beats ${compChoice}`
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText =`😢 You Lose. ${compChoice} beats Your ${userChoice}`
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    console.log("User choice is: ",userChoice);
    // Generate computer choice -> moduler
    const compChoice = getCompChoice();
    console.log("Computer choice is: ",compChoice);

    if (userChoice===compChoice) {
        drawGame();
    } 
    else {
        let userWin = true;
        if (userChoice==="rock") {
            // scissors, paper
            userWin=compChoice==="paper" ? false : true;
        }else if (userChoice==="paper") {
            userWin=compChoice==="scissors" ? false : true;
        }
        else {
            // rock, paper
            userWin=compChoice==="rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
        // Increase rounds count
    rounds++;

    // Check for game over after 10 rounds
    if (rounds === 10) {
        if (userScore > compScore) {
            msg.innerText = `🎉 Game Over! You win the match ${userScore} - ${compScore}`;
            msg.style.backgroundColor = "green";
        } else if (compScore > userScore) {
            msg.innerText = `😢 Game Over! Computer wins the match ${compScore} - ${userScore}`;
            msg.style.backgroundColor = "red";
        } else {
            msg.innerText = `🤝 Game Over! It's a draw ${userScore} - ${compScore}`;
            msg.style.backgroundColor = "#081b31";
        }

        // Disable further clicks
        choices.forEach((choice) => {
            choice.style.pointerEvents = "none";
        });
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});


// code for again start the game from beggining;
const resetButton = document.querySelector("#button");

resetButton.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    rounds = 0;
    userScorepara.innerText = userScore;
    compScorepara.innerText = compScore;
    msg.innerText = "Game reset. Play your move!";
    msg.style.backgroundColor = "#081b31";

    // Re-enable choices
    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
    });
});