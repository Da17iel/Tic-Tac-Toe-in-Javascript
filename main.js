AllFields = [
    't-l', 't-m', 't-r',
    'm-l', 'm-m', 'm-r',
    'b-l', 'b-m', 'b-r',
]

UserPlayer = {
PlayerIcon: 'X',
Positions: [],
PotentialPosition: [],
Counter: 0,
WinningValue: 1,
}

Machine = {
PlayerIcon: 'O',
Positions: [],
PotentialPosition: [],
Counter: 0,
WinningValue: -1,
}

GameEnded = false
PotentialGameEnded = false

// Place the Icon on said Field
function Place(Player, Position) {
    document.getElementById(Position).innerHTML = Player.PlayerIcon;
    document.getElementById(Position).setAttribute("disabled", "true")

    Player.Positions.push(AllFields.splice(AllFields.indexOf(Position), 1).join());
}


// Check if one Party has wont the game
function CheckGameStatus(Player) {
    // We will have to check for every winning condition manually
    let WinCon1 = ['t-l', 't-m', 't-r'] // Horizontal
    let WinCon2 = ['m-l', 'm-m', 'm-r']
    let WinCon3 = ['b-l', 'b-m', 'b-r']
    
    let WinCon4 = ['t-l', 'm-l', 'b-l'] // Vertical
    let WinCon5 = ['t-m', 'm-m', 'b-m']
    let WinCon6 = ['t-r', 'm-r', 'b-r']
    
    let WinCon7 = ['t-l', 'm-m', 'b-r'] // Diagonal
    let WinCon8 = ['t-r', 'm-m', 'b-l']
    let AllWinCon = [WinCon1, WinCon2, WinCon3, WinCon4, WinCon5, WinCon6, WinCon7, WinCon8]

    // Check for every possible winning condition
    for (let i = 0; i < AllWinCon.length; i++) {
        if (AllWinCon[i].every(elem => Player.Positions.includes(elem))) {
            EndGame();

            FieldsThatWon = AllWinCon[i]
            
            for (let a = 0; a < FieldsThatWon.length; a++) {
                document.getElementById(FieldsThatWon[a]).style.backgroundColor = "lightgreen";
            }
            // Someone Won
            return true;
        }
    }
}



function EndGame() {
    GameEnded = true
    AllFields = document.getElementById('playing-field').getElementsByTagName('button');

    for (let i = 0; i < AllFields.length; i++) {
        AllFields[i].setAttribute('disabled', 'true');
    }
}

// Reset all the playing values so another match can start
function resetField() {
    GameEnded = false

    AllFields = [
        't-l', 't-m', 't-r',
        'm-l', 'm-m', 'm-r',
        'b-l', 'b-m', 'b-r',
    ]
    AllFields = document.getElementById('playing-field').getElementsByTagName('button');
    UserPlayer.Positions = [];
    Machine.Positions = [];

    for (let i = 0; i < AllFields.length; i++) {
        AllFields[i].innerHTML = "";
        AllFields[i].style.backgroundColor = ""
        AllFields[i].removeAttribute('disabled');
    }
}

// Recieve the User Input and Validate it
function UserInput(InputString) {
    Place(UserPlayer, InputString)

    CheckGameStatus(UserPlayer)
    
    if (AllFields.length != 0) {
        TurnMachine()
    }
}




// Let the Machine decide what turn it wants to do
function TurnMachine() {
    if (!GameEnded) {

        if (document.getElementById('easy').checked) {
            // The game is set to easy
            ChosenPosition = AllFields[Math.floor(Math.random() * (AllFields.length - 1))];
            Place(Machine, ChosenPosition)
            CheckGameStatus(Machine)

        } else {
            // The game is set to hard
            ChosenPosition = NextAiMove();
            Place(Machine, ChosenPosition)
            CheckGameStatus(Machine)
        }
    }
}

function NextAiMove() {
    while (true) {
        // Vars for a Fresh Simulation
        let SimAllFields = AllFields
        let MoveArray = []
        let WinningArray = []


        for (let i = 0; i < SimAllFields.length; i++) {
            rndField = SimAllFields[Math.floor(Math.random() * (SimAllFields.length - 1))]
            MoveArray.push(rndField)
            console.log(rndField)
            TheoreticalPlace(SimAllFields, Machine, rndField)
            console.log("Placed in: " + rndField + ", " + SimAllFields.length + " left")

            if (checkTurn(Machine)) {
                WinningArray = MoveArray
                console.log("Machine would win")
                break;
            }
            


            rndField = SimAllFields[Math.floor(Math.random() * (SimAllFields.length - 1))]
            TheoreticalPlace(SimAllFields, UserPlayer, rndField)
        }

        if (WinningArray != []) {
            return WinningArray[0];
        }
    }
}


TheoreticalAllFields = [
    't-l', 't-m', 't-r',
    'm-l', 'm-m', 'm-r',
    'b-l', 'b-m', 'b-r',
]

function TheoreticalPlace(Field, Player, Position) {
    Player.PotentialPosition.push(Field.splice(Field.indexOf(Position), 1).join());
}


function checkTurn(Player) {
    // We will have to check for every winning condition manually
    let WinCon1 = ['t-l', 't-m', 't-r'] // Horizontal
    let WinCon2 = ['m-l', 'm-m', 'm-r']
    let WinCon3 = ['b-l', 'b-m', 'b-r']
    
    let WinCon4 = ['t-l', 'm-l', 'b-l'] // Vertical
    let WinCon5 = ['t-m', 'm-m', 'b-m']
    let WinCon6 = ['t-r', 'm-r', 'b-r']
    
    let WinCon7 = ['t-l', 'm-m', 'b-r'] // Diagonal
    let WinCon8 = ['t-r', 'm-m', 'b-l']
    let AllWinCon = [WinCon1, WinCon2, WinCon3, WinCon4, WinCon5, WinCon6, WinCon7, WinCon8]

    // Check for every possible winning condition
    for (let i = 0; i < AllWinCon.length; i++) {
        if (AllWinCon[i].every(elem => Player.PotentialPosition.includes(elem))) {
            PotentialGameEnded = true
            FieldsThatWon = AllWinCon[i]

            // Player Won
            return true;
        }
    }
    return false;
}

// Function to explore all possible moves
function PossibleSteps() {
    TheoreticalAllFields = AllFields
    while (TheoreticalAllFields.length > 0 && PotentialGameEnded == false) {

                
        if (TheoreticalAllFields.length > 0 && PotentialGameEnded == false) {
            let Result = MakeARotation(Machine)
            if (Result == -1) {
                WinningPossibilities.push(MoveArray);
                console.log("Machine Won")
            }
        }
        
        if (TheoreticalAllFields.length > 0 && PotentialGameEnded == false) {
            let Result = MakeARotation(UserPlayer)
            if (Result == 1) {
                LoosingPossibilities.push(MoveArray);
                console.log("Player Won")
            }
        }

    }
    console.log(MoveArray)
}

// Simulates a move of a player
function MakeARotation(Player) {
    rndField = TheoreticalAllFields[Math.floor(Math.random() * (TheoreticalAllFields.length - 1))]
    TheoreticalPlace(Player, rndField)

    if (Player.WinningValue == -1) {
        // This is only for the bot
        MoveArray.push(rndField);
    }
    

    if (checkTurn(Player)) {
        return Player.WinningValue;
    } else {
        return "";
    }
    
}