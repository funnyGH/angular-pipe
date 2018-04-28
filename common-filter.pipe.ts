import { Pipe, PipeTransform } from '@angular/core';

/** 可封装多个pipe
* title：金额格式转换规则三算法
* author：liuyub
* date：2018/04/24
* 规则：1、万以内金额保留两位小数且用千分符；2、万及亿以上的用万元/亿元单位，保留一位小数且用千分符； 
* s-金额 n-小数点位数 (后台返回值的单位默认为分，不做变量修改，后期可维护)
* 默认返回值单位为分，
*/
@Pipe({name: 'formatMoneyInit'})
export class CommonFilterPipe implements PipeTransform {
  transform(s: any, init: string):string {
    s = s * 1;
    let n = 2,
      unit = '元';
    if (!s || s <= 0) {
      return '0元'
    }
    switch (true) {
      case s < 1000000:
        s = (parseInt(s) / 100).toFixed(2);  //将分转化为带两位小数的元
        n = 2;
        unit = '元';
        break;
      case s >= 1000000 && s < 10000000000:
        s = (parseInt(s) / 1000000).toFixed(2);  //将分转化为带两位小数的万元
        n = 1;
        unit = '万元';
        break;
      case s >= 10000000000: 
        s = (parseInt(s) / 10000000000).toFixed(2);  //将分转化为带两位小数的亿元
        n = 1;
        unit = '亿元';
        break;
      default:
        return '--.--'
    }
    n = n > 0 && (n <= 20 ? n : 0);
    s = parseFloat((s + '')
      .replace(/[^\d\.-]/g, ''))
      .toFixed(n) + '';
    let l = s.split('.')[0].split('').reverse();  //大于元部分的分割反转
    let r = s.split('.')[1];      //角分部分
    let t = '';
    for (let i = 0, p = l.length; i < p; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    if (r) {
      return t.split('').reverse().join('') + '.' + r + unit; 
    } else {
      return t.split('').reverse().join('') + unit;
    }
  }
}