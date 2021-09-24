import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
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
  public editData: any;
  public error: string = '';
  public tempEditData: any = {};
  public editing: boolean = false;
  public editorOptions: JsonEditorOptions = new JsonEditorOptions();
  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  constructor(private appComponent: AppComponent, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.getStoredUnits();
  }

  private getStoredUnits() {
    console.log(`Retrieving units from localStorage`);
    Object.entries(localStorage);
    this.units = this.localStorageService.getAllUnits();
    this.units = this.units.sort((x: any, y: any): number => {
      if (x.name < y.name) return -1;
      else if (x.name > y.name) return 1;
      return 0;
    });
    this.appComponent.createUnitMap(this.units);
  }

  public removeUnit(unit: any, index: number) {
    const response = confirm(`Are you sure you want to remove ${unit.name}?`);
    if (!response) { return; }
    this.localStorageService.remove(`unit:${unit.name}`);
    this.units.splice(index, 1);
    console.log(`Removed unit: ${unit.name}`);
  }

  public editUnit(unit: any) {
    this.editing = true;
    this.editData = unit;
  }

  public jsonEditorOnChange(event: any) {
    this.tempEditData = event;
  }

  public saveEdits(unit: any) {
    this.editing = false;
    this.localStorageService.set(`unit:${unit.name}`, this.tempEditData);
    this.getStoredUnits();
  }

  public cancelEdits() {
    this.editData = {};
    this.editing = false;
  }

  public uploadFile(event: any) {
    let files = event.currentTarget.files;
    let readers = [];

    // Abort if there were no files selected
    if (!files.length) return;

    // Store promises in array
    for (let i = 0; i < files.length; i++) {
        readers.push(this.readFileAsText(files[i], this.error));
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

  public readFileAsText(file: File, error: string) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        try {
          const parsedFile = JSON.parse(fr.result!.toString());
          console.log(`Stored JSON file: ${file.name}`);
          resolve(parsedFile);
        } catch (e: any) {
          alert(`${file.name} ERROR: ${e}`);
          throw e;
        }
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsText(file);
    });
  }
}
