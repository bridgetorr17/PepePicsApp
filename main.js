//get cat feed from server
try{
    fetch('https://pepe-pics-backend.vercel.app/api/getFelines')
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

//POST a cat photo with JS(handled here to prevent showing photo object from server response)
document.getElementById('uploadCat').addEventListener('submit', async function(event){
    event.preventDefault();

    const formData = new FormData(event.target);

    try{
        const res = await fetch('https://pepe-pics-backend.vercel.app/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
})

function addElement(cat){
    let catFeed = document.getElementById('catFeedList');
    let li = document.createElement('li');
    let img = document.createElement('img');
    let name = document.createElement('span');
    let caption = document.createElement('span');

    img.setAttribute('src', cat.url);
    name.innerHTML = cat.name;
    caption.innerHTML = cat.caption;

    li.appendChild(img);
    li.appendChild(name);
    li.appendChild(caption);
    catFeed.appendChild(li);
}