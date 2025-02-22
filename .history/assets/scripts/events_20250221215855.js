const button = document.querySelector('button');

const buttonClickHandler = () => {
    alert('Button was clicked!');
};

button.addEventListener('click', buttonClickHandler);

setTimeout(, 2)
button.removeEventListener('click');
