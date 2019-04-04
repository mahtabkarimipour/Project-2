d3.json("/reviewsbyyear").then(infos => {
  var data = [
    {
      x: infos.years,
      y: infos.counts,
      type: "scatter"
    }
  ];
  var layout = {
    title: "Review Counts By Year All Genres"
  }
  Plotly.newPlot("reviewsbyyear", data, layout);
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
    title: "Average Score of Album Reviews All Genres, Annual Averages"
  }
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
