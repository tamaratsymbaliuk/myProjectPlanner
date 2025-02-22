const button = document.querySelector('button');

const buttonClickHandler = () => {
    alert('Button was clicked!');
};

button.addEventListener('click', buttonClickHandler);

setTimeout(, 2000);
button.removeEventListener('click');
