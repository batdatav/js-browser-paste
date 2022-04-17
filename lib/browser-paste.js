const __BrowserPaste = ( event, filterType="")=>{
	return new Promise((resolve, reject)=>{
		//得到对象
		const clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData) || window.clipboardData;
		if( !clipboardData){
			console.warn( 'js-browser-paste not support', event);
			return reject("此浏览器不支持粘贴操作");
		}

		//循环处理items
		let pasteWait = 0;
		const pasteData = [];
		const items = clipboardData.items;
		for( let idx=0; idx<items.length; idx++) {
			const item = items[ idx];
			if( !item.kind) continue;
			if( filterType && item.kind!=filterType && item.type!=filterType) continue;
			const pasteDataItem = {
				kind: item.kind,
				type: item.type,
			};
			pasteData.push( pasteDataItem);
			if( item.kind=="file"){
				const file = item.getAsFile();
				pasteDataItem.name = file.name;
				pasteDataItem.size = file.size;
				pasteDataItem.file = file;
			} else if( item.kind=="string"){
				pasteWait++;
				item.getAsString( ( data)=>{
					pasteWait--;
					pasteDataItem.content = data;
				},(error)=>{
					pasteWait--;
					console.warn( 'js-browser-paste item.getAsString error', error);
				});
			}
		}

		//尽量等待item.getAsString回调执行完成
		const intervalMS = 10;
		const waitComplete = ( waitMS)=>{
			setTimeout(() => {
				if( pasteWait<=0 || waitMS<=0){
					resolve( pasteData);
				}else{
					waitComplete( waitMS-intervalMS)
				}
			}, intervalMS);
		}
		waitComplete( 5000);
	})
}

/**
 * 获取剪贴板数据内容
 * @param {*} event 监听paste的事件值
 * @returns Promise：resolve为剪贴板内容数组对象，reject为异常字串描述
 */
const BrowserPasteAll = ( event)=>{
	return __BrowserPaste( event, "");
}
const BrowserPasteTextPlain = ( event)=>{
	return __BrowserPaste( event, "text/plain");
}
const BrowserPasteTextHtml = ( event)=>{
	return __BrowserPaste( event, "text/html");
}
const BrowserPasteFile = ( event)=>{
	return __BrowserPaste( event, "file");
}

export default {
	BrowserPasteAll,
	BrowserPasteTextPlain,
	BrowserPasteTextHtml,
	BrowserPasteFile,
}