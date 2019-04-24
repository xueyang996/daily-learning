let fs = require('fs')
let path = require('path')
var officegen = require('officegen');
var docx  = officegen ( 'docx' );

let pObj = docx.createP()

// 获取命令行参数
let parm = process.argv.splice(2);
// 第一个参数为路径， 后面的参数为文件类型
let [rootpath, ...types] = parm

let filter = ['node_modules', '.git', 'testservice', 'dist']

// 统计结果
let num = 0

// 获取行数
async function line(path) {
  let rep = await fs.readFileSync(path)
  rep = rep.toString()
  let lines = rep.split('\n')
  pObj.addText(rep)
  console.log(path, num)
  num += lines.length
}

// 过滤不需要的文件夹
function checkFilter(path) {
  return filter.some(item =>(path.indexOf(item) !== -1))
}

async function getTotalLine(rootpathpre) {
  let files = fs.readdirSync(rootpathpre)
  files
    .forEach(file => {
      let resultPath = `${rootpathpre}/${file}`
      let stat = fs.statSync(resultPath)
      // console.log(resultPath,stat)
      if (stat.isDirectory()) {
        if(checkFilter(resultPath)) {
          console.log(resultPath, '???????????')
          return
        }
        getTotalLine(resultPath)
        return
      }

      let type = path.extname(resultPath)
      if (types.indexOf(type) !== -1) {
        line(resultPath)
      }
    })
}

async function test () {
  await getTotalLine(rootpath)
  console.log(`总代码行数：${num}`)
  let out = fs.createWriteStream('example.docx')

  out.on('error', function(err) {
    console.log(err)
  })

  // Async call to generate the output file:
  docx.generate(out)
}
test()