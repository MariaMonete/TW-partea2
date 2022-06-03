var currentPaintingId;

function fetchPaintings() {
    let content = document.getElementById("content");
    let body = document.getElementsByTagName("body")[0];

    let p = document.createElement("p");
    p.innerText = "Loading...";
    p.setAttribute("id", "loading");
    body.appendChild(p);

    fetch('http://localhost:3000/paintings',
          {
              method:'get'
          }).then(function(response)
                          {
                              response.json().then((data)=>
                              {
                                if (data.length)
                                    body.removeChild(p); 

                                for (let i = 0; i < data.length; i++)
                                {
                                    let img = document.createElement("img");
                                    img.setAttribute("src", data[i].img);
                                    img.width = 100;

                                    content.appendChild(img);

                                    let h2 = document.createElement("h2");
                                    h2.innerText = data[i].name;
                                    content.appendChild(h2);

                                    let editButton = document.createElement("button");
                                    editButton.innerText = "Edit";
                                    editButton.onclick = function()
                                    {
                                        document.getElementById("name").value = data[i].name;
                                        document.getElementById("img").value = data[i].img;

                                        currentPaintingId = data[i].id;
                                    }
                                    content.appendChild(editButton);

                                    let deleteButton = document.createElement("button");
                                    deleteButton.innerText = "Delete";
                                    deleteButton.onclick = function()
                                    {
                                        deleteDog(data[i].id);
                                    }
                                    content.appendChild(deleteButton);

                                    let hr = document.createElement("hr");
                                    content.appendChild(hr);
                                }   
                              }
                              )
                          });
}

fetchPaintings();

function addPainting()
{
    let name = document.getElementById("name").value;
    let img = document.getElementById("img").value;

    let newPainting = {
        name: name,
        img: img
    };

    fetch('http://localhost:3000/paintings',
    {
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPainting)
    }).then(function(response)
    {
        window.location.reload();
        console.log(response);
    });
}

function editPainting()
{
    let name = document.getElementById("name").value;
    let img = document.getElementById("img").value;

    let newPainting= {
        name: name,
        img: img
    };
    console.log(currentPaintingId);
    fetch('http://localhost:3000/painting/' + currentPaintingId,
    {
        method:'put',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPainting)
    }).then(function(response)
    {
        window.location.reload();
        console.log(response);
    });
}

function deletePainting(id)
{
    fetch('http://localhost:3000/paintings/' + id,
    {
        method:'delete',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(function(response)
    {
        window.location.reload();
        console.log(response);
    });          
}