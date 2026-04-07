import { TNormal, IStringNF, IGenderCode, IE2bSelectNF, IDateNF, IIntegerNF, IIntegerUnit, IResultNF, IMeddraDTO } from './interface'

/**
 * 下拉类型 select：
 * 
 * select、select-country、select-PCC
 */
interface ISelectMap {
  select: TNormal | IStringNF | IE2bSelectNF;
}

/**
 * 输入类型 input：
 * 
 * input、input-integer、input-double
 */
interface IInputMap {
  select: TNormal | IStringNF | IIntegerUnit;
}

/**
 * 单选类型 radio：
 * 
 * radio-box
 */
interface IRadioMap {
  select: TNormal | IIntegerNF
}

/**
 * 日期类型 date：
 * 
 * date-picker
 */
interface IDatePickerMap {
  select: TNormal | IIntegerNF
}


// 检查结果（F.r.3.2）IResultNF