export function sleep(delay: number): Promise<string> {
  const startTime = new Date().getTime();
  return new Promise((resolve) => {
    while (new Date().getTime() - startTime < delay) { }
    resolve('ok')
  })
}

async function main() {
  console.time("111");
  await sleep(1000);
  console.timeEnd("111");

  console.time("222");
  await sleep(2500);
  console.timeEnd("222");

  console.time("333");
  await sleep(3600);
  console.timeEnd("333");
}

main()

export { }