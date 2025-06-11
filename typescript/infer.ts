// example1
type sum = (a: number, b: number) => number;
type concat = (a: any[], b: any[]) => string[];
type Return<T> = T extends (...args: any[]) => infer R ? R : T;

type sumRes = Return<sum>; // num
type concatRes = Return<concat>; // any[]

// example2
type PromiseType<T> = T extends Promise<infer R> ? PromiseType<R> : T;
/*  */
type pt = PromiseType<Promise<string>>
type pt2 = PromiseType<Promise<Promise<number[]>>>

// example3
type FirstArg<T> = T extends (fistArg: infer R, ...args: any[]) => any ? R : T;

type fa = FirstArg<(name: string, arg: number) => void>;
type fa2 = FirstArg<(name: boolean, arg: number) => void>;

// example4
type ArrayType<T> = T extends Array<infer R> ? R : T

type ItemType1 = ArrayType<[string | number]>; // string|number
type ItemType2 = ArrayType<string[]>; // string[]