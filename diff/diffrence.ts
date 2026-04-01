/**
 * 通用性别编码结构
 */
interface IGenderCode {
  /** E2B标准编码（国际药品不良反应报告标准编码） */
  e2bCode: string;
  /** 空值标识 */
  nullFlavor: string;
  /** 可选编码（自定义或扩展编码） */
  optCode: string;
}

// 日期类型NF DTO
export interface IDateNF {
  date: string;
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

const originData = {
  "caseId": "857679597451440128",
  "caseNo": "ABC42112345",
  "caseMaster": {
    "caseId": "857679597451440128",
    "caseNo": "ABC42112345",
    "enterpriseId": null,
    "reportType": "2",
    "reportSource": "1",
    "reportCategory": "11",
    "literatureReport": 1,
    "initRecvDate": "2025-07-01",
    "lastRecvDate": "2025-07-01",
    "safetyRecvDate": "2025-07-01",
    "expedited": 1,
    "language": "chinese",
    "mahId": "123",
    "country": "223",
    "province": null,
    "city": null,
    "county": null,
    "fuVersion": null,
    "fuSignificant": null,
    "fuType": null,
    "fuReason": null,
    "auditTrailList": null
  },
  "casePatientDTO": {
    "patientId": "857679597464023041",
    "caseId": "857679597451440128",
    "name": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "mrn1GP": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "mrn2Specialist": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    // todo IDateNF
    "birthDate": {
      "date": "2025-06-01",
      "nullFlavor": null
    },
    // todo IIntegerUnit
    "age": {
      "intValue": 14,
      "unitCode": "1"
    },
    "ageGroup": "0",
    // todo IIntegerUnit
    "foetusGestation": {
      "intValue": null,
      "unitCode": null
    },
    // todo IGenderCode
    "gender": {
      "optCode": "female",
      "e2bCode": null,
      "nullFlavor": null
    },
    // todo IGenderCode
    "lmpDate": {
      "date": null,
      "nullFlavor": null
    },
    "nationality": "01",
    "phoneNumber": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "pregnancy": 1,
    // todo IIntegerUnit
    "pregnancyGestation": {
      "intValue": 11,
      "unitCode": "22"
    },
    "pregnancyOutcome": null,
    // todo IGenderCode
    "dueDate": {
      "date": null,
      "nullFlavor": null
    },
    "medHisText": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "coTherapy": 1,
    "deathDesc": "12",
    // todo IIntegerNF
    "autopsy": {
      "intValue": 1,
      "nullFlavor": null
    },
    // todo IIntegerNF
    "intergerNF1": {
      "intValue": 2,
      "nullFlavor": null
    },
    // todo IMeddraDTO
    "meddra": {
      "meddraVersion": "28.0",
      "meddraSOCCode": "10022",
      "meddraSOCCN": "各类检查",
      "meddraSOCEN": "Investigations",
      "meddraHLGTCode": "10037000",
      "meddraHLGTCN": "蛋白分析及化检（不另分类）",
      "meddraHLGTEN": "Protein and chemistry analyses NEC",
      "meddraHLTCode": "10036998",
      "meddraHLTCN": "蛋白分析（不另分类）",
      "meddraHLTEN": "Protein analyses NEC",
      "meddraPTCode": "10050737",
      "meddraPTCN": "1型胶原蛋白抗原",
      "meddraPTEN": "Collagen antigen type 1",
      "meddraLLTCode": "10050737",
      "meddraLLTCN": "1型胶原蛋白抗原",
      "meddraLLTEN": "Collagen antigen type 1"
    },
    "auditTrailList": null
  }
}

const changedData = {
  "caseId": "857679597451440128",
  "caseNo": "ABC42112345",
  "caseMaster": {
    "caseId": "857679597451440128",
    "caseNo": "ABC42112345",
    "enterpriseId": null,
    "reportType": "6", // 已修改
    "reportSource": "1",
    "reportCategory": "11",
    "literatureReport": 8, // 已修改
    "initRecvDate": "2025-07-01",
    "lastRecvDate": "2025-09-09", // 已修改
    "safetyRecvDate": "2025-07-01",
    "expedited": 1,
    "language": "chinese",
    "mahId": "123",
    "country": "223",
    "province": null,
    "city": null,
    "county": null,
    "fuVersion": null,
    "fuSignificant": null,
    "fuType": null,
    "fuReason": null,
    "auditTrailList": null
  },
  "casePatientDTO": {
    "patientId": "857679597464023041",
    "caseId": "857679597451440128",
    "name": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "mrn1GP": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "mrn2Specialist": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    // todo IDateNF
    "birthDate": {
      "date": null,
      "nullFlavor": "MSK" // 已修改
    },
    // todo IIntegerUnit
    "age": {
      "intValue": 55, // 已修改
      "unitCode": "16"
    },
    "ageGroup": "0",
    // todo IIntegerUnit
    "foetusGestation": {
      "intValue": 2, // 已修改
      "unitCode": "3"
    },
    // todo IGenderCode
    "gender": {
      "optCode": "female",
      "e2bCode": null,
      "nullFlavor": null
    },
    // todo IGenderCode
    "lmpDate": {
      "date": null,
      "nullFlavor": null
    },
    "nationality": "01",
    "phoneNumber": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "pregnancy": 1,
    // todo IIntegerUnit
    "pregnancyGestation": {
      "intValue": 11,
      "unitCode": "22"
    },
    "pregnancyOutcome": null,
    // todo IGenderCode
    "dueDate": {
      "date": null,
      "nullFlavor": null
    },
    "medHisText": {
      "str": "1",
      "strBilingual": null,
      "nullFlavor": null
    },
    "coTherapy": 1,
    "deathDesc": "12",
    // todo IIntegerNF
    "autopsy": {
      "intValue": 66, // 已修改
      "nullFlavor": null
    },
    // todo IIntegerNF
    "intergerNF1": {
      "intValue": null, // 已修改
      "nullFlavor": "UNK"
    },
    // todo IMeddraDTO
    "meddra": {
      "meddraVersion": "28.0",
      "meddraSOCCode": "10066666", // 已修改
      "meddraSOCCN": "全面检查",
      "meddraSOCEN": "Investigations",
      "meddraHLGTCode": "10037000",
      "meddraHLGTCN": "蛋白分析及化检（不另分类）",
      "meddraHLGTEN": "Protein and chemistry analyses NEC",
      "meddraHLTCode": "10036998",
      "meddraHLTCN": "蛋白分析（不另分类）",
      "meddraHLTEN": "Protein analyses NEC",
      "meddraPTCode": "10050737",
      "meddraPTCN": "1型胶原蛋白抗原",
      "meddraPTEN": "Collagen antigen type 1",
      "meddraLLTCode": "10050737",
      "meddraLLTCN": "1型胶原蛋白抗原",
      "meddraLLTEN": "Collagen antigen type 1"
    },
    "auditTrailList": null
  }
}

const isObject = (val: any) => typeof val === "object" && val !== null;
const diffFn = <T extends object, U extends T>(origin: T, changedData: U) => {
  const auditTrailList: any = []
  Object.keys(origin).forEach(key => {
    const k = key as keyof T;
    const originValue = origin[k];
    const changedDataValue = (changedData as T)[k];
    if (isObject(originValue) || isObject(changedDataValue)) {
      // todo 对象类型数据，特殊处理
      return
    }
    console.log(k, originValue,changedDataValue);

    if (originValue !== changedDataValue) {
      auditTrailList.push({
        key: k,
        oldValue: originValue,
        newValue: changedDataValue
      })
    }
  })
  return auditTrailList;
  // console.log('origin',origin);
  // console.log('chanted',chanted);
}

const caseMasterAuditTrailList = diffFn(originData.caseMaster, changedData.caseMaster);
console.log('caseMasterAuditTrailList：',caseMasterAuditTrailList);
