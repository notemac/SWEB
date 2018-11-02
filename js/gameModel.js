

const START_LEVEL = 1;
const MAX_LEVEL = 7;
const START_SCORE = 0;
const TIMEOUT = 5000;
const INTERVAL = 200;

function new_shuffle_array(elems) {
    _elems = elems.slice();
    let length = _elems.length;
    // While there are elements in the array
    while (length > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * length);
        --length;
        // And swap the last element with it
        let temp = _elems[length];
        _elems[length] = _elems[index];
        _elems[index] = temp;
    }
    return _elems;
}


var Model = function () {}

Model.prototype.init = function(){
    this.reset();
    return this.updateCards();
}

Model.prototype.reset = function() {
    this.level = START_LEVEL;
    this.score = START_SCORE;
    this.busy = true; // TRUE, пока дается время для запоминания
    this.gameOver = false;
    this.cards = [];
    this.numbers = [];
    this.remainingTime = TIMEOUT;
}

Model.prototype.updateCards = function() {
    // Выбираем рандомно карты, на которых будут изображены числа (количество карт = level + 1)
    // Выбираем рандомно числа, которые будут изображены на картах
    ids = new_shuffle_array([1, 2, 3, 4, 5, 6, 7, 8]);
    nums = new_shuffle_array(ids);
    for(i = 0; i < this.level + 1; ++i)
    {
        this.cards.push(ids[i]-1);
        this.numbers.push(10*nums[i]);
    }
    // Сортируем по возрастанию чисел
    for(i = 0; i < this.level; ++i) 
    {
        for(j = i + 1; j < this.level + 1; ++j) 
        {
            if (this.numbers[i] > this.numbers[j])
            {
                this.numbers.splice(i, 0, this.numbers.splice(j, 1)[0]);
                this.cards.splice(i, 0, this.cards.splice(j, 1)[0]);
            }
        }
    }
    return {'id': this.cards, 'number': this.numbers};
}

Model.prototype.isCorrectCard = function(id) {
    //return ((this.cards[0] != undefined) && (this.cards[0] == id));
    return (id == this.cards[0]);
}

Model.prototype.removeCard = function(id) {
    this.cards.shift(); //Игрок выбрал правильную карту, значит удаляем ее
    let number = this.numbers.shift(); //Также удаляем число, связанное с картой
    return number;
}
Model.prototype.updateScore = function() {
    this.score += this.level;
    return this.score;
}

Model.prototype.isNextLevel = function() {
    return (0 == this.cards.length);
}

Model.prototype.nextLevel = function() {
    return ++this.level;
}

Model.prototype.isBusy = function() {
    return this.busy;
}
Model.prototype.setBusy = function(busy) {
    this.busy = busy;
}
Model.prototype.isGameOver = function() {
    if ((MAX_LEVEL == this.level) && this.isNextLevel())
        this.gameOver = true;
    return this.gameOver;
}
Model.prototype.setGameOver = function(gameOver) {
    this.gameOver = gameOver;
}
Model.prototype.getRemainingTime = function() { return this.remainingTime; }
Model.prototype.setRemainingTime = function(time) { this.remainingTime = time; }

let gameModel = new Model();
