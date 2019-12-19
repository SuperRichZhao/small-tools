import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MonthItem, DayItem } from './calc.model';

@Component({
  selector: 'app-calc',
  templateUrl: 'calc.page.html',
  styleUrls: ['calc.page.scss']
})
export class CalcPage implements AfterViewInit {

  // 所有日期
  months: Array<MonthItem> = [];

  // 当前日期
  today: Date = new Date();

  // 星期几
  weeks: Array<string> = ['日', '一', '二', '三', '四', '五', '六'];

  constructor() {}

  // 点击确定弹出小气泡
  triggerConfirm(value: DayItem) {
    this.months.forEach(item => {
      item.days.map(val => val.isChecked = false);
    });
    value.isChecked = true;
    console.log('onConfirm', value);
  }

  // 获取某个月份的日历
  getMonthCalender(date: Date): MonthItem {
    // 获取该月天数
    const monthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // 获取第一天为周几
    const monthFirstWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days: Array<DayItem> = [];
    // 追加月初几个空日期
    for (let i = 0; i < monthFirstWeek % 7; i++) {
      days.push(new DayItem());
    }
    // 空日期追加后追加当前所有日历
    for (let i = 0; i < monthDays; i++) {
      const dayItem: DayItem = new DayItem();
      dayItem.year = '' + date.getFullYear();
      const month = date.getMonth() + 1;
      dayItem.month = (month < 10 ? '0' : '') + month;
      console.log(dayItem.month);
      const day = i + 1;
      dayItem.day = (day < 10 ? '0' : '') + day;
      dayItem.gregorian = dayItem.year + '-' + dayItem.month + '-' + dayItem.day;
      dayItem.lunar = null;
      dayItem.isWeekend = (i % 7 === 6) || (i % 7 === 0);
      dayItem.isToday = new Date(dayItem.gregorian).toDateString() === this.today.toDateString();
      // 如果日期为今天，默认选中
      if (dayItem.isToday) {
        dayItem.isChecked = true;
      }
      dayItem.isRest = this.isWorkOrRest(new Date(dayItem.gregorian));
      dayItem.background = dayItem.isRest === '0' ? 'star.png' : 'heart.png';
      days.push(dayItem);
    }
    // 将月历添加到总月历里
    const monthItem = new MonthItem();
    monthItem.year = '' + date.getFullYear();
    const month = date.getMonth() + 1;
    monthItem.month = (month < 10 ? '0' : '') + month;
    monthItem.days = days;
    return monthItem;
  }

  // 计算是否是休息日
  isWorkOrRest(date: Date): string {
    // 日期开始时间, 写死2019-9-25, 因为这天是上班第一天
    const dateStart = new Date('2019-09-25').getTime();
    const dateEnd = date.getTime();
    let difValue: number;
    if (dateStart > dateEnd) {
      difValue = (dateStart - dateEnd) / (1000 * 60 * 60 * 24);
    } else {
      difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
    }
    const today: number = Math.round(Number(difValue.toFixed(0))) % 5;
    let isWorkOrRest: string = null;
    if (today >= 0 && today < 2) {
      isWorkOrRest = '1';
    }
    if (today >= 2 && today < 3) {
      isWorkOrRest = '2';
    }
    if (today >= 3 && today < 5) {
      isWorkOrRest = '0';
    }
    return isWorkOrRest;
  }

  // 获取后5个月的日历
  getCalcAfter(event) {
    const afterDate: Array<MonthItem> = [];
    for (let i = 0; i < 5; i++) {
      // 获取最后一个月
      const afterDateLast: MonthItem = afterDate[afterDate.length - 1];
      const monthsLast: MonthItem = this.months[this.months.length - 1];
      // 记录最后一个月
      let afterMonth: Date = new Date();
      if (afterDateLast && afterDateLast.year && afterDateLast.year.length > 0) {
        // 如果afterDate有数据则用afterDate里的最后一个月
        const date = new Date(afterDateLast.year + '-' + afterDateLast.month + '-01');
        date.setMonth(date.getMonth() + 1);
        afterMonth = new Date(date);
      } else if (monthsLast && monthsLast.year && monthsLast.year.length > 0) {
        // 如果afterDate无数据则用monthsLast里的最后一个月
        const date = new Date(monthsLast.year + '-' + monthsLast.month + '-01');
        date.setMonth(date.getMonth() + 1);
        afterMonth = new Date(date);
      }
      const calenderAfter: MonthItem = this.getMonthCalender(afterMonth);
      afterDate.push(calenderAfter);
    }
    this.months.push(...afterDate);
    if (event) {
      event.target.complete();
    }
  }

  ngAfterViewInit(): void {
    // 初始化日期
    this.getCalcAfter(null);
  }

}
