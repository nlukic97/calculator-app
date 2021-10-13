let formula = ''

//adding a +, -, *, /, or . to 'formula'
function newOperation(symbol){
    if(isLastCharInteger(formula)){
        formula += symbol
    } else {
        formula = removeLastChar(formula) + symbol //remove last symbol, and add the new one at the end if it is a math operation(or dot/comma)
    }
}

//adding a number from the calculator
function newNumber(number){
    formula += number
}

//returns true if the last character is an integer (specifically, if it is not a mathemathical operation or a dot/comma)
function isLastCharInteger(string){
    let char = string[string.length-1]
    return (char == '-' || char == '+' || char == '*' || char == '/' || char == '.') ? false : true;
}

// function 
function calculate(givenNumbers){
    //will not execute if user presses = before entering anything
    if(givenNumbers === '') return '';
    
    //removing all the hanging symbols from the end in case there are any (just in case, maybe it's not necessary)
    while(isLastCharInteger(givenNumbers) === false){ 
        givenNumbers = removeLastChar(givenNumbers)
    }

    if(givenNumbers === ''){
        return givenNumbers;
    }
    
    return Function('return (' + givenNumbers + ')')().toString();
}

function removeLastChar(string){
    return string.substring(0,string.length-1)
}

function updateDashboard(querySelector, value){
    if(value != ''){
        value.replaceAll('*','x')
    }
    document.querySelector(querySelector).innerText = value
}

function isFormulaEmpty(sring){
    return (string === '' || string === null) ? true : false;
}


function addListeners(){
    let btns = document.querySelectorAll('.calc-buttons .btn')
    
    btns.forEach(btn=>{
        btn.addEventListener('click',function(){
            let char = this.innerText

            if(!isNaN(char)){
                newNumber(char)

            } else if(char == '-' || char == '+'){
                newOperation(char)
                
            }  else if(char == '/' || char == '.'){
                if(formula === ''){
                    return //do not allow symbol to be added
                }
                newOperation(char)
            }
            
            else if(char == 'x') {
                if(formula === ''){
                    return //do not allow symbol to be added
                }
                newOperation('*')
                
            } else if(char == '='){
                formula = calculate(formula);

            } else if(char.toLowerCase() == 'del'){
                formula = removeLastChar(formula)

            } else if(char.toLowerCase() == 'reset'){
                formula = ''

            }

            updateDashboard('.dashboard-text', formula)
        })
    })
}


//init
addListeners()

/*
- the first thing a user types cannot be / or x(*)
- the last thing cannot be a symbol
*/