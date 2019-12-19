export class MonthItem {
  year: string;
  month: string;
  days: Array<DayItem> = [];
}

export class DayItem {
  // 公历
  gregorian: string;
  // 农历
  lunar: string;
  // 年
  year: string;
  // 月
  month: string;
  // 日
  day: string;
  // 周几
  weekday: string;
  // 是否周末
  isWeekend: boolean;
  // 是否是今天
  isToday: boolean;
  // 是否被选择
  isChecked: boolean;
  // 是否休息（0: 休息，1: 上班，2: 休息半天）
  isRest: string;
  // 日期背景
  background: string;
  // 其他消息
  message: string;
}
