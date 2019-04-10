var config = {displaylogo:false,
  'modeBarButtonsToRemove' : ['pan2d',
  'lasso2d',
  'sendDataToCloud',
  'ZoomOut',
  'ZoomIn',
  'hoverCompareCartesian']}

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
    title: "Album Review Count by Genre",
    font: {
      family : 'Arial',
      size :18,
      color: '#000000'
    },
    xaxis: {
      title : "Year",
      // rangeslider: {}
    },
    yaxis: {
      title : "Total Reviews",
    },

    barmode: 'stack',

    // margin: {
    //   r: 300,
    //   l: -300,
    // }
  };
  Plotly.newPlot("stackedattempt", data, layout);


});


//Line Score
d3.json("/reviewscorebyyearandgenre").then(infos => {

  var trace1 = {
    x:Object.keys(infos.electronic),
    y:Object.values(infos.electronic),
    name:'Electronic',
    type:'scatter'
  };

  var trace2 = {
    x:Object.keys(infos.experimental),
    y:Object.values(infos.experimental),
    name:'Experimental',
    type:'scatter'
  };

  var trace3 = {
    x:Object.keys(infos["folk/country"]),
    y:Object.values(infos['folk/country']),
    name:'Folk/Country',
    type:'scatter'
  };

  var trace4 = {
    x:Object.keys(infos.global),
    y:Object.values(infos.global),
    name:'Global',
    type:'scatter'
  };

  var trace5 = {
    x:Object.keys(infos['pop/r&b']),
    y:Object.values(infos['pop/r&b']),
    name:'Pop/R&B',
    type:'scatter'
  };

  var trace6 = {
    x:Object.keys(infos.metal),
    y:Object.values(infos.metal),
    name:'Metal',
    type:'scatter'
  };

  var trace7 = {
    x:Object.keys(infos.jazz),
    y:Object.values(infos.jazz),
    name:'Jazz',
    type:'scatter'
  };

  var trace8 = {
    x:Object.keys(infos.rap),
    y:Object.values(infos.rap),
    name:'Rap',
    type:'scatter'
  };

  var trace9 = {
    x:Object.keys(infos.rock),
    y:Object.values(infos.rock),
    name:'Rock',
    type:'scatter'
  };

  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9];

  var layout = {
    autosize: false,
    title: "Average Album Score by Genre",
    font: {
      family : 'Arial',
      size :18,
      color: '#000000'
    },
    xaxis: {
      title : "Year",
      // rangeslider: {}
    },
    yaxis: {
      title : "Average Score",
    },

  };
  Plotly.newPlot("linesattempt", data, layout);

  
});


d3.json("/scatterdata").then(d => {
  
  let trace = {
    x : Object.values(d.score),
    y : Object.values(d.popularity),
    mode: 'markers',
    type : 'scatter'
  }

  var layout = {
    autosize: false,
    title: "Spotify Popularity vs. Pitchfork Album Review Score",
    font: {
      family : 'Arial',
      size :18,
      color: '#000000'
    },
    xaxis: {
      title : "Pitchfork Review Score",
    },
    yaxis: {
      title : "Spotify Popularity",
    },

  };



  let data = [trace]
  Plotly.newPlot('scatter', data, layout)
})