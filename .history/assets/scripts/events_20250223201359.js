const button = document.querySelector('button');

const buttonClickHandler = event => {
    console
    
};

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

