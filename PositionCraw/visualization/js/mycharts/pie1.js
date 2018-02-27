/**
 * Created by CageTian on 2017/12/18.
 */
var dom = document.getElementById("pie1");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Android','Java','Python','大数据','数据挖掘','机器学习','深度学习'],
        textStyle: {
            color: '#fff'
        }

    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'Android'},
                {value:310, name:'Java'},
                {value:234, name:'Python'},
                {value:135, name:'大数据'},
                {value:1548, name:'数据挖掘'},
                {value:1548, name:'机器学习'},
                {value:1548, name:'深度学习'}
            ],
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
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}