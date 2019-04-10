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
      rangeslider: {}
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
      rangeslider: {}
    },
    yaxis: {
      title : "Average Score",
    },

  };
  Plotly.newPlot("linesattempt", data, layout);

  
});



// establish width, height and margins

let svgWidth = 960;
let svgHeight = 500;

let margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// create an SVG wrapper
let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// append the SVG group that will hold the chart
//shift the group over using the atranform attribute to specify left and top margins
let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json("/scatterdata").then(dataSet => {
  // dataSet.forEach(function(data){
  //   data.popularity = +data.popularity;
  //   data.score = +data.score;
  // });
console.log(Object.values(dataSet.popularity))

  let xLinearScale = d3.scaleLinear()
  .domain([d3.min(dataSet, d => +Object.values(d.score)) *0.95, 
    d3.max(dataSet, d => +Object.values(d.score))*1.05])
  .range([0, width]);

  let yLinearScale = d3.scaleLinear()
  .domain([d3.min(dataSet, d=> +Object.values(d.popularity)) *.80, 
    d3.max(dataSet, d => +Object.values(d.popularity))* 1.05])
  .range([height, 0]);

  let bottomAxis = d3.axisBottom(xLinearScale);
  let leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

  chartGroup.append("g")
  .attr("transform", `translate(0,0)`)
  .call(leftAxis);

  chartGroup.append('text')
  .attr('x', 400)
  .attr('y', 440)
  .text('Album Review Score');

  chartGroup.append('text')
  .attr("transform", "rotate(-90)")
  .attr('x', 0 - (height / 2))
  .attr('y', 0 - margin.right)
  .classed('axis-text', true)
  .text('Spotify Popularity');

  console.log(height/2)

  console.log(margin.right)

  let theCircles = svg.selectAll("g theCircles").data(dataSet).enter();

  let circlesGroup = theCircles
  .append("circle")
  .attr('cx', d => xLinearScale(+Object.values(d.score)) + margin.left)
  .attr('cy', d => yLinearScale(+Object.values(d.popularity)))
  .attr('r', '15')
  .attr('fill', 'tomato')
  .attr('stroke-width', '0.7')
  .attr('stroke', 'gray')
  .style('opacity', 0.7);


  // let toolTip = d3.tip()
  // .attr('class', 'd3-tip')
  // .offset([0, 0])
  // .html(function(d) {
  //   return(`${d.state} <br> Review Score: ${d.score}% <br> Spotify Popularity ${d.popularity}%`)
  // });
});