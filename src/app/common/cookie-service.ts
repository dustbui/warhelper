import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class MyCookieService {

  constructor(
    private cookieService: CookieService) {
  }

  public set(name: string, value: string) {
    console.log(`Setting cookie "${name.trim()}"`);
    // Expire in 6 hours
    const expirationDate = new Date();
    let domain = environment.production ? 'http://warhelper-40k.web.app/' : 'localhost';

    expirationDate.setFullYear(3000, 1, 1);
    this.cookieService.set(name, value.trim(), expirationDate, undefined, domain, true, 'Lax');
    // since cookie service does not set proper JSON objects
    // we have to override the cookie made
    // at least until we stop using JSON objects in the cookie object

    // The following cookie setter does not set domain because IE 11 does not like this.
    // Chrome should never have to use this login functionality because it will go thru ET
    // document.cookie = `${name}=${value};domain=${domain};expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value};expires=${expirationDate.toUTCString()};SameSite=None;Secure`;
  }

  public get(name: string) {
    const cookie = this.cookieService.get(name);
    if (!cookie) { console.error(`Could not find cookie for "${name}"`); }
    return cookie;
  }

  public deleteAll() {
    console.log(`Deleting all cookies...`);
    this.cookieService.deleteAll();
  }
}
