/**
 * Created by caget on 2017/12/18.
 */
var dom = document.getElementById("multipie1");
var myChart = echarts.init(dom);
var app = {};
option = null;
var data = genData(50);

option = {
    title : {

    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,
        textStyle: {
            color: '#fff'
        }
    },
    series : [
        {
            name: '姓名',
            type: 'pie',
            radius : '55%',
            center: ['40%', '50%'],
            data: data.seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};




function genData(count) {

    var legendData = ['互联网/移动互联网/电子商务',
        '计算机软件', 'IT服务/系统集成', '基金/证券/期货/投资',
        '网络游戏', '电子技术/半导体/集成电路', '通信(设备/运营/增值)',
        '教育/培训/学术/科研/院校', '保险', '交通/物流/运输', '专业服务(咨询/财会/法律/翻译等)',
        '房地产开发/建筑/建材/工程', '计算机硬件/网络设备', '机械制造/机电/重工', '银行',
        '医疗设备/器械', '信托/担保/拍卖/典当', '仪器/仪表/工业自动化/电气', '全部行业',
        '广告/公关/市场推广/会展', '汽车/摩托车', '医疗/保健/美容/卫生服务', '影视/媒体/艺术/文化/出版',
        '服装服饰/纺织/皮革', '百货/批发/零售', '房地产服务(物业管理/地产经纪)', '外包服务', '贸易/进出口',
        '家具/家电', '旅游/酒店/餐饮服务/生活服务', '新能源', '能源(电力/水利)', '其他', '食品/饮料/烟酒/日化',
        '制药/生物工程', '环保', '航空/航天', '石油/石化/化工', '租赁服务', '规划/设计/装潢', '农/林/牧/渔',
        '工艺品/珠宝/玩具', '原材料及加工', '娱乐/休闲/体育', '办公用品及设备', '中介服务', '奢侈品/收藏品',
        '印刷/包装/造纸', '会计/审计', '检测/认证', '政府/公共事业/非营利机构'];
    var seriesData = [
        {
            "name": "互联网/移动互联网/电子商务",
            "value": 30079
        },
        {
            "name": "计算机软件",
            "value": 18354
        },
        {
            "name": "IT服务/系统集成",
            "value": 8561
        },
        {
            "name": "基金/证券/期货/投资",
            "value": 4578
        },
        {
            "name": "网络游戏",
            "value": 2415
        },
        {
            "name": "电子技术/半导体/集成电路",
            "value": 2324
        },
        {
            "name": "通信(设备/运营/增值)",
            "value": 2478
        },
        {
            "name": "教育/培训/学术/科研/院校",
            "value": 749
        },
        {
            "name": "保险",
            "value": 735
        },
        {
            "name": "交通/物流/运输",
            "value": 574
        },
        {
            "name": "专业服务(咨询/财会/法律/翻译等)",
            "value": 525
        },
        {
            "name": "房地产开发/建筑/建材/工程",
            "value": 602
        },
        {
            "name": "计算机硬件/网络设备",
            "value": 1904
        },
        {
            "name": "机械制造/机电/重工",
            "value": 392
        },
        {
            "name": "银行",
            "value": 1372
        },
        {
            "name": "医疗设备/器械",
            "value": 343
        },
        {
            "name": "信托/担保/拍卖/典当",
            "value": 812
        },
        {
            "name": "仪器/仪表/工业自动化/电气",
            "value": 427
        },
        {
            "name": "全部行业",
            "value": 189
        },
        {
            "name": "广告/公关/市场推广/会展",
            "value": 280
        },
        {
            "name": "汽车/摩托车",
            "value": 889
        },
        {
            "name": "医疗/保健/美容/卫生服务",
            "value": 441
        },
        {
            "name": "影视/媒体/艺术/文化/出版",
            "value": 252
        },
        {
            "name": "服装服饰/纺织/皮革",
            "value": 245
        },
        {
            "name": "百货/批发/零售",
            "value": 385
        },
        {
            "name": "房地产服务(物业管理/地产经纪)",
            "value": 175
        },
        {
            "name": "外包服务",
            "value": 168
        },
        {
            "name": "贸易/进出口",
            "value": 147
        },
        {
            "name": "家具/家电",
            "value": 357
        },
        {
            "name": "旅游/酒店/餐饮服务/生活服务",
            "value": 224
        },
        {
            "name": "新能源",
            "value": 273
        },
        {
            "name": "能源(电力/水利)",
            "value": 196
        },
        {
            "name": "其他",
            "value": 112
        },
        {
            "name": "食品/饮料/烟酒/日化",
            "value": 245
        },
        {
            "name": "制药/生物工程",
            "value": 196
        },
        {
            "name": "环保",
            "value": 70
        },
        {
            "name": "航空/航天",
            "value": 119
        },
        {
            "name": "石油/石化/化工",
            "value": 84
        },
        {
            "name": "租赁服务",
            "value": 35
        },
        {
            "name": "规划/设计/装潢",
            "value": 77
        },
        {
            "name": "农/林/牧/渔",
            "value": 35
        },
        {
            "name": "工艺品/珠宝/玩具",
            "value": 49
        },
        {
            "name": "原材料及加工",
            "value": 56
        },
        {
            "name": "娱乐/休闲/体育",
            "value": 63
        },
        {
            "name": "办公用品及设备",
            "value": 14
        },
        {
            "name": "中介服务",
            "value": 35
        },
        {
            "name": "奢侈品/收藏品",
            "value": 49
        },
        {
            "name": "印刷/包装/造纸",
            "value": 21
        },
        {
            "name": "会计/审计",
            "value": 7
        },
        {
            "name": "检测/认证",
            "value": 7
        },
        {
            "name": "政府/公共事业/非营利机构",
            "value": 7
        }
    ];


    return {
        legendData: legendData,
        seriesData: seriesData
    };


}
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}