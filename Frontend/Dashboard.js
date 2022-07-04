
const modal = document.querySelector(".modal");

const trigger = document.getElementById("trigger");

const closeButton = document.querySelector(".close-button");

function toggleModal() {

    modal.classList.toggle("show-modal");

}

function windowOnClick(event) {

    if (event.target === modal) {

        toggleModal();

    }

}

trigger.addEventListener("click", toggleModal);

closeButton.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);


var header = document.getElementById("side");
var list = header.getElementsByClassName("List");
for (var i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "")
      }
      this.className += " active";
    });
  }



    var foldername=document.getElementById("fname");
    var fn= document.getElementById("createbtn");
    fn.addEventListener("click",function(){
         var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://localhost:58659/api/Folder",{
            method:'POST',
    
            // cache: "no-cache",
        
            // credentials: "same-origin",
            headers: myHeaders,
            body:JSON.stringify({
                "FolderName": foldername.value,
                "FCreatedBy": sessionStorage.getItem("Id"),
                "IsDeleted": 0,
                "CreatedAt": new Date().toISOString()
            })
        }).then(res=>{
            return res.text();
        }) .then(data=>console.log(data))
       
        listFolders();
        Location.reload();
        // .catch(error=>console.log(error))
    });

    var dashid=sessionStorage.getItem("Id");
console.log(dashid);
    function listFolders() {
  try
  {
    var foldercreate = document.getElementById("main");
 
    foldercreate.innerHTML = '';
  fetch("http://localhost:58659/api/Folder/FolderId?id="+dashid, {
    method: 'GET'
  })
  .then(response => response.json())
  .then((folders) => {
    console.log(folders);
    folders.forEach(folder => {
    

    var foldercreate = document.getElementById("main");
    var fol = document.createElement("div");
    
    fol.style.width ="240px";
    fol.style.height = "106px";
    fol.style.margin="18px","18px","18px","18px";
    fol.style.background = "white";
    fol.style.display="inline-grid";
    fol.style.padding="20px";
    fol.style.borderRadius="20px";
    fol.style.color="#618f61";
    fol.style.boxShadow="silver";




    // fol.setAttribute("id","stylefol");
    // fol.setAttribute("style","height:100px","width:200px","background-color:blue","border-radius:12px","padding: 15px 14px");
    const folname = folder.folderName;
    const foldid=folder.folderId;
    // fold.style.backgroundColor = "red";
    console.log(folname);
    fol.innerHTML =   `<i class="fa fa-folder fa-3x" aria-hidden="true">
    <a onclick="uploadfile(${foldid})" style="font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
    </i>
    <i class="fa fa-star" aria-hidden="true"onclick="favouritefolder(${foldid})" style="position:relative;left:10px;bottom:-14px;"></i>
    <i class="fa fa-trash fa-1.5px" onclick="Trashfolder(${foldid})" style="position:relative;left: 180px;bottom: 3px;">
  </i> `;
   foldercreate.appendChild(fol);
    });
  })
  }
  catch(err)
  {
    console.log(err);
  }
  
}

function onLoad() {

  listFolders();
  var admin=document.getElementById("usertext");
  admin.innerHTML="    Hi"+" "+sessionStorage.getItem("UserName");
}

onLoad();

function Trashfolder(folder)
{
  var raw = "";

  var requestOptions = {
    method: 'PUT',
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:58659/api/Folder/"+folder, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    location.reload();
}
function uploadfile(foId)
{
sessionStorage.setItem("FolderId",foId);
window.location.href="file.html";
}
function logout()
{
  sessionStorage.clear();
  window.location.href="login.html";
}
function search()
{
  try{
  var searchcontent=document.getElementById("search").value;
  if(searchcontent=="")
  location.reload();

  var foldercreate = document.getElementById("main");
  foldercreate.innerHTML = '';
fetch(`http://localhost:58659/api/Folder/folder/${dashid}/${searchcontent}`,
{
  method:"GET"
})
.then(response => response.json())
.then((folders) => {
  console.log(folders);
  folders.forEach(folder => {
    // debugger;
    var foldercreate = document.getElementById("main");
    var fol = document.createElement("div");
    
    fol.style.width ="240px";
    fol.style.height = "101px";
    fol.style.margin="20px","20px","20px","20px";
    fol.style.background = "white";
    fol.style.display="inline-grid";
    fol.style.padding="20px";
    fol.style.borderRadius="12px";
    fol.style.color="#618f61";


    const folname = folder.folderName;
    const foldid=folder.folderId;
    console.log(folname);
    fol.innerHTML =   `<i class="fa fa-folder fa-2x" aria-hidden="true">
    <button class="addfile" onclick="uploadfile()"></button>
    <a onclick="uploadfile()" style="font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
    </i>
  <i class="fa fa-trash fa-1.5x" onclick="deletefolder(${foldid})" style="position:relative;left: 190px;bottom: -6px;">
  </i> `;
   foldercreate.appendChild(fol);
    });
  })
}
catch(err)
{
  console.log(err);
}
}
