import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  // 关闭弹出菜单
  close() {
    this.popoverController.dismiss();
  }

  ngOnInit() {}

}
