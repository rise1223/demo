const express = require("express");
const path = require("path");
const app = express();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// 所有上传的文件存放在该目录下
const UPLOADS_DIR = path.resolve(__dirname,"uploads");

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.send('<h1>首页</h1>')
})

/**
 * 上传
 */
app.get("/upload", multipartMiddleware, (req, res) => {
  const { fileHash, chunkHash } = req.body;

  // 如果临时文件夹(用于保存分片)不存在，则创建
  const chunkDir = path.resolve(UPLOADS_DIR, fileHash);
  if (!fse.existsSync(chunkDir)) {
    fse.mkdirSync(chunkDir);
  }

  // 如果临时文件夹里不存在该分片，则将用户上传的分片移到临时文件夹里
  const chunkPath = path.resolve(chunkDir, chunkHash);
  if (!fse.existsSync(chunkPath)) {
    fse.moveSync(req.files.chunk.path, chunkPath);
  }

  res.send({
    success: true,
    msg: "上传成功",
  });
});

/**
 * 合并
 */
app.post("/merge", async (req, res) => {
  const { fileHash, fileName } = req.body;

  // 最终合并的文件路径
  const filePath = path.resolve(UPLOADS_DIR, fileHash + path.extname(fileName));
  // 临时文件夹路径
  const chunkDir = path.resolve(UPLOADS_DIR, fileHash);

  // 读取临时文件夹，获取该文件夹下“所有文件（分片）名称”的数组对象
  const chunkPaths = fse.readdirSync(chunkDir);

  // 读取临时文件夹获得的文件（分片）名称数组可能乱序，需要重新排序
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

  // 遍历文件（分片）数组，将分片追加到文件中
  const pool = chunkPaths.map(
    (chunkName) =>
      new Promise((resolve) => {
        const chunkPath = path.resolve(chunkDir, chunkName);
        // 将分片追加到文件中
        fse.appendFileSync(filePath, fse.readFileSync(chunkPath));
        // 删除分片
        fse.unlinkSync(chunkPath);
        resolve();
      })
  );
  await Promise.all(pool);
  // 等待所有分片追加到文件后，删除临时文件夹
  fse.removeSync(chunkDir);

  res.send({
    success: true,
    msg: "合并成功",
  });
});

app.listen(6688, () => {
  console.log('server is running');
})