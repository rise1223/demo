const o1 = {
  a: 1,
  b: 2,
  c: 3
}

const o2 = {
  a: 1,
  c: 1,
  d: 6
}
// 基本数据类型的diff
const diff = (oldObj, newObj) => {
  const oldObjKey = Object.keys(oldObj);
  const newObjKey = Object.keys(newObj);

  const addkey = newObjKey.filter(newKey => oldObjKey.every(old => old !== newKey));
  const deletekey = oldObjKey.filter(oldKey => newObjKey.every(newKey => oldKey !== newKey));
  const updatekey = [];
  const filterNewObject = newObjKey.filter(newKey => !addkey.includes(newKey));
  filterNewObject.forEach(key => {
    if (newObj[key] !== oldObj[key]) {
      updatekey.push(key);
    }
  })

  console.log('addKey：', addkey);
  console.log('updatekey', updatekey);
  console.log('deletekey', deletekey);
}

diff(o1, o2)

// 数组的diff
const oldArr = [
  { id: 1, name: '第一项内容' },
  { id: 2, name: '第二项内容' },
  { id: 3, name: '第三项内容' },
  { id: 4, name: '第四项内容' },
  { id: 5, name: '第五项内容' },
  { id: 6, name: '第六项内容' },
];

const newArr = [
  { id: 1, name: '第一项内容--改' },
  { id: 3, name: '第二项内容' },
  { id: 5, name: '第五项内容' },
  { id: 6, name: '第六项内容--改' },
  { id: 8, name: '第七项内容' },
  { id: 9, name: '第八项内容' },
];

const diffArr = (oldArr, newArr) => {
  const addArr = newArr.filter(newItem => oldArr.every(oldItem => newItem.id !== oldItem.id));
  const updateArr = [];
  const deleteArr = oldArr.filter(oldItem => newArr.every(newItem => newItem.id !== oldItem.id));
  const addArrIds = addArr.map(item => item.id);
  const newCommonArr = newArr.filter(item => !addArrIds.includes(item.id));
  
  updateArr.push(...newCommonArr.filter(newItem => {
    const oldItem = oldArr.find(oldItem => newItem.id === oldItem.id);
    return newItem.name !== oldItem.name
  }));
  console.log('addArr', addArr);
  console.log('updateArr', updateArr);
  console.log('deleteArr', deleteArr);
}

diffArr(oldArr, newArr);