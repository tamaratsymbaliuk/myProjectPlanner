const button = document.querySelector('button');

/*const buttonClickHandler = event => {
    console.log(event);
    
};

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

window.addEventListener('scroll' , event => {
    console.log(event);
})
*/

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event);
})

// the only div we have in events.html
const div = document.querySelector('div');
div.addEventListener('click', event => {
    console.log('Clicked DIV');
    console.log(event);
});



button.addEventListener('click',  event => {
    event.stopPropagation();
    console.log('Clicked Button');
    console.log(event);
});

const listItems = document.querySelectorAll('li');

/*listItems.forEach(listItem => {
    listItem.addEventListener('click', event => {
        event.target.classList.toggle('highlight');
    });
});
*/
// instead of creating multiple event listeners, better approach would be

const list = document.querySelector('ul');
list.addEventListener('c')



