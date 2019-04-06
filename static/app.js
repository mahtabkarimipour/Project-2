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


d3.json("/reviewsbyyearandgenre").then(d => {
  console.log(d)
  console.log(d.electronic)
  console.log(Object.keys(d.electronic))
  console.log(Object.values(d.electronic))
});

//   d3.json("/reviewsbyyear").then(infos => {
//     var data = [
//       {
//         x: Object.keys(infos.reviewid),
//         y: Object.values(infos.reviewid),
//         type: 'scatter',
//         mode: 'lines',
//         line : {
//           width : 5,
//           color: '#6e76b7'
//         }
//       }
//     ];



//   var layout = {
//     title: "Review Counts By Year All Genres",
//     font: {
//       family : 'Arial',
//       size :18,
//       color: '#000000'
//     },
//     xaxis: {
//       title : "Year"
//     },
//     yaxis: {
//       title : "Total Reviews"
//     }
//   };
//   Plotly.newPlot("reviewsbyyear", data, layout, config);
// });

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


const players = [
  {genre: "electronic", count: 22, year :1999},

];

//STACKED ATTEMPT
d3.json("/reviewsbyyearandgenre").then(infos => {

  var trace1 = {
    x:Object.keys(infos.electronic),
    y:Object.values(infos.electronic),
    name:'Electronic',
    type:'bar'
  };

  var trace2 = {
    x:Object.keys(infos.experimental),
    y:Object.values(infos.experimental),
    name:'Experimental',
    type:'bar'
  };

  var trace3 = {
    x:Object.keys(infos["folk/country"]),
    y:Object.values(infos['folk/country']),
    name:'Folk/Country',
    type:'bar'
  };

  var trace4 = {
    x:Object.keys(infos.global),
    y:Object.values(infos.global),
    name:'Global',
    type:'bar'
  };

  var trace5 = {
    x:Object.keys(infos['pop/r&b']),
    y:Object.values(infos['pop/r&b']),
    name:'Pop/R&B',
    type:'bar'
  };

  var trace6 = {
    x:Object.keys(infos.metal),
    y:Object.values(infos.metal),
    name:'Metal',
    type:'bar'
  };

  var trace7 = {
    x:Object.keys(infos.jazz),
    y:Object.values(infos.jazz),
    name:'Jazz',
    type:'bar'
  };

  var trace8 = {
    x:Object.keys(infos.rap),
    y:Object.values(infos.rap),
    name:'Rap',
    type:'bar'
  };

  var trace9 = {
    x:Object.keys(infos.rock),
    y:Object.values(infos.rock),
    name:'Rock',
    type:'bar'
  };

  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9];

  var layout = {
    autosize: false,
    title: "Stacked Attempt",
    font: {
      family : 'Arial',
      size :18,
      color: '#000000'
    },
    xaxis: {
      title : "Year"
    },
    yaxis: {
      title : "Total Reviews",
      margin: {
        t:200,
        l:200,
        r:200,
        b:200      }
    },

    barmode: 'stack'
  };
  Plotly.newPlot("stackedattempt", data, layout);
});


