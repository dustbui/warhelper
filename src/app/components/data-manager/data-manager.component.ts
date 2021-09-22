import {
  Component,
  OnInit
} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import {
  LocalStorageService
} from 'src/app/common/local-storage-service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.scss']
})
export class DataManagerComponent implements OnInit {
  public units: any[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.getStoredUnits();
  }

  private getStoredUnits() {
    console.log(`Retrieving units from localStorage`);
    Object.entries(localStorage);
    this.units = this.localStorageService.getAllUnits();
  }

  public removeUnit(unit: any, index: number) {
    this.localStorageService.remove(`unit:${unit.name}`);
    this.units.splice(index, 1);
    console.log(`Removed unit: ${unit.name}`);
  }

  public uploadFile(event: any) {
    let files = event.currentTarget.files;
    let readers = [];

    // Abort if there were no files selected
    if (!files.length) return;

    // Store promises in array
    for (let i = 0; i < files.length; i++) {
      readers.push(this.readFileAsText(files[i]));
    }

    // Trigger Promises
    Promise.all(readers).then((values) => {
      values.forEach((value:any) => {
        this.localStorageService.set(`unit:${value.name}`, value);
        console.log(value);
      });
      this.getStoredUnits();
    });
  }

  public readFileAsText(file: File) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        const parsedFile = JSON.parse(fr.result!.toString());
        console.log(`Stored JSON file: ${file.name}`);
        resolve(parsedFile);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsText(file);
    });
  }
}
