
var tvobj  = document.getElementById("tvv");

var VIP_INFO =new Array(
["思古","https://api.sigujx.com/jx/?url="],
["无限","https://v.88tv.org/?v="],
["全网","https://jx.lache.me/cc/?url="],
["拉车","https://jx.lache.me/cc/?url="],
["狂野","https://api.653520.top/vip/?url="],
["无名","https://www.administratorw.com/video.php?url="],
["人人","https://vip.mpos.ren/v/?url="],
["花园","https://j.zz22x.com/jx/?url="],
["穷二代","https://jx.ejiafarm.com/dy.php?url="],
["YANGJU","https://cdn.yangju.vip/k/?url="],
["AB33","https://jx.ab33.top/vip/?url="],
["108","https://jx.000180.top/jx/?url="],
["58","https://jx.km58.top/jx/?url="],
["DU2","http://jx.du2.cc/?url="],
["DRGXJ","http://jx.drgxj.com/?url="],
["618GE","http://jx.618ge.com/?url="],
["598110","http://jx.598110.com/?url="],
["BEAACC","https://beaacc.com/api.php?url="],
["IDC126","https://jx.idc126.net/jx/?url="]

);

function GetSel(){
	var SLIST = new Array("https://v.qq.com/x/search/","https://so.iqiyi.com/","https://www.soku.com/","https://so.mgtv.com/so","about:blank");
	var iframe = document.getElementById('tvf');
	for(var i =0 ;i<iframe.length;i++){
		if(iframe[i].checked){
			//alert(iframe[i].value);
			tvobj.innerHTML = '<iframe name="tvif" height=200 width=100%  src="'+SLIST[i]+'"> </iframe>' ;
			break;
		}
	}
}
//<div><iframe id="ts" name="ts" height=200 width=100% src="https://v.qq.com/x/search/"></iframe></div>
function GoUrl() {
	var url = document.getElementById("url").value;
	tvobj.innerHTML = '<iframe name="tvif" height=400 width=100%  src="'+url+'"> </iframe>' ;
}

var see = document.getElementById("see");
var z =0 ;
while (VIP_INFO[z++]){
	see.innerHTML += '<label><input name="seer" type="radio"/>'+VIP_INFO[z-1][0]+'</label>';
}

$.ajaxPrefilter(function (options) {
	if (options.crossDomain && jQuery.support.cors) {
		var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
		options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
		//options.url = "http://cors.corsproxy.io/url=" + options.url;
	}
});

var code = null;
function GetCode(){
	var url  = document.getElementById("url").value;
	if(url){
		tvobj.innerHTML = "Load...";
		code = null;
		$.get(url,function (response) {
			//$("#html").html(response);
			var mydata = response.match(new RegExp('LIST_INFO'+'(.*?)'+'data'))[1];
			mydata = mydata.substring(mydata.indexOf("[") + 1, mydata.indexOf("]"));

			tvobj.innerHTML = '<textarea rows="10" style="width:100%"/>'+mydata+'</textarea>';//.match(new RegExp('["'+'(.*?)'+'"]'))[1];

			code = new Array(mydata.replace(/\"/g, "").split(','));

		});
	}
}

function SeeMe() {
	var selurl = null;
	var url  = document.getElementById("url").value;
	//var code = new Array(document.getElementById("codet").value);
	//var str = document.getElementById("codet").value;
	//var code = new Array(str.replace(/\"/g, "").split(','));
	var tv1 = document.getElementById("tv1");

	var zz=0;
	for(var i =0 ;i<see.length;i++){
		if(see[i].checked){
			//alert(iframe[i].value);
			selurl = VIP_INFO[i][1];
			break;
		}
	}

	if(code){
		tv1.innerHTML = "";
		var index = url.lastIndexOf("/");
		var codehead = url.substring(0, index+1);

		while (code[0][zz++]){
			tv1.innerHTML += '<span><a target="_blank" href="'+selurl+codehead+code[0][zz-1]+'.html">'+ zz + '</a></span>';
		}
	}
	else
	tv1.innerHTML = '<span><a target="_blank" href="'+selurl+url+'">'+ zz + '</a></span>';
	//document.getElementById("tvv").innerHTML = '<iframe name="tvif" height=200 width=100%  src="'+SLIST[i]+'"> </iframe>' ;
	//document.getElementById("mv").innerHTML = '<video src="'+selurl+'" width="320" height="240" controls="controls"></video>';
}

//alert(f("haha").document.body.innerHTML);
/*var test=document.getElementsByTagName('html')[0].outerHTML;
alert(test);
console.log(test);*/
