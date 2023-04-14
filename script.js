let runningTotal = 0;
let buffer = "0";
let previousOperator = 0;

const screen = document.querySelector('.screen');

function butttonClick(value){
    if (isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C': 
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null){
                return
            }
            flushOperator(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = '0'
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;  
    }
}
function handleMath(symbol){
    if (buffer === '0'){
        return
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer
    }else{
        flushOperator(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}
function flushOperator(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if (previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if (previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}
function handleNumber(numberString){
    if (buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-button').addEventListener('click', function(event){
        butttonClick(event.target.innerText);
    })
}

init();