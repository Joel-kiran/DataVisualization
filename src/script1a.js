d3.csv("dataset/01-AB_n_gender_year.csv", function (dataset) {
	var dimensions = {
		width: 500,
		height: 220,
		margin: {
			top: 20,
			bottom: 20,
			right: 20,
			left: 60
		}
	}
	console.log("script6a start")
	var svg = d3.select("#LineCt1a")
		.attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
		.attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
		.attr("transform",
			"translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")")
	console.log("script6a goin")

	var xAccessor = d => +d.Year
	var yAccessor = d => +d.n_authors

	var xScale = d3.scaleLinear()
		.domain(d3.extent(dataset, xAccessor))
		.range([dimensions.margin.left, dimensions.width + dimensions.margin.left])

	var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, yAccessor))
		.range([dimensions.height, 0])

	const male = dataset.filter(d => { return d.AuthorGender == 'Male' && d.Group == 'All authors' });
	const female = dataset.filter(d => { return d.AuthorGender == 'Female' && d.Group == 'All authors' });
	const unknown = dataset.filter(d => { return d.AuthorGender == 'Unknown' && d.Group == 'All authors' });


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

	var UnknownCurve = svg.append("path")
		.datum(unknown)
		.attr("class", "line")
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "blue")
		.style("stroke-width", "2");
	var xAxisgen = d3.axisBottom().scale(xScale)
	var yAxisgen = d3.axisLeft().scale(yScale)


	var xAxis = svg.append("g")
		.call(xAxisgen)
		.style("transform", `translateY(${dimensions.height}px)`)
	//				  .text("Year")


	var yAxis = svg.append("g")
		.call(yAxisgen)
		.style("transform", `translateX(${dimensions.margin.left}px)`)
	//				  .text("Number of authors")


	console.log(dataset)
})