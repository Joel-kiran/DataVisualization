d3.csv("dataset/01-AB_n_gender_year.csv").then(function(dataset){
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
                .style("width", dimensions.width)
                .style("height", dimensions.height);
	
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
	
//	 var legend = svg.append('g')
//					 .attr('class', 'legend')
//                     .attr('transform', 'translate(' + (10) + ', 10)');
	
	
//	var color=			{if (d=>d.AuthorGender)return yellow
//														else if(d=>d.AuthorGender)return blue
//														else return purple}
/*    var dots=svg.selectAll("dot")
				.data(dataset)
				.enter()
				.append("circle")
				.attr("cx", d => xScale(xAccessor(d)) )
				.attr("cy", d => yScale(yAccessor(d)) )
				.attr("r", 2)
				.style("fill", );
*/
	var line = d3.line()
				 .x(d => xScale(xAccessor(d))) 
				 .y(d => yScale(yAccessor(d))) 
				 .curve(d3.curveMonotoneX)
//				 .style("stroke-dasharray", ("3,3"))

//	if d=>d.Group=='All authors'{	
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
				   

    var yAxis = svg.append("g")
                   .call(yAxisgen)
                   .style("transform", `translateX(${dimensions.margin.left}px)`)
				   
	
    console.log(dataset)
})