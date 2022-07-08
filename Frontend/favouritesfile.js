function onLoad() {
  listfavFiles();
  var admin = document.getElementById("usertext");
  admin.innerHTML = "    Hi" + " " + sessionStorage.getItem("UserName");
}
onLoad();

function listfavFiles() {
  try {
    var filecreate = document.getElementById("filemain");
    filecreate.innerHTML = "";
    fetch(
      "http://localhost:58659/api/Documents/favfolderfile?id=" +
        sessionStorage.getItem("FolderId"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((files) => {
        console.log(files);
        files.forEach((file) => {
          50;
          var filecreate = document.getElementById("filemain");
          var fil = document.createElement("div");
          fil.setAttribute("class", "filecs");
          const filname = file.docName;
          const docid = file.docId;
          console.log(filname);
          fil.innerHTML = `<i class="fa fa-file fa-3x" aria-hidden="true style="color:lightblue;">
     <a  style="font-size:15px;text-decoration: none;position: absolute;cursor: pointer; margin:-25px;top:120px;color:black;font-weight:normal;">${filname}</a> 
     </i>
 <i class="fa fa-star" onclick="unfavouritefile(${docid})" style="position:relative;left: 130px;bottom:50px;color:black;"></i>;
 `;

          function unfavouritefile(documentid) {
            var myHeaders = new Headers();
            myHeaders.append("accept", "*/*");

            var requestOptions = {
              method: "PUT",
              headers: myHeaders,
              redirect: "follow",
            };

            fetch(
              "http://localhost:58659/api/Documents/Fileunfavourite?id=" +
                documentid,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
          }
          filecreate.appendChild(fil);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
