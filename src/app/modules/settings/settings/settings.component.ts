import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingssResponse } from '../settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddSettingComponent } from '../add-setting/add-setting.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(public route:Router,public setting:SettingsService,public layoutService: LayoutService){}
  openAddSetting(row: SettingssResponse | null = null){
      window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.style.overflow = 'hidden';
        this.setting.SelectedData = row;
        let content = this.setting
        .SelectedData == null ? 'Create_Setting' : 'Update_ِSetting';
       
        var component = this.layoutService.OpenDialog(AddSettingComponent, content);
    
  }
}
