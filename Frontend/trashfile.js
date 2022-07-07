
 

 function onLoad() {
     listFiles();
    var admin=document.getElementById("usertext");
    admin.innerHTML="    Hi"+" "+sessionStorage.getItem("UserName");
  }
  onLoad();

function listFiles()
  {
    try
    {
      var filecreate = document.getElementById("filemain");
      filecreate.innerHTML = '';
    fetch("http://localhost:58659/api/Documents/TrashDocId?id="+sessionStorage.getItem("FolderId"), {
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
      fil.innerHTML =   `<i class="fa fa-folder fa-3x" aria-hidden="true" style="color:lightblue;">
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