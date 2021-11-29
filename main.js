const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray) {
      this._fieldArray = fieldArray;
      this._currentLine = 0;
      this._currentPosition = 0;
    }
  
    get fieldArray() {
      return this._fieldArray
    }


    // Print current state of field to console.
    showField() {
        const joinedArrays = this._fieldArray.map(arr => arr.join(''))
        console.log(joinedArrays.join('\n'))
    }

    // Prompt user for input
    getUserMove() {
        const move = prompt('Which way? ');
        if (move !== 'u' && move !== 'd' && move !== 'l' && move !== 'r') {
            console.log('Invalid move')
        } else {
            this.moveUser(move);
        }
    }

    // Handle movement and position - When user clicks l, d, u or r move the cursor in the required direction.
    moveUser(move) {
        if (move === 'r') {
            if (this._currentPosition > this._currentLine.length - 1) {
                console.log(this._currentLine, this._currentPosition)
                console.log('Invalid move');
                this.getUserMove();
            } else {
                this._currentPosition += 1;
                let newPosition = this._fieldArray[this._currentLine][this._currentPosition];
                if (this.checkResult(newPosition)) {
                    this._fieldArray[this._currentLine][this._currentPosition] = pathCharacter;
                    this.showField();
                    this.getUserMove();
                }
            }
        } else if (move === 'l') {
            if (this._currentPosition === 0) {
                console.log('Invalid move');
                this.getUserMove();
            } else {
                this._currentPosition -= 1;
                let newPosition = this._fieldArray[this._currentLine][this._currentPosition];
                if (this.checkResult(newPosition)) {
                    this._fieldArray[this._currentLine][this._currentPosition] = pathCharacter;
                    this.showField();
                    this.getUserMove();
                }
        }
        }  else if (move === 'd') {
            if (this._currentLine === this._fieldArray.length - 1) {
                console.log('Invalid move');
                this.getUserMove();
            } else {
                this._currentLine += 1;
                let newPosition = this._fieldArray[this._currentLine][this._currentPosition];
                if (this.checkResult(newPosition)) {
                    this._fieldArray[this._currentLine][this._currentPosition] = pathCharacter;
                    this.showField();
                    this.getUserMove();
                }
        }
        } else if (move === 'u') {
            if (this._currentLine === 0) {
                console.log('Invalid move');
                this.getUserMove();
            } else {
                this._currentLine -= 1;
                let newPosition = this._fieldArray[this._currentLine][this._currentPosition];
                if (this.checkResult(newPosition)) {
                    this._fieldArray[this._currentLine][this._currentPosition] = pathCharacter;
                    this.showField();
                    this.getUserMove();
                }
        }
        }
    }

    checkResult(char) {
        
        // If character at position is 0 then end game and inform user.
        if (char === 'O') {
            console.log('You fell down a hole! Try again..')
            this.newGameQuestion()
            return false
            
        // If character at position is ^ then end game and inform user of win.
        } else if ( char === '^') {
            console.log('You won! Play again?')
            this.newGameQuestion()
            return false;
        } else {
            return true;
        }


    }

    // Generate a new grid (Note: when restarting game this will automatically be a 5x5 grid. This has been hard coded below)
    static generateField(height, width) {
        const baseArr = [];
        const selectionArr = [hole, fieldCharacter]
        for (let i = 0; i < height; i++) {
            baseArr.push([]);
        }

        for (let arr of baseArr) {
            for (let j = 0; j < width; j++) {
                arr[j] = selectionArr[(Math.floor(Math.random()*2))]
            }
        }

        baseArr[0][0] = pathCharacter;
        baseArr[Math.floor(Math.random()* height)][Math.floor(Math.random()*width)] = hat;
        console.log(baseArr);
        return baseArr;
    } 

    // Start game
    start() {
        this.showField()
        return this.getUserMove();
    }

    // Prompt user if they want to play again
    newGameQuestion() {
        let newGame = prompt('Do you want to play again? (y/n)')
        newGame = newGame.toLowerCase()
        if (newGame === 'y') {
            const newField = Field.generateField(5, 5);
            this._fieldArray = newField;
            this._currentLine = 0;
            this._currentPosition = 0;
            this.start()
        } else if (newGame === 'n') {
            console.log('Thanks for playing');
            return 0;
        } else {
            console.log('Sorry I didnt understand that..')
            this.newGameQuestion();
        }
    }
  
    
  }
  
  
  
const fieldArr = Field.generateField(5, 5);
const gameStart = new Field(fieldArr);

gameStart.start();