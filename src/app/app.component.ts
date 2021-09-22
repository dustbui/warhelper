
import {
  Component,
  OnInit} from '@angular/core';
import { LocalStorageService } from './common/local-storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  public selectedUnit: any = {};
  public units: any[] = [];
  public unitMap: any;


  constructor(private localStorageService: LocalStorageService) {}


  ngOnInit() {
    this.getStoredUnits();
  }

  private getStoredUnits() {
    console.log(`Retrieving units from localStorage`);
    Object.entries(localStorage);
    this.units = this.localStorageService.getAllUnits();
  }
}
