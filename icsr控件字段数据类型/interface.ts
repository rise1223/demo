  export type TNormal = string;
  
  // 字符串类型NF DTO
  export interface IStringNF {
    str: string;
    strBilingual: string;
    nullFlavor: string;
  }

  /**
   * 通用性别编码结构
   */
  export interface IGenderCode extends IE2bSelectNF {}

  export interface IE2bSelectNF {
    /** E2B标准编码（国际药品不良反应报告标准编码） */
    e2bCode: string;
    /** 空值标识 */
    nullFlavor: string;
    /** 可选编码（自定义或扩展编码） */
    optCode: string;
  }

  // 日期类型NF DTO
  export interface IDateNF {
    dateStr: string;
    nullFlavor: string;
  }
  // 数字类型NF DTO
  export interface IIntegerNF {
    intValue: number;
    nullFlavor: string;
  }
  // 数字+单位 DTO
  export interface IIntegerUnit {
    intValue: number;
    unitCode: string;
  }
  // 结果 DTO
  export interface IResultNF {
    resultNF: string;
    resultQualifier: string;
    resultValue: number;
  }
  // meddra类型 DTO
  export interface IMeddraDTO {
    meddraHLGTCN: string;
    meddraHLGTCode: string;
    meddraHLGTEN: string;
    meddraHLTCN: string;
    meddraHLTCode: string;
    meddraHLTEN: string;
    meddraLLTCN: string;
    meddraLLTCode: string;
    meddraLLTEN: string;
    meddraPTCN: string;
    meddraPTCode: string;
    meddraPTEN: string;
    meddraSOCCN: string;
    meddraSOCCode: string;
    meddraSOCEN: string;
    meddraVersion: string;
  }