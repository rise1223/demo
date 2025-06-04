const str = 'asdfxcaasddffgghnvmm';

// // reduce 实现统计字符串中每个字符出现的次数
// const res = [...str].reduce((pre,cur)=>{
//   if(pre[cur]){
//     pre[cur]++;
//   }else{
//     pre[cur] = 1;
//   }
//   return pre;
// },{})

// reduce 实现统计字符串中每个字符出现的次数（优化）
const res = [...str].reduce((pre,cur)=>(pre[cur]++ || (pre[cur] = 1) ,pre),{})

console.log(res);
