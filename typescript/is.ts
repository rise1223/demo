import { el } from "element-plus/es/locale";

interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark: () => void;
}

interface Cat extends Animal {
  meow: () => void;
}

interface Wolf extends Animal {
  howl: () => void;
}

/**
 * TypeScript类型守卫函数 - 判断一个动物对象是否为Dog类型
 * 
 * 该函数使用"in"操作符检查对象是否包含特定属性，实现运行时类型检查
 * 并在TypeScript编译时提供类型缩窄功能
 * 
 * @param animal 要检查的动物对象，类型为Animal接口
 * @returns 如果animal包含bark属性则返回true，否则返回false
 *          在TypeScript中，返回true时会将animal类型缩窄为Dog
 */
function isDog(animal: Animal): animal is Dog {
  return "bark" in animal;
}

const dog = { name: "Buddy", bark: () => console.log("Woof!") };
const cat = { name: "Whiskers", meow: () => console.log("Meow!") };
const wolf = { name: "Alpha", howl: () => console.log("Awooo!") };

const handleAnimal = (animal: Animal) => {
  if (isDog(animal)) {
    animal.bark();
  } else {
    animal
  }
}
console.log(isDog(dog));
console.log(isDog(cat));
console.log(isDog(wolf));


function isArray(value: unknown) {
  if (Array.isArray(value)) {
  }
}

// let a: number = null;
function test(val: string | number| undefined|null) {
  val
  if (val !== undefined && val !== null) {
    val
  }
}