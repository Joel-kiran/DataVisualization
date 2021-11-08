// set the dimensions and margins of the graph
var margin = { top: 80, right: 25, bottom: 30, left: 40 },
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#collaboration_actual")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var male = [0, 1, 2, 3, 4, 5, 6]
var female = [0, 1, 2, 3, 4, 5, 6]

// Build X scales and axis:
var x = d3.scaleBand()
  .range([0, width])
  .domain(male)
  .padding(0.01);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

  svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("#male authors");

// Build y scales and axis:
var y = d3.scaleBand()
  .range([height, 0])
  .domain(female)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y));

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("#female authors");

// Build color scale
var myColor = d3.scaleLinear()
  .range(["white", "#69b3a2"])
  .domain([1, 100])

//Read the data
d3.csv("dataset/6_coll_actual_count.csv", function (data) {
  console.log(data)
  // create a tooltip
  var tooltip = d3.select("#collaboration_actual")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

     // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>this cell is: " + d.real_count)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
  }

  // add the squares
  svg.selectAll()
    .data(data, function (d) { return 1; })
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.n_male) })
    .attr("y", function (d) { return y(d.n_female) })
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) { return myColor(+d.real_count) })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)


     // Add title to graph
svg.append("text")
.attr("x", 70)
.attr("y", -50)
.attr("text-anchor", "left")
.style("font-size", "30px")
.text("A Heatmap Graph");

// Add subtitle to graph
svg.append("text")
.attr("x", 90)
.attr("y", -20)
.attr("text-anchor", "left")
.style("font-size", "22px")
.style("fill", "black")
.style("max-width", 400)
.text("Actual paper counts");

})

