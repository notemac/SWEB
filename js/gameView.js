
let View = function() {
    this.cards = document.getElementsByClassName("card");
    this.btnNameGame = document.getElementById("btn-new-game");
    this.btnNext = document.getElementById("btn-next");
    this.level = document.getElementById("level");
    this.score = document.getElementById("score");
    this.time = document.getElementById("time");
    this.onClickCardEvents = [];
    this.onClickNewGameEvent = null;
    this.onClickNextEvent = null;
    this.onTimeoutEvent = null;
    this.onIntervalEvent = null;
    this.timerID = null;
    this.intervalID = null;
    this.failSound = document.querySelector('.fail');
    this.successSound = document.querySelector('.success');
    this.reset();
}

View.prototype.init = function(cardsInfo) {
    this.btnNameGame.addEventListener("click", this.onClickNewGameEvent);
    this.btnNext.addEventListener("click", this.onClickNextEvent);
    for (i = 0; i < this.cards.length; ++i) {
        this.cards[i].addEventListener('click', this.onClickCardEvents[i]);
        // Задаем ширину и высоту для каждой карты
        this.cards[i].width = 130;
        this.cards[i].height = 200;
        // Устанавливаем размер шрифта для каждой карты
        this.cards[i].getContext("2d").font = "100px Arial";
    }
    this.updateCards(cardsInfo);
}

View.prototype.reset = function() {
    this.updateLevel(1);
    this.updateScore(0);
    this.hideBtnNextLevel();
    this.showTime();
}

View.prototype.updateCard = function(id, number)
{
    if (undefined != number) {
        this.showCardWithNumber(id, number);
        this.cards[id].style.boxShadow = "1px 1px 30px 5px green"; 
        this.successSound.play();
    }
    else {
        this.failSound.play();
        this.cards[id].style.boxShadow = "1px 1px 30px 5px red"; 
    }
}
View.prototype.updateCards = function(cardsInfo)
{
    // Скрываем все карты
    for (i = 0; i < this.cards.length; ++i) {
        let ctx = this.cards[i].getContext('2d');
        //АКВАМАРИНОВЫЙ ПРЯМОУГОЛЬНИК
        ctx.fillStyle = "aquamarine";
        ctx.fillRect(2, 2, this.cards[i].width-3, this.cards[i].height-3)
        //РАМКА
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, this.cards[i].width, this.cards[i].height);
        ctx.lineWidth = 1;
        //ШАР
        ctx.beginPath();
        ctx.arc(this.cards[i].width/2, 50, 40,0, 2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        //ВЕРЕВКА
        ctx.beginPath();
        ctx.moveTo(this.cards[i].width/2, 90);
        ctx.quadraticCurveTo(30,115, this.cards[i].width/2, 140);
        ctx.quadraticCurveTo(this.cards[i].width-30,165, this.cards[i].width/2, 190);
        ctx.stroke();
        this.cards[i].style.boxShadow = "none"; 
    } 
    // Отображаем только карты, связанные с числами
    if (undefined != cardsInfo) {
        for (i = 0; i < cardsInfo['id'].length; ++i) {
            this.showCardWithNumber(cardsInfo['id'][i], cardsInfo['number'][i]);
        }
    }
}
View.prototype.showCardWithNumber = function(id, number) {
    let ctx = this.cards[id].getContext('2d');
    //АКВАМАРИНОВЫЙ ПРЯМОУГОЛЬНИК
    ctx.fillStyle = "aquamarine";
    ctx.fillRect(2, 2, this.cards[id].width-3, this.cards[id].height-3)
    //ТЕКСТ
    let gradient = ctx.createLinearGradient(0,0,this.cards[id].width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.9","blue");
    gradient.addColorStop("1.0","black");
    ctx.fillStyle = gradient;
    ctx.fillText(number.toString(), 12, 130); 
}
View.prototype.updateLevel = function(level)
{
    this.level.innerText = "Level: " +  level;
}
View.prototype.updateScore = function(score)
{
    this.score.innerText = "Score: " +  score;
}

View.prototype.showBtnNextLevel = function()
{
    this.btnNext.style.display = "inline-block";
}
View.prototype.hideBtnNextLevel = function()
{
    this.btnNext.style.display = "none";
}
View.prototype.showTime = function()
{
    this.time.style.display = "inline-block";
}
View.prototype.hideTime = function()
{
    this.time.style.display = "none";
}
View.prototype.updateTime = function(time) {
    this.time.innerText = "Time: " + time; 
}
let gameView = new View();