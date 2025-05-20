class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 在链表尾部添加数据
  add (data) {
    const newNode = new Node(data)
    if (!this.head) {
      // 链表为空
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  // 检查下标是否越界
  isOverIndex (index) {
    return index < 0 || index > this.size;
  }
  // 在指定位置添加数据
  addAt (data, index) {
    if (this.isOverIndex(index)) {
      throw new Error("下标越界！！！");
    }

    const newNode = new Node(data);
    let current = this.head;
    let previous = null;
    if (index === 0) {
      this.head = newNode;
      this.head.next = current;
    } else {
      while (index) {
        previous = current;
        current = current.next;
        index--;
      }
      previous.next = newNode;
      newNode.next = current;
    }
    this.size++;
  }
  // 打印链表
  print () {
    let result = "";
    let current = this.head;
    while (current.next) {
      result += current.data + "->";
      current = current.next;
    }
    result += current.data + "->null";
    console.log(result);
  }
  // 反转链表
  reverse(){
    let current = this.head;
    let previous = null;
    let next =  this.head.next
    while(next){
      previous = current;
      current = next;
      next = next.next;
      this.head = current

      // console.log('previous：',previous);
      // console.log('current',current);
      // console.log('next',next);
      // previous.next = null;
      current.next = previous;
      previous.next = null;
    console.log("current",current);

    }
    
  }
}

// 创建链表
const ll = new LinkedList();
ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
ll.add(5)
ll.add(6)
ll.print()
ll.addAt(666, 6)
ll.print()
ll.reverse()
ll.print()
