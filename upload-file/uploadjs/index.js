console.log("%c                     /$$                           /$$                         \n" +
  "                    | $$                          | $$                         \n" +
  " /$$   /$$  /$$$$$$ | $$  /$$$$$$   /$$$$$$   /$$$$$$$             /$$  /$$$$$$$ \n" +
  "| $$  | $$ /$$__  $$| $$ /$$__  $$ |____  $$ /$$__  $$            |__/ /$$_____/ \n" +
  "| $$  | $$| $$  \ $$| $$| $$  \ $$  /$$$$$$$| $$  | $$             /$$|  $$$$$$  \n" +
  "| $$  | $$| $$  | $$| $$| $$  | $$ /$$__  $$| $$  | $$            | $$ \____  $$ \n" +
  "|  $$$$$$/| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$            | $$ /$$$$$$$/ \n" +
  " \______/ | $$____/ |__/ \______/  \_______/ \_______/            | $$|_______/  \n" +
  "          | $$                                               /$$  | $$          \n" +
  "          | $$                                              |  $$$$$$/          \n" +
  "          |__/                                               \______/           ", "color: blue");
// 获取dom元素
const doms = {
  upload: document.querySelector('.upload'),
  uploadDiv: document.querySelector('.upload-div'),
  submitBtn: document.querySelector('.submit'),
  previewList: document.querySelector('.preview-list'),
  attachmentEle: document.querySelector('#attachment')
}

// 初始化监听
const initListener = () =>{
  doms.upload.addEventListener('click',handleUpload);
  doms.upload.addEventListener('dragover',handleDragover);
  doms.upload.addEventListener('dragenter',handleDragenter);
  doms.upload.addEventListener('drop',handleDrop);
  // doms.upload.addEventListener('dragleave',handleDragleave);
  doms.submitBtn.addEventListener('click',handleSubmit);
  doms.attachmentEle.addEventListener('change',handleAttachChange);
}
initListener();

// 读取文件（promise封装FileRender）
function readFile(file,readName = 'readAsArrayBuffer'){
  return new Promise((resolve,reject) =>{
    const fr = new FileReader();
    fr[readName](file);
    // 读取成功
    fr.onload = e =>{
      resolve(e.target.result);
    }
    // 读取进度
    fr.onprogress = e =>{
      const progress = ((e.loaded/e.total) * 100).toFixed(0);
      // console.log(e,e.total);
      console.log(`${progress}%`);
    }
    // 读取失败
    fr.onerror = e =>{
      reject(e);
    }
  })
}

/**
 * 处理上传按钮点击事件
 * 当点击上传区域时，模拟点击文件上传按钮，触发文件选择框
 */
function handleUpload() {
  // 模拟点击文件上传按钮，触发文件选择框
  doms.attachmentEle.click();
}

function handleDragover(e){
  e.stopPropagation();
  e.preventDefault();
  // e.dataTransfer.dropEffect ='move';
  !doms.upload.classList.contains('is-dragover') && doms.upload.classList.add('is-dragover')
  // console.log('handleDragover',e);
}
/**
 * 将文件条目列表转换为文件列表
 * 
 * @param {FileEntry[]} fileEntryList - 包含文件条目的数组
 * @returns {Promise<File[]>} - 解析为文件数组的 Promise
 */
async function fileEntryList2FileList(fileEntryList){
  const fileList = []; // 初始化一个空数组来存储文件
  // 遍历文件条目列表中的每个条目
  for (const entry of fileEntryList) {
    // 使用 Promise 包装 entry.file 方法，以便异步获取文件对象
    const file = await new Promise((resolve,reject) => {
      entry.file(resolve, reject) // 调用 entry.file 方法获取文件对象
    })
    fileList.push(file); // 将文件对象添加到文件列表中
  }
  return fileList; // 返回包含所有文件对象的数组
}

// 处理文件数据
function handleFiles(entry){
  entries.push(entry);
}

function readDirectoryEntries(dirReader) {
  return new Promise((resolve, reject) => {
    dirReader.readEntries(resolve, reject);
  });
}

// 处理文件夹数据 
const entries = [];
async function handleDirectory(directoryEntry){
  const dirReader = directoryEntry.createReader();

  const promiseEntryArr = []
  while(true){
    const result = await readDirectoryEntries(dirReader)
    if(!result.length){
      break;
    }
    promiseEntryArr.push(...result);
  }
  
  await Promise.all(promiseEntryArr.map(async subEntry =>{
      if(subEntry.isFile){
        entries.push(subEntry);
      } else if(subEntry.isDirectory){
        await handleDirectory(subEntry);
      }
  }));
}

// 解析拖拽文件
async function parseItems(items){
  console.log('items.length', items.length);
  // todo Promise.all并发处理能解决中间变量丢失问题
  await Promise.all([...items].map(async (item,i) =>{
    const entry = item.webkitGetAsEntry();
    console.log("item：",i,items.length,item,entry);
    if(entry.isFile){
      handleFiles(entry);
    } else if(entry.isDirectory){
      // entries.length = 0;
      await handleDirectory(entry);
    }
  }))

  // for (let i = 0; i < items.length; i++) {
  //   const item = items[i];
  //   const entry = item.webkitGetAsEntry();
  //   console.log("item：",i,items.length,item,entry);
  //   if(entry.isFile){
  //     handleFiles(entry);
  //   } else if(entry.isDirectory){
  //     // entries.length = 0;
  //     await handleDirectory(entry);
  //   }
  //   console.log('items22',items,items.length);
  // }



  const files = await fileEntryList2FileList(entries);
  console.log('files：',files);
  console.log('entries',entries);
}

// 处理拖拽文件
async function handleDrop(e){
  e.stopPropagation();
  e.preventDefault();
  doms.upload.classList.contains('is-dragover') && doms.upload.classList.remove('is-dragover')
  // const files = e.dataTransfer.files;
  const items = e.dataTransfer.items;
  // console.log('files',files);
  console.log('items',items,items.length);
  console.log('items__copy：',Array.from(items));
  
  await parseItems(items);
  console.log('items222',items,items.length);
}

function handleDragenter(e){
  // console.log('handleDragenter',e);
  e.stopPropagation();
  e.preventDefault();
}
function handleDragleave(e){
  // console.log('handleDragleave',e);
  e.stopPropagation();
  e.preventDefault();
  doms.upload.classList.contains('is-dragover') && doms.upload.classList.remove('is-dragover')
}

// 计算hash值
function calcHash(fileBuffer){
  const spark = new SparkMD5.ArrayBuffer();
  spark.append(fileBuffer);
  const md5 = spark.end();
  return md5;
}

// 分割文件
function handleChunks(file){
  const chunkSize = 1024 * 1024;
  let start = 0;
  const chunkList = []
  return (async()=>{
    try{
      while(start < file.size) {
        const chunk = file.slice(start,start + chunkSize);
        const fileBuffer = await readFile(chunk); 
        const hash = calcHash(fileBuffer);
        chunkList.push({chunk, hash});
        start += chunkSize;
      }
      return chunkList;
    }catch(e){
      throw e;
    }
  })();
}

// 提交上传文件
async function handleSubmit(){
  const file = doms.attachmentEle.files[0];
  if(!file){
    return;
  }

  try{
    const fileList = await handleChunks(file)
    const fileListBuffer = await readFile(new Blob(fileList.map(item => item.chunk)))
    const fileButter = await readFile(file);
    const md5 = calcHash(fileButter);

    console.log('SparkMD5',md5);
    console.log('file：',file);
    console.log('fileList', fileList);
    console.log('fileListMD5', calcHash(fileListBuffer));
  } catch(e){
    console.error(e);
  }

  // previewImg(file)
}

// 图片类型上传文件预览
async function previewImg(file){
  const previewEle = document.querySelector('.preview img');
  const res = await readFile(file,'readAsDataURL');
  previewEle.classList.add('show');
  previewEle.src = res;
  // const fr = new FileReader();
  // fr.onload = e =>{
  //   const res = e.target.result;
  //   previewEle.classList.add('show');
  //   previewEle.src = res;
  // }

  // fr.onerror = e =>{
  //   console.error(e);
  // }

  // fr.readAsDataURL(file);
}

// 文件名列表式预览
function previewList(file){
  const fileName = file.name;
  const li = document.createElement('li');
  li.innerText = fileName;
  doms.previewList.appendChild(li);
}

// 文件框变化
function handleAttachChange(){
  const fileList = doms.attachmentEle.files;
  if(!fileList.length){
    return;
  }
  console.log('handleChange___fileList',fileList);
  
  // previewImg(file);
  // previewList(file);
}