const getAuditListTrailAll = <T, U extends T, K extends keyof T>(options: {
  oldList: T[];
  newList: U[];
  keyId: K;
  getListItemDTO: () => T;
  renderMapKey: keyof ReportManagement.IRenderLabelMap;
}) => {
  const keyId = options.keyId;
  const getListItemDTO = options.getListItemDTO;
  const renderMapKey = options.renderMapKey;
  const renderMapZhCn = icsrReportStore.renderLabelMap.zhCn[renderMapKey];
  const renderMapEn = icsrReportStore.renderLabelMap.en[renderMapKey];

  // 新增的信息
  const caseAddList: T[] = addList.map(item => {
    const listItemDTO = getListItemDTO();
    // VO转DTO
    objectMerge(listItemDTO, item);
    listItemDTO[keyId] = null;
    return listItemDTO;
  });

  // diff add
  caseAddList.forEach(item => {
    item.auditTrailList = getAuditTrailAll({
      newItem: item,
      oldItem: getListItemDTO(),
      renderMapZhCn,
      renderMapEn
    });
  });
}