/**
 * Created by CageTian on 2017/12/18.
 */
var dom = document.getElementById("bar2");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '堆叠柱状图';

option = {
    // tooltip : {
    //     trigger: 'axis',
    //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //     }
    // },
    legend: {
        data:['最低平均工资','最高平均工资','<10','10-20','20-30','30-40','40-50','50-60','>60'],
        textStyle: {
            color: '#fff'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Android','Java','Python','大数据','数据挖掘','机器学习','深度学习'],
            axisLabel:{
                textStyle: {
                    color: '#fff'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel:{
                textStyle: {
                    color: '#fff'
                }
            }
        }
    ],
    series : [
        {
            name:'最低平均工资',
            type:'bar',
            data:[4322, 5079, 3859, 3564, 3514, 3386, 3527]
        },


        {
            name:'<10',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[793, 835, 626, 299, 431, 245, 174]
        },
        {
            name:'10-20',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[1984, 2433, 1912, 1313, 1342, 1153, 936]
        },
        {
            name:'20-30',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[1226, 1445, 1061, 1118, 1153, 1235, 1185]
        },
        {
            name:'30-40',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[235, 304, 176, 400, 351, 405, 506]
        },
        {
            name:'40-50',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[70, 57, 50, 195, 124, 173, 271]
        },
        {
            name:'50-60',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[7, 5, 15, 79, 47, 59, 118]
        },
        {
            name:'>60',
            type:'bar',
            stack: '最低平均工资',
            barWidth : 10,
            data:[7, 0, 18, 142, 54, 106, 331]
        },

        {
            name: '最高平均工资',
            type: 'bar',
            data: [4322,5079,3858, 3546, 3502, 3376, 3521]
        },
        {
            name:'<10',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[144, 175, 94, 48, 103, 39, 40]
        },
        {
            name:'10-20',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[964, 1081, 787, 404, 474, 274, 200]
        },
        {
            name:'20-30',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[1171, 1702, 1204, 781, 821, 630, 422]
        },
        {
            name:'30-40',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[779, 949, 781, 696, 662, 722, 577]
        },
        {
            name:'40-50',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[701, 758, 563, 636, 592, 652, 612]
        },
        {
            name:'50-60',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[389, 305, 274, 428, 437, 502, 635]
        },
        {
            name:'>60',
            type:'bar',
            stack: '最高平均工资',
            barWidth : 10,
            data:[174, 109, 156, 571, 425, 567, 1041]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}