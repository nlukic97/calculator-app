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
    return (char == '-' || char == '+' || char == '*' || char == '/' || char == '.')? false : true;
}

// function 
function calculate(givenNumbers){
    //will not execute if user presses = before entering anything
    if(givenNumbers === '') return null
    
    //removing all the hanging symbols from the end in case there are any (just in case, maybe it's not necessary)
    while(isLastCharInteger(givenNumbers) === false){ 
        givenNumbers = removeLastChar(givenNumbers)
    }
    
    return Function('return (' + givenNumbers + ')')().toString();
}

function removeLastChar(string){
    return string.substring(0,string.length-1)
}



// Functionalities
/*
1. When I press +, it must add a plus to the string. If I press -, it will add a minus
2. If I press a +, and then a - straight away, it will change the character from + to - (but it doesn't have to be so)
3. same thing goes for all for signs (*, /, +, and -)
4. The string I am saving will be the string the user sees
5. pressing del deletes the last item.
6. if i press equals, it will make sure that there is no sybmol at the end, and return the calculation
7. the first element must be a number, or a - sign
8. maybe remove everything after the last number ?
9. delete (remove lastSymbol)
*/

function addListeners(){
    let btns = document.querySelectorAll('.calc-buttons .btn')
    
    btns.forEach(btn=>{
        btn.addEventListener('click',function(){
            // let check = parseInt()
            let char = this.innerText
            if(!isNaN(char)){
                newNumber(char)

            } else if(char == '-' || char == '+'|| char == '/' || char == '.'){
                newOperation(char)
                
            } else if(char == 'x') {
                newOperation('*')
                
            } else if(char == '='){
                formula = calculate(formula);
                console.log(formula);

            } else if(char.toLowerCase() == 'del'){
                formula = removeLastChar(formula)

            } else if(char.toLowerCase() == 'reset'){
                formula = ''

            }
        })
    })
}

addListeners()