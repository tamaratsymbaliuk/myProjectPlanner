const button = document.querySelector('button');

const buttonClickHandler = event => {
    consol
    
};

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

