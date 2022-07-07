
var dashid=sessionStorage.getItem("Id");

    
function listFolders() {
    try
    {
      var foldercreate = document.getElementById("main");
   
      foldercreate.innerHTML = '';
    fetch("http://localhost:58659/api/Folder/favorite?id="+dashid, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      console.log(folders);
      folders.forEach(folder => {
      
  
      var foldercreate = document.getElementById("main");
      var fol = document.createElement("div");
      fol.setAttribute("class", "foldercs");
      
      
      fol.style.width ="180px";
      fol.style.height = "106px";
      fol.style.margin="18px","18px","18px","18px";
      fol.style.background = "white";
      fol.style.display="inline-grid";
      fol.style.padding="20px";
      fol.style.borderRadius="20px";
      fol.style.color="#618f61";
      fol.style.boxShadow="0px 10px lightgrey";
  
  
  
  
  
      // fol.setAttribute("id","stylefol");
      // fol.setAttribute("style","height:100px","width:200px","background-color:blue","border-radius:12px","padding: 15px 14px");
      const folname = folder.folderName;
      const foldid=folder.folderId;
      // fold.style.backgroundColor = "red";
      console.log(folname);
      fol.innerHTML =   `
      <i class="fa fa-folder fa-3x" aria-hidden="true" style="color:lightgrey;cursor:pointer;color:lightblue">
    <a onclick="favfile(${foldid})" style="color:black;font-weight:normal;font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
    </i>
    <i class="fa fa-trash fa-1.5px" onclick="Trashfolder(${foldid})" style="position:relative;left:130px;bottom:-15px;"></i>
    <i class="fa fa-info-circle" style="position:relative;left: 3px;bottom: 1px;"></i>
    <i class="fa fa-star-o" onclick="favorites(${foldid})" style="position:relative;left: 130px;bottom:90px;"></i>
    `;
     foldercreate.appendChild(fol);
      });
    })
    }
    catch(err)
    {
      console.log(err);
    }

  }
  onload();
function onload() {
    listFolders();
      var admin=document.getElementById("usertext");
      admin.innerHTML="    Hi"+" "+sessionStorage.getItem("UserName");
    }
    function favfile(folder)
    {
        sessionStorage.setItem("FolderId",folder);
        window.location.href="favouritesfile.html";
    }