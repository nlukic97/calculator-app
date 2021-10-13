//init
init()


/** ---------- Methods ---------- */
//event listener
let radioButtons = document.querySelectorAll('.theme-button')

radioButtons.forEach(radio=>{
    radio.addEventListener('change',function(){
        changeTheme(this.value)
    })
})



function init(){
    let savedThemePref = localStorage.getItem('theme')
    if(savedThemePref){
        affectSelectedRadioBtn(savedThemePref)
    } else {
        affectSelectedRadioBtn(getSystemThemePreference())
    }
}


//returns the classname to be applied to the html tag to apply based on the preferred color scheme
function getSystemThemePreference(){
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark-theme' : 'light-theme';
}


//add the 'selected' attribute to the radio button (called only upon load based on localStorage or system preference data), and call the changeTheme function
function affectSelectedRadioBtn(value){
    let radio = document.querySelector(`.theme-button[value="${value}"]`)
    radio.checked = true;
    radio.setAttribute('selected','')

    changeTheme(value)
}


//change the class on the html tag, and change the local storage for the preferred theme
function changeTheme(theme){
    document.querySelector('html').classList = '';
    document.querySelector('html').classList = theme;
    localStorage.setItem('theme',theme)
}

