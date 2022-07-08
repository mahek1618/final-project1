var dashid = sessionStorage.getItem("Id");
const Docid = sessionStorage.getItem("Documentid");
console.log(Docid);
onLoad();
function onLoad() {
  listFolders();
  listonlyFiles();
  var admin = document.getElementById("usertext");
  admin.innerHTML = "    Hi" + " " + sessionStorage.getItem("UserName");
}

//function to list folders
function listFolders() {
  try {
    var foldercreate = document.getElementById("main");

    foldercreate.innerHTML = "";
    fetch("http://localhost:58659/api/Folder/Trash?id=" + dashid, {
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
          fol.innerHTML = `<i class="fa fa-folder fa-3x" style="color:lightblue; aria-hidden="true;cursor:pointer">
      <a onclick="trashedfile(${foldid})" style="color:black;font-weight:normal;font-size:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
      </i>
      <i class="fa fa-undo" onclick="restore(${foldid})" style="position:relative;bottom:-15px;"></i>
    <i class="fa fa-trash fa-1.5px" onclick="deletefolder(${foldid})" style="position:relative;left: 130px;bottom: 1px;">
    </i>`;
          foldercreate.appendChild(fol);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

//function to delete a folder
function deletefolder(folder) {
  var requestOptions = {
    method: "DELETE",
    body: "raw",
    redirect: "follow",
  };

  fetch("http://localhost:58659/api/Folder/" + folder, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}

//function to restore a folder from trash
function restore(resfol) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://localhost:58659/api/Folder/Restore?id=" + resfol,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}
function listonlyFiles() {
  try {
    var filecreate = document.getElementById("main");
    filecreate.innerHTML = "";
    fetch("http://localhost:58659/api/Documents/Trashonlyfile?id=" + dashid, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((files) => {
        console.log(files);

        files.forEach((file) => {
          var filecreate = document.getElementById("main");
          var fil = document.createElement("div");
          fil.setAttribute("class", "filecs");
          const docname = file.docName;
          const docid = file.docId;
          console.log(docname);
          console.log(docid);
          fil.innerHTML = `<a><i class="fa fa-file fa-3x" aria-hidden="true" style="color:lightblue";></i></a><br />
    <p  style="font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin-top:5%;color:black;font-weight:normal;overflow:hidden;">${docname}</p> 
    <i class="fa fa-undo" onclick="filerestore(${docid})" style="position:relative;bottom:-15px;"></i>
    <i class="fa fa-trash fa-1.5px" onclick='deletefile(${docid})' style="position:relative;left: 100px;margin-top:10%;">
</i>`;
          filecreate.appendChild(fil);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

//function to delete a file
function deletefile(fileid) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:58659/api/Documents/" + fileid, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}

//functionn to restore a file from trash
function filerestore(documentid) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://localhost:58659/api/Documents/Filerestore?id=" + documentid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  location.reload();
}
function trashedfile(foId) {
  sessionStorage.setItem("FolderId", foId);
  window.location.href = "trashfile.html";
}

var header = document.getElementById("side");
var list = header.getElementsByClassName("List");
for (var i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
}
//function to logout
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}