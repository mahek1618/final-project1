
onLoad();
function onLoad() {
list_trashfiles();
   var admin=document.getElementById("usertext");
   admin.innerHTML="    Hi"+" "+sessionStorage.getItem("UserName");
 }
 var dashid=sessionStorage.getItem("Id");
function list_trashfiles() {
    debugger;
    
    try
    {
      var filecreate = document.getElementById("main");
   
      filecreate.innerHTML = '';
    fetch("http://localhost:58659/api/Documents/onlyfile?="+dashid, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((files) => {
      console.log(files);
      files.forEach(file => {
        debugger;
      
      var filecreate = document.getElementById("main");
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
      const filname = file.DocName;
    //   const foldid=folder.folderId;
      // fold.style.backgroundColor = "red";
      console.log(filname);
      fol.innerHTML =   `<i class="fa fa-folder fa-3x" aria-hidden="true">
      <a onclick="trashedfile(${foldid})" style="font-size:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${filname}</a> 
      </i>
  
    <i class="fa fa-trash fa-1.5px" onclick="deletefolder(${foldid})" style="position:relative;left: 200px;bottom: 1px;">
    </i> `;
     filecreate.appendChild(fil);
      });
    })
    
    }
    catch(err)
    {
      console.log(err);
    }
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