


var Controller = function(View, Model) {
    this.gameView = View;
    this.gameModel = Model;
}

Controller.prototype.init = function() {
    this.gameView.onClickNewGameEvent = this.onClickNewGameEvent.bind(this);
    this.gameView.onClickNextEvent = this.onClickNextEvent.bind(this);
    for(i = 0; i < this.gameView.cards.length; ++i)
        this.gameView.onClickCardEvents.push(this.onClickCardEvent.bind(this, i));

    this.gameView.init(this.gameModel.init());
    this.gameView.onTimeoutEvent = this.onTimeoutEvent.bind(this);
    this.gameView.onIntervalEvent = this.onIntervalEvent.bind(this);
    this.gameView.timerID = setTimeout(this.gameView.onTimeoutEvent, TIMEOUT + INTERVAL);
    this.gameView.intervalID = setInterval(this.gameView.onIntervalEvent, INTERVAL);
};

Controller.prototype.onClickNewGameEvent = function() {
    this.gameModel.reset();
    this.gameView.reset();
    this.gameView.updateCards(this.gameModel.updateCards());
    clearTimeout(this.gameView.timerID);
    this.gameView.timerID = setTimeout(this.gameView.onTimeoutEvent, TIMEOUT + INTERVAL);
    clearInterval(this.gameView.intervalID);
    this.gameView.intervalID = setInterval(this.gameView.onIntervalEvent, INTERVAL);
}

Controller.prototype.onClickNextEvent = function() {
    this.gameModel.setBusy(true);
    this.gameModel.setRemainingTime(TIMEOUT);
    this.gameView.hideBtnNextLevel();
    this.gameView.updateLevel(this.gameModel.nextLevel());
    this.gameView.updateCards(this.gameModel.updateCards());
    this.gameView.timerID = setTimeout(this.gameView.onTimeoutEvent, TIMEOUT + INTERVAL);
    this.gameView.intervalID = setInterval(this.gameView.onIntervalEvent, INTERVAL);
    this.gameView.showTime();
}

Controller.prototype.onClickCardEvent = function(id)
{
    if (!this.gameModel.isGameOver() && !this.gameModel.isBusy() && !this.gameModel.isNextLevel()) 
    {
        if (this.gameModel.isCorrectCard(id)) 
        {
            this.gameView.updateCard(id, this.gameModel.removeCard(id));
            if (this.gameModel.isNextLevel())
            {
                this.gameView.updateScore(this.gameModel.updateScore());
                if (this.gameModel.isGameOver()) return;
                this.gameView.showBtnNextLevel();
            }
        }
        else
        {
            //this.gameView.fail();
            this.gameModel.setGameOver(true);
            this.gameView.updateCard(id);
        }
    }
}
 
Controller.prototype.onTimeoutEvent = function() {
    this.gameModel.setBusy(false);
    this.gameView.updateCards();
    clearInterval(this.gameView.intervalID);
    this.gameView.hideTime();
}

Controller.prototype.onIntervalEvent = function() {
    this.gameModel.setRemainingTime(this.gameModel.getRemainingTime() - INTERVAL);
    this.gameView.updateTime(this.gameModel.getRemainingTime());
}

var gameController= new Controller(gameView, gameModel);
gameController.init();