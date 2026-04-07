const handledCaseEventAssessmentList = {
  value: [
    { productId: "001" },
    { productId: "002" },
    { productId: "002" },
    { productId: "003" },
    { productId: "004" },
    { productId: "004" },
    { productId: "004" },
    { productId: "004" },
    { productId: "005" },
    { productId: "006" },
    { productId: "007" },
    { productId: "007" },
    { productId: "008" },
  ]
}

console.log(handledCaseEventAssessmentList.value.length);
const calcSpan11 = () => {
  let spanArr = [];
  let spanObj = {};
  const len = handledCaseEventAssessmentList.value.length;
  for (let i = 0; i < len - 1; i++) {
    const currentItem = handledCaseEventAssessmentList.value[i];
    const currentProductId = currentItem.productId;
    const nextItem = handledCaseEventAssessmentList.value[i + 1];
    const nextProductId = nextItem.productId;

    if (!spanObj[currentProductId]) {
      spanObj[currentProductId] = 1;
    }
    // spanObj[currentProductId]++;
    if (currentProductId === nextProductId) {
      spanArr.push({ rowspan: 0, colspan: 0 });
      spanObj[currentProductId]++;
    } else {
      const rowspan = spanObj[currentProductId] === 1 ? 0 : spanObj[currentProductId]
      spanArr.push({ rowspan: rowspan, colspan: rowspan ? 1 : 0 });
    }

    // 最后一次循环
    if (len - 1 === i + 1) {
      if (currentProductId === nextProductId) {
        const rowspan = spanObj[currentProductId] === 1 ? 0 : spanObj[currentProductId]
        spanArr.push({ rowspan: rowspan, colspan: rowspan ? 1 : 0 });
      } else {
        spanArr.push({ rowspan: 0, colspan: 0 });
      }
    }
  }
  console.log('spanObj', spanObj);

  return spanArr;
};

const calcSpan = () => {
  let spanArr = [];
  let spanObj = {};
  const len = handledCaseEventAssessmentList.value.length;
  for (let i = 0; i < len - 1; i++) {
    const currentItem = handledCaseEventAssessmentList.value[i];
    const currentProductId = currentItem.productId;
    const nextItem = handledCaseEventAssessmentList.value[i + 1];
    const nextProductId = nextItem.productId;

    if (!spanObj[currentProductId]) {
      spanObj[currentProductId] = 1;
    }
    // spanObj[currentProductId]++;
    if (currentProductId === nextProductId) {
      spanObj[currentProductId]++;
    }

    // 最后一次循环
    if (len - 1 === i + 1) {
      if (currentProductId === nextProductId) {
        // spanObj[currentProductId]++;
      } else {
        spanObj[nextProductId] = 1;
      }
    }
  }
  for (var i = 0; i < len; i++) {
    const item = handledCaseEventAssessmentList.value[i];
    const productId = item.productId;
    const count = spanObj[productId]
    // 处理已合并完成的列
    if (count == -1) {
      spanArr.push({
        rowspan: 0,
        colspan: 0
      })
      continue;
    }
    spanArr.push({
      rowspan: count === 1 ? 1 : count,
      colspan: 1
    })
    // 标记为已合并完成
    spanObj[productId] = -1;
  }
  return spanArr;
};



const res = calcSpan()
console.log(res, res.length);


