import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LocalStorageService} from '../../shared/storage/local-storage.service';
import {NavController} from '@ionic/angular';

@Injectable()
export class IsActive implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private navController: NavController,
  ) {
  }

  canActivate() {
    // 这里判断登录状态, 返回 true 或 false
    let loginStatus = false;
    const token = this.localStorageService.get('token');
    const account = this.localStorageService.getObject('account');
    if (token && token !== '' && account && account !== '') {
      loginStatus = true;
    } else {
      this.localStorageService.set('router', location.hash);
      this.navController.navigateForward('/login');
    }
    return loginStatus;
  }
}
