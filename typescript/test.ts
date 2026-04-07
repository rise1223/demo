// const getAuditListTrailAll = <T, U extends T, K extends keyof T>(options: {
//   oldList: T[];
//   newList: U[];
//   keyId: K;
//   getListItemDTO: () => T;
//   renderMapKey: keyof ReportManagement.IRenderLabelMap;
// }) => {
//   const keyId = options.keyId;
//   const getListItemDTO = options.getListItemDTO;
//   const renderMapKey = options.renderMapKey;
//   const renderMapZhCn = icsrReportStore.renderLabelMap.zhCn[renderMapKey];
//   const renderMapEn = icsrReportStore.renderLabelMap.en[renderMapKey];

//   // 新增的信息
//   const caseAddList: T[] = addList.map(item => {
//     const listItemDTO = getListItemDTO();
//     // VO转DTO
//     objectMerge(listItemDTO, item);
//     listItemDTO[keyId] = null;
//     return listItemDTO;
//   });

//   // diff add
//   caseAddList.forEach(item => {
//     item.auditTrailList = getAuditTrailAll({
//       newItem: item,
//       oldItem: getListItemDTO(),
//       renderMapZhCn,
//       renderMapEn
//     });
//   });
// }

const proxy = new Proxy({ a: 1, b: 2 }, {
  get(target, prop) {
    console.log(`Getting property ${String(prop)}`);
    return target[prop];
  },
  has(target, prop) {
    console.log(`Checking if property ${String(prop)} exists`);
    return prop in target;
  },
  ownKeys(target) {
    console.log('Getting own keys');
    return Object.keys(target);
  }
})

// for (const key in proxy) {
// }

// 'b' in proxy;

// proxy.hasOwnProperty('a');
Object.keys(proxy)

const test = () => {
  try {
    adner.b
  } catch (e) {
    console.error('445',e);
  }
}
test()
console.log('aaa');
