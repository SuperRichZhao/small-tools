import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, PopoverController, ToastController} from '@ionic/angular';
import {LocalStorageService} from '../storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})

export class GlobalService {


	constructor (
		private toastController: ToastController,
		private alertController: AlertController,
		private modalController: ModalController,
		private popoverController: PopoverController,
		private loadingController: LoadingController,
		private navController: NavController,
		private localStorageService: LocalStorageService
	) {
	}

	// 提示消息
	async createToast (content) {
		const toast = await this.toastController.create({
			message: content,
			position: 'top',
			duration: 1000,
			cssClass: 'ion-toast'
		});
		return await toast.present();
	}

	// 提示消息从中间弹出
	async createCustomerToast (content) {
		const toast = await this.toastController.create({
			message: content,
			position: 'middle',
			duration: 1000,
			cssClass: 'ion-toast-customer',
		});
		return await toast.present();
	}

	// 弹出警告框
	async presentAlert (header, content) {
		const alert = await this.alertController.create({
			header: header,
			message: content,
			buttons: ['确定']
		});

		return await alert.present();
	}

	// 显示对话框
	// async presentModal(component) {
	// 	const modal = await this.modalController.create({
	// 		component: component,
	// 	});
	// 	await modal.present();
	// }

	// 显示下拉框
	// async presentPopover(ev: any) {
	// 	const popover = await this.popoverController.create({
	// 		component: PopoverComponent,
	// 		event: ev,
	// 		translucent: true
	// 	});
	// 	return await popover.present();
	// }


	// 显示加载中
	async showLoading () {
		const loading = await this.loadingController.create({
			spinner: 'bubbles',
			message: '请稍后',
			translucent: true,
			cssClass: 'ion-loading-customer'
		});
		return await loading.present();
	}

	// 关闭加载中
	closeLoding () {
		this.loadingController.dismiss();
	}

	/**
	 * 全局提示信息
	 */
	apiErrorMessage (err) {
		const status: number = err.error.status;
		if (status === 401) {
			this.localStorageService.remove('account');
			this.localStorageService.remove('token');
			this.navController.navigateForward('/login');
			setTimeout(() => {
				this.createCustomerToast('请先登录账号再进行操作');
			}, 500);
		} else if (status === 500) {
			this.createCustomerToast('服务器开了点小差，请稍后再试');
		} else if (status === 504) {
			this.createCustomerToast('网络开了点小差，请稍后再试');
		} else {

		}
	}

	// 使用自定义返回到上一页的方法
	navBack() {
		this.navController.back();
	}
}
