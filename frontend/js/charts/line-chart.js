function LineChart(LineData) {

  var dom = document.getElementById('line-chart-container');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};

  var option;

  option = {
    // title: {
    //   text: 'Sum',
    //   left: '2%',
    //   textStyle: {
    //     color: '#A9A9A9'
    //   }
    // },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      textStyle: {
        color: '#fff'
      }
    },
    // legend: {
    //   data: ['弱震', '有感地震', '中强震', '强震', '大地震'],
    //   textStyle: {
    //     color: ["#4592f2", '#0073cf', '#005bb4', '#00469c', '#001a63']
    //   },
    //   show: true
    // },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine:{
        lineStyle:{
          color: "#fff",
        },
      },
      data: ['Jan', 'Feb', 'Mar', 'Api', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      name : '频次',
      nameTextStyle:{
        align:"right",
      },
      axisLine:{
        lineStyle:{
          color: "#fff",
        },
      },
    },
    series: [
      {
        name: '大地震(M≥7)',
        type: 'bar',
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        data: LineData[4],
        itemStyle: {
          normal: {
            color:'#001a63'
          },
        },
      },
      {
        name: '强震(6≤M<7)',
        type: 'bar',
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        data: LineData[3],
        itemStyle: {
          normal: {
            color:'#00469c'
          },
        },
      },
      {
        name: '中强震(4.5≤M<6)',
        type: 'bar',
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        data: LineData[2],
        itemStyle: {
          normal: {
            color:'#005bb4'
          },
        },
      },
      {
        name: '有感地震(3≤M<4.5)',
        type: 'bar',
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        data: LineData[1],
        itemStyle: {
          normal: {
            color:'#0073cf'
          },
        },
      },
      {
        name: '弱震(M<3)',
        type: 'bar',
        stack: 'Total',
        emphasis: {
          focus: 'series'
        },
        data: LineData[0],
        itemStyle: {
          normal: {
            color:'#4592f2'
          },
        },
      },

    ]
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
  window.addEventListener('resize', myChart.resize);
}
function UpdateLineChart(year=2013, rank=0.0, country="") {
  $.ajax({
    url:'http://127.0.0.1:5000/api/line?year='+year+'&rank='+rank+'&country='+country,
    type:'get',
    dataType:'json',
    success: function(data){
      LineChart(data.data.lines)
    },
    error:function(){
      console.log('请求出错！');
    }
  });
}

$(document).ready(function(){
  UpdateLineChart(year, rank, country);
});