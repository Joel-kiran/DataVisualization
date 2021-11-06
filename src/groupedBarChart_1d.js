

d3.csv('dataset/1d.csv', function (data) {
    var year = {}
    data.forEach(function (d) {
        if (d.AuthorGender == 'Female') {
            if (d.Year in year) {
                year[d.Year][d.Conference] = d.percent * 100
            } else {
                year[d.Year] = {}
                year[d.Year][d.Conference] = d.percent * 100
            }
        }
    })
    //console.log(year)

    var confYearDict = []

    for (var key in year) {
        var temp = {}
        temp['Year'] = key
        if ('Vis' in year[key]) {
            temp['Vis'] = +year[key]['Vis']
        } else {
            temp['Vis'] = 0
        }
        if ('InfoVis' in year[key]) {
            temp['InfoVis'] = +year[key]['InfoVis']
        } else {
            temp['InfoVis'] = 0
        }
        if ('VAST' in year[key]) {
            temp['VAST'] = +year[key]['VAST']
        } else {
            temp['VAST'] = 0
        }
        if ('SciVis' in year[key]) {
            temp['SciVis'] = +year[key]['SciVis']
        } else {
            temp['SciVis'] = 0
        }
        confYearDict.push(temp)
    }
    console.log(confYearDict)

    var container = d3.select('#gpBc1d'),
        width = 600,
        height = 400,
        margin = { top: 30, right: 20, bottom: 30, left: 50 },
        barPadding = .2,
        axisTicks = { qty: 5, outerSize: 0, dateFormat: '%m-%d' };

    var svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0)//.tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale)//.ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
    console.log(xScale0.bandwidth())
    xScale0.domain(confYearDict.map(d => d.Year));
    xScale1.domain(['Vis', 'InfoVis', 'VAST', 'SciVis']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, 40]);

    var model_name = svg.selectAll(".Year")
        .data(confYearDict)
        .enter().append("g")
        .attr("class", "Year")
        .attr("transform", d => `translate(${xScale0(d.Year)},0)`);

    /* Add field1 bars */
    model_name.selectAll(".bar.Vis")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar Vis")
        .style("fill", "yellow")
        .attr("x", d => xScale1('Vis'))
        .attr("y", d => yScale(d.Vis))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.Vis)
        });

    /* Add field2 bars */
    model_name.selectAll(".bar.InfoVis")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar InfoVis")
        .style("fill", "red")
        .attr("x", d => xScale1('InfoVis'))
        .attr("y", d => yScale(d.InfoVis))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.InfoVis)
        });

    model_name.selectAll(".bar.VAST")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar VAST")
        .style("fill", "green")
        .attr("x", d => xScale1('VAST'))
        .attr("y", d => yScale(d.VAST))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.VAST)
        });

    model_name.selectAll(".bar.SciVis")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar SciVis")
        .style("fill", "blue")
        .attr("x", d => xScale1('SciVis'))
        .attr("y", d => yScale(d.SciVis))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.SciVis)
        });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".10em")
        .attr("transform", "rotate(-65)");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    conf = ['Vis', 'InfoVis', 'VAST', 'SciVis']
    color = ['yellow', 'red', 'green', 'blue']
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

})
