import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tilte= "anda";
    
    public uploader:FileUploader = new FileUploader({url:"RL"});
      public hasBaseDropZoneOver:boolean = false;
      public hasAnotherDropZoneOver:boolean = false;

       constructor()
     {
      this.uploader.onBeforeUploadItem=(item)=>
      {

        console.info("item",item);
        // para evitar el error del cors
        //https://github.com/valor-software/ng2-file-upload/issues/140
        item.withCredentials=false;
      }

     }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
