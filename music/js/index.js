/**
 * 解析歌词
 * 将歌词字符串转为包含时间和歌词的数组
 */
const parseData = ()=>lrc.split('\n').map(item=>{
  const [timeStr,content] = item.split(']')
  const timeArr = timeStr.substring(1).split(':')
  const time = +timeArr[0]*60 + +timeArr[1]
  return {
    time,
    content
  }
})

const lrcList = parseData()
const doms = {
  audio: document.querySelector('audio'),
  container: document.querySelector('.container'),
  lrcList: document.querySelector('.lrc-list')
} 


/**
 * 寻找当前播放歌词（高亮）的索引
 * 如果进度条为0时返回-1，因为不需要高亮
 */
const findActiveIndex = ()=>{
  const currentTime = doms.audio.currentTime
  const currentIndex = lrcList.findIndex(item=>item.time>currentTime) - 1 
  // 边界处理，如果是-2，就返回最后一个歌词的索引
  resIndex = currentIndex < -1 ? lrcList.length - 1 : currentIndex
  return resIndex
}

/**
 * 渲染歌词
 */
const renderUI = ()=>{
  const fragment = document.createDocumentFragment()
  lrcList.forEach(item=>{
    const li = document.createElement('li')
    li.textContent = item.content
    fragment.appendChild(li)
  })
  doms.lrcList.appendChild(fragment)
}

renderUI()

const containerHeight = doms.container.clientHeight
const lrcListHeight = doms.lrcList.clientHeight
const liHeight = [...document.querySelectorAll('.lrc-list li')][0].clientHeight

/**
 * 滚动歌词
 */
const scrollLrc = ()=>{
  const lrcList = document.querySelectorAll('.lrc-list li')
  const activeIndex = findActiveIndex()
  const activeLi = document.querySelector('.lrc-list li.active')
  activeLi && activeLi.classList.remove('active')
  lrcList[activeIndex] && lrcList[activeIndex].classList.add('active')
  
  let transformY = activeIndex * liHeight - (containerHeight - liHeight)/2
  // 下限是0
  if(transformY < 0) {
    transformY = 0
  }
  // 上限：ul高度减去容器高度
  if(transformY > lrcListHeight - containerHeight) {
    transformY = lrcListHeight - containerHeight
  }
  doms.lrcList.style.transform = `translateY(-${transformY}px)`
}

doms.audio.addEventListener('timeupdate', scrollLrc)

console.log('lrcList', lrcList);