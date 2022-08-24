FieldPositions = [
                't-l', 't-m', 't-r',
                'm-l', 'm-m', 'm-r',
                'b-l', 'b-m', 'b-r',
            ]

function UserInput(InputString) {
    document.getElementById(InputString).innerHTML = "X";
    document.getElementById(InputString).setAttribute("disabled", "true")
    removePosition(InputString)
    
    if (FieldPositions.length != 0) {
        TurnAI()
    }
    
}

function TurnAI() {
    ChosenPosition = FieldPositions[Math.floor(Math.random() * (FieldPositions.length - 1))];
    document.getElementById(ChosenPosition).innerHTML = "O";
    document.getElementById(ChosenPosition).setAttribute("disabled", "true")
    removePosition(ChosenPosition)
}

function removePosition(position) {
    FieldPositions.splice(FieldPositions.indexOf(position), 1);

    console.log("Removed Position " + position + " from accessible Positions")
}

function resetField() {
    FieldPositions = [
        't-l', 't-m', 't-r',
        'm-l', 'm-m', 'm-r',
        'b-l', 'b-m', 'b-r',
    ]
    AllFields = document.getElementById('playing-field').getElementsByTagName('button');

    for (let i = 0; i < AllFields.length; i++) {
        AllFields[i].innerHTML = "";
        AllFields[i].removeAttribute('disabled');
    }

}