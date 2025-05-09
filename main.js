try{
    fetch('http://localhost:3000/api/getFelines')
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

function addElement(cat){
    console.log(cat);
}