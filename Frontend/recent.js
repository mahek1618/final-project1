var dashid = sessionStorage.getItem("Id");

//function to list folders in recent within 30 mins
function listFolders() {
  try {
    var foldercreate = document.getElementById("main");

    foldercreate.innerHTML = "";
    fetch("http://localhost:58659/api/Folder/Recent?id=" + dashid, {
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
    <a onclick="recentfile(${foldid})" style="color:black;font-weight:normal;font-size:15px;top:70px;left:20px;text-decoration: none;position: absolute;cursor: pointer; margin:20px">${folname}</a> 
    </i>
    `;
          foldercreate.appendChild(fol);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
function recentonlyfiles() {
  try {
    var filecreate = document.getElementById("main");
    filecreate.innerHTML = "";
    fetch("http://localhost:58659/api/Documents/Recentonlyfile?id=" + dashid, {
      method: "GET",
    })
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
      
`;
          filecreate.appendChild(fil);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
onload();
function onload() {
  listFolders();
  recentonlyfiles();
  var admin = document.getElementById("usertext");
  admin.innerHTML = "    Hi" + " " + sessionStorage.getItem("UserName");
}
function recentfile(folder) {
  sessionStorage.setItem("FolderId", folder);
  window.location.href = "recentfile.html";
}
//function to logout
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}