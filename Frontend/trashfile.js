function onLoad() {
  listFiles();
  var admin = document.getElementById("usertext");
  admin.innerHTML = "    Hi" + " " + sessionStorage.getItem("UserName");
}
onLoad();

//function to list all deleted files of a folder
function listFiles() {
  try {
    var filecreate = document.getElementById("filemain");
    filecreate.innerHTML = "";
    fetch(
      "http://localhost:58659/api/Documents/Trash?id=" +
        sessionStorage.getItem("FolderId"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((files) => {
        console.log(files);
        files.forEach((file) => {
          var filecreate = document.getElementById("filemain");
          var fil = document.createElement("div");
          fil.setAttribute("class", "filecs");
          const docname = file.docName;
          const docid = file.docId;
          fil.innerHTML = `<a><i class="fa fa-file fa-2x" aria-hidden="true" style="color:lightblue";></i></a><br />
          <p  style="font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin-top:3%;color:black;font-weight:normal;overflow:hidden;">${docname}</p> 
          <i class="fa fa-undo" onclick="filerestore(${docid})" style="position:relative;bottom:-15px;"></i>
          <i class="fa fa-trash fa-1.5px" onclick='deletefile(${docid})' style="position:relative;left: 130px;">
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