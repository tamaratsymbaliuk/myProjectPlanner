const button = document.querySelector('button');

const buttonClickHandler = () => {
    
};

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

