const button = document.querySelector('button');

const buttonClickHandler = event => {
    console.log()
    
};

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

