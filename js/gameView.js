
let View = function() {
    this.cards = document.getElementsByClassName("svg-card");
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
        this.cards[id].children[1].style.visibility = "hidden"; //ellipse
        this.cards[id].children[2].style.visibility = "hidden"; //path
        this.cards[id].lastElementChild.innerHTML = number; //text
        this.successSound.play();
    }
    else {
        this.failSound.play();
    }
}
View.prototype.updateCards = function(cardsInfo)
{
    // Скрываем все карты
    for (i = 0; i < this.cards.length; ++i) {
        this.cards[i].children[1].style.visibility = "visible"; //ellipse
        this.cards[i].children[2].style.visibility = "visible"; //path
        this.cards[i].lastElementChild.innerHTML = ""; //text
    } 
    // Отображаем только карты, связанные с числами
    if (undefined != cardsInfo) {
        for (i = 0; i < cardsInfo['id'].length; ++i) {
            this.cards[cardsInfo['id'][i]].children[1].style.visibility = "hidden"; //ellipse
            this.cards[cardsInfo['id'][i]].children[2].style.visibility = "hidden"; //path
            this.cards[cardsInfo['id'][i]].lastElementChild.innerHTML = cardsInfo['number'][i]; //text
        }
    }
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