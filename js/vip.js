var rid = 0;
var TvInfo = document.getElementById("play");
var TvJSON;

var see = document.getElementById("see");
if(see){
	for (var z=0;z < VIP_INFO.length ;z++){
		see.innerHTML += '<label><input name="seer" type="radio"/>'+VIP_INFO[z][0]+'</label>';
	}
}

function CloseWUInfo(id1) {
document.getElementById(id1).style.display='none';
document.getElementById(id1+'_colse').style.display='none';
}

//检测网址
function IsURL(strUrl) {
    //var regular = /^\b(((https?|ftp):\/\/)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]?)$/i
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    return regular.test(strUrl)
}

function GetCode() {
    var url = document.getElementById("url").value;
    var tvobj = document.getElementById("code");
    if (IsURL(url)) {
        tvobj.innerHTML = "Load...";
        //var code = null;
        $.get(url,
        function(response) {

            tvobj.innerHTML = '<textarea id = "out" style="width:100%"/></textarea>'; //.match(new RegExp('["'+'(.*?)'+'"]'))[1];
            var cobj = document.getElementById("out");
            cobj.value = response;
            cobj.style.height = cobj.scrollHeight + 20 + "px";
            //code = new Array(mydata.replace(/\"/g, "").split(','));
        }).fail(function() {
            tvobj.innerHTML = '查看失败';
        });
    } else {
        tvobj.innerHTML = '请输入正确网址';
    }
}
function TPlist(ty) {
    var type = document.getElementById("type");
    type.style.display = 'block';  
    document.getElementById("type_colse").style.display = 'block';
    type.innerHTML = ""; //清空内容
    var list = new Array("电影","电视剧","纪录片","动漫","综艺");
    var tynum = [[0,1,2,3],[0,1,2,3],[3,2,105,50,1],[1,2,3,4,5]];
    
    for (var zz = 0; zz < list.length; zz++) {
    type.innerHTML += '<label><a href="javascript:HotJSON('+ty+','+tynum[ty][zz]+',1);">' + list[zz] + '</a></label>';
    //jsurl = 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=1&ret_num=50';
     }
}
function HotJSON(ty,id,pid) {
    var test = document.getElementById("test");
    test.style.display = 'block';
    document.getElementById("test_colse").style.display = 'block';
    //test.className = 'vip';    
    test.innerHTML = ""; //清空内容
    var tt = randomn(13);
    var hotlist = [
    {"name":"","jsurl":''},
    {"name":"","jsurl":""},
    {"name":"name","title":"info","playurl":"play_url","aid":"videoId","jsurl":'https://rc.mgtv.com/pc/ranklist?&c='+id+'&t=all&limit=50&rt=c&t='+tt+'&_support=10000000&_='+tt},
    {"name":"name","title":"period","playurl":"playUrl","aid":"albumId","jsurl":'https://pcw-api.iqiyi.com/search/recommend/list?channel_id='+id+'&data_type=1&mode=1&page_id='+pid+'&ret_num=50'}
    ];    
    
    //var jsurl = 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id='+id+'&data_type=1&mode=1&page_id='+pid+'&ret_num=50';
        
    TPlist(ty);

    $.ajax({url:hotlist[ty].jsurl,type:"GET",dataType:"jsonp",success:function (result){      

     var redata = [result.data,result.data,result.data,result.data.list];
  
          $.each(redata[ty],function(infoIndex,info){
           test.innerHTML += '<label><a href="javascript:document.getElementById(\'url\').value=\'' + info[hotlist[ty].playurl] + '\';GetAll(\''+info[hotlist[ty].aid]+'\');" title="' + info[hotlist[ty].title] + '">' + info[hotlist[ty].name] + '</a></label>';
          });
          
          if(ty==3){
        test.innerHTML += '<p></p>';
      for (var zz = 1; zz < 11; zz++) { 
         test.innerHTML += '<span class="pages"><a href="javascript:HotJSON('+ty+','+id+','+zz+');">'+ zz +'</a></span>';
       }
       }
     },
     error:function(callback) {
      console.log("fail="+callback);
       }
      });     
}

function MeJSON() {
    var test = document.getElementById("test");
    test.style.display = 'block';
    document.getElementById("test_colse").style.display = 'block';
    //test.className = 'vip';    
    test.innerHTML = ""; //清空内容
    $.each(tvlist,function(infoIndex, info) {
        test.innerHTML += '<label><a href="javascript:document.getElementById(\'url\').value=\'' + info["url"] + '\';GetAll();">' + info["name"] + '</a></label>';
    });
}

//==============================================
function SeeMe() {
    for (var i = 0; i < see.length; i++) {
        if (see[i].checked) {
            //alert(iframe[i].value);
            //selurl = VIP_INFO[i][1];
            rid = i;
            break;
        }
    }

    if (!TvJSON.ok) {
        var test = document.getElementById("test");
        test.style.display = 'block';
        document.getElementById("test_colse").style.display = 'block';
        test.innerHTML = '<iframe name="tvif" height=400 width=100% security="restricted" sandbox="" src="' + VIP_INFO[rid][1] + '"> </iframe>';
        return;
    }

    if (TvJSON.len > 1) {
        TvInfo.innerHTML = "";
        for (var zz = 0; zz < TvJSON.len; zz++) {
            if (TvJSON.data[zz].mask == 1 || TvJSON.data[zz].mask == 7)
            TvInfo.innerHTML += '<span class="mask"><a target="_blank" href="' + VIP_INFO[rid][1] + TvJSON.data[zz].url + '">' + (zz + 1) + '</a></span>';
            else
            TvInfo.innerHTML += '<span class="nomask"><a target="_blank" href="' + VIP_INFO[rid][1] + TvJSON.data[zz].url + '">' + (zz + 1) + '</a></span>';
        }
    } else TvInfo.innerHTML = '<a target="_blank" href="' + VIP_INFO[rid][1] + TvJSON.data[0].url + '">点我播放</a>';

    //document.getElementById("tvv").innerHTML = '<iframe name="tvif" height=200 width=100%  src="'+SLIST[i]+'"> </iframe>' ;
    //document.getElementById("mv").innerHTML = '<video src="'+selurl+'" width="320" height="240" controls="controls"></video>';
}

//网址有变化时
function NoCheck() {
    var url = document.getElementById("url").value;
    //var url  = "https://v.qq.com/x/cover/mzc00200a7ghbkc.html";
    if (!IsURL(url)) {
        TvInfo.innerHTML = '请输入正确网址';
        return;
    }
    TvJSON = {};
    //window.open(selurl+url);
    TvJSON.data = new Array(1);
    TvJSON.data[0] = {};
    TvJSON.data[0].url = url;
    TvJSON.ok = 1;

    if (see[rid].checked) SeeMe();
}

//n位字母数字随机数(10改16为16进，改36含所有字母)
function randomn(n) {
    let res = ''
    for (; res.length < n; res += Math.random().toString(10).substr(2)) {}
    return res.substr(0, n)
}

//剧集
function GetAll(aid) {
    var inputurl = document.getElementById("url").value;

    if (!IsURL(inputurl)) {
        TvInfo.innerHTML = '请输入正确网址';
        return;
    }

    see[rid].checked = 1;

    if (inputurl.search("qq.com") != -1) {

        TvInfo.innerHTML = "腾讯剧集解析中...";
        TvJSON = {};

        var cid = inputurl.match(/((cover\/.\/)|(cover\/))(\w+)/);
        if (!cid) cid = inputurl.match(/cid=(\w+)/)[0].split('=')[1];
        else cid = cid[0].substring(cid[0].lastIndexOf("\/") + 1, cid[0].length);
        //  cid =cid[0].split('/')[1];
        if (!cid) {
            TvInfo.innerHTML = "cid错误...";
            return;
        }

        var jsonurl = 'https://s.video.qq.com/get_playsource?id=' + cid + '&plat=2&type=1&data_type=1&video_type=3&plname=&otype=json&num_mod_cnt=99&_t=' + randomn(13);
        //var jsonurl = 'https://s.video.qq.com/loadplaylist?type=4&id='+cid+'&plname=qq&video_type=10&otype=json&year=2016';
        $.ajax({
            url: jsonurl,
            type: "GET",
            dataType: "jsonp",
            success: function(result) {
            	TvJSON.title = result.playlist[0].videoPlayList[0].title;
                TvJSON.len = result.playlist[0].videoPlayList.length;
                TvJSON.data = new Array(TvJSON.len);
                if (TvJSON.len > 0) {

                    for (var zz = 0; zz < TvJSON.len; zz++) {
                        TvJSON.data[zz] = {};
                        TvJSON.data[zz].mask = result.playlist[0].videoPlayList[zz].payType;
                        TvJSON.data[zz].url  = result.playlist[0].videoPlayList[zz].playUrl;
                        TvJSON.data[zz].type = result.playlist[0].videoPlayList[zz].type;
                    }
                    TvJSON.ok = 1;
                    SeeMe();
                } else {
                    TvJSON.ok = null;
                    TvInfo.innerHTML = '解析失败';
                }

            },
            error: function(callback) {
                console.log("fail=" + callback);
            }
        });
    }
    else if(inputurl.search("iqiyi.com") != -1) {
        TvInfo.innerHTML = "爱奇艺剧集解析中...";
        TvJSON = {};
        var jsonurl = 'https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid='+aid+'&page=1&size=999';
        //https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid=[albumId]&page=[页数]&size=[每页数据数]&callback=
        //cache.video.qiyi.com/jp/avlist/[albumId]/1/50/弹幕
        $.ajax({url: jsonurl,type: "GET",dataType: "jsonp",success: function(result) {
        	if (result.errMsg||!result.data.epsodelist.length){
        		TvJSON.data = new Array(1);
        		TvJSON.data[0] = {};
        		TvJSON.data[0].url = inputurl;
          }else{
        	TvJSON.title = result.data.epsodelist[0].name;
          TvJSON.len = result.data.epsodelist.length;
          TvJSON.data = new Array(TvJSON.len);
                
                    for (var zz = 0; zz < TvJSON.len; zz++) {
                        TvJSON.data[zz] = {};
                        TvJSON.data[zz].mask = result.data.epsodelist[zz].payMark;
                        TvJSON.data[zz].url = result.data.epsodelist[zz].playUrl;
                    }

                  }
                    TvJSON.ok = 1;
                    SeeMe(); 
            },
            error: function(callback) {
                TvJSON.ok = null;
                TvInfo.innerHTML = '解析失败';            	
                console.log("fail=" + callback);
            }
        });
    }
    else if(inputurl.search("mgtv.com") != -1) {
        TvInfo.innerHTML = "剧集解析中...";
        TvJSON = {};
        var jsonurl = 'https://pcweb.api.mgtv.com/episode/list?_support=10000000&version=5.5.35&video_id='+aid+'&page=1&size=50';//最大50,其它在page=0
        //https://pcweb.api.mgtv.com/episode/list?_support=10000000&version=5.5.35&video_id=[视频ID]&page=0&size=[每页数据数]&&callback=

        $.ajax({url: jsonurl,type: "GET",dataType: "jsonp",success: function(result) {
        	if (result.errMsg||!result.data.list.length){
        		TvJSON.data = new Array(1);
        		TvJSON.data[0] = {};
        		TvJSON.data[0].url = inputurl;
          }else{
          
          TvJSON.ok = 1;
        	TvJSON.title = result.data.info.title;
          TvJSON.len   = result.data.total;
          TvJSON.data  = new Array(TvJSON.len);
          var n = 0;
         for (var zz = 0; zz < result.data.list.length; zz++) {
         	if(result.data.list[zz].isIntact!=3){
                        TvJSON.data[n] = {};
                        TvJSON.data[n].mask = result.data.list[zz].isvip;
                        TvJSON.data[n].url = 'https://www.mgtv.com'+result.data.list[zz].url; 
                        n++
                 }
         }
          if(TvJSON.len < 51)
             SeeMe(); 
          else
          {
            $.ajax({url: 'https://pcweb.api.mgtv.com/episode/list?_support=10000000&version=5.5.35&video_id='+aid+'&page=0&size=50',
               	type: "GET",dataType: "jsonp",success: function(result1) {
               		//reda = JSON.parse(JSON.stringify(result1.data.list));
              for (var zz = 0; zz < result1.data.list.length; zz++){
              	if(result1.data.list[zz].isIntact!=3){
                             TvJSON.data[n] = {};
                             TvJSON.data[n].mask = result1.data.list[zz].isvip;
                             TvJSON.data[n].url = 'https://www.mgtv.com'+result1.data.list[zz].url; 
                             n++
                      }
                } 
                 SeeMe();
               }});
          		
          		}

               }  
            },
            error: function(callback) {
                TvJSON.ok = null;
                TvInfo.innerHTML = '解析失败';            	
                console.log("fail=" + callback);
            }
        });
    }
    
}