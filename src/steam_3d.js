
  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#steam")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.csv("dataset/3d.csv", function (data) {


    var careerAge = {}
    data.forEach(function (d) {
      if (d.x in careerAge) {
        careerAge[d.x][d.group] = d.y
      } else {
        careerAge[d.x] = {}
        careerAge[d.x][d.group] = d.y
      }
    })
    //console.log(careerAge)


    var careerAgeDropOut = []

    for (var key in careerAge) {
      var temp = {}
      temp['careerAge'] = +key
      if ('Male' in careerAge[key]) {
        temp['Male'] = (+careerAge[key]['Male']) * 100
      } else {
        temp['Male'] = 0
      }
      if ('Female' in careerAge[key]) {
        temp['Female'] = (+careerAge[key]['Female']) * 100
      } else {
        temp['Female'] = 0
      }
      careerAgeDropOut.push(temp)
    }
    //console.log(careerAgeDropOut)
    keys = ['Male', 'Female']
    // List of groups = header of the csv files
    //var keys = data.columns.slice(1)
    //console.log(keys)

    // Add X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(careerAgeDropOut, function (d) { return d.careerAge; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-25, 25])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // color palette
    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(['#e41a1c', '#377eb8'])

    //stack the data?
    var stackedData = d3.stack()
      .offset(d3.stackOffsetSilhouette)
      .keys(keys)
      (careerAgeDropOut)

    // Show the areas
    svg
      .selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .style("fill", function (d) { return color(d.key); })
      .attr("d", d3.area()
        .x(function (d, i) { return x(d.data.careerAge); })
        .y0(function (d) { return y(d[0]); })
        .y1(function (d) { return y(d[1]); })
      )

    var legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(' + (10) + ', 10)');

    legend.selectAll('rect')
      .data(keys)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', function (d, i) {
        return i * 25;
      })
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', function (d, i) {
        return color(d);
      });

    legend.selectAll('text')
      .data(keys)
      .enter()
      .append('text')
      .text(function (d) {
        return d;
      })
      .attr('x', 25)
      .attr('y', function (d, i) {
        return i * 28;
      })
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'hanging');


  })
