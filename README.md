# js-browser-paste
在现代浏览器中通过JS获取剪贴板中文本或文件数据

## 一、DEMO运行
```
git clone https://github.com/batdatav/js-browser-paste.git
cd js-browser-paste
npm install live-server -g
live-server --port=55988 --no-browser
```
在浏览器上访问查看DEMO：http://127.0.0.1:55988/demo/js-browser-paste.html

## 二、引入方法
### 1、html中使用
下载源码，将browser-paste.js复制到你的工程中，如js目录下
```javascript
<script type="module">
  import BrowserPaste from './js/browser-paste.js'
  //自定义代码
</script>
```
### 2、node使用
```javascript
npm i js-browser-paste
import BrowserPaste from 'js-browser-paste'
```

## 三、方法说明
### 1、BrowserPaste.BrowserPasteAll( event)
返回所有剪贴板数据内容
### 2、BrowserPaste.BrowserPasteTextPlain( event)
返回类型为text/plain的剪贴板数据内容
### 3、BrowserPaste.BrowserPasteTextHtml( event)
返回类型为text/html的剪贴板数据内容
### 4、BrowserPaste.BrowserPasteFile( event)
返回类型为file的剪贴板数据内容

## 四、示例
```javascript
const pasteArea = document.getElementById("paste-area");

const doPaste = async ( event)=>{
  let pasteContent = "";
  try{
    pasteContent = await BrowserPaste.BrowserPasteAll( event);
  }catch( e){
    pasteContent = e;
  }
  console.log( 'doPaste', event, pasteContent);
  pasteArea.innerHTML = "<pre>"+JSON.stringify( pasteContent, null, 2)+"</pre>";
}

pasteArea.addEventListener("paste", (event)=>{
  doPaste( event);
});
```

## 五、浏览器支持
```
功能在较新版本的浏览器测试，如功能不能使用请升级版本
浏览器      文本粘贴      操作系统中文件复制后粘贴    浏览器中图片复制后粘贴
Chrome      支持              支持                    支持
Safari      支持              支持                    支持
Firefox     支持              支持(图片单文件)          支持
Edge        支持              支持                    不支持
360         支持              不支持                  支持(本浏览器内)
QQ          支持              不支持                  支持(本浏览器内)
遨游         支持             支持                     支持(本浏览器内)
搜狗         支持             不支持                   支持(本浏览器内)
IE          不支持            不支持                   不支持
```

## 六、访问官网获取更多内容
[bat-datav](https://www.batdatav.com) => https://www.batdatav.com