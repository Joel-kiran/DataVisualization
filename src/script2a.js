d3.csv("dataset/02-A_career_author.csv", function (dataset) {
	var dimensions = {
		width: 500,
		height: 350,
		margin: {
			top: 20,
			bottom: 20,
			right: 20,
			left: 50
		}
	}
	var svg = d3.select("#LineCt2a")
		.attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
		.attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom);

	var xAccessor = d => +d.CareerAge
	var yAccessor = d => +d.count

	var xScale = d3.scaleLinear()
		.domain(d3.extent(dataset, xAccessor))
		.range([dimensions.margin.left, dimensions.width + dimensions.margin.left])

	var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, yAccessor))
		.range([dimensions.height, 0])


	const male = dataset.filter(d => d.AuthorGender == 'Male');
	const female = dataset.filter(d => d.AuthorGender == 'Female');

	var line = d3.line()
		.x(d => xScale(xAccessor(d)))
		.y(d => yScale(yAccessor(d)))
		.curve(d3.curveMonotoneX)

	var MaleCurves = svg.append("path")
		.datum(male)
		.attr("class", "line")
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "yellow")
		.style("stroke-width", "2");

	var FemaleCurve = svg.append("path")
		.datum(female)
		.attr("class", "line")
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "red")
		.style("stroke-width", "2");

	var xAxisgen = d3.axisBottom().scale(xScale)
	var yAxisgen = d3.axisLeft().scale(yScale)


	var xAxis = svg.append("g")
		.call(xAxisgen)
		.style("transform", `translateY(${dimensions.height}px)`)
	//			   .text("Year")


	var yAxis = svg.append("g")
		.call(yAxisgen)
		.style("transform", `translateX(${dimensions.margin.left}px)`)
	//			   .text("Count")


	console.log(dataset)
})