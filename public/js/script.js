let formula = ''

//init
addListeners()


/** ---------- Methods ---------- */
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


// function to calculate final result
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
    
    let arrayOfOperations = stringToArr(formula)
    let result = performCalculation(arrayOfOperations)[0]
    return result.toString()
    
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


//returns true if the last character is an integer (specifically, if it is not a mathemathical operation or a dot/comma)
function isLastCharInteger(string){
    let char = string[string.length-1]
    return (char == '-' || char == '+' || char == '*' || char == '/' || char == '.') ? false : true;
}


//adding event listeners for all the calculator buttons
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
                console.log(formula);
                
            } else if(char.toLowerCase() == 'reset'){
                formula = ''
                
            }
            
            updateDashboard('.dashboard-text', formula)
        })
    })
}



function stringToArr(string){
    // var symbolArr = '25-1.333/2-2-2*2-3*2/12'
    string = string.replaceAll('-',' - ').replaceAll('+',' + ').replaceAll('*',' * ').replaceAll('/',' / ').trim(' ').split(' ');
    
    if(string[0] === '-' || string[0] === '+'){
        string[1] = string[0] + string[1]
        string.shift()
    }

    return string;

}


//function. Default values that must be present
function performCalculation(arr, symbol1 = '*',symbol2 = '/'){
    if(arr.length <= 1){
        return arr;
    }

    var found = false;
    var i = 0;    

    while(found === false && i <= arr.length - 1){        
        if(arr[i] === symbol1 || arr[i] === symbol2){
            found = true;

            arr[i] = window[operations[arr[i]]](arr[i-1], arr[i+1])
            arr.splice(i+1,1); arr.splice(i-1,1);

            //reccursive method to continue searching for and perform multiplication and division
            return performCalculation(arr,'*','/')

        } 

        i++;
        
    }

    if(found === false){ // this means that this round of the while loop did not find any * or / operations, time to move to + and -
         
        //reccursive method to search for and perform multiplication and division
        return performCalculation(arr,'+','-')
    }

}


const operations = {
    '*':'multiply',
    '/':'divide',
    '+':'add',
    '-':'subtract',
}


// operations - will be called based on the operations keys in the performCalculation method
function add(x,y){
    return parseFloat(x) + parseFloat(y)
}

function subtract(x,y){
    return parseFloat(x) - parseFloat(y)
}

function multiply(x,y){
    return parseFloat(x) * parseFloat(y)
}
function divide(x,y){
    return parseFloat(x) / parseFloat(y)
}

