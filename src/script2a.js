d3.csv("dataset/02-A_career_author.csv", function (dataset) {
	var dimensions = {
		width: 400,
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
		.attr("id", "maleline")
		.style("fill", "none")
		.style("stroke", "yellow")
		.style("stroke-width", "2")
		.attr("cursor", "pointer")
		.on('click', function (d) {
			displayAgeData(d[0].AuthorGender)
		})
		.on("mouseover", function (d) {
			d3.select("#maleline").style("stroke-width", "5")
			d3.select("#femaleline").style("stroke-width", "1")
		})
		.on("mouseout", function (d) {
			d3.select("#maleline").style("stroke-width", "2")
			d3.select("#femaleline").style("stroke-width", "2")
		})
		.on("click", function(){
			displayAgeData("Male")
		})

	console.log("Ima in 2a")
	var FemaleCurve = svg.append("path")
		.datum(female)
		.attr("class", "line")
		.attr("d", line)
		.attr("id", "femaleline")
		.style("fill", "none")
		.style("stroke", "red")
		.style("stroke-width", "2")
		.attr("cursor", "pointer")
		.on('click', function (d) {
			displayAgeData(d[0].AuthorGender)
		})
		.on("mouseover", function (d) {
			d3.select("#femaleline").style("stroke-width", "5")
			d3.select("#maleline").style("stroke-width", "1")
		})
		.on("mouseout", function (d) {
			d3.select("#maleline").style("stroke-width", "2")
			d3.select("#femaleline").style("stroke-width", "2")
		})
		.on("click", function(){
			displayAgeData("Female")
		})




	var xAxisgen = d3.axisBottom().scale(xScale)
	var yAxisgen = d3.axisLeft().scale(yScale)


	var xAxis = svg.append("g")
		.call(xAxisgen)
		.style("transform", `translateY(${dimensions.height}px)`)


	var yAxis = svg.append("g")
		.call(yAxisgen)
		.style("transform", `translateX(${dimensions.margin.left}px)`)

		svg.append("text")
		.attr("transform", "translate(" + (dimensions.width / 2) + " ," + (dimensions.height + dimensions.margin.top + dimensions.margin.bottom-5) + ")")
		.style("text-anchor", "middle")
		.text("Career Age");


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


	function displayAgeData(gender) {
		d3.csv('dataset/author_gender_info.csv', function (dataset) {
			// Step 3

			document.getElementById("confPieText").innerHTML="The Distribution of <b>"+gender+"</b> by Conference"
			var svg = d3.select("#confpie"),
				piewidth = 300,
				pieheight = 400,
				pieradius = 150;

			sciConf = dataset.filter(d => {
				return (d.Gender ? d.Gender.toUpperCase() == gender.toUpperCase() : false) &&
					d.Conference == "SciVis"
			})
			visConf = dataset.filter(d => {
				return (d.Gender ? d.Gender.toUpperCase() == gender.toUpperCase() : false) &&
					d.Conference == "Vis"
			})

			vastConf = dataset.filter(d => {
				return (d.Gender ? d.Gender.toUpperCase() == gender.toUpperCase() : false) &&
					d.Conference == "VAST"
			})
			infoVisConf = dataset.filter(d => {
				return (d.Gender ? d.Gender.toUpperCase() == gender.toUpperCase() : false) &&
					d.Conference == "InfoVis"
			})


			var data = []
			var color = ['']
			// Step 1   
			total = sciConf.length + visConf.length + vastConf.length + infoVisConf.length
			console.log("total", total)

			if (sciConf.length > 0) {
				data.push({ name: "SciVis", share: (sciConf.length / total) * 100 })
				color.push('blue')
			}
			if (visConf.length > 0) {
				data.push({ name: "Vis", share: (visConf.length / total) * 100 })
				color.push('orange')
			}
			if (vastConf.length > 0) {
				data.push({ name: "VAST", share: (vastConf.length / total) * 100 })
				color.push('green')
			}
			if (infoVisConf.length > 0) {
				data.push({ name: "InfoVis", share: (infoVisConf.length / total) * 100 })
				color.push('magenta')
			}
			console.log("color", color, data)

			//console.log("width", piewidth/2,pieheight )
			var g = svg.append("g")
				.attr("transform", "translate(" + piewidth / 2 + "," + pieheight / 2 + ")");

			// Step 4
			var ordScale = d3.scaleOrdinal()
				.domain(data)
				.range(color);

			// Step 5
			var pie = d3.pie().value(function (d) {
				return d.share;
			});

			var arc = g.selectAll("arc")
				.data(pie(data))
				.enter();

			// Step 6
			var path = d3.arc()
				.outerRadius(pieradius)
				.innerRadius(0);

			arc.append("path")
				.attr("d", path)
				.attr("fill", function (d) { return ordScale(d.data.name); });

			// Step 7
			var label = d3.arc()
				.outerRadius(pieradius)
				.innerRadius(0);

			arc.append("text")
				.attr("transform", function (d) {
					return "translate(" + label.centroid(d) + ")";
				})
				.text(function (d) { return d.data.name; })
				.style("font-family", "arial")
				.style("font-size", 12);


		})
	}
	displayAgeData("Male")



})