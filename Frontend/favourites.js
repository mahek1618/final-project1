var dashid = sessionStorage.getItem("Id");

function listFolders() {
  try {
    var foldercreate = document.getElementById("main");

    foldercreate.innerHTML = "";
    fetch("http://localhost:58659/api/Folder/favorite?id=" + dashid, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        folders.forEach((folder) => {
          var foldercreate = document.getElementById("main");
          var fol = document.createElement("div");
          fol.setAttribute("class", "foldercs");

          const folname = folder.folderName;
          const foldid = folder.folderId;

          fol.innerHTML = `
      <i class="fa fa-folder fa-3x" aria-hidden="true" style="color:lightgrey;cursor:pointer;color:lightblue">
    <a onclick="favfile(${foldid})" style="color:black;font-weight:normal;font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
    </i>
   
    <i class="fa fa-star" onclick="unfavorite(${foldid})" style="position:relative;left: 130px;bottom:60px;color:black;"></i>
    `;
          foldercreate.appendChild(fol);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

//function to unfavorite folder
function unfavorite(folder) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://localhost:58659/api/Folder/Unfavourites?id=" + folder,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}
function listonlyfavfile() {
  try {
    var filecreate = document.getElementById("main");
    filecreate.innerHTML = "";
    fetch(
      "http://localhost:58659/api/Documents/favoriteonlyfile?id=" + dashid,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((files) => {
        console.log(files);

        files.forEach((file) => {
          var filecreate = document.getElementById("main");
          var fil = document.createElement("div");
          fil.setAttribute("class", "foldercs");
          const docname = file.docName;
          const docid = file.docId;
          console.log(docname);
          console.log(docid);
          fil.innerHTML = `<a><i class="fa fa-file fa-3x" aria-hidden="true" style="color:lightblue";></i></a><br />
    <p  style="font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin-top:5%;color:black;font-weight:normal;overflow:hidden;">${docname}</p> 
    
   
<i class="fa fa-star" onclick="unfavouritefile(${docid})" style="position:relative;left: 130px;bottom:60px;color:black;"></i>`;
          filecreate.appendChild(fil);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

//function to unfavorite file
function unfavouritefile(documentid) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://localhost:58659/api/Documents/Fileunfavourite?id=" + documentid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}
onload();
function onload() {
  listFolders();
  listonlyfavfile();
  var admin = document.getElementById("usertext");
  admin.innerHTML = "    Hi" + " " + sessionStorage.getItem("UserName");
}
function favfile(folder) {
  sessionStorage.setItem("FolderId", folder);
  window.location.href = "favouritesfile.html";
}
//function to logout
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}