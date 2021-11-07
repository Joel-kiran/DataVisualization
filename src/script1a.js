d3.csv("dataset/01-AB_n_gender_year.csv", function(dataset){
	var dimensions = {
	   width: 500,
	   height: 500,
	   margin: {
		   top: 10,
		   bottom: 20,
		   right: 10,
		   left: 50
	   }
   }
   var svg = d3.select("#LineCt1a")
			   .attr("width", dimensions.width)
			   .attr("height", dimensions.height);
   
   var xAccessor=d=>d.Year
   var yAccessor=d=>+d.n_authors
   
   var xScale=d3.scaleLinear()
				 .domain(d3.extent(dataset,xAccessor))
				 .range([dimensions.margin.left,dimensions.width - dimensions.margin.right])
				 
   var yScale=d3.scaleLinear()
				 .domain(d3.extent(dataset,yAccessor))
				 .range([dimensions.width - dimensions.margin.right,dimensions.margin.left])
   
   const male = dataset.filter(d => { return d.AuthorGender == 'Male' && d.Group=='All authors'});
   const female = dataset.filter(d => {return d.AuthorGender == 'Female' && d.Group=='All authors'});
   const unknown = dataset.filter(d => { return d.AuthorGender == 'Unknown' && d.Group=='All authors'});
   

   var line = d3.line()
				.x(d => xScale(xAccessor(d))) 
				.y(d => yScale(yAccessor(d))) 
				.curve(d3.curveMonotoneX)

   var MaleCurves=svg.append("path")
				 	 .datum(male) 
					 .attr("class", "line") 
					 .attr("d", line)
					 .style("fill","none" )
					 .style("stroke", "yellow")
					 .style("stroke-width", "2");
				 
   var FemaleCurve=svg.append("path")
					  .datum(female) 
					  .attr("class", "line") 
				      .attr("d", line)
				   	  .style("fill","none" )
				      .style("stroke", "red")
				      .style("stroke-width", "2");

   var UnknownCurve=svg.append("path")
					   .datum(unknown) 
					   .attr("class", "line") 
				 	   .attr("d", line)
					   .style("fill","none" )
					   .style("stroke", "blue")
					   .style("stroke-width", "2");

   var xAxisgen = d3.axisBottom().scale(xScale)
   var yAxisgen = d3.axisLeft().scale(yScale)
   
   
   var xAxis = svg.append("g")
				  .call(xAxisgen)
				  .style("transform",`translateY(${dimensions.height - dimensions.margin.bottom}px)`)
//				  .text("Year")
				  

   var yAxis = svg.append("g")
				  .call(yAxisgen)
				  .style("transform", `translateX(${dimensions.margin.left}px)`)
//				  .text("Number of authors")
	conf = ['Male', 'Female', 'Unknown']
	color = ['yellow', 'red', 'blue']

	var legend = svg.append('g')
					.attr('class', 'legend')
					.attr('transform', 'translate(' + (10) + ', 10)');
	
			legend.selectAll('rect')
					.data(conf)
					.enter()
					.append('rect')
					.attr('x', 0)
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
					.attr('x', 25)
					.attr('y', function (d, i) {
						return i * 28;
					})
					.attr('text-anchor', 'start')
					.attr('alignment-baseline', 'hanging');
				  
   
   console.log(dataset)
})