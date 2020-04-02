import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../shared/storage/local-storage.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  needToken = [];

  constructor(private localStorageService: LocalStorageService,
              private navController: NavController) {
    this.needToken = [
      // 用户信息接口
      'api/users/',
      'api/get/account/all',
      'api/user-address',

      // 审核用户接口
      'api/activate',
      'api/cancel/activate',
      // 购物车与订单接口
      'api/user-shop-carts/',
      'api/user-orders'
    ];

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.get('token');
    if (this.isNeedToken(request.url)) {
      if (token && token.length > 0) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
      } else {
        this.localStorageService.set('router', location.hash);
        this.navController.navigateForward('/login');
      }
    }
    return next.handle(request);
  }

  isNeedToken(url: string) {
    let isMatch = false;
    this.needToken.forEach((regUrl: string) => {
      if (!isMatch) {
        if (url.search(regUrl) >= 0) {
          isMatch = true;
        }
      }
    });
    return isMatch;
  }
}
