
var VIP_INFO =new Array(
["思古","https://api.sigujx.com/jx/?url="],
["金桥","http://jqaaa.com/jx.php?url="],
["无限","https://v.88tv.org/?v="],
["全网","https://jx.lache.me/cc/?url="],
["拉车","https://jx.lache.me/cc/?url="],
["狂野","https://api.653520.top/vip/?url="],
["无名","https://www.administratorw.com/video.php?url="],
["人人","https://vip.mpos.ren/v/?url="],
["花园","https://j.zz22x.com/jx/?url="],
["穷二","https://jx.ejiafarm.com/dy.php?url="],
["超清","https://cdn.yangju.vip/k/?url="],
["AB33","https://jx.ab33.top/vip/?url="],
["180","https://jx.000180.top/jx/?url="],
["58","https://jx.km58.top/jx/?url="],
["DU2","http://jx.du2.cc/?url="],
["DRG","http://jx.drgxj.com/?url="],
["618","http://jx.618ge.com/?url="],
["598","http://jx.598110.com/?url="],
["瀚晶","https://beaacc.com/api.php?url="],
["IDC","https://jx.idc126.net/jx/?url="],
["ZCH","http://api.myzch.cn/?url="],
["1907","https://z1.m1907.cn/?jx="],
["HA12","http://py.ha12.xyz/sos/index.php?url="],
["17云","https://www.1717yun.com/jx/ty.php?url="],
["大享","http://jx.oopw.top/?url="]

);

var see = document.getElementById("see");
var rid = 0 ;
var Furl   = "";
var TvInfo = document.getElementById("play");
var TvJSON = {};

//检测网址
function IsURL(strUrl) {
	//var regular = /^\b(((https?|ftp):\/\/)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]?)$/i
	var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
	return regular.test(strUrl)
}
//跨域权限
$.ajaxPrefilter(function (options) {
	if (options.crossDomain && jQuery.support.cors) {
		var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
		options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
	}
});

function GetSel(){
	var SLIST = new Array("https://v.qq.com/x/search/","https://so.iqiyi.com/","https://www.soku.com/","https://so.mgtv.com/so","about:blank");
	var tvobj  = document.getElementById("tvv");
	var iframe = document.getElementById('tvf');
	for(var i =0 ;i<iframe.length;i++){
		if(iframe[i].checked){
			//alert(iframe[i].value);
			tvobj.innerHTML = '<iframe name="tvif" height=200 width=100%  src="'+SLIST[i]+'"> </iframe>' ;
			break;
		}
	}
}

function GoUrl() {
	var url = document.getElementById("url").value;
	tvobj.innerHTML = '<iframe name="tvif" height=400 width=100%  src="'+url+'"> </iframe>' ;
}


if(see){
	for (var z=0;z < VIP_INFO.length ;z++){
		see.innerHTML += '<label><input name="seer" type="radio"/>'+VIP_INFO[z][0]+'</label>';
	}
}

function GetCode(){
	var url  = document.getElementById("url").value;
	var tvobj = document.getElementById("code");
	if(IsURL(url)){
		tvobj.innerHTML = "Load...";
		//var code = null;
		$.get(url,function (response) {
			//$("#html").html(response);
			//var mydata = response.match(new RegExp('LIST_INFO'+'(.*?)'+'data'))[1];
			//mydata = mydata.substring(mydata.indexOf("[") + 1, mydata.indexOf("]"));

			tvobj.innerHTML = '<textarea id = "out" style="width:100%"/></textarea>';//.match(new RegExp('["'+'(.*?)'+'"]'))[1];
      var cobj = document.getElementById("out");
      cobj.value = response;
      cobj.style.height = cobj.scrollHeight + 20 + "px";
			//code = new Array(mydata.replace(/\"/g, "").split(','));

		}).fail(function () {
			tvobj.innerHTML = '查看失败';
		});
	}
	else
	{
		tvobj.innerHTML = '请输入正确网址';
	}
}

function SeeMe() {
	for(var i =0 ;i<see.length;i++){
		if(see[i].checked){
			//alert(iframe[i].value);
			//selurl = VIP_INFO[i][1];
			rid = i;
			break;
		}
	}
	
	if(!TvJSON.ok)
	return;

	if(TvJSON.len>1){
		TvInfo.innerHTML = "";
		for (var zz=0;zz < TvJSON.len ;zz++)
		{
			if(TvJSON.data[zz].mask == 1 || TvJSON.data[zz].mask == 7)
			TvInfo.innerHTML += '<span><a target="_blank" href="'+VIP_INFO[rid][1]+TvJSON.data[zz].url+'">'+ (zz+1) + 'v</a></span>';
			else if(TvJSON.data[zz].mask != 4)
			TvInfo.innerHTML += '<span><a target="_blank" href="'+VIP_INFO[rid][1]+TvJSON.data[zz].url+'">'+ (zz+1) + '</a></span>';
		}
	}
	else
	TvInfo.innerHTML = '<a target="_blank" href="'+VIP_INFO[rid][1]+TvJSON.data[0].url+'">点我播放</a>';

	//document.getElementById("tvv").innerHTML = '<iframe name="tvif" height=200 width=100%  src="'+SLIST[i]+'"> </iframe>' ;
	//document.getElementById("mv").innerHTML = '<video src="'+selurl+'" width="320" height="240" controls="controls"></video>';
}

//网址有变化时
function NoCheck() {
	var url  = document.getElementById("url").value;
	//var url  = "https://v.qq.com/x/cover/mzc00200a7ghbkc.html";
	if(!IsURL(url)){
		TvInfo.innerHTML = '请输入正确网址';
		return;
	}
	TvJSON={};
			//window.open(selurl+url);
			TvJSON.data = new Array(1);
			TvJSON.data[0]={};
			TvJSON.data[0].url  = url;
			TvJSON.ok = 1;
			
if(see[rid].checked)
		SeeMe();
	}
//剧集
function GetAll() {
	var url  = document.getElementById("url").value;
	//var url  = "https://v.qq.com/x/cover/mzc00200a7ghbkc.html";
	if(!IsURL(url)){
		TvInfo.innerHTML = '请输入正确网址';
		return;
	}
	
  see[rid].checked=1;
  
	if(url.search("qq.com") != -1){//https://v.qq.com/x/cover/m441e3rjq9kwpsc/l0025jj5k4c.html

		TvInfo.innerHTML = "腾讯剧集解析中...";//https://v.qq.com/x/cover/dxd1v76tmu0wjuj.html
		TvJSON={};
		var murl =null;
		if(url.search("m.v.qq.com") != -1){
		//http://m.v.qq.com/cover/m/m441e3rjq9kwpsc.html?vid=h0025x3mn7z
		//http://m.v.qq.com/x/m/play?cid=m441e3rjq9kwpsc&vid=m0025m9timl&ref_pg=page_video_detail
	   murl = url.match(/cid=(\w+)/);
	   if(!murl)
	      murl =  (url.substring(url.lastIndexOf("\/")+1,url.length)).split('.')[0];
	   else
	  	  murl =murl[0].split('=')[1];
	   if(!murl){
	    	TvInfo.innerHTML = "cid错误...";
	    	return;
	    }
	    url ='https://v.qq.com/x/cover/'+murl+'.html';
	  }
		$.get(url,function (response) {
			//$("#html").html(response);
			//var mydata = response.match(new RegExp('LIST_INFO'+'(.*?)'+'data'))[1];
			//var mydata = response.match(new RegExp('current_topic'+'(.*?)'+',"series_num'))[1];
			//mydata = mydata.substring(mydata.indexOf("[") + 1, mydata.indexOf("]"));
			//tvobj.innerHTML = '<textarea rows="10" style="width:100%"/>'+mydata+'</textarea>';//.match(new RegExp('["'+'(.*?)'+'"]'))[1];
			//code = new Array(mydata.replace(/\"/g, "").split(','));
			var mydata = response.match(new RegExp('update_des'+'(.*?)'+',"comment_show_type'))[1];
			var obj = JSON.parse('{"'+mydata+'}');
			TvJSON.title = obj.title;
			TvJSON.len =  obj.vip_ids.length;
			TvJSON.data = new Array(TvJSON.len);
			if(TvJSON.len > 1){
				var codehead = url.substring(0, url.lastIndexOf("/")+1);
				if(murl)
					codehead = url.substring(0, url.lastIndexOf("."))+"/";

				for (var zz=0;zz < TvJSON.len ;zz++)
				{
					TvJSON.data[zz]={};
					TvJSON.data[zz].mask = obj.vip_ids[zz].F;
					TvJSON.data[zz].url  = codehead+obj.vip_ids[zz].V+'.html';
				}
			}else{
				var codehead = url.substring(0, url.lastIndexOf("."));
				TvJSON.data[0]={};
				TvJSON.data[0].mask = obj.vip_ids[0].F;
				TvJSON.data[0].url  = codehead+'/'+obj.vip_ids[0].V+'.html';
			}
			TvJSON.ok = 1;
			SeeMe();

		  }).fail(function (){TvJSON.ok=null;TvInfo.innerHTML = '解析失败';});
		}	
		else if(url.search("iqiyi.com") != -1){//https://www.iqiyi.com/v_19rx9jx19s.html
			TvInfo.innerHTML = "爱奇艺剧集解析中...";//http://www.iqiyi.com/v_19rrokkpxs.html
			
			$.get(url,function (response) {
				//response = (document.querySelector('[name="apple-itunes-app"]').getAttribute("content") || "").match(/aid=\d{2,}/);
				var mydata = (response.match(new RegExp('name="apple-itunes-app"'+'(.*?)'+'>'))[1]).match(/aid=(\d+)/);
				mydata = mydata[0].split('=')[1];
				//var mydata = response.match(new RegExp('albumid'+'(.*?)'+'";'))[1];
				//mydata = mydata.split('"')[1];
				TvInfo.innerHTML = "解析albumid:"+mydata;
				if(mydata > 1){//https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid=202328401&page=1&size=30
				TvJSON={};
				$.get('https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid='+mydata+'&page=1&size=9999',function (res) {
					var obj = res;
					TvJSON.len = obj.data.epsodelist.length;
					TvJSON.data = new Array(TvJSON.len);
					if(TvJSON.len > 1){
						for (var zz=0;zz < TvJSON.len ;zz++)
						{
							TvJSON.data[zz]={};
							TvJSON.data[zz].mask = obj.data.epsodelist[zz].payMark;
							TvJSON.data[zz].url  = obj.data.epsodelist[zz].playUrl;
						}
					}else{
						TvJSON.data[0]={};
						TvJSON.data[0].mask = obj.data.epsodelist[zz].payMark;
						TvJSON.data[0].url  = obj.data.epsodelist[zz].playUrl;
					}
					
					TvJSON.ok = 1;
					SeeMe();

			  });
			}					
					SeeMe();
			}).fail(function (){TvJSON.ok=null;TvInfo.innerHTML = '解析失败';});
		}

 }
