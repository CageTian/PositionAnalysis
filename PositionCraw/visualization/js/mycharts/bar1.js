/**
 * Created by CageTian on 2017/12/18.
 */
var dom = document.getElementById("bar1");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '世界人口总量 - 条形图';

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['最低平均工资', '最高平均工资'],
        textStyle: {
            color: '#fff'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top:'10%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        max:60,
        boundaryGap: [0, 0.2],
        axisLabel:{
            textStyle: {
                color: '#fff'
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['Android','Java','Python','大数据','数据挖掘','机器学习','深度学习'],
        axisLabel:{
            textStyle: {
                color: '#fff'
            }
        }
    },
    series: [
        {
            name: '最低平均工资',
            type: 'bar',
            data: [19.1439, 18.6680, 18.9069, 26.4203, 23.3985, 25.8266,33.4794]
        },
        {
            name: '最高平均工资',
            type: 'bar',
            data: [33.3239, 30.9933, 32.9821, 43.8202, 40.2753, 45.0803,55.9583]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
