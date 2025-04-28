import { Injectable } from "@angular/core";
import { SettingssResponse } from "src/app/modules/settings/settings.module";
@Injectable({
    providedIn: 'root'
  })

  export class SettingsService{
    public SelectedData: SettingssResponse | null = null;

  }