using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CGDriveApplication.Models;
using CGDriveApplication.RequestModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace CGDriveApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly CG_DocsContext _cgDocument;
        private readonly CG_DocsContext _cgfolder;
        private readonly IHostingEnvironment _environment;
        public DocumentsController(CG_DocsContext cgDocument, CG_DocsContext cgfolder, IHostingEnvironment environment)
        {
            _cgDocument = cgDocument;
            _cgfolder = cgfolder;
            _environment = environment;
        }
        [HttpGet("Trashonlyfile")]
        public IActionResult GetTrashonlyfile(int id)
        {
            var getDoc = (from document in _cgDocument.Documents
                         join folder in _cgfolder.Folder on document.FolDocId equals folder.FolderId
                         where (document.IsDeleted == true && folder.IsDeleted == false && folder.FCreatedBy == id)
                         select new Documents
                         {
                            DocId = document.DocId,
                            DocName= document.DocName,
                            ContentType= document.ContentType,
                            Size= document.Size,
                            FolDocId= document.FolDocId,
                         }).ToList();
            
            return Ok(getDoc);
        }
        [HttpGet("favoriteonlyfile")]
        public IActionResult Getfavouriteonlyfile(int id)
        {
            var getfavDoc = (from document in _cgDocument.Documents
                          join folder in _cgfolder.Folder on document.FolDocId equals folder.FolderId
                          where (document.IsFavourite == true && folder.IsFavourite == false && folder.FCreatedBy == id)
                          select new Documents
                          {
                              DocId = document.DocId,
                              DocName = document.DocName,
                              ContentType = document.ContentType,
                              Size = document.Size,
                              FolDocId = document.FolDocId,
                          }).ToList();

            return Ok(getfavDoc);
        }
        [HttpGet("Recentonlyfile")]
        public IActionResult GetRecentonlyfile(int id)
        {
            var createdAt = DateTime.Now.AddMinutes(-30);
            var getrecentDoc = (from document in _cgDocument.Documents
                          join folder in _cgfolder.Folder on document.FolDocId equals folder.FolderId
                          where (document.IsDeleted == false && document.DCreatedAt>=createdAt && document.DCreatedBy==id && folder.IsDeleted == false && folder.FCreatedAt<=createdAt)
                          select new Documents
                          {
                              DocId = document.DocId,
                              DocName = document.DocName,
                              ContentType = document.ContentType,
                              Size = document.Size,
                              FolDocId = document.FolDocId,
                          }).ToList();

            return Ok(getrecentDoc);
        }
        [HttpGet("FolderFile")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cgDocument.Documents.Where(obj => obj.FolDocId == id && obj.IsDeleted==false);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("Trash")]
        public IActionResult TrashGetById(int id)
        {
            try
            {
                var result = _cgDocument.Documents.Where(obj => obj.FolDocId == id && obj.IsDeleted == true);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("favfolderfile")]
        public IActionResult favfile(int id)

        {
            try
            {
                var favfil = _cgDocument.Documents.Where(obj => obj.FolDocId == id && obj.IsFavourite == true);

                if (favfil == null) return NotFound();

                return Ok(favfil);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("RecentFolderFile")]
        public IActionResult GetRecentFolderfile(int folderid)
        {
            var createdAt = DateTime.Now.AddMinutes(-30);
            var res = _cgDocument.Documents.Where(o => o.DCreatedAt >= createdAt && o.FolDocId == folderid && o.IsDeleted == false);
            return Ok(res);
        }

        // POST: api/Documents
        [HttpPost]
        public void Post([FromBody] DocumentRequestModel value)
        {
            var Documents = new Documents()
            {
                DocName = value.DocName,
                ContentType = value.ContentType,
                Size = value.Size,
                DCreatedBy = value.DCreatedBy,
                FolDocId = value.FolDocId
            };
            _cgDocument.Documents.Add(Documents);
            _cgDocument.SaveChanges();
        }
       
        [HttpPost("upload/{folderid}/{createdby}/{createdAt}")]
        public IActionResult Upload(List<IFormFile> files,int folderid,int createdby,DateTime createdAt) 
            
        {

               long fsize = files.Sum(f => f.Length);
            var RootPath = Path.Combine(_environment.ContentRootPath, "Resources", "Documents");

            if (!Directory.Exists(RootPath))
                Directory.CreateDirectory(RootPath);
            foreach (var file in files)
            {
                var filePath = Path.Combine(RootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                        var Documents = new Documents()
                        {
                            DocName = file.FileName,
                            ContentType = file.ContentType,
                            Size = (int)file.Length,
                            FolDocId = folderid,
                            DCreatedBy=createdby,
                            DCreatedAt=createdAt

                        };
                    file.CopyTo(stream);
                    _cgDocument.Documents.Add(Documents);
                    _cgDocument.SaveChanges();
                }
            }
            return Ok(new { count = files.Count, fsize });
        }





        [HttpPut("FileTrash")]
            public void Put(int id)
        {
            var upfile = _cgDocument.Documents.FirstOrDefault(o => o.DocId == id);
            upfile.IsDeleted = true;
            if (upfile.IsFavourite == true)
            {
                upfile.IsFavourite = false;
            }
            _cgDocument.Documents.Update(upfile);
            _cgDocument.SaveChanges();
        }
        [HttpPut("Filerestore")]
        public void Putfilerestore(int id)
        {
            var restorefile = _cgDocument.Documents.FirstOrDefault(o => o.DocId == id);
            restorefile.IsDeleted = false;
            _cgDocument.Documents.Update(restorefile);
            _cgDocument.SaveChanges();
        }
        [HttpPut("Filefavourite")]
        public void Putfilefavourite(int id)
        {
            var favouritefile = _cgDocument.Documents.FirstOrDefault(o => o.DocId == id);
            if(favouritefile.IsDeleted!=true)
            favouritefile.IsFavourite = true;
            _cgDocument.Documents.Update(favouritefile);
            _cgDocument.SaveChanges();
        }
        [HttpPut("Fileunfavourite")]
        public void Putfileunfavourite(int id)
        {
            var unfavouritefile = _cgDocument.Documents.FirstOrDefault(o => o.DocId == id);
            unfavouritefile.IsFavourite =false;
            _cgDocument.Documents.Update(unfavouritefile);
            _cgDocument.SaveChanges();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var delDoc = _cgDocument.Documents.Where(o => o.DocId == id).ToList();
            delDoc.ForEach(res => _cgDocument.Documents.Remove(res));
            _cgDocument.SaveChanges();
        }
        [HttpGet("Document/{id}/{value}")]
        public IActionResult Get(int id, string value)
        {
            var result = _cgDocument.Documents.Where(o => (o.DocName.Contains(value) && o.DCreatedBy == id));
            return Ok(result);
        }
    }
}
