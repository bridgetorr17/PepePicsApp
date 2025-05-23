getFelines();

//popup window logic and event listeners
const popupButton = document.querySelector('#postPopup');
const popupClose = document.querySelector('#popupClose');

popupButton.addEventListener('click', _ => {
    document.getElementById("uploadCat").setAttribute('class', '');
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupContainer").style.display = "block";
    document.getElementById('postMessage').innerHTML = '';
});

popupClose.addEventListener('click', _ => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popupContainer").style.display = "none";
})

//get cat feed from server
function getFelines(){
    try{
        fetch('https://pepe-pics-backend.vercel.app/api/getFelines')
        //fetch('http://localhost:3000/api/getFelines')
        .then(response => response.json())
        .then(data => {
            //add concert data already existing in the DB
            data.forEach((cat) => {
                addElement(cat);
            });
        })
    }
    catch(error){
        console.log(error);
    }
}

//POST a cat photo with JS(handled here to prevent showing photo object from server response)
document.getElementById('uploadCat').addEventListener('submit', async function(event){
    event.preventDefault();

    const formData = new FormData(event.target);

    let message = '';

    try{
        const res = await fetch('https://pepe-pics-backend.vercel.app/api/upload', {
        //const res = await fetch('http://localhost:3000/api/upload',{
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        console.log(data);
        console.log(res.status);
        message = data.message;
        if (res.status === 406){
            document.getElementById('tryAgain').setAttribute('class', '');
            document.getElementById('tryAgain').addEventListener('click', function() {
                // Show the form again
                document.getElementById('postMessage').innerHTML = '';
                document.getElementById('uploadCat').classList.remove('hidden');
                document.getElementById('tryAgain').setAttribute('class', 'hidden');
            });
        }
    }
    catch(error){
        console.log(error);
    }

    //display message from server 
    document.getElementById('postMessage').innerHTML = message;

    //hide the form
    document.getElementById('uploadCat').reset();
    document.getElementById('uploadCat').setAttribute('class', 'hidden');
    
    //reload the page with the updated post
    document.getElementById('catFeedList').innerHTML = "";
    getFelines();
})

function addElement(cat){
    let catFeed = document.getElementById('catFeedList');
    let li = document.createElement('li');
    let img = document.createElement('img');
    let name = document.createElement('span');
    let caption = document.createElement('span');
    let section = document.createElement('section');
    let date = document.createElement('span');

    li.setAttribute('class', 'catPost');
    img.setAttribute('src', cat.url);
    img.setAttribute('class', 'catImage')
    name.setAttribute('class', 'name');
    caption.setAttribute('class', 'caption');
    section.setAttribute('class', 'catContent darkPurple');
    date.setAttribute('class', 'postedOn');
    name.innerHTML = cat.name;
    caption.innerHTML = cat.caption;
    date.innerHTML = "posted on " + cat.createdAt;

    li.appendChild(img);
    li.appendChild(section);
    section.appendChild(name);
    section.appendChild(caption);
    section.append(date);
    catFeed.appendChild(li);
}