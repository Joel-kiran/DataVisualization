d3.csv("dataset/01-AB_n_gender_year.csv", function (dataset) {
	var dimensions = {
		width: 400,
		height: 300,
		margin: {
			top: 20,
			bottom: 20,
			right: 20,
			left: 40
		}
	}
	//console.log("script6a start")
	var svg = d3.select("#LineCt1a")
		.attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
		.attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
	//	.attr("transform",
	//		"translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")")
	//console.log("script6a goin")

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
		.attr("id", "male")
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "yellow")
		.style("stroke-width", "2")
		.on("mouseover", function (d) {
			d3.select("#male").style("stroke-width", "5")
			d3.select("#female").style("stroke-width", "1")
		})
		.on("mouseout", function (d) {
			d3.select("#male").style("stroke-width", "2")
			d3.select("#female").style("stroke-width", "2")
		})

	var FemaleCurve = svg.append("path")
		.datum(female)
		.attr("class", "line")
		.attr("id", "female")
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "red")
		.style("stroke-width", "2")
		.on("mouseover", function (d) {
			d3.select("#female").style("stroke-width", "5")
			d3.select("#male").style("stroke-width", "1")
		})
		.on("mouseout", function (d) {
			d3.select("#male").style("stroke-width", "2")
			d3.select("#female").style("stroke-width", "2")
		})

	/*var UnknownCurve = svg.append("path")
		.datum(unknown)
		.attr("class", "line")
		.attr("d", line)
		.style("fill", "none")
		.style("stroke", "blue")
		.style("stroke-width", "2");*/
	var xAxisgen = d3.axisBottom().scale(xScale)
	var yAxisgen = d3.axisLeft().scale(yScale)


	var xAxis = svg.append("g")
		.call(xAxisgen)
		.style("transform", `translateY(${dimensions.height}px)`)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".10em")
		.attr("transform", "rotate(-40)");



	var yAxis = svg.append("g")
		.call(yAxisgen)
		.style("transform", `translateX(${dimensions.margin.left}px)`)
	//				  .text("Number of authors")



	svg.append("text")
		.attr("transform", "translate(" + (dimensions.width / 2) + " ," + (dimensions.height + dimensions.margin.top + dimensions.margin.bottom) + ")")
		.style("text-anchor", "middle")
		.text("Years");


	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -5)
		.attr("x", 0 - (dimensions.height) / 2)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Number of Authors");


	conf = ['Male', 'Female']
	color = ['yellow', 'red']

	var legend = svg.append('g')
		.attr('class', 'legend')
		.attr('transform', 'translate(' + (10) + ', 10)');

	legend.selectAll('rect')
		.data(conf)
		.enter()
		.append('rect')
		.attr('x', 60)
		.attr('y', function (d, i) {
			return i * 25;
		})
		.attr('width', 12)
		.attr('height', 12)
		.attr('fill', function (d, i) {
			return color[i];
		});

	legend.selectAll('text')
		.data(conf)
		.enter()
		.append('text')
		.text(function (d) {
			return d;
		})
		.attr('x', 80)
		.attr('y', function (d, i) {
			return i * 28;
		})
		.attr('text-anchor', 'start')
		.attr('alignment-baseline', 'hanging');

	console.log(dataset)

	document.getElementById("male").addEventListener("click", function () {
		console.log("male clicked")
		DisplayBarchart('Male')
	})
	document.getElementById("female").addEventListener("click", function () {
		console.log("female clicked")
		DisplayBarchart('Female')
	})
})

