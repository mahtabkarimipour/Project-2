var config = {displaylogo:false,
  'modeBarButtonsToRemove' : ['pan2d',
  'lasso2d',
  'sendDataToCloud',
  'ZoomOut',
  'ZoomIn',
  'hoverCompareCartesian']}

  // d3.json("/reviewsbyyear").then(infos => {
  //   var data = [
  //     {
  //       x: infos.years,
  //       y: infos.counts,
  //       type: 'scatter',
  //       mode: 'lines',
  //       line : {
  //         width : 5,
  //         color: '#6e76b7'
  //       }
  //     }
  //   ];


  d3.json("/reviewsbyyear").then(infos => {
    var data = [
      {
        x: Object.keys(infos.reviewid),
        y: Object.values(infos.reviewid),
        type: 'scatter',
        mode: 'lines',
        line : {
          width : 5,
          color: '#6e76b7'
        }
      }
    ];



  var layout = {
    title: "Review Counts By Year All Genres",
    font: {
      family : 'Arial',
      size :18,
      color: '#000000'
    },
    xaxis: {
      title : "Year"
    },
    yaxis: {
      title : "Total Reviews"
    }
  };
  Plotly.newPlot("reviewsbyyear", data, layout, config);
});

d3.json("/scorebyyear").then(infos => {
  var data = [
    {
      x: infos.years,
      y: infos.scores,
      type: "scatter"
    }
  ];
  var layout = {
    title: "Average Album Review Score",
    font: {
      family : 'Arial',
      size :18,
      color: '#000000'
    },
    xaxis: {
      title : "Year"
    },
    yaxis: {
      title : "Total Reviews"
    }
  };
  Plotly.newPlot("scorebyyear", data, layout);
});

d3.json("/genrecount").then(infos => {
  var data = [
    {
      x: infos.genres,
      y: infos.scores,
      type: "bar"
    }
  ];
  var layout = {
    title: "Share of Total Album Reviews by Genres"
  }
  Plotly.newPlot("genrecount", data, layout);
});
