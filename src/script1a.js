d3.csv("dataset/01-AB_n_gender_year.csv", function (dataset) {
	var dimensions = {
		width: 600,
		height: 220,
		margin: {
			top: 20,
			bottom: 20,
			right: 20,
			left: 50
		}
	}

	var svg = d3.select("#LineCt1a")
		.attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
		.attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)

	var xAccessor = d => +d.Year
	var selected_yAccessor = d => +d.n_authors

	var xScale = d3.scaleLinear()
		.domain(d3.extent(dataset, xAccessor))
		.range([dimensions.margin.left, dimensions.width + dimensions.margin.left])

	var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, selected_yAccessor))
		.range([dimensions.height, 0])

	const male = dataset.filter(d => { return d.AuthorGender == 'Male' && d.Group == 'All authors' });
	const female = dataset.filter(d => { return d.AuthorGender == 'Female' && d.Group == 'All authors' });
	const unknown = dataset.filter(d => { return d.AuthorGender == 'Unknown' && d.Group == 'All authors' });

	var line = d3.line()
		.x(d => xScale(xAccessor(d)))
		.y(d => yScale(selected_yAccessor(d)))
		.curve(d3.curveMonotoneX)

	var MaleCurve = svg.append("path")
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
		.selectAll("text")
                   .style("text-anchor", "end")
                   .attr("dx", "-.8em")
                   .attr("dy", ".10em")
                   .attr("transform", "rotate(-65)");


	var yAxis = svg.append("g")
		.call(yAxisgen)
		.style("transform", `translateX(${dimensions.margin.left}px)`)
	

    conf = ['Male', 'Female', 'Unknown']
	color = ['yellow', 'red', 'blue']

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

	 selected_yAccessor = d => +d.percent*100

	document.getElementById("Number").addEventListener("click", function(){
		selected_yAccessor = d => +d.n_authors
		yAxisgen.scale(yScale)

        yAxis.transition()
                     .call(yAxisgen)

		
		line.y(d => yScale(selected_yAccessor(d)))

		MaleCurve.transition().attr("d", line)
		FemaleCurve.transition().attr("d", line)
		UnknownCurve.transition().attr("d", line)

	})

	document.getElementById("Percent").addEventListener("click", function(){
		selected_yAccessor = d => +d.percent*100
		
		var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, selected_yAccessor))
		.range([dimensions.height, 0])

        yAxisgen.scale(yScale)

        yAxis.transition()
                     .call(yAxisgen)

		line.y(d => yScale(selected_yAccessor(d)))

		MaleCurve.transition().attr("d", line)
		FemaleCurve.transition().attr("d", line)
		UnknownCurve.transition().attr("d", line)
	})

	document.getElementById("1990").addEventListener("click", function(){
		dataset = dataset.filter(d => { return +d.Year >= +1990 && +d.Year <= +2000 })
		var xScale = d3.scaleLinear()
		.domain(d3.extent(dataset, xAccessor))
		.range([dimensions.margin.left, dimensions.width + dimensions.margin.left])

		var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, selected_yAccessor))
		.range([dimensions.height, 0])

        yAxisgen.scale(yScale)

        yAxis.transition()
                     .call(yAxisgen)

		xAxis.transition()
                     .call(xAxisgen)

		line.x(d => xScale(xAccessor(d)))
		.y(d => yScale(selected_yAccessor(d)))

		MaleCurve.transition().attr("d", line)
		FemaleCurve.transition().attr("d", line)
		UnknownCurve.transition().attr("d", line)
	})
})