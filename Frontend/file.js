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

function onLoad() {
    listFiles();
    var admin=document.getElementById("usertext");
    admin.innerHTML="Hi"+" "+sessionStorage.getItem("UserName");
  }
  onLoad();
  function logout()
  {

      sessionStorage.clear();
      window.location.href="login.html";
  }
  var userid=sessionStorage.getItem("Id");
  var name=sessionStorage.getItem("UserName");
  var folderid=sessionStorage.getItem("FolderId");

//   var filename=document.getElementById("createfile").value;
//   console.log(filename);
//     var fn= document.getElementById("createfilebtn");
//   fn.addEventListener("click",function(){
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     fetch("http://localhost:58659/api/Documents",{
//         method:'POST',

//         // cache: "no-cache",
    
//         // credentials: "same-origin",
//         headers: myHeaders,
//         body:JSON.stringify({
//             "DocumentName": filename,
//             "createdAt": curr.toISOString(),
//             "isDeleted": 0,
//             "contentType": "c#",
//             "size": 200,
//             "createdBy": userid,
//             "folderId": folderid
//         })
//     }).then(res=>{
//         return res.text();
//     }) .then(data=>console.log(data))
//     listFiles();
//     loaction.reload();
//   })
  function uploadfile() {
     try{
   
    var filepath= document.getElementById("myfile").files[0];
   
    var uploadT=new Date();
console.log(filepath);
var myHeaders = new Headers();
myHeaders.append("accept", "*/*");

var formdata = new FormData();
formdata.append("files", filepath);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
fetch("http://localhost:58659/api/Documents/upload/"+folderid+"/"+userid+"/"+uploadT.toISOString(), requestOptions)
 // .then(response => response.text())
  .then(result => console.log(result))
     }
     
  catch(err){
   console.log(err);
  }
  listFiles();
  location.reload();
}

  function listFiles()
  {
    try
    {
      var filecreate = document.getElementById("filemain");
      filecreate.innerHTML = '';
    fetch("http://localhost:58659/api/Documents/"+sessionStorage.getItem("FolderId"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then((files) => {
      console.log(files);
      files.forEach(file => {
      
  
      var filecreate = document.getElementById("filemain");
      var fil = document.createElement("div");
      
      fil.style.width ="260px";
      fil.style.height = "116px";
      fil.style.margin="20px","20px","20px","20px";
       fil.style.background = "white";
      fil.style.display="inline-grid";
      fil.style.padding="20px";
      fil.style.borderRadius="12px";
      fil.style.color="#618f61";
  
  
  
  
      // fol.setAttribute("id","stylefol");
      // fol.setAttribute("style","height:100px","width:200px","background-color:blue","border-radius:12px","padding: 15px 14px");
      const filname = file.docName;
      const docid=file.docId;
     // const Fileid=file.DocId;
      // fold.style.backgroundColor = "red";
      console.log(filname);
      fil.innerHTML =   `<i class="fa fa-folder fa-3x" aria-hidden="true">
      <a  style="font-size:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${filname}</a> 
      </i>
      <i class="fa fa-trash fa-1.5px" onclick="trashfile(${docid})" style="position:relative;left: 200px;bottom: 1px;">
  </i>`;
  
 
     filecreate.appendChild(fil);
      });
    })
    
    }
    catch(err)
    {
      console.log(err);
    }
  }
  Location.reload();
  function trashfile(file)
{
  var raw = "";

  var requestOptions = {
    method: 'PUT',
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:58659/api/Documents/FileTrash?id="+file, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    sessionStorage.setItem("Documentid",file);
    location.reload();
}
function search()
{
  try{
  var searchcontent=document.getElementById("search").value;
  if(searchcontent=="")
  location.reload();
  var filecreate = document.getElementById("filemain");
      filecreate.innerHTML = '';
    fetch(`http://localhost:58659/api/Documents/Document/${dashid}/${searchcontent}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((files) => {
      console.log(files);
      files.forEach(file => {
      
  
      var filecreate = document.getElementById("filemain");
      var fil = document.createElement("div");
      
      fil.style.width ="260px";
      fil.style.height = "116px";
      fil.style.margin="20px","20px","20px","20px";
       fil.style.background = "white";
      fil.style.display="inline-grid";
      fil.style.padding="20px";
      fil.style.borderRadius="12px";
      fil.style.color="#618f61";
  
  
  
  
      // fol.setAttribute("id","stylefol");
      // fol.setAttribute("style","height:100px","width:200px","background-color:blue","border-radius:12px","padding: 15px 14px");
      const filname = file.docName;
      const docid=file.docId;
     // const Fileid=file.DocId;
      // fold.style.backgroundColor = "red";
      console.log(filname);
      fil.innerHTML =   `<i class="fa fa-folder fa-3x" aria-hidden="true">
      <a  style="font-size:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${filname}</a> 
      </i>
      <i class="fa fa-trash fa-1.5px" onclick="deletefolder(${docid})" style="position:relative;left: 200px;bottom: 1px;">
  </i>`;
  
 
     filecreate.appendChild(fil);
      });
    })
    
    }
    catch(err)
    {
      console.log(err);
    }
}
