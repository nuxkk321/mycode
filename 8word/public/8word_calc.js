/**
 * 读取对象的指定属性
 * @param obj
 * @param keys
 * @param default_value
 * @returns {*}
 */
function array_get(obj,keys,default_value){
    if(typeof(keys=='string') && keys.indexOf('.')>0) {
        keys=keys.split('.');
    }
    if(typeof(keys)!='object'){
        keys=[String(keys)];
    }
    var re=obj;
    for(var k in keys){
        if(!re) break;

        var v=keys[k];
        re=re[v];
    }

    if(typeof(re)=='undefined'){
        re=default_value;
    }
    return re;
}

function arr_flip(arr){
    var re={};
    for(var i in arr){
        re[arr[i]]=i;
    }
    return re;
}

function get_smaller(a,b){
    if(a>b){
        return b;
    }else{
        return a;
    }
}

function fix_num(b,length){
    if(b<1) b+=length;
    if(b>length) b-=length;
    return b;
}
var t_arr=['年','月','日','时'];
var t_arr_key={年:0,月:1,日:2,时:3};
var q_arr=['本气','中气','余气'];

var 五行={'土':0,'金':1,'水':2,'木':3,'火':4};
var 五行关系=['同我','我生','我克','克我','生我'];
var 五行关系2=['','生','克','克','生'];
function get_5e_relation(now,target){
    var diff=五行[now]-五行[target];
    if(diff<0) diff=5+diff;
    return [diff,五行关系2[diff],diff>2];
}


var 天干五行={
    '甲':['阳','木',1],
    '乙':['阴','木',2],
    '丙':['阳','火',3],
    '丁':['阴','火',4],
    '戊':['阳','土',5],
    '己':['阴','土',6],
    '庚':['阳','金',7],
    '辛':['阴','金',8],
    '壬':['阳','水',9],
    '癸':['阴','水',10]
};
var 地支五行={
    '子':['阳','水',1],
    '丑':['阴','土',2],
    '寅':['阳','木',3],
    '卯':['阴','木',4],
    '辰':['阳','土',5],
    '巳':['阴','火',6],
    '午':['阳','火',7],
    '未':['阴','土',8],
    '申':['阳','金',9],
    '酉':['阴','金',10],
    '戌':['阳','土',11],
    '亥':['阴','水',12]
};

var 十二长生天干基数={
    '甲':1,
    '乙':8,
    '丙':10,
    '丁':9,
    '戊':10,
    '己':9,
    '庚':7,
    '辛':12,
    '壬':4,
    '癸':3
};
var 十二长生={
	'1':['长生',1.3],
	'2':['沐浴',0.96],
	'3':['冠带',1.2],
	'4':['临官',1.4],
	'5':['帝旺',1.5],
	'6':['衰',1.03],
	'7':['病',1],
	'8':['死',0.93],
	'9':['墓',0.86],
	'10':['绝',0.93],
	'11':['胎',1],
	'12':['养',1.1]
};
function get_12changsheng(st,br){
    if(!br) return '';
	var yy=天干五行[st][0]=='阳'?1:-1;
	var cs_val=十二长生天干基数[st]+yy*地支五行[br][2];
	if(cs_val>12) cs_val-=12;
	if(cs_val<1) cs_val+=12;
	return 十二长生[cs_val];
}



var 天干十神={
    '同我':['比肩','劫财'],
    '我生':['食神','伤官'],
    '我克':['偏财','正财'],
    '克我':['七杀','正官'],
    '生我':['偏印','正印']
};
var 十神评分={
	'比肩':1,
	'劫财':1,
    '食神':1,
	'伤官':1,
    '偏财':1,
	'正财':1,
    '七杀':1,
	'正官':1,
    '偏印':1,
	'正印':1
};
var 天干相冲={
    '甲庚':['甲庚','寅申',0],
    '乙辛':['乙辛','卯酉',0],
    '丙壬':['丙壬','午子',0],
    '丁癸':['丁癸','巳亥',0]
};

var 天干相合={
    '甲己':'土',
    '乙庚':'金',
    '丙辛':'水',
    '丁壬':'木',
    '戊癸':'火'
};

var 地支相合={
    '六合':{
        '子丑':'土',
        '寅亥':'木',
        '卯戌':'火',
        '辰酉':'金',
        '巳申':'水',
        '午未':'土'
    },
    '三合':{
        '寅午戌':'火',
        '申子辰':'水',
        '亥卯未':'木',
        '巳酉丑':'金'
    },
    '半合':{
		'寅午':['火','戌'],
		'午戌':['火','寅'],
		'申子':['水','辰'],
		'子辰':['水','申'],
		'亥卯':['木','未'],
		'卯未':['木','亥'],
		'巳酉':['金','丑'],
		'酉丑':['金','巳']
    },
    '暗拱':{/*三合缺一*/
        '寅戌':['火','午'],
        '申辰':['水','子'],
        '亥未':['木','卯'],
        '巳丑':['金','酉']
    }

};

function check_word_sanhe(word1,liunian){
    var re=[];
    $.each(地支相合.三合,function(shstr,v){
        var get_item=[];
        var chku={};

        if(liunian){
            $.each(['年','月','日','时'],function(k2,v2){
                var 地支=word1[v2+'支'];
                if(shstr.indexOf(地支)>-1){/*找到符合的*/
                    get_item.push('命局'+v2);
                    chku[地支]=1;
                }else{/*未找到*/
                    地支=liunian[v2+'支'];
                    if(shstr.indexOf(地支)>-1){/*找到符合的*/
                        get_item.push('流'+v2);
                        chku[地支]=1;
                    }
                }
            });
        }else{
            $.each(['年','月','日','时'],function(k2,v2){
                var 地支=word1[v2+'支'];
                if(shstr.indexOf(地支)>-1){/*找到符合的*/
                    get_item.push(v2);
                    chku[地支]=1;
                }else{/*未找到*/
                }
            });
        }

        var cc=0;
        for(var c in chku) cc++;

        if(cc>2){
            re.push([v,get_item]);
        }
    });
    return re;
}

function check_word_sanxing(word1){
    var re=[];
    $.each(地支三刑,function(sxstr,v){
        var get_item=[];
        var chku={};
        $.each(['年','月','日','时'],function(k2,v2){
            var 地支=word1[v2+'支'];
            if(sxstr.indexOf(地支)>-1){/*找到符合的*/
                get_item.push(v2);
                chku[地支]=1;
            }else{/*未找到*/
            }
        });
        var cc=0;
        for(var c in chku) cc++;
        if(cc>2){
            re.push([sxstr,v,get_item]);
        }
    });
    return re;
}


var 地支三会={
    '寅卯辰':['木','东方'],
    '巳午未':['火','南方'],
    '申酉戌':['金','西方'],
    '亥子丑':['水','北方']
};
var 地支暗会={/*三会缺一*/
    '寅辰':['木','卯','东方'],
    '巳未':['火','午','南方'],
    '申戌':['金','酉','西方'],
    '亥丑':['水','子','北方']
};
function check_word_sanhui(word1){
    var check_str1=word1.年支+word1.月支+word1.日支;
	var check_str2=word1.日支+word1.月支+word1.年支;
    var check_str3=word1.月支+word1.日支+word1.时支;
	var check_str4=word1.时支+word1.日支+word1.月支;
  
	var re;
	if(地支三会[check_str1]){
		re=地支三会[check_str1];
		re.push('年月日');
	}else if(地支三会[check_str2]){
		re=地支三会[check_str2];
		re.push('日月年');
	}else if(地支三会[check_str3]){
		re=地支三会[check_str3];
		re.push('月日时');
	}else if(地支三会[check_str4]){
		re=地支三会[check_str4];
		re.push('时日月');
	}
	 
    return re;
}


var 地支相冲={
    '子午':['子午'],
    '卯酉':['卯酉'],
    '寅申':['寅申'],
    '巳亥':['巳亥'],
    '辰戌':['辰戌'],
    '丑未':['丑未']
};

var 地支相刑={
    '寅巳':['寅巳','无恩之刑'],
    '巳申':['巳申','无恩之刑'],
    '申寅':['申寅','无恩之刑'],
    '未丑':['未丑','恃势之刑'],
    '丑戌':['丑戌','恃势之刑'],
    '戌未':['戌未','恃势之刑'],
    '子卯':['子卯','无礼之刑']
};
/*TODO::*/
var 地支三刑={
    '寅巳申':'无恩之刑',
    '未丑戌':'恃势之刑'
};
var 地支相害={
    '子未':['子未'],
    '丑午':['丑午'],
    '寅巳':['寅巳'],
    '卯辰':['卯辰'],
    '申亥':['申亥'],
    '酉戌':['酉戌']
};

var 地支相破={
    '子卯':[1],
    '午酉':[],
    '寅巳':['寅巳'],
    '卯辰':['卯辰'],
    '申亥':['申亥'],
    '酉戌':['酉戌']
};

var 地支藏干={
    '子':{
        本气:'癸',
        本气占比:1,
        中气:'',
        中气占比:0,
        余气:'',
        余气占比:0
    },
    '丑':{
        本气:'己',
        本气占比:0.6,
        中气:'癸',
        中气占比:0.3,
        余气:'辛',
        余气占比:0.1
    },
    '寅':{
        本气:'甲',
        本气占比:0.6,
        中气:'丙',
        中气占比:0.3,
        余气:'戊',
        余气占比:0.1
    },
    '卯':{
        本气:'乙',
        本气占比:1,
        中气:'',
        中气占比:0,
        余气:'',
        余气占比:0
    },
    '辰':{
        本气:'戊',
        本气占比:0.6,
        中气:'乙',
        中气占比:0.3,
        余气:'癸',
        余气占比:0.1
    },
    '巳':{
        本气:'丙',
        本气占比:0.6,
        中气:'庚',
        中气占比:0.3,
        余气:'戊',
        余气占比:0.1
    },
    '午':{
        本气:'丁',
        本气占比:0.7,
        中气:'己',
        中气占比:0.3,
        余气:'',
        余气占比:0
    },
    '未':{
        本气:'己',
        本气占比:0.6,
        中气:'丁',
        中气占比:0.3,
        余气:'乙',
        余气占比:0.1
    },
    '申':{
        本气:'庚',
        本气占比:0.6,
        中气:'壬',
        中气占比:0.3,
        余气:'戊',
        余气占比:0.1
    },
    '酉':{
        本气:'辛',
        本气占比:1,
        中气:'',
        中气占比:0,
        余气:'',
        余气占比:0
    },
    '戌':{
        本气:'戊',
        本气占比:0.6,
        中气:'辛',
        中气占比:0.3,
        余气:'丁',
        余气占比:0.1
    },
    '亥':{
        本气:'壬',
        本气占比:0.7,
        中气:'甲',
        中气占比:0.3,
        余气:'',
        余气占比:0
    }
};


var 纳音={
    '甲子乙丑':['金','海中金','1~2'],
    '丙寅丁卯':['火','炉中火','3~4'],
    '戊辰己巳':['木','大林木','5~6'],
    '庚午辛未':['土','路旁土','7~8'],
    '壬申癸酉':['金','剑锋金','9~10'],
    '甲戌乙亥':['火','山头火','11~12'],
    '丙子丁丑':['水','涧下水','13~14'],
    '戊寅己卯':['土','城头土','15~16'],
    '庚辰辛巳':['金','白蜡金','17~18'],
    '壬午癸未':['木','杨柳木','19~20'],
    '甲申乙酉':['水','井泉水','21~22'],
    '丙戌丁亥':['土','屋上土','23~24'],
    '戊子己丑':['火','霹雳火','25~26'],
    '庚寅辛卯':['木','松柏木','27~28'],
    '壬辰癸巳':['水','长流水','29~30'],
    '甲午乙未':['金','砂中金','31~32'],
    '丙申丁酉':['火','山下火','33~34'],
    '戊戌己亥':['木','平地木','35~36'],
    '庚子辛丑':['土','壁上土','37~38'],
    '壬寅癸卯':['金','金箔金','39~40'],
    '甲辰乙巳':['火','覆灯火','41~42'],
    '丙午丁未':['水','天河水','43~44'],
    '戊申己酉':['土','大驿土','45~46'],
    '庚戌辛亥':['金','钗钏金','47~48'],
    '壬子癸丑':['木','桑柘木','49~50'],
    '甲寅乙卯':['水','大溪水','51~52'],
    '丙辰丁巳':['土','砂中土','53~54'],
    '戊午己未':['火','天上火','55~56'],
    '庚申辛酉':['木','石榴木','57~58'],
    '壬戌癸亥':['水','大海水','59~60']
};
function get_nayin(sb){
    var re=[];
    $.each(纳音,function(str,v){
        if(str.indexOf(sb)>-1){/*找到符合的*/
            re=v;
        }else{/*未找到*/
        }
    });
    return re;
}
var 时柱三元九运={
	'甲子乙丑丙寅丁卯戊辰':1,
	'己巳庚午辛未壬申癸酉':2,
    '甲戌乙亥丙子丁丑戊寅':3,
	'己卯庚辰辛巳壬午癸未':1,
    '甲申乙酉丙戌丁亥戊子':2,
	'己丑庚寅辛卯壬辰癸巳':3,
    '甲午乙未丙申丁酉戊戌':1,
	'己亥庚子辛丑壬寅癸卯':2,
    '甲辰乙巳丙午丁未戊申':3,
	'己酉庚戌辛亥壬子癸丑':1,
    '甲寅乙卯丙辰丁巳戊午':2,
	'己未庚申辛酉壬戌癸亥':3,
}
function get_hour_3y9y(sb){
    $.each(时柱三元九运,function(str,v){
        if(str.indexOf(sb)>-1){/*找到符合的*/
			return v;
        }else{/*未找到*/
        }
    });
}


var 地支凶吉基数={
    '子':8,
    '丑':10,
    '寅':0,
    '卯':2,
    '辰':4,
    '巳':6,
    '午':8,
    '未':10,
    '申':0,
    '酉':2,
    '戌':4,
    '亥':6
};
var 十二黄黑道={
	"1":['吉','青龙'],
	"2":['吉','明堂'],
	"3":['凶','天刑'],
	"4":['凶','朱雀'],
	"5":['吉','金匮'],
	"6":['吉','天德'],
	"7":['凶','白虎'],
	"8":['吉','玉堂'],
	"9":['凶','天牢'],
	"10":['凶','玄武'],
	"11":['吉','司命'],
	"12":['凶','勾陈']
};
function get_xiongji(br,br_prev){
	var pos=地支五行[br];
	if(!pos) return [];
	
	pos=pos[2];
    var fix=地支凶吉基数[br_prev];
	var re=pos-fix;
	if(re>12) re-=12;
	if(re<1) re+=12;
	re=十二黄黑道[re]
	
    return re;
}
var 四废日={
	'子':['丁巳','丙午'],
    '丑':['丁巳','丙午'],
    '寅':['庚申','辛酉'],
    '卯':['庚申','辛酉'],
    '辰':['庚申','辛酉'],
    '巳':['壬子','癸亥'],
    '午':['壬子','癸亥'],
    '未':['壬子','癸亥'],
    '申':['甲寅','乙卯'],
    '酉':['甲寅','乙卯'],
    '戌':['甲寅','乙卯'],
    '亥':['丁巳','丙午']
};
var 十恶大败日={
	甲辰:1,
	乙巳:1,
	丙申:1,
	丁亥:1,
	戊戌:1,
	己丑:1,
	庚辰:1,
	辛巳:1,
	壬申:1,
	癸亥:1
};
var 四离四绝={
	'立春':'木旺水绝',
	'立夏':'火旺木绝',
	'立秋':'金旺土绝',
	'立冬':'水旺金绝'
};
var 地支组合={
	'子子':{},
	'子丑':{},
	'子寅':{},
	'子卯':{},
	'子辰':{},
	'子巳':{},
	'子午':{},
	'子未':{},
	'子申':{},
	'子酉':{},
	'子戌':{},
	'子亥':{},
	
	'丑丑':{},
	'丑寅':{},
	'丑卯':{},
	'丑辰':{},
	'丑巳':{},
	'丑午':{},
	'丑未':{},
	'丑申':{},
	'丑酉':{},
	'丑戌':{},
	'丑亥':{},
	
	'寅寅':{},
	'寅卯':{},
	'寅辰':{},
	'寅巳':{},
	'寅午':{},
	'寅未':{},
	'寅申':{},
	'寅酉':{},
	'寅戌':{},
	'寅亥':{},
	
	'卯卯':{},
	'卯辰':{},
	'卯巳':{},
	'卯午':{},
	'卯未':{},
	'卯申':{},
	'卯酉':{},
	'卯戌':{},
	'卯亥':{},
	
	'辰辰':{},
	'辰巳':{},
	'辰午':{},
	'辰未':{},
	'辰申':{},
	'辰酉':{},
	'辰戌':{},
	'辰亥':{},
	
	'巳巳':{},
	'巳午':{},
	'巳未':{},
	'巳申':{},
	'巳酉':{},
	'巳戌':{},
	'巳亥':{},
	
	'午午':{},
	'午未':{},
	'午申':{},
	'午酉':{},
	'午戌':{},
	'午亥':{},
	
	'未未':{},
	'未申':{},
	'未酉':{},
	'未戌':{},
	'未亥':{},
	 
	'申申':{},
	'申酉':{},
	'申戌':{},
	'申亥':{},
	
	'酉酉':{},
	'酉戌':{},
	'酉亥':{},
	
	'戌戌':{},
	'戌亥':{},
	
	'亥亥':{},
};
var 天干组合={
	'甲甲':{},
    '甲乙':{},
    '甲丙':{},
    '甲丁':{},
    '甲戊':{},
    '甲己':{},
    '甲庚':{},
    '甲辛':{},
    '甲壬':{},
    '甲癸':{},
	
    '乙乙':{},
    '乙丙':{},
    '乙丁':{},
    '乙戊':{},
    '乙己':{},
    '乙庚':{},
    '乙辛':{},
    '乙壬':{},
    '乙癸':{},
	
    '丙丙':{},
    '丙丁':{},
    '丙戊':{},
    '丙己':{},
    '丙庚':{},
    '丙辛':{},
    '丙壬':{},
    '丙癸':{},
	
    '丁丁':{},
    '丁戊':{},
    '丁己':{},
    '丁庚':{},
    '丁辛':{},
    '丁壬':{},
    '丁癸':{},
	
    '戊戊':{},
    '戊己':{},
    '戊庚':{},
    '戊辛':{},
    '戊壬':{},
    '戊癸':{},
	
    '己己':{},
    '己庚':{},
    '己辛':{},
    '己壬':{},
    '己癸':{},
	
    '庚庚':{},
    '庚辛':{},
    '庚壬':{},
    '庚癸':{},
	
    '辛辛':{},
    '辛壬':{},
    '辛癸':{},
	
    '壬壬':{},
    '壬癸':{},
	
	'癸癸':{},
};

function get_stem_word(index){
    var c=1;
    for(var i in 天干五行){
        if(c==index) return i;
        c++
    }
}
function get_branche_word(index){
    var c=1;
    for(var i in 地支五行){
        if(c==index) return i;
        c++
    }
}
function get_stems_5e(s){
    var self_info=天干五行[s];
    if(!self_info) return '';
    return self_info[0]+self_info[1];
}
function get_branches_5e(s){
    var self_info=地支五行[s];
    return 地支五行[s][0]+地支五行[s][1];
}

/*例: check_pos='日'，结果格式为
* [
    [
        日干和年干的关系,
        日干和年干本气的关系,
        日干和年干中气的关系,
        日干和年干余气的关系
    ],
    [日干和月的...],
    [],
    []
* ]
*
* */
function get_stems_10G_all(winfo,stem,skip_pos){
    var re=[[],[],[],[]];
    $.each(['年','月','日','时'],function(k,v){
        if(skip_pos && skip_pos==v){
            re[k].push('');/*跳过指定位置的天干不看*/
        }else{
            re[k].push(get_stems_10G(winfo[v+'干'],stem));
        }

        re[k].push(get_stems_10G(winfo[v+'支本气'].天干,stem));
        re[k].push(get_stems_10G(winfo[v+'支中气'].天干,stem));
        re[k].push(get_stems_10G(winfo[v+'支余气'].天干,stem));
    });
    return re;
}
function get_stems_10G(t,s){
	if(!t) return '';
    var self_info=天干五行[s];
    var target_info=天干五行[t];
    var diff=get_5e_relation(target_info[1],self_info[1]);
    var relation=五行关系[Math.abs(diff[0])];
    var type=self_info[0]==target_info[0]?0:1;

	var notes='';
//            notes='自己:'+self_info[0]+'('+五行[self_info[0]]+') '+
//                    '当前:'+target_info[0]+'('+五行[target_info[0]]+') '+
//                    '结果:'+relation+'('+diff+')';
    

    return 天干十神[relation][type]+notes;
}
function get_stems_relation(s1,s2,cs){
    var re={};
    if(!s1 || !s2) return re;

    var asc=s1+s2,desc=s2+s1;

    re.冲=天干相冲[asc] || 天干相冲[desc];
    if(re.冲) re.冲=JSON.parse(JSON.stringify(re.冲));
    if(天干相冲[desc]) re.冲[2]=1;

    re.合=天干相合[asc] || 天干相合[desc];

    var s1_info=天干五行[s1];
    var s2_info=天干五行[s2];

    re.五行关系=get_5e_relation(s1_info[1],s2_info[1]);

    return re;
}
function get_stems_relation2(s1,s2){
    var re='';
    var asc=s1+s2,desc=s2+s1;

    var 冲=天干相冲[asc] || 天干相冲[desc];
    if(冲){
        re+='<div>---相冲---</div>';
    }

    var 合=天干相合[asc] || 天干相合[desc];
    if(合){
        re+='<div>---相合,化'+合+'---</div>';
    }


    var s1_info=天干五行[s1];
    var s2_info=天干五行[s2];

    var diff=get_5e_relation(s2_info[1],s1_info[1]);
    if(diff[0]>0){
        if(diff[2]){
            re+='<div>←'+diff[1]+'</div>';
        }else{
            re+='<div>'+diff[1]+'→</div>';
        }
    }
    return re;
}

function get_branches_relation(b1,b2){
    var re={};
    if(!b1 || !b2) return re;

    var asc=b1+b2,desc=b2+b1;

    re.冲=地支相冲[asc] || 地支相冲[desc];

    re.刑=地支相刑[asc] || 地支相刑[desc];
    if(b1==b2){
        re.刑=[asc,'自刑'];
    }
    re.害=地支相害[asc] || 地支相害[desc];

    re.六合=地支相合.六合[asc] || 地支相合.六合[desc];

	re.半合=地支相合.半合[asc] || 地支相合.半合[desc];

	re.暗拱=地支相合.暗拱[asc] || 地支相合.暗拱[desc];
	
	re.暗会=地支暗会[asc] || 地支暗会[desc];
	
	
    var b1_info=地支五行[b1];
    var b2_info=地支五行[b2];
    re.五行关系=get_5e_relation(b1_info[1],b2_info[1]);

    return re;
}

function get_branches_relation2(b1,b2){
    var re='';
    var asc=b1+b2,desc=b2+b1;

    var 冲=地支相冲[asc] || 地支相冲[desc];
    if(冲){
        re+='<div>---相冲---</div>';
    }

    var 刑=地支相刑[asc] || 地支相刑[desc];
    if(刑){
        re+='<div>---'+刑+'---</div>';
    }else if(b1==b2){
        re+='<div>---自刑---</div>';
    }

    var 六合=地支相合.六合[asc] || 地支相合.六合[desc];
    if(六合){
        re+='<div>---六合,化'+六合+'---</div>';
    }

    var 半合=地支相合.半合[asc] || 地支相合.半合[desc];
    if(半合){
        re+='<div>-半合,缺'+半合[1]+',化'+半合[0]+'-</div>';
    }

    var b1_info=地支五行[b1];
    var b2_info=地支五行[b2];
    var diff=get_5e_relation(b2_info[1],b1_info[1]);
    if(diff[0]>0){
        if(diff[2]){
            re+='<div>←'+diff[1]+'</div>';
        }else{
            re+='<div>'+diff[1]+'→</div>';
        }
    }
    return re;
}

function get_cross_relation(w1,w2){

}

function get_relation(w1,w2){
    var type1=!天干五行[w1];
    var type2=!天干五行[w2];
    if(type1==type2){
        if(type1){
            return get_branches_relation(w1,w2);
        }else{
            return get_stems_relation(w1,w2);
        }
    }else{
        return get_cross_relation(w1,w2);
    }
}
function check_cg_tc(cg,winfo){
	var re=[];
    if(!cg) return re;
	$.each(['年','月','日','时'],function(k,v){
        if(cg==winfo[v+'干']){
			re.push(v);
        }
    });
	return re;
}

/*各柱通根力量系数*/
var tg_rate_map=[
    [60,24,10,6],
    [24,60,24,12],
    [12,24,60,24],
    [6,10,24,60]
];
var tg_other_rate_map=[
    [24,10,6,3],
    [10,24,10,6],
    [6,10,24,10],
    [3,6,10,24]
];
var tg_rate_fix=1/60;/*实际计算时的修正值*/
var tg_base_score=100;
var tg_min_score=30;

/*计算天干通根
* is_liunian=1,winfo为流年数据,other为命局数据
* is_liunian=0,winfo为命局数据,other为流年数据
* */
function calc_stem_tg_value(is_liunian,check_pos,winfo,other){
    var re=[{},{},{},{}];
    var check_pos_num=t_arr_key[check_pos];
    var stem=winfo[check_pos+'干'];

    var check_canggan_info;
    var tg_rate_arr;
    if(other){/*交叉检查*/
        check_canggan_info=other;
        tg_rate_arr=tg_other_rate_map[check_pos_num];
    }else{/*同一边的检查*/
        check_canggan_info=winfo;
        tg_rate_arr=tg_rate_map[check_pos_num];

    }

    var stem_10G_all;
    var stem_12cs_all;
    if(is_liunian){
        if(other){
            //console.log('当前检查的是:流年 '+check_pos+'干 在 命局 的通根');

            stem_10G_all=winfo[check_pos+'干命局十神'];
            stem_12cs_all=winfo[check_pos+'干命局十二长生'];
        }else{
            //console.log('当前检查的是:流年 '+check_pos+'干 在 流年 的通根');

            stem_10G_all=winfo[check_pos+'干流年十神'];
            stem_12cs_all=winfo[check_pos+'干流年十二长生'];
        }
    }else{
        if(other){
            //console.log('当前检查的是:命局 '+check_pos+'干 在 流年 的通根');

            stem_10G_all=winfo[check_pos+'干流年十神'];
            stem_12cs_all=winfo[check_pos+'干流年十二长生'];
        }else{
            //console.log('当前检查的是:命局 '+check_pos+'干 在 命局 的通根');

            stem_10G_all=winfo[check_pos+'干命局十神'];
            stem_12cs_all=winfo[check_pos+'干命局十二长生'];
        }
    }

    $.each(re,function(zhu_pos,v){
        var changsheng=stem_12cs_all[zhu_pos];
        if(changsheng=='墓'){/*TODO::墓库根*/
        }else{
        }

        if(zhu_pos==check_pos_num){/*TODO::同柱的特殊情况*/
        }else{
        }
        var shishen;
        var cg_10g_bq_name_map={比肩:'禄根',劫财:'劫根'};
        var cg_10g_bq_score_map={比肩:1,劫财:0.9};

        $.each([1,2,3],function(kk,vv){
            var qi_name=q_arr[kk];
            /*cg_info 格式为{天干:xx,五行:xx,透出:[...],本柱占比:xx}*/
            var cg_info=check_canggan_info[t_arr[zhu_pos]+'支'+qi_name];
            //console.log('当前检查的是:'+check_pos+'干 在'+zhu_pos+'柱 藏干的'+qi_name+',十神:'+shishen);
            var tg_re={
                通根类型:'',
                藏干占比:cg_info.本柱占比,
                四柱力量系数:tg_rate_arr[zhu_pos],
                通根得分:0
            };


            /*通根类型力量比率*/
            shishen=stem_10G_all[zhu_pos][vv];
            switch (shishen){
                case '比肩':
                case '劫财':
                    if(qi_name=='本气'){
                        if(stem=='戊' || stem=='己'){
                            tg_re.通根类型='正根';
                            tg_re.通根得分=0.9;
                        }else{
                            tg_re.通根类型=cg_10g_bq_name_map[shishen];
                            tg_re.通根得分=cg_10g_bq_score_map[shishen];
                        }
                    }else{ /*其余的都算得气*/
                        tg_re.通根类型='得气';
                        tg_re.通根得分=1;
                    }
                    break;
                case '偏印':
                    tg_re.通根类型='生扶';
                    tg_re.通根得分=0.18;
                    break;
                case '正印':
                    tg_re.通根类型='生扶';
                    tg_re.通根得分=0.2;
                    break;
                case '七杀':
                    tg_re.通根类型='七杀';
                    tg_re.通根得分=-1;
                    break;
                case '正官':
                    tg_re.通根类型='正官';
                    tg_re.通根得分=-0.9;
                    break;
                case '食神':
                    tg_re.通根类型='食神';
                    tg_re.通根得分=-0.4;
                    break;
                case '伤官':
                    tg_re.通根类型='伤官';
                    tg_re.通根得分=-0.5;
                    break;
                default :
            }
            re[zhu_pos][qi_name]=tg_re;
        });
    });

    //console.log('计算结果:',re);
    return re;
}

function get_lunar_month_node(year,cb){

}
var lunar_month_start_point_list={

};
var sb_calc_tools={
    start_date:'2000/01/01',
    start_stem_num:5,
    start_branche_num:7,
    lunar_month_num:{
        '正':1,
        '一':1,
        '二':2,
        '三':3,
        '四':4,
        '五':5,
        '六':6,
        '七':7,
        '八':8,
        '九':9,
        '十':10,
        '冬':11,
        '腊':12
    },
   
    get_lunar_month:function(str,cb){
        var date_arr=sb_calc_tools.get_date_split_arr(str);
        var year=date_arr[0];
        sb_calc_tools.get_lunar_month_data(year,function(err,split_info){
            if(err){
                cb(err);
                return ;
            }
			
            var month=parseInt(date_arr[1]);
            var month_jieqi_info=split_info.month_node[month];
            var catcht;
            for(var x in month_jieqi_info){
                var luna_info=month_jieqi_info[x];/*此处格式为{name:xxx,time:xxx}*/
                var _time=new Date(luna_info.time);

                if(date_arr[4]>=_time.getTime()){
                    catcht=luna_info;
                     console.log('进入节气:',luna_info);
				}
            }
            if(catcht){
                //console.log('当前时间:',date_arr[5],'  进入节气:'+catcht.name+';分界时间:'+catcht.time);
                catcht=month;
				cb('',catcht);
            }else{
                /*本月没有匹配到的节气起始点,取前一个月的数据*/
                //console.log('当前时间:',date_arr[5],' 未进入本月节气:'+luna_info.name+';分界时间:'+luna_info.time,',计算取前一个月:',month-1);
                catcht=month-1;
				if(catcht==0){
					/*1月第一个节气前,其实是前一年的最后一个节气*/
					sb_calc_tools.get_lunar_month_data(year-1,function(err,split_info){
						if(err){
							cb(err);
							return ;
						}
						// catcht=split_info.month_node[12];
						cb('',catcht);
					});
				}else{
					cb('',catcht);
				}
            }
            
        });
    },
	get_lunar_month_data:function(year,cb){
		if(lunar_month_start_point_list[year]){
            cb('',lunar_month_start_point_list[year]);
        }else{
			$.ajax({
				url:"http://127.0.0.1:10081/api/get_jieqi_data",
				data:{year:year},
				success: function(re){
					lunar_month_start_point_list[year]=re;
					cb('',lunar_month_start_point_list[year]);
				},
				error:function(re){
					cb('ajax fail');
				}
			});
        }
	},
    get_stem_word:function(){

    },
  
    parse_br_relation:function(output){
        output.地支六合=[];
        output.地支半合=[];
        output.地支暗拱=[];
        output.地支暗会=[];

        output.地支相刑=[];
        output.地支相害=[];
        output.地支相冲=[];

        output.天干相合=[];
        output.天干相冲=[];

        $.each(['年','月','日','时','大运'],function(k,v){
            var 天干=output[v+'干'];
            output[v+'干五行']=天干五行[天干];

            var 天干强弱={通根得分:0,综合得分:tg_min_score};

            var 地支=output[v+'支'];
            output[v+'支五行']=地支五行[地支];

            if(v=='大运') return true;

            var prev_z=t_arr[k-1];/*前一个*/
            var next_z=t_arr[k+1];/*后一个*/

            var diff;
            var 地支强弱={生我:[],克我:[],我生:[],我克:[],刑:[],冲:[],害:[]};


            if(prev_z){
                /*和前一个天干比较*/
                var diff_st1=get_stems_relation(天干,output[prev_z+'干']);

                /*和前一个地支比较*/
                var diff_br1=get_branches_relation(地支,output[prev_z+'支']);
                if(diff_br1.刑) 地支强弱.刑.push(diff_br1.刑);
                if(diff_br1.冲) 地支强弱.冲.push(diff_br1.冲);
                if(diff_br1.害) 地支强弱.害.push(diff_br1.害);

                output[v+'柱凶吉']=get_xiongji(地支,output[prev_z+'支']);

            }

            if(next_z){

                /*和后一个天干比较*/
                var diff_st=get_stems_relation(天干,output[next_z+'干']);
                /*和后一个地支比较*/
                var diff_br=get_branches_relation(地支,output[next_z+'支']);

                if(diff_br.刑){
                    地支强弱.刑.push(diff_br.刑);
                    output.地支相刑.push([diff_br.刑,v+next_z]);
                }
                if(diff_br.冲){
                    地支强弱.冲.push(diff_br.冲);
                    output.地支相冲.push([diff_br.冲,v+next_z]);
                }
                if(diff_br.害){
                    地支强弱.害.push(diff_br.害);
                    output.地支相害.push([diff_br.害,v+next_z]);
                }

                if(diff_br.六合){
                    output.地支六合.push([diff_br.六合,v+next_z]);
                }
                if(diff_br.半合){
                    output.地支半合.push([diff_br.半合,v+next_z]);
                }
                if(diff_br.暗拱){
                    output.地支暗拱.push([diff_br.暗拱,v+next_z]);
                }
                if(diff_br.暗会){
                    output.地支暗会.push([diff_br.暗会,v+next_z]);
                }
                output[v+'支'+next_z+'支']=diff_br;


                if(diff_st.冲){
                    var st_info_冲=[diff_st.冲,v+next_z];
                    if(diff_br.冲){
                        /*只有特定地支的天干才算真正的相冲*/
                        var str_冲=diff_st.冲[1];
                        if(diff_st.冲[2]==1){
                            str_冲=str_冲.split('').reverse().join('');
                        }
                        if(str_冲==地支+output[next_z+'支']){
                            //console.log(9999,'正冲:',diff_st.冲);
                            st_info_冲[2]='正冲';
                        }else if(str_冲==output[next_z+'支']+地支){
                            //console.log(8888,'交叉:',diff_st.冲,output);
                            st_info_冲[2]='交叉';
                        }else{
                            st_info_冲[2]='假';
                        }
                        //console.log(123123,'天干的冲:',diff_st.冲,';地支:',diff_br.冲[0],';',output);
                    }else{
                        st_info_冲[2]='无';
                    }
                    output.天干相冲.push(st_info_冲);

                }

                if(diff_st.合){
                    output.天干相合.push([diff_st.合,v+next_z]);
                }

                output[v+'干'+next_z+'干']=diff_st;
            }

            output[v+'干支关系']={};/*TODO::*/


            if(output['大运干']){
                /*和大运柱比较,大运柱均匀作用于每一柱*/
                output['大运'+v+'干关系']=get_stems_relation(天干,output['大运干']);
                output['大运'+v+'支关系']=get_branches_relation(地支,output['大运支']);
            }

            output[v+'干强弱']=天干强弱;
            output[v+'支强弱']=地支强弱;


            output[v+'柱纳音']=get_nayin(天干+地支);
			
        });

        output.地支三合=check_word_sanhe(output);

        output.地支三刑=check_word_sanxing(output);

        //四土齐全??
        output.地支三会=check_word_sanhui(output);
    },
    calc_dynamic_effect_rule:{
        '比肩':1,
        '劫财':1,
        '食神':'s_pianyin',
        '伤官':'s_zhengyin',
        '偏财':'k_qisha',
        '正财':'k_zhengguan',
        '七杀':'k_qisha',
        '正官':'k_zhengguan',
        '偏印':'s_pianyin',
        '正印':'s_zhengyin'
    },
    calc_dynamic_effect_change:function(target_score,sef_score,relation,score){
        var change_val=0;
        var change_re={self:0,target:0};
        var next_10G_rule=sb_calc_tools.calc_dynamic_effect_rule[relation];
        //console.log(next_z+'干 是 '+pos+'干 的',relation);
        switch(relation){
            /*生泄 看力量小的一方*/
            case '正印':/*对方生我*/
            case '偏印':
                change_val=get_smaller(target_score,sef_score)*score[next_10G_rule];
                if(change_val<0) change_val=0;
                change_re.self=change_val;/*自己增加*/
                change_re.target=-change_val;/*对方减少*/

                //console.log(pos+'干 增加 '+next_z+'干 减少');
                break;
            case '食神':/*我生对方*/
            case '伤官':
                change_val=get_smaller(sef_score,target_score)*score[next_10G_rule];
                if(change_val<0) change_val=0;
                change_re.self=-change_val;/*自己减少*/
                change_re.target=+change_val;/*对方增加*/

                //console.log(pos+'干 减少 '+next_z+'干 增加');
                break;
            /*克 看发起方*/
            case '正财':/*我克对方*/ /*当前柱-0.05,下一柱-score.k_zhengguan*/
            case '偏财':
                change_val=sef_score*score[next_10G_rule];
                if(change_val<0) change_val=0;/*自己已经是负数了*/
                change_re.self=-0.05*Math.abs(sef_score);/*自己减少一点*/
                change_re.target=-change_val;/*对方减少*/

                //console.log(pos+'干 减少一点 ;'+next_z+'干 减少',score[next_10G_rule],change_val);
                break;
            case '正官':/*对方克我*/
            case '七杀':
                change_val=target_score*score[next_10G_rule];
                if(change_val<0) change_val=0;/*对方已经是负数了*/
                change_re.self=-change_val;/*自己减少*/
                change_re.target=-0.05*Math.abs(target_score);/*对方减少一点*/

                //console.log(pos+'干 减少 '+next_z+'干 减少一点');
                break;
        }
        change_re.self=parseFloat(change_re.self.toFixed(1));
        change_re.target=parseFloat(change_re.target.toFixed(1));

        return change_re;
    },
    /*
    * 计算所有关系
    * org_word_info 给定的原始八字
    * liunian  流年的八字
    * cfg 配置
    * */
    parse_all:function(org_word_info,liunian_word_info,cfg){
        if(!cfg) cfg={};

        var calc_dynamic_effect=cfg.calc_dynamic_effect;

        if(!org_word_info.年干 && liunian_word_info.年干){
            var output= $.extend({},liunian_word_info);

            var liunian={};
        }else{
            var output= $.extend({},org_word_info);

            var liunian= $.extend({},liunian_word_info);
        }
        /*计算地支藏干和透出*/
        $.each(['年','月','日','时','大运'],function(k,check_pos){
            var cg_1=地支藏干[output[check_pos+'支']];
            var cg_2=地支藏干[liunian[check_pos+'支']] || {};
            $.each(q_arr,function(k2,qi_name) {
                var cg_1_word=cg_1[qi_name];
                output[check_pos+'支'+qi_name]={
                    天干:cg_1_word,
                    五行:天干五行[cg_1_word] || '',
                    命局透出:check_cg_tc(cg_1_word,output),/*藏干的透干位置数组*/
                    流年透出:check_cg_tc(cg_1_word,liunian),/*藏干的透干位置数组*/
                    本柱占比:cg_1[qi_name+'占比'] || 0
                };
                /*大运的计算到这里结束*/  if(check_pos=='大运') return true;

                var cg_2_word=cg_2[qi_name];
                liunian[check_pos+'支'+qi_name]={
                    天干:cg_2_word,
                    五行:天干五行[cg_2_word] || '',
                    命局透出:check_cg_tc(cg_2_word,output),/*藏干的透干位置数组*/
                    流年透出:check_cg_tc(cg_2_word,liunian),/*藏干的透干位置数组*/
                    本柱占比:cg_2[qi_name+'占比'] || 0
                };
            });
        });

        /*以四天干看其他天干、地支藏干、流年地支、流年地支藏干的十神、十二长生数据,并计算通根情况*/
        $.each(['年','月','日','时','大运'],function(k,check_pos){
            var 天干=output[check_pos+'干'];
            /*命局天干在命局和流年的信息*/
            $.each(['命局','流年'],function(_k,side){
                if(side=='命局'){
                    output[check_pos+'干'+side+'十神']=get_stems_10G_all(output,天干,check_pos);
                }else{
                    output[check_pos+'干'+side+'十神']=get_stems_10G_all(liunian,天干);
                }

                var side_12cs=[];
                $.each(t_arr,function(kk,vv){
                    side_12cs[kk]=get_12changsheng(
                        天干,
                        side=='命局'?output[vv+'支']:liunian[vv+'支']
                    );
                });
                output[check_pos+'干'+side+'十二长生']=side_12cs;

                /*大运的计算到这里结束*/  if(check_pos=='大运') return true;

                output[check_pos+'干通根'+side]=
                calc_stem_tg_value(
                    0,
                    check_pos,
                    output,
                    side=='命局'?'':liunian
                );
            });



            /*命局天干在流年的信息*/
            if(liunian[check_pos+'干']){
                天干=liunian[check_pos+'干'];
                /*流年天干在命局的信息*/
                liunian[check_pos+'干命局十神']=get_stems_10G_all(output,天干);
                liunian[check_pos+'干命局十二长生']=[];
                $.each(t_arr,function(kk,vv){
                    liunian[check_pos+'干命局十二长生'][kk]=get_12changsheng(天干,output[vv+'支']);
                });
                liunian[check_pos+'干通根命局']=calc_stem_tg_value(1,check_pos,liunian,output);

                /*流年天干在流年的信息*/
                liunian[check_pos+'干流年十神']=get_stems_10G_all(liunian,天干,check_pos);
                liunian[check_pos+'干流年十二长生']=[];
                $.each(t_arr,function(kk,vv){
                    liunian[check_pos+'干流年十二长生'][kk]=get_12changsheng(天干,liunian[vv+'支']);
                });
                liunian[check_pos+'干通根流年']=calc_stem_tg_value(1,check_pos,liunian);
            }
        });

        $.each(t_arr,function(k,v){
            /*计算正根的数量*/
            $.each(['命局','流年'],function(kn1,vn1){
                var zg=0;
                $.each(['通根命局','通根流年'],function(kn2,vn2){
                    var check_data=kn1==0?output[v+'干'+vn2]:liunian[v+'干'+vn2];
                    //console.log(vn1+' '+v+'干 '+vn2+' : ',check_data);
                    if(!check_data) return true;

                    $.each(check_data,function(zhu_pos,v2){
                        $.each(v2,function(qi_name,v3){
                            switch(v3.通根类型){
                                case '禄根':
                                case '劫根':
                                case '正根':
                                    zg+=1;
                                    break;
                                case '得气':
                                    /*TODO::只得中、余气根情况*/
                                    zg+=1;
                                    break;
                            }
                            //console.log(v+'干 在 '+zhu_pos+' 柱',qi_name+',通根类型:',v3.通根类型);
                        });
                    });
                });
                if(kn1==0){
                    output[v+'干正根数量']=zg;
                }else{
                    liunian[v+'干正根数量']=zg;
                }
                //console.log(vn1+' '+v+'干 正根数量 : ',zg);
            });
        });


		/*格局*/
		var g=[],g_first='';
		$.each(q_arr,function(k,qi_name) {
			if(output['月支'+qi_name] && output['月支'+qi_name].命局透出.length>0){
				//mp_data.name+=output['日干命局十神'][1][k+1];
				var tc=output.日干命局十神[1][k+1];
				if(tc=='正官' || tc=='七杀'){
					g_first=tc;
				}else{
					g.push(tc);
				}
			}
		});
		if(g_first){
			g.unshift(g_first);
		}
		
		output.格局={
			可能的格:g
		};


        /*具体细节的计算*/
        sb_calc_tools.parse_br_relation(output);
        sb_calc_tools.parse_br_relation(liunian);

		
		
		
		/*三元九运*/
		output.时柱三元九运={
			title:get_hour_3y9y(liunian_word_info.时干+liunian_word_info.时支)
		};
		
		
		
		
        /*三字以上的同五行*/
        var collect_5e={'干':{},'支':{}};
        $.each(t_arr,function(k,v){
			$.each(collect_5e,function(t_key,collect_arr){
				var _5e=output[v+t_key+'五行'][1];
				if(!collect_arr[_5e]) collect_arr[_5e]=[];
				collect_arr[_5e].push(v);
			});
        });
        output.同五行=collect_5e;
	 
		

        /*其他的效果*/
        var 额外效果={};
        额外效果.地支六合=[];
        额外效果.地支半合=[];
        额外效果.地支暗拱=[];
        额外效果.地支暗会=[];

        额外效果.地支相刑=[];
        额外效果.地支相害=[];
        额外效果.地支相冲=[];

        额外效果.天干相合=[];
        额外效果.天干相冲=[];

        $.each(t_arr,function(k,v){
            var diff;

            diff=get_stems_relation(output[v+'干'],liunian[v+'干']);
            if(diff.冲){
                额外效果.天干相冲.push([diff.冲,'命局'+v+'x流'+v]);
            }
            if(diff.合){
                额外效果.天干相合.push([diff.合,'命局'+v+'x流'+v]);
            }


            diff=get_branches_relation(output[v+'支'],liunian[v+'支']);
            if(diff.冲){
                额外效果.地支相冲.push([diff.冲,'命局'+v+'x流'+v]);
            }
        });


        额外效果.地支三合=check_word_sanhe(output,liunian);


        output.额外效果=额外效果;



        //TODO::计算大运的影响，大运占4成


        /*最后的统计*/
        var score=cfg.score || {};

        var hj={
            '甲':0,
            '乙':0,
            '丙':0,
            '丁':0,
            '戊':0,
            '己':0,
            '庚':0,
            '辛':0,
            '壬':0,
            '癸':0
        };
        $.each(t_arr,function(k,v){
            var current_pos_num=t_arr_key[v];

            var 天干=output[v+'干'];
            $.each(['通根命局','通根流年'],function(kn1,vn1){
                $.each(output[v+'干'+vn1],function(zhu_pos,vv){
                    $.each(vv,function(qi_name,vvv){
                        var final_score=vvv.藏干占比*vvv.四柱力量系数*vvv.通根得分*tg_rate_fix*tg_base_score;
                        final_score=parseFloat(final_score.toFixed(1));
                        output[v+'干'+vn1][zhu_pos][qi_name].单项最终得分=final_score;
                        output[v+'干强弱'].通根得分+=final_score;
                        //console.log('当前计算的是 : 命局 '+v+'干 '+vn1+' 在 '+zhu_pos+'柱 的 '+qi_name+' 通根情况:',vvv,' 最终力量评分:',final_score);

                    });
                });
                if(liunian[v+'干']){
                    $.each(liunian[v+'干'+vn1],function(zhu_pos,vv){
                        $.each(vv,function(qi_name,vvv){
                            var final_score=vvv.藏干占比*vvv.四柱力量系数*vvv.通根得分*tg_rate_fix*tg_base_score;
                            final_score=parseFloat(final_score.toFixed(1));
                            liunian[v+'干'+vn1][zhu_pos][qi_name].单项最终得分=final_score;
                            liunian[v+'干强弱'].通根得分+=final_score;
                            //console.log('当前计算的是 : 流年 '+v+'干 '+vn1+' 在 '+zhu_pos+'柱 的 '+qi_name+' 通根情况:',vvv,' 最终力量评分:',final_score);
                        });
                    });
                }

            });

            output[v+'干强弱'].综合得分+=output[v+'干强弱'].通根得分;
            liunian[v+'干强弱'].综合得分+=liunian[v+'干强弱'].通根得分;

            //console.log(v+'干:',天干,'正根数量:',qr.正根,' 通根得分:',qr.通根得分);




            //var next_z=t_arr[k+1];/*后一个*/
            //
            //$.each(['干','支'],function(kk,vv){
            //    var org=1;
            //    var qr=output[v+vv+'强弱'];
				//
				//	/*TODO::天干和坐下地支本气相合会削弱天干*/
            //    org+=qr.克我.length*score.kewo;/*TODO::天干同性相克力度更大,地支克天干力度很小*/
            //    org+=qr.我生.length*score.wosheng;/*TODO::天干异性相生力度更大*/
            //    org+=qr.生我.length*score.shengwo;
            //    if(vv=='干'){/*天干特有规则*/
            //
            //        /*伤官0.3*/
            //        /*食神0.2*/
            //
            //        org+=qr.冲.length*score.chongtg;
            //
            //    }else{/*地支特有规则*/
            //        org+=qr.冲.length*score.chongdz;
            //
            //        org+=qr.刑.length*score.xing;
            //        org+=qr.害.length*score.hai;
            //        /*TODO::三会的力量大于一切*/
            //    }
            //    var wx=output[v+vv+'五行'][1];
            //    hj[wx]+=org;
            //});
        });

        if(calc_dynamic_effect){ /*计算生克得分*/
            if(liunian.年干){
                /*先计算流年的各个强弱*/
                $.each(t_arr,function(k,pos){
                    var target=t_arr[k+1];/*后一个*/
                    if(!target) return true;

                    var cur_qr=liunian[pos+'干强弱'];
                    var next_qr=liunian[target+'干强弱'];
                    var next_10G=liunian[pos+'干流年十神'][k+1][0];

                    var change_re=sb_calc_tools.calc_dynamic_effect_change(
                        next_qr.综合得分,
                        cur_qr.综合得分,
                        next_10G,
                        score
                    );
                    cur_qr.综合得分+=change_re.self;
                    next_qr.综合得分+=change_re.target;

                });
            }

            $.each(t_arr,function(k,pos){
                if(liunian.年干) {
                    /*先计算流年对命局的某一柱影响，再计算这一柱对下一柱的影响*/
                    var cur_qr=liunian[pos+'干强弱'];
                    var next_qr=output[pos+'干强弱'];
                    var next_10G=liunian[pos+'干命局十神'][k][0];
                    //console.log('流'+pos+' 干:',liunian[pos+'干'],'命局 '+pos+' 干:',output[pos+'干'],'流'+pos+' 干 看 命局 '+pos+' 干 为:',next_10G);
                    var change_re=sb_calc_tools.calc_dynamic_effect_change(
                        next_qr.综合得分,
                        cur_qr.综合得分,
                        next_10G,
                        score
                    );

                    //console.log('流'+pos+' 干 ',liunian[pos+'干'],' 得分:',change_re.self,' 命局 '+pos+' 干 ',output[pos+'干'],' 得分:',change_re.target);

                    cur_qr.综合得分+=change_re.self;
                    next_qr.综合得分+=change_re.target;


                }

                var target=t_arr[k+1];/*后一个*/
                if(!target) return true;

                var cur_qr=output[pos+'干强弱'];
                var next_qr=output[target+'干强弱'];
                var next_10G=output[pos+'干命局十神'][k+1][0];

                var change_re=sb_calc_tools.calc_dynamic_effect_change(
                    next_qr.综合得分,
                    cur_qr.综合得分,
                    next_10G,
                    score
                );
                cur_qr.综合得分+=change_re.self;
                next_qr.综合得分+=change_re.target;

                output[pos+'干'+target+'干变化值']=change_re.target;
                output[target+'干'+pos+'干变化值']=change_re.self;
            });
        }

        $.each(t_arr,function(k,pos){
            var 天干=output[pos+'干'];
            var cur_qr=output[pos+'干强弱'];
            hj[天干]+=cur_qr.综合得分;

            /*透干的得分 TODO::主要需研究命局透出到流年时,透出的干被增强时的分数变化*/
            $.each(q_arr,function(kk,vv){
                var cg=output[pos+'支'+vv];
                if(cg.天干){
                    /*TODO::透干数量对透干力量的影响*/
                    hj[cg.天干]+=cg.本柱占比*cg.命局透出.length*tg_base_score;

                    /*TODO:: 调整流年透出的分数比例*/
                    hj[cg.天干]+=cg.本柱占比*cg.流年透出.length*tg_base_score;
                }
            });
        });

        //console.log(hj);
        //
        //$.each(output.地支六合,function(k,v){
        //    hj[v[0]]+=parseFloat(score.lh);
        //});
        //
        //$.each(output.地支半合,function(k,v){
        //    hj[v[0][0]]+=parseFloat(score.banhe);
        //});
        //
        //$.each(output.地支三合,function(k,v){
			//hj[v[0]]+=parseFloat(score.sanhe);
        //});
        //if(output.地支三会){
        //    hj[output.地支三会[0]]+=parseFloat(score.sanhui);
        //}
        //
        //$.each(output.天干相合,function(k,v){
        //    hj[v[0]]+=parseFloat(score.tgh);
        //});

        $.each(t_arr,function(k,pos){
            output[pos+'干强弱'].综合得分=parseFloat(output[pos+'干强弱'].综合得分.toFixed(1));
            if(liunian[pos+'干强弱']){
                liunian[pos+'干强弱'].综合得分=parseFloat(liunian[pos+'干强弱'].综合得分.toFixed(1));
            }
        });

        $.each(hj,function(k,v){
            hj[k]=parseFloat(v.toFixed(1));
        });
        output.统计=hj;
        if(cfg.compare_by_input){
            return [output,liunian];
        }else{
            return [output,output];
        }
    }
};
sb_calc_tools.get_date_split_arr=function(str){
	/*获取阳历年月日时的数值*/
	if(typeof(str)=='string'){
		var date_arr=str.split(' ');
		var delimiter_year='/';
		date_arr[0]=date_arr[0].split(delimiter_year);
		date_arr[1]=date_arr[1].split(':');

		var timestamp=new Date(str);/*TODO::处理精确到分的节气分界点*/
		timestamp=timestamp.getTime();
		return [date_arr[0][0],date_arr[0][1],date_arr[0][2],date_arr[1][0],timestamp,str];
	}else if(typeof(str)=='number'){
		var  re=[];
		var time= new Date(str);
		re.push(time.getFullYear());
		re.push(time.getMonth()+1);
		re.push(time.getDate());
		re.push(time.getHours());
		re.push(time.getMinutes());
		re.push(time.getSeconds());

		return [re[0],re[1],re[2],re[3],str,re[0]+'/'+re[1]+'/'+re[2]+' '+re[3]+':'+re[4]+':'+re[5]];
	}

	return str;


};
/*获取输入时间对应的 八字信息*/
sb_calc_tools.get_date_8w_info=function(str,cb){

	var date_arr=sb_calc_tools.get_date_split_arr(str);
	var timestamp=date_arr[4]/1000;/*当前时间戳的秒数*/
	var timestamp_fix=new Date(sb_calc_tools.start_date);/*开始计算的日期*/
	timestamp_fix=timestamp_fix.getTime()/1000;/*开始时间的秒数*/

	var timestamp_diff=timestamp-timestamp_fix;/*当前时间距离开始时间的秒数*/
	var day_count=parseInt(timestamp_diff/(3600*24));/*当前时间距离开始时间的天数*/
	/*日天干*/
	var day_stem=day_count%10-sb_calc_tools.start_stem_num;
	day_stem=fix_num(day_stem,10);
	/*日地支*/
	var day_branche=day_count%12-sb_calc_tools.start_branche_num+2;
	day_branche=fix_num(day_branche,12);

	/*时地支*/
	var hour_branche=date_arr[3]>=23?1:Math.ceil(date_arr[3]/2)+1;
	/*时天干*/
	var hour_stem_fix=(day_stem>5?day_stem-5:day_stem)*2;
	if(hour_stem_fix>10) hour_stem_fix-=10;
	var hour_stem=hour_stem_fix+hour_branche-2;
	hour_stem=fix_num(hour_stem,10);

	/*年天干*/
	var year_stem=date_arr[0]%10-3;
	year_stem=fix_num(year_stem,10);
	/*年地支*/
	var year_branche=date_arr[0]%12-3;
	year_branche=fix_num(year_branche,12);
	
	/*获取农历月数*/
	sb_calc_tools.get_lunar_month(date_arr,function(err,lunar_month){
		if(err){
			cb(err);
			return;
		}
		
		/*需要用到去年12月的信息*/
		if(lunar_month==0){
			lunar_month=12;
			year_stem=date_arr[0]%10-4;
			year_stem=fix_num(year_stem,10);
			year_branche=date_arr[0]%12-4;
			year_branche=fix_num(year_branche,12);
		}
		
		/*月天干*/
		var month_stem_fix=(year_stem>5?year_stem-5:year_stem)*2-1;
		if(month_stem_fix>10) month_stem_fix-=10;
		var month_stem=month_stem_fix-(-lunar_month);
		month_stem=fix_num(month_stem,10);

		/*月地支*/
		var month_branche=fix_num(lunar_month-11,12);

		var re=[];
		re[0]=get_stem_word(year_stem);
		re[1]=get_branche_word(year_branche);

		re[2]=get_stem_word(month_stem);
		re[3]=get_branche_word(month_branche);

		re[4]=get_stem_word(day_stem);
		re[5]=get_branche_word(day_branche);

		re[6]=get_stem_word(hour_stem);
		re[7]=get_branche_word(hour_branche);


		var 八字={};
		$.each(['年','月','日','时'],function(k,v){
			八字[v+'干']=re[k*2];
			八字[v+'支']=re[k*2+1];
		});

		cb('',八字,date_arr);
	});
};