let radioButtons = document.querySelectorAll('.theme-label')

radioButtons.forEach(btn=>{
    console.log(btn.attributes.for.nodeValue);
})