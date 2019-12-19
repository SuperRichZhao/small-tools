import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PackStyle } from './choice.model';

@Component({
  selector: 'app-choice',
  templateUrl: 'choice.page.html',
  styleUrls: ['choice.page.scss']
})
export class ChoicePage implements AfterViewInit {

  total: number = 0;

  packs: Array<PackStyle> = []

  constructor(
  ) {}

  // 当dom加载完执行
  ngAfterViewInit() {
    let initNumber = 0;
    let packs = [];
    for (let i = 0; i < 10; i++) {
      let lefts = Math.floor(Math.random() * 20 + 2);
      let delay = Math.floor(Math.random() * 50 + 2);
      initNumber += lefts;
      const packStyle = new PackStyle();
      packStyle.id = i + 1;
      packStyle.left = initNumber;
      packStyle.top = lefts;
      packStyle.opacity = '1';
      packStyle.delay = delay / 10;
      packs.push(packStyle);
    }
    this.packs = packs;
  }

  // 点击后执行
  triggerConfirm(item: PackStyle) {
    this.total ++;
    const index = this.packs.findIndex(val => val.id === item.id);
    this.packs[index].opacity = '0';
    console.log('confirm')
  }

}
