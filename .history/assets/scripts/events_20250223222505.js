const button = document.querySelector('button');

const buttonClickHandler = event => {
    console.log(event);
    
};

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

window.addEventListener('scroll' , event => {
    console.log(event);
})

const form = document.querySelector('form')

