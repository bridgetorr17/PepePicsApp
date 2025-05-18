getFelines();

//popup window logic and event listeners
const popupButton = document.querySelector('#postPopup');
const popupClose = document.querySelector('#popupClose');

popupButton.addEventListener('click', _ => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupContainer").style.display = "block";
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

    try{
        const res = await fetch('https://pepe-pics-backend.vercel.app/api/upload', {
        //const res = await fetch('http://localhost:3000/api/upload',{
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }

    //reload the page with the updated post
    document.getElementById('catFeedList').innerHTML = "";
    document.getElementById('postMessage').innerHTML = "Thank you for your post"
    document.getElementById('uploadCat').reset();
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