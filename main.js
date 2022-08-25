FieldPositions = [
                't-l', 't-m', 't-r',
                'm-l', 'm-m', 'm-r',
                'b-l', 'b-m', 'b-r',
            ]

UserPlayer = {
    PlayerIcon: 'X',
    Positions: [],
    Counter: 0
}

Machine = {
    PlayerIcon: 'O',
    Positions: [],
    Counter: 0
}

GameEnded = false


// Place the Icon on said Field
function PlaceInPosition(Player, Position) {
    document.getElementById(Position).innerHTML = Player.PlayerIcon;
    document.getElementById(Position).setAttribute("disabled", "true")

    Player.Positions.push(FieldPositions.splice(FieldPositions.indexOf(Position), 1).join());
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

    FieldPositions = [
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
    PlaceInPosition(UserPlayer, InputString)

    CheckGameStatus(UserPlayer)
    
    if (FieldPositions.length != 0) {
        TurnMachine()
        CheckGameStatus(Machine)
    }

    

}

// Let the Machine decide what turn it wants to do
function TurnMachine() {
    if (!GameEnded) {
        ChosenPosition = FieldPositions[Math.floor(Math.random() * (FieldPositions.length - 1))];
        PlaceInPosition(Machine, ChosenPosition)
    }
}
