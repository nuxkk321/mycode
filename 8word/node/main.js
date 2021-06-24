/*---nodejs模块-----*/
var fs=require('fs');
var path=require("path");
var http= require('http');
var url= require('url');
var querystring = require('querystring');
var child_process = require('child_process');
var net= require('net');


var temp_path=__dirname;/*当前目录*/
var temp_dir=path.dirname(temp_path);/*程序根目录*/
var exec_path=path.dirname(process.execPath);/*安装文件所在目录*/


/*---第三方-----*/

var ts=require('./tools.js');
var dlog=ts.dlog;
var dclog=ts.dclog;

function array_select(keys,input){
    if(typeof(keys)=='string') keys=keys.split(',');
    var re={};
    for(var k in keys){
        var v=keys[k];
        if(typeof(v)=='string'){
            v=v.split('|');
        }
        re[v[1] || v[0]]=input[v[0]];
    }
    return re;
}
function str2json(str){
    var re;
    try{
        re=JSON.parse(str);
        return re;
    } catch (x) {
        re=eval('('+str+')');
        if(re){
            return re;
        }else{
            return false;
        }
    }
}
function inArray(item,arr){
    for(var k in arr){
        if(arr[k] == item){
            return true;
        }
    }
    return false;
}

function res_success(res,data){
    if(res.finished == false) {
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify({status: 1, info: data}));
    }
}
function res_error(res,msg){
    if(res.finished == false){
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify({status:0,info:msg}));
    }
}

/*http服务器*/
var http_serv={
    PORT:10081,
    server:'',
	create:function(){
		
	},
    restart:function(){
        var that=this;
        if(that.server){
            that.server.close(function(){
                ts.dclog('cyan','http_server restart');
				that.server='';
                setTimeout(that.restart,1000)
            });
			return '';
        }
		
		that.server=http.createServer(function(req, res) {
			/**设置响应头允许ajax跨域访问**/
			res.setHeader("Access-Control-Allow-Origin","*");
			
			if(!req.url){
				res.end();
				return;
			}
			
			if (req.method.toLowerCase() == 'post'){
				//if(typeof(that.post_res[req.url])=='function'){
				//    that.post_res[req.url](req,res);
				//}
				res.end();
			}else{
				var $_GET=url.parse(req.url,true);
				var path_info=$_GET.pathname.split('/');
				// console.log(321321,path_info);
				//console.log('get is',$_GET.query,'pathinfo is',path_info);
				if(typeof(that.get_res[path_info[1]])=='function'){
					that.get_res[path_info[1]](req,res,$_GET.query,path_info);
				}else{
					res.end();
				}
			}
		}).listen(that.PORT,function(){
			dlog("http_server listening " + that.PORT);
		});


    },
    get_res:{
        'public':function(req,res){
            var file=temp_dir+req.url;
            //dlog('req public file:',file);
            if(fs.existsSync(file) && !fs.statSync(file).isDirectory()){
                res.write(fs.readFileSync(file));
            }
            res.end();
        },
        'index':function(req,res){
            var file_content=fs.readFileSync(temp_dir+'/public/html/index.html');
            res.write(file_content);
            res.end();
        },
		'index2':function(req,res){
            var file_content=fs.readFileSync(temp_dir+'/public/html/index2.html');
            res.write(file_content);
            res.end();
        },
        'api':function(req,res,$_GET,path_info){
            var func=path_info[2];
            if(typeof(http_serv.api[func])=='function'){
                http_serv.api[func](req,res,$_GET);
            }else{
                res.end();
            }
        }
    },
    api:{
		get_jieqi_data:function(req,res,$_GET){
			var year=$_GET['year'] || '';
			if(year==''){
				res.write('param error');
				res.end();
				return '';
			}
			var json_file_name=temp_dir+'/public/month_jieqi_'+year+'.json';
			
			if (fs.existsSync(json_file_name)) {
				var data=fs.readFileSync(json_file_name,'utf8');
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(data);
				res.end();
				return '';
			}
			console.log(5555555,'查询节气数据:',year,json_file_name,'文件不存在');
			
			var send_data={year:year};
			jieqi_data_api.query(send_data,function(err,re){
				if(err){

				}else{
					
				}
				//console.log('res!!!',re);
				var data=parse_jieqi_data(re.list);
				fs.writeFileSync(json_file_name,JSON.stringify(data));
				res.write(JSON.stringify(data));
				res.end();
			});
           
		}
    }
};
http_serv.restart();



for(var x in process.argv){
	// console.log(123123231,process.argv[x]);
	if(process.argv[x]=='auto_open'){
		child_process.exec(temp_dir+'/index.url',{
			   env: process.env
		   },
		   function (err, stdout, stderr) {
			   if (err) {
				   dlog('init open index error',err);
			   }
		   }
		);
	}
}




var jieqi_data_api={
    url:'http://api.jisuapi.com/jieqi/query',
    appkey:'9aa28a8bc82fab59',
    query:function(query_data,cb){
        var that=this;
        query_data.appkey=that.appkey;
        ts.http_get(
            that.url,
            query_data,
            function(res_data){
                var err='';
                try{
                    res_data=JSON.parse(res_data);
                } catch (x) {
                    err='返回json数据格式错误:';
                }
                if(err){
                    dlog('jieqi_data_api_url error:',err,res_data,that.url,query_data);
                }else{
                    if(res_data.status=='0'){
                        cb('',res_data.result);
                    }else{
                        cb(res_data.msg);
                    }
                }
            }
        );
    }
};

function parse_jieqi_data(data){
	var month_node={};
	for(var x in data){
		var v=data[x];
		var _time= v.time.split('-');
		var m=parseInt(_time[1]);
		if(!month_node[m]){
			month_node[m]=[]
		}
		// if(v.jieqiid%2==1){
			month_node[m].push({
				name: v.name,
				time: v.time
			});
		// }
	}
	return {month_node:month_node};
}

/*临时编写的获取农历数据的代码*/
var loopg={
    interval:100,
    start:function(year){
        var da={};
        var send_data={year:year};
        jieqi_data_api.query(send_data,function(err,re){
            if(err){

            }else{
                
            }
			//console.log('res!!!',re);
			var data=parse_jieqi_data(re.list);
			fs.writeFileSync(temp_dir+'/public/month_jieqi_'+year+'.json',JSON.stringify(data));
			console.log('end!!!',data);
        });
    }
};
// loopg.start(2020);
