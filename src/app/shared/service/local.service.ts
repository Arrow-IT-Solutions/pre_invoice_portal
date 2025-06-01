import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Core/services/user.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import writtenNumber from 'written-number';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    public router: Router
  ) { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }

  public GetStorge() {
    console.log('getStorage');

    var user = this.getData('currentUser');
    //var config = this.getData()

    if (user != null) {
      // var permission = this.localService.getData("currentPermission");
      this.userService.currentUser = JSON.parse(user);
      // this.userPermission.currentPermissionUser = JSON.parse(permission);
      var url = this.router.url;

      if (url == '/') {
        //this.router.navigateByUrl("admin");
      }
    } else {
      this.router.navigateByUrl('');
    }

    // language
    var lang = this.getData('lang');
    var dir = this.getData('dir');
    console.log('get Storage lang', lang, 'get Storage dir', dir);
    this.layoutService.config =
    {
      dir: dir == null ? 'en' : dir,
      lang: lang == null ? 'en' : lang

    }

  }

  public amountToEnglishJD(value: number | string): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    // 1) Coerce to a JavaScript number and fix floating-point quirks
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
      return '';
    }

    // 2) Separate integer Dinars from fractional Decimal
    const integerPart = Math.floor(Math.abs(num));
    let fractionPart = Math.abs(num) - integerPart;

    // Round fractional part to the nearest 1/1000 (for fils)
    let fils = Math.round(fractionPart * 1000);

    // If rounding the fractional portion pushed us to the next whole dinar:
    if (fils === 1000) {
      // e.g. 1.9996 → Math.round(0.9996 * 1000) = 1000 → bump integer up by 1, zero out the fils
      fils = 0;
    }

    // 3) Spell out the integer (dinar) portion:
    //    ‣ In English we do: writtenNumber(9, { lang: 'en' }) → 'nine'
    //    ‣ Then append "Jordanian Dinar"/"Jordanian Dinars"
    const intWords = writtenNumber(integerPart, { lang: 'en' });
    const dinarWord = integerPart === 1 ? 'Jordanian Dinar' : 'Jordanian Dinars';

    // 4) Spell out the fils portion (if any). writtenNumber(570, {lang:'en'}) → "five hundred and seventy"
    let filsWords = '';
    if (fils > 0) {
      // spelled like "five hundred and seventy"
      const spelled = writtenNumber(fils, { lang: 'en' });
      // Always use the plural "Fils" in English
      filsWords = `${spelled} Fils`;
    }

    // 5) Build final phrase:
    //    - If fils === 0 → only do "<Nine Jordanian Dinars> Only"
    //    - Otherwise → "<Nine Jordanian Dinars> and <Five Hundred and Seventy Fils> Only"
    if (fils === 0) {
      return `${this.capitalizeFirstLetter(intWords)} ${dinarWord} Only`;
    } else {
      // capitalizeFirstLetter(intWords) → "Nine"
      return `${this.capitalizeFirstLetter(intWords)} ${dinarWord} and ${this.capitalizeFirstLetter(
        filsWords
      )} Only`;
    }
  }

  /**
   * Convert a numeric amount (e.g. 9.57) into an Arabic phrase
   * in "دينار وهجن الفلس" format.
   *
   * The requirement you gave was:
   *   9.57 → "تسع دنانير و 570 فلس"
   *
   * Notice:
   *  - We spell the integer 9 → "تسع"
   *  - We leave the fils as digits "570" (not spelled out) and append "فلس"
   *  - We do **not** attach "فقط" or "لا غير" at the end, because your example didn't include it.
   *
   * @param value a number or numeric string, e.g. 9.57 or "9.57"
   */
  public amountToArabicJD(value: number | string): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    // 1) Coerce to a Number
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
      return '';
    }

    // 2) Separate integer (dinars) from fractional part
    const integerPart = Math.floor(Math.abs(num));
    let fractionPart = Math.abs(num) - integerPart;

    // 3) Convert fractional part into fils (0 ←→ 1000)
    let fils = Math.round(fractionPart * 1000);
    if (fils === 1000) {
      fils = 0;
    }

    // 4) Spell the integer portion in Arabic using written-number
    //    writtenNumber(9, { lang:'ar' }) → "تسع"
    //    Then append the correct plural form of "دينار"
    const intWords = writtenNumber(integerPart, { lang: 'ar' });
    // Arabic plural logic:
    //   0 → "دنانير"  (but if integerPart===0, intWords becomes "صفر", so we technically never say "صفر دنانير")
    //   1 → "دينار واحد" or just "دينار"  (but writtenNumber(1,"ar") is "واحد", and we want "دينار" or "دينار واحد"?)
    //   2 → "ديناران" or "ديناران اثنان"? etc.
    //
    // For simplicity, we'll follow your sample exactly:
    //   You wrote "تسع دنانير": that is 9 → "تسع" + " دنانير"
    //   If it were 1.XX → one dinar, Arabic on checks is often "دينار واحد". But your example didn't cover 1.
    //   If it were 2.XX → "ديناران" (dual).
    //
    // We’ll do a minimal plural rule:
    let dinarUnit: string;
    if (integerPart === 0) {
      // If no integer portion, we typically skip "دنانير" entirely and just do the fils.
      // But if you wanted to show "صفر دينار و 570 فلس"، uncomment the next line and adjust as needed.
      // dinarUnit = 'دينار';
      // return `صفر ${dinarUnit} و ${fils} فلس`;
      // Instead we’ll omit “صفر دينار”:
      dinarUnit = '';
    } else if (integerPart === 1) {
      dinarUnit = 'دينار';
    } else if (integerPart === 2) {
      dinarUnit = 'ديناران';
    } else if (integerPart >= 3 && integerPart <= 10) {
      dinarUnit = 'دنانير';
    } else {
      // Above 10, Arabic uses the singular accusative: "11 ديناراً" or "12 ديناراً" etc.
      // But your example was 9, so we’ll default to the “دنانير” form for anything > 2.
      dinarUnit = 'دنانير';
    }

    // 5) Build the “دينار” segment. If integerPart = 0, skip it:
    const dinarSegment =
      integerPart === 0
        ? ''
        : `${intWords} ${dinarUnit}`.trim();

    // 6) Build the fils segment. Even if fils = 0, we might say “صفر فلس” or omit entirely.
    let filsSegment = '';
    if (fils > 0) {
      // In your example, you wanted “570” as digits, not spelled-out. So:
      filsSegment = `${fils} فلس`;
    } else {
      // If you want “و صفر فلس” when fils=0, uncomment the next line:
      // filsSegment = '0 فلس';
      filsSegment = '';
    }

    // 7) Combine them.
    //    - If integerPart===0, show only the fils segment: e.g. "570 فلس"
    //    - If fils===0, show only the dinar segment: e.g. "تسع دنانير"
    //    - Otherwise: "<تسع دنانير> و <570 فلس>"
    if (integerPart === 0 && fils > 0) {
      return `${filsSegment}`.trim();
    } else if (fils === 0 && integerPart > 0) {
      return `${dinarSegment}`.trim();
    } else if (integerPart > 0 && fils > 0) {
      return `${dinarSegment} و ${filsSegment}`.trim();
    } else {
      // both zero
      return '0 دينار';
    }
  }

  /**
   * Utility: Capitalize the first letter of an English phrase (e.g. "nine" → "Nine").
   */
  private capitalizeFirstLetter(text: string): string {
    if (!text || text.length === 0) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

