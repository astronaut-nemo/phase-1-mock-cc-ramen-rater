// write your code here
// See all the ramen images in the div ramen-menu
// Click on an image and see it's details in ramen-detail
// Create a new ramen on submitting the new-ramen form, does not need to persist

document.addEventListener('DOMContentLoaded', () => {
    // Get and display all the ramen images
    getRamenDetails()

    // Add an event listener for submitting the form
    const form = document.getElementById('new-ramen');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createNewRamen(event)
        form.reset();
    })
})

function getRamenDetails(){
    fetch('http://localhost:3000/ramens').then((response) => response.json()).then((data) => data.forEach(ramen => displayRamenMenu(ramen)))
}

function displayRamenMenu(ramen){
    // Get the ramen menu <div> element
    const ramenMenu = document.getElementById('ramen-menu');

    // Create an <img> element
    const ramenImg = document.createElement('img');
    // Set the src attribute to the ramen's image URL
    ramenImg.setAttribute('src', ramen.image);
    // Give images an id based on their server id (makes it easier to access their details later)
    ramenImg.setAttribute('id', ramen.id);

    // Add event listener for displaying the details
    ramenImg.addEventListener('click', () => displayRamenDetails(ramen));

    // Append to the ramen menu
    ramenMenu.appendChild(ramenImg);
}

function displayRamenDetails(ramen){
    // Change the image source to the ramen's image
    document.querySelector('.detail-image').setAttribute('src', ramen.image);
    // Change the ramen name
    document.querySelector('.name').textContent = ramen.name;
    // Change the restaurant name
    document.querySelector('.restaurant').textContent = ramen.restaurant;

    // Change the rating
    document.querySelector('#rating-display').textContent = ramen.rating;

    // Change the comment
    document.querySelector('#comment-display').textContent = ramen.comment;
}

function createNewRamen(event){
    // Get each input and assign it to a variable
    const newRamenName = event.target[0].value;
    const newRamenRest = event.target[1].value;
    const newRamenImg = event.target[2].value;
    const newRamenRating = event.target[3].value;
    const newRamenComment = event.target[4].value;

    // Put the inputs into an object
    const newRamen ={
        name: newRamenName,
        restaurant: newRamenRest,
        image: newRamenImg,
        rating: newRamenRating,
        comment: newRamenComment
    }

    // Display the new ramen in the Menu and Details (non-persistent)
    displayRamenMenu(newRamen)
    displayRamenDetails(newRamen)
}