const isObject = (val: any) => val !== null && typeof val === 'object';

const emptyString2NullArr = <T>(data: any) => {
  // if (!isObject(obj)) {
  //   console.error("params is not object");
  // }
  if (isObject(data)) {
    Reflect.ownKeys(data).forEach(key => {
      const k: any = key as string;
      if (Array.isArray(data[k])) {
        emptyString2NullArr(data[k]);
      } else {
        if (data[k] as any === "") {
          data[k] = null;
        }
      }
    });
  }

  if (Array.isArray(data)) {
    data.forEach(item => {
      if (isObject(item)) {
        Reflect.ownKeys(item).forEach(key => {
          const k = key as string;
          if (Array.isArray(item[k]) || isObject(item[k])) {
            emptyString2NullArr(item[k]);
          } else {
            if (item[k] === "") {
              item[k] = null;
            }
          }
        });
      } else if (Array.isArray(item)) {
        emptyString2NullArr(item);
      }
    });
  }


};


const data1 = [
  {
    "productId": "859814212343910400",
    "seq": 1,
    "productClassification": "",
    "caseProdDosageList": [
      {
        "duration": {
          "intValue": "",
          "unitCode": "day"
        }
      },
    ]
  }
]

emptyString2NullArr(data1)

console.log(data1[0].productClassification, data1[0].caseProdDosageList[0].duration);
