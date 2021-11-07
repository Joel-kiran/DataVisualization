d3.csv("dataset/07-AB_conference_count.csv",function(dataset){
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
	var svg = d3.select("#LineCt6c")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height);
	
	var xAccessor=d=>+d.Year
	var yAccessor=d=>+d.count
	
	var xScale=d3.scaleLinear()
                  .domain(d3.extent(dataset,xAccessor))
                  .range([dimensions.margin.left,dimensions.width - dimensions.margin.right])
				  
	var yScale=d3.scaleLinear()
                  .domain(d3.extent(dataset,yAccessor))
                  .range([dimensions.width - dimensions.margin.right,dimensions.margin.left])
	
	
	const male = dataset.filter(d => { return d.AuthorGender == 'Male' && d.Group=='Committee'});
	const female = dataset.filter(d => {return d.AuthorGender == 'Female' && d.Group=='Committee'});
	const unknown = dataset.filter(d => { return d.AuthorGender == 'Unknown' && d.Group=='Committee'});
	
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
				   

    var yAxis = svg.append("g")
                   .call(yAxisgen)
                   .style("transform", `translateX(${dimensions.margin.left}px)`)
				   
	
    console.log(dataset)
})