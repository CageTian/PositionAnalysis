/**
 * Created by CageTian on 2017/12/18.
 */
var dom = document.getElementById("heat_map");
var myChart = echarts.init(dom);
var app = {};
var maxSize=10000;
option = null;
var data = [
    {
        "name": "北京",
        "value": 13130
    },
    {
        "name": "上海",
        "value": 7395
    },
    {
        "name": "杭州",
        "value": 3095
    },
    {
        "name": "广州",
        "value": 1855
    },
    {
        "name": "深圳",
        "value": 4047
    },
    {
        "name": "武汉",
        "value": 537
    },
    {
        "name": "南京",
        "value": 707
    },
    {
        "name": "西安",
        "value": 264
    },
    {
        "name": "厦门",
        "value": 258
    },
    {
        "name": "福州",
        "value": 97
    },
    {
        "name": "苏州",
        "value": 267
    },
    {
        "name": "长沙",
        "value": 151
    },
    {
        "name": "合肥",
        "value": 196
    },
    {
        "name": "珠海",
        "value": 64
    },
    {
        "name": "济南",
        "value": 117
    },
    {
        "name": "郑州",
        "value": 166
    },
    {
        "name": "大连",
        "value": 113
    },
    {
        "name": "青岛",
        "value": 121
    },
    {
        "name": "成都",
        "value": 774
    },
    {
        "name": "潍坊",
        "value": 6
    },
    {
        "name": "无锡",
        "value": 70
    },
    {
        "name": "佛山",
        "value": 73
    },
    {
        "name": "常州",
        "value": 34
    },
    {
        "name": "莆田",
        "value": 4
    },
    {
        "name": "东莞",
        "value": 64
    },
    {
        "name": "南昌",
        "value": 26
    },
    {
        "name": "重庆",
        "value": 231
    },
    {
        "name": "临沂",
        "value": 3
    },
    {
        "name": "中山",
        "value": 14
    },
    {
        "name": "沈阳",
        "value": 41
    },
    {
        "name": "宁波",
        "value": 59
    },
    {
        "name": "南阳",
        "value": 1
    },
    {
        "name": "金华",
        "value": 4
    },
    {
        "name": "天津",
        "value": 224
    },
    {
        "name": "太原",
        "value": 14
    },
    {
        "name": "洛阳",
        "value": 4
    },
    {
        "name": "汕头",
        "value": 2
    },
    {
        "name": "贵阳",
        "value": 29
    },
    {
        "name": "扬州",
        "value": 7
    },
    {
        "name": "廊坊",
        "value": 22
    },
    {
        "name": "惠州",
        "value": 17
    },
    {
        "name": "长春",
        "value": 14
    },
    {
        "name": "兰州",
        "value": 15
    },
    {
        "name": "淮安",
        "value": 3
    },
    {
        "name": "桂林",
        "value": 6
    },
    {
        "name": "昆明",
        "value": 23
    },
    {
        "name": "乌鲁木齐",
        "value": 13
    },
    {
        "name": "石家庄",
        "value": 15
    },
    {
        "name": "南宁",
        "value": 30
    },
    {
        "name": "呼和浩特",
        "value": 8
    },
    {
        "name": "威海",
        "value": 4
    },
    {
        "name": "柳州",
        "value": 2
    },
    {
        "name": "西宁",
        "value": 1
    },
    {
        "name": "承德",
        "value": 1
    },
    {
        "name": "南通",
        "value": 17
    },
    {
        "name": "银川",
        "value": 4
    },
    {
        "name": "泉州",
        "value": 9
    },
    {
        "name": "茂名",
        "value": 2
    },
    {
        "name": "东营",
        "value": 1
    },
    {
        "name": "烟台",
        "value": 7
    },
    {
        "name": "哈尔滨",
        "value": 14
    },
    {
        "name": "广东省",
        "value": 112
    },
    {
        "name": "福建省",
        "value": 33
    },
    {
        "name": "浙江省",
        "value": 42
    },
    {
        "name": "海口",
        "value": 10
    },
    {
        "name": "嘉兴",
        "value": 14
    },
    {
        "name": "绍兴",
        "value": 10
    },
    {
        "name": "山东省",
        "value": 14
    },
    {
        "name": "保定",
        "value": 4
    },
    {
        "name": "日照",
        "value": 10
    },
    {
        "name": "安徽省",
        "value": 38
    },
    {
        "name": "济宁",
        "value": 4
    },
    {
        "name": "宿迁",
        "value": 3
    },
    {
        "name": "芜湖",
        "value": 2
    },
    {
        "name": "四川省",
        "value": 15
    },
    {
        "name": "江门",
        "value": 6
    },
    {
        "name": "绵阳",
        "value": 3
    },
    {
        "name": "宝鸡",
        "value": 1
    },
    {
        "name": "聊城",
        "value": 1
    },
    {
        "name": "湖州",
        "value": 1
    },
    {
        "name": "防城港",
        "value": 1
    },
    {
        "name": "黄石",
        "value": 4
    },
    {
        "name": "淄博",
        "value": 2
    },
    {
        "name": "湖北省",
        "value": 9
    },
    {
        "name": "镇江",
        "value": 3
    },
    {
        "name": "山西省",
        "value": 3
    },
    {
        "name": "菏泽",
        "value": 1
    },
    {
        "name": "台湾",
        "value": 2
    },
    {
        "name": "新乡",
        "value": 1
    },
    {
        "name": "泰州",
        "value": 7
    },
    {
        "name": "江苏省",
        "value": 25
    },
    {
        "name": "常德",
        "value": 2
    },
    {
        "name": "湖南省",
        "value": 6
    },
    {
        "name": "张家口",
        "value": 3
    },
    {
        "name": "宜昌",
        "value": 1
    },
    {
        "name": "蚌埠",
        "value": 1
    },
    {
        "name": "衡水",
        "value": 1
    },
    {
        "name": "双鸭山",
        "value": 1
    },
    {
        "name": "温州",
        "value": 5
    },
    {
        "name": "海南",
        "value": 1
    },
    {
        "name": "邢台",
        "value": 1
    },
    {
        "name": "漳州",
        "value": 3
    },
    {
        "name": "辽宁省",
        "value": 2
    },
    {
        "name": "广西",
        "value": 3
    },
    {
        "name": "云南省",
        "value": 3
    },
    {
        "name": "河南省",
        "value": 13
    },
    {
        "name": "肇庆",
        "value": 4
    },
    {
        "name": "玉林",
        "value": 2
    },
    {
        "name": "滁州",
        "value": 2
    },
    {
        "name": "贵州省",
        "value": 2
    },
    {
        "name": "滨州",
        "value": 2
    },
    {
        "name": "江西省",
        "value": 3
    },
    {
        "name": "河北省",
        "value": 7
    },
    {
        "name": "宣城",
        "value": 1
    },
    {
        "name": "徐州",
        "value": 3
    },
    {
        "name": "香港",
        "value": 6
    },
    {
        "name": "鄂尔多斯",
        "value": 1
    },
    {
        "name": "淮北",
        "value": 1
    },
    {
        "name": "新疆",
        "value": 1
    },
    {
        "name": "荆州",
        "value": 1
    },
    {
        "name": "台州",
        "value": 1
    },
    {
        "name": "梅州",
        "value": 1
    },
    {
        "name": "唐山",
        "value": 3
    },
    {
        "name": "上饶",
        "value": 2
    },
    {
        "name": "盐城",
        "value": 1
    },
    {
        "name": "连云港",
        "value": 1
    },
    {
        "name": "晋中",
        "value": 1
    },
    {
        "name": "株洲",
        "value": 2
    },
    {
        "name": "陕西省",
        "value": 2
    },
    {
        "name": "泸州",
        "value": 1
    }
];
var geoCoordMap = {
    "北京": [
        116.395645,
        39.929986
    ],
    "上海": [
        121.487899,
        31.249162
    ],
    "杭州": [
        120.219375,
        30.259244
    ],
    "广州": [
        113.30765,
        23.120049
    ],
    "深圳": [
        114.025974,
        22.546054
    ],
    "武汉": [
        114.3162,
        30.581084
    ],
    "南京": [
        118.778074,
        32.057236
    ],
    "西安": [
        108.953098,
        34.2778
    ],
    "厦门": [
        118.103886,
        24.489231
    ],
    "福州": [
        119.330221,
        26.047125
    ],
    "苏州": [
        120.619907,
        31.317987
    ],
    "长沙": [
        112.979353,
        28.213478
    ],
    "合肥": [
        117.282699,
        31.866942
    ],
    "珠海": [
        113.562447,
        22.256915
    ],
    "济南": [
        117.024967,
        36.682785
    ],
    "郑州": [
        113.649644,
        34.75661
    ],
    "大连": [
        121.593478,
        38.94871
    ],
    "青岛": [
        120.384428,
        36.105215
    ],
    "成都": [
        104.067923,
        30.679943
    ],
    "潍坊": [
        119.142634,
        36.716115
    ],
    "无锡": [
        120.305456,
        31.570037
    ],
    "佛山": [
        113.134026,
        23.035095
    ],
    "常州": [
        119.981861,
        31.771397
    ],
    "莆田": [
        119.077731,
        25.44845
    ],
    "东莞": [
        113.763434,
        23.043024
    ],
    "南昌": [
        115.893528,
        28.689578
    ],
    "重庆": [
        106.530635,
        29.544606
    ],
    "临沂": [
        118.340768,
        35.072409
    ],
    "中山": [
        113.42206,
        22.545178
    ],
    "沈阳": [
        123.432791,
        41.808645
    ],
    "宁波": [
        121.579006,
        29.885259
    ],
    "南阳": [
        112.542842,
        33.01142
    ],
    "金华": [
        119.652576,
        29.102899
    ],
    "天津": [
        117.210813,
        39.14393
    ],
    "太原": [
        112.550864,
        37.890277
    ],
    "洛阳": [
        112.447525,
        34.657368
    ],
    "汕头": [
        116.72865,
        23.383908
    ],
    "贵阳": [
        106.709177,
        26.629907
    ],
    "扬州": [
        119.427778,
        32.408505
    ],
    "廊坊": [
        116.703602,
        39.518611
    ],
    "惠州": [
        114.410658,
        23.11354
    ],
    "长春": [
        125.313642,
        43.898338
    ],
    "兰州": [
        103.823305,
        36.064226
    ],
    "淮安": [
        119.030186,
        33.606513
    ],
    "桂林": [
        110.26092,
        25.262901
    ],
    "昆明": [
        102.714601,
        25.049153
    ],
    "乌鲁木齐": [
        87.564988,
        43.84038
    ],
    "石家庄": [
        114.522082,
        38.048958
    ],
    "南宁": [
        108.297234,
        22.806493
    ],
    "呼和浩特": [
        111.660351,
        40.828319
    ],
    "威海": [
        122.093958,
        37.528787
    ],
    "柳州": [
        109.422402,
        24.329053
    ],
    "西宁": [
        101.767921,
        36.640739
    ],
    "承德": [
        117.933822,
        40.992521
    ],
    "南通": [
        120.873801,
        32.014665
    ],
    "银川": [
        106.206479,
        38.502621
    ],
    "泉州": [
        118.600362,
        24.901652
    ],
    "茂名": [
        110.931245,
        21.668226
    ],
    "东营": [
        118.583926,
        37.487121
    ],
    "烟台": [
        121.309555,
        37.536562
    ],
    "哈尔滨": [
        126.657717,
        45.773225
    ],
    "广东省": [
        113.394818,
        23.408004
    ],
    "福建省": [
        117.984943,
        26.050118
    ],
    "浙江省": [
        119.957202,
        29.159494
    ],
    "海口": [
        110.330802,
        20.022071
    ],
    "嘉兴": [
        120.760428,
        30.773992
    ],
    "绍兴": [
        120.592467,
        30.002365
    ],
    "山东省": [
        118.527663,
        36.09929
    ],
    "保定": [
        115.49481,
        38.886565
    ],
    "日照": [
        119.50718,
        35.420225
    ],
    "安徽省": [
        117.216005,
        31.859252
    ],
    "济宁": [
        116.600798,
        35.402122
    ],
    "宿迁": [
        118.296893,
        33.95205
    ],
    "芜湖": [
        118.384108,
        31.36602
    ],
    "四川省": [
        102.89916,
        30.367481
    ],
    "江门": [
        113.078125,
        22.575117
    ],
    "绵阳": [
        104.705519,
        31.504701
    ],
    "宝鸡": [
        107.170645,
        34.364081
    ],
    "聊城": [
        115.986869,
        36.455829
    ],
    "湖州": [
        120.137243,
        30.877925
    ],
    "防城港": [
        108.351791,
        21.617398
    ],
    "黄石": [
        115.050683,
        30.216127
    ],
    "淄博": [
        118.059134,
        36.804685
    ],
    "湖北省": [
        112.410562,
        31.209316
    ],
    "镇江": [
        119.455835,
        32.204409
    ],
    "山西省": [
        112.515496,
        37.866566
    ],
    "菏泽": [
        115.46336,
        35.26244
    ],
    "台湾": [
        120.961454,
        23.80406
    ],
    "新乡": [
        113.91269,
        35.307258
    ],
    "泰州": [
        119.919606,
        32.476053
    ],
    "江苏省": [
        119.368489,
        33.013797
    ],
    "常德": [
        111.653718,
        29.012149
    ],
    "湖南省": [
        111.720664,
        27.695864
    ],
    "张家口": [
        114.893782,
        40.811188
    ],
    "宜昌": [
        111.310981,
        30.732758
    ],
    "蚌埠": [
        117.35708,
        32.929499
    ],
    "衡水": [
        115.686229,
        37.746929
    ],
    "双鸭山": [
        131.171402,
        46.655102
    ],
    "温州": [
        120.690635,
        28.002838
    ],
    "海南": [
        109.733755,
        19.180501
    ],
    "邢台": [
        114.520487,
        37.069531
    ],
    "漳州": [
        117.676205,
        24.517065
    ],
    "辽宁省": [
        122.753592,
        41.6216
    ],
    "广西": [
        108.924274,
        23.552255
    ],
    "云南省": [
        101.592952,
        24.864213
    ],
    "河南省": [
        113.486804,
        34.157184
    ],
    "肇庆": [
        112.479653,
        23.078663
    ],
    "玉林": [
        110.151676,
        22.643974
    ],
    "滁州": [
        118.32457,
        32.317351
    ],
    "贵州省": [
        106.734996,
        26.902826
    ],
    "滨州": [
        117.968292,
        37.405314
    ],
    "江西省": [
        115.676082,
        27.757258
    ],
    "河北省": [
        115.661434,
        38.61384
    ],
    "宣城": [
        118.752096,
        30.951642
    ],
    "徐州": [
        117.188107,
        34.271553
    ],
    "香港": [
        114.186124,
        22.293586
    ],
    "鄂尔多斯": [
        109.993706,
        39.81649
    ],
    "淮北": [
        116.791447,
        33.960023
    ],
    "新疆": [
        85.614899,
        42.127001
    ],
    "荆州": [
        112.241866,
        30.332591
    ],
    "台州": [
        121.440613,
        28.668283
    ],
    "梅州": [
        116.126403,
        24.304571
    ],
    "唐山": [
        118.183451,
        39.650531
    ],
    "上饶": [
        117.955464,
        28.457623
    ],
    "盐城": [
        120.148872,
        33.379862
    ],
    "连云港": [
        119.173872,
        34.601549
    ],
    "晋中": [
        112.738514,
        37.693362
    ],
    "株洲": [
        113.131695,
        27.827433
    ],
    "陕西省": [
        109.503789,
        35.860026
    ],
    "泸州": [
        105.44397,
        28.89593
    ]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
option = {
    // backgroundColor: '#404a59',
    title: {
        text: '全国互联网职位需求分布',
        left: 'center',
        textStyle: {
            fontWeight:'lighter',
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    visualMap: {
                min: 0,
                max: maxSize,
                calculable: true,
                inRange: {
                    color: ['#4ba2bc', '#f3f798', '#ff2c2c']
                },
                textStyle: {
                    color: '#fff'
                },
                left:'5%',
                bottom:'5%'
            },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['需求量'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series : [
        {
            name: '需求量',
            zoom:6,
            center:[116.405285, 39.904989],
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                if(val[2]<10)
                    return 5;
                else if(val[2]<50)
                    return 10;
                else if(val[2]<200)
                    return 15;
                else if(val[2]<500)
                    return 20;
                else if(val[2]<1000)
                    return 25;
                else if(val[2]<3000)
                    return 30;
                else if(val[2]<7000)
                    return 35;
                else
                    return 40;
                
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: function (param) {
                                var val=param.data.value;
                                if(val[2]>=5000)
                                    return '#2feb41';
                                else if(val[2]>=1000)
                                    return '#872341';
                                else if(val[2]>=900)
                                    return '#be3144';
                                else if(val[2]>=800)
                                    return '#f05941';
                                else if(val[2]>=750)
                                    return '#f25292';
                                else if(val[2]>=700)
                                    return '#ffa096';
                                else if(val[2]>=600)
                                    return '#cca8e9';
                                else if(val[2]>=500)
                                    return '#c3bef0';
                                else if(val[2]>=400)
                                    return '#cadefc';
                                else if(val[2]>=300)
                                    return '#dff5f2';
                                else if(val[2]>=200)
                                    return '#87dfd6';
                                else if(val[2]>=100)
                                    return '#46b7b9';
                                else
                                    return '#2f9296';
                            }
                }
            }
        },
        {
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 11)),
            symbolSize: function (val) {
                if(val[2]<10)
                    return 5;
                else if(val[2]<50)
                    return 10;
                else if(val[2]<200)
                    return 15;
                else if(val[2]<500)
                    return 20;
                else if(val[2]<1000)
                    return 25;
                else if(val[2]<3000)
                    return 30;
                else if(val[2]<7000)
                    return 35;
                else
                    return 40;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: function (param) {
                                var val=param.data.value;
                                if(val[2]>=5000)
                                    return '#2feb41';
                                else if(val[2]>=1000)
                                    return '#872341';
                                else if(val[2]>=900)
                                    return '#be3144';
                                else if(val[2]>=800)
                                    return '#f05941';
                                else if(val[2]>=750)
                                    return '#f25292';
                                else if(val[2]>=700)
                                    return '#ffa096';
                                else if(val[2]>=600)
                                    return '#cca8e9';
                                else if(val[2]>=500)
                                    return '#c3bef0';
                                else if(val[2]>=400)
                                    return '#cadefc';
                                else if(val[2]>=300)
                                    return '#dff5f2';
                                else if(val[2]>=200)
                                    return '#87dfd6';
                                else if(val[2]>=100)
                                    return '#46b7b9';
                                else
                                    return '#2f9296';
                            },
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}