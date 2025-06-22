let score = JSON.parse(localStorage.getItem('score'))||{
    'win':0,
    'losses':0,
    'tie':0
}
let img1,img2;
let rockButton = document.querySelector('.rock-button');
let paperButton = document.querySelector('.paper-button');
let scissorsButton = document.querySelector('.scissors-button');
let resetButton = document.querySelector('.reset-button');
let autoPlayButton = document.querySelector('.autoplay-button');

rockButton.addEventListener('click',() => announceWinner('rock'));
paperButton.addEventListener('click',() =>announceWinner('paper'));
scissorsButton.addEventListener('click',() => announceWinner('scissors'));
resetButton.addEventListener('click',()=>{
    score.win=0;
    score.losses=0;
    score.tie=0;
    localStorage.removeItem('score')
    document.querySelector('.score').innerHTML = `Wins: ${score.win}, Losses: ${score.losses}, Ties: ${score.tie}`;
})
autoPlayButton.addEventListener('click',autoPlay);

document.querySelector('.score').innerHTML = `Wins: ${score.win}, Losses: ${score.losses}, Ties: ${score.tie}`;
function computerMove(){
    let computer = Math.floor(Math.random()*3);
    if(computer==0) return 'rock';
    if(computer==1) return 'paper';
    if(computer==2) return 'scissors';
}
function announceWinner(user){
 let computer = computerMove();
 let result = ''
    if(user==='rock'){
        if(computer==='rock'){
         result = 'Tie'
        }
        else if(computer==='paper'){
         result = 'You lose!'
        }
        else{
         result = 'You Win!'
       }               
    }

    if(user==='paper'){
       if(computer==='rock') result = 'You Win!';
       else if(computer==='paper') result = 'Tie';
       else result = 'You lose!'
    }

    if(user==='scissors'){
        if(computer==='rock') result = 'You lose!';
        else if(computer==='paper') result = 'You Win!';
        else result = 'Tie';
     }

     if(result==='You Win!') score.win++;
     else if(result==='You lose!') score.losses++;
     else if(result==='Tie')score.tie++;
     localStorage.setItem('score',JSON.stringify(score));
     
     if(!img1&&!img2){
         img1 = document.createElement('img');
         img2 = document.createElement('img');
        document.querySelector('.result2').appendChild(img1);
        document.querySelector('.result2').appendChild(img2);
     }
     img1.src = `images/${user}-emoji.png`
     img2.src = `images/${computer}-emoji.png`;
     document.querySelector('.judgement').innerHTML = `${result}`;
     document.querySelector('.result1').innerHTML = `You`
     
     document.querySelector('.result3').innerHTML = `Computer`
     document.querySelector('.score').innerHTML = `Wins: ${score.win}, Losses: ${score.losses}, Ties: ${score.tie}`;
     
}
let interval;

function autoPlay(){
    let button = document.querySelector('.autoplay-button');
    if(button.innerText==='Auto Play'){
        button.innerHTML = 'Stop Play';
        interval = setInterval(()=>{
            const user = computerMove();
            announceWinner(user);
        },1000)
    }
    else{
        clearInterval(interval);
        button.innerHTML = 'Auto Play';
    }
}
