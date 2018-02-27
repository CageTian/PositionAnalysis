/**
 *
 * Created by CageTian on 2017/12/18.
 */
var dom = document.getElementById("radar");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    tooltip: {},
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['<10','10-20','20-30','30-40','40-50','50-60','>60'],
        textStyle: {
            color: '#fff'
        }
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                // backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '地点', max: 2.035,min:1},
            { name: '学历', max: 2.085115048,min:1.5},
            { name: '经验', max: 3.6795,min:0}

        ]
    },
    series: [{
        name: '相关职位要求',
        type: 'radar',
        radius : '75%',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [1.2807,1.698245614,0.8702],
                name : '<10'
            },
            {
                value : [1.4015,1.687603698,1.9279],
                name : '10-20'
            },
            {
                value : [1.6163,1.806100218,2.4303],
                name : '20-30'
            },
            {
                value : [1.8723,1.928721174,2.8138],
                name : '30-40'
            },
            {
                value : [2.035,1.960263344,3.079],
                name : '40-50'
            },
            {
                value : [1.2046,1.953736655,3.086],
                name : '50-60'
            },
            {
                value : [1.4288,2.085115048,3.6795],
                name : '>60'
            }
        ]
    }]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}