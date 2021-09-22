import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  getAllUnits() {
    const units: any[] = [];
    Object.keys(localStorage).forEach(key => {
      if (!key.includes('unit:')) { return; }
      const value = this.get(key);
      units.push(JSON.parse(value!));
    });
    return units;
  }

  set(key: string, data: string) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
