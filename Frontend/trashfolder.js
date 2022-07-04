
 var dashid=sessionStorage.getItem("Id");
 const Docid=sessionStorage.getItem("Documentid");
console.log(Docid);
 onLoad();
 function onLoad() {
  listFolders();
  listonlyFiles();
    var admin=document.getElementById("usertext");
    admin.innerHTML="    Hi"+" "+sessionStorage.getItem("UserName");
  }
  
function listFolders() {
    
    try
    {
      var foldercreate = document.getElementById("main");
   
      foldercreate.innerHTML = '';
    fetch("http://localhost:58659/api/Folder/Trash?id="+dashid, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      console.log(folders);
      folders.forEach(folder => {
      
  
      var foldercreate = document.getElementById("main");
      var fol = document.createElement("div");
      
      fol.style.width ="260px";
      fol.style.height = "116px";
      fol.style.margin="20px","20px","20px","20px";
       fol.style.background = "white";
      fol.style.display="inline-grid";
      fol.style.padding="20px";
      fol.style.borderRadius="12px";
      fol.style.color="#618f61";
  
  
  
  
      // fol.setAttribute("id","stylefol");
      // fol.setAttribute("style","height:100px","width:200px","background-color:blue","border-radius:12px","padding: 15px 14px");
      const folname = folder.folderName;
      const foldid=folder.folderId;
      // fold.style.backgroundColor = "red";
      console.log(folname);
      fol.innerHTML =   `<i class="fa fa-folder fa-3x" aria-hidden="true">
      <a onclick="trashedfile(${foldid})" style="font-size:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
      </i>
  
    <i class="fa fa-trash fa-1.5px" onclick="deletefolder(${foldid})" style="position:relative;left: 200px;bottom: 1px;">
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

  function deletefolder(folder)
{
    var requestOptions = {
        method: 'DELETE',
        body:'raw',
        redirect: 'follow'
      };
      
      fetch("http://localhost:58659/api/Folder/"+folder, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    location.reload();
}
function listonlyFiles()
{

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:58659/api/Documents/onlyfile?id="+Docid, requestOptions)
      .then(response => response.text())
      .then(result => 
        {
            var foldercreate = document.getElementById("main");
            var fol = document.createElement("div");
            
            fol.style.width ="260px";
            fol.style.height = "116px";
            fol.style.margin="20px","20px","20px","20px";
             fol.style.background = "white";
            fol.style.display="inline-grid";
            fol.style.padding="20px";
            fol.style.borderRadius="12px";
            fol.style.color="#618f61";
        
        
        
        
            // fol.setAttribute("id","stylefol");
            // fol.setAttribute("style","height:100px","width:200px","background-color:blue","border-radius:12px","padding: 15px 14px");
            const folname = result.DocName;
            const foldid=result.DocId;
            // fold.style.backgroundColor = "red";
            console.log(folname);
            fol.innerHTML =   `<i class="fa fa-file fa-3x" aria-hidden="true">
            <a onclick="trashedfile(${foldid})" style="font-size:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
            </i>
        
          <i class="fa fa-trash fa-1.5px" onclick="deletefolder(${foldid})" style="position:relative;left: 200px;bottom: 1px;">
          </i> `;
           foldercreate.appendChild(fol);
        })
      .catch(error => console.log('error', error));
}
function trashedfile(foId)
{
sessionStorage.setItem("FolderId",foId);
window.location.href="trashfile.html";
}



var header = document.getElementById("side");
var list = header.getElementsByClassName("List");
for (var i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";

    });

  }