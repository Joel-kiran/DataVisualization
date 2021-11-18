

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
    //console.log(confYearDict)

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

    mouseoverSciVis = function(d) {
        populatePubInfo("SciVis", d.Year)
    }

    mouseoverVAST = function(d) {
        populatePubInfo("VAST", d.Year)
    }
    mouseoverInfoVis = function(d) {
        populatePubInfo("InfoVis", d.Year)
    }
    mouseoverVis = function(d) {
        populatePubInfo("Vis", d.Year)
    }

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
        .style("fill", "orange")
        .attr("x", d => xScale1('Vis'))
        .attr("y", d => yScale(d.Vis))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.Vis)
        })
        .on("mouseover", mouseoverVis)

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
        })
        .on("mouseover", mouseoverInfoVis)

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
        })
        .on("mouseover", mouseoverVAST)

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
        })
        .on("mouseover", mouseoverSciVis)


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
    color = ['orange', 'red', 'green', 'blue']
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

    populatePubInfo = function(confName, year){

        d3.csv('dataset/AuthorPublication-uptoVIS2020.csv', function(publicationData){
            //console.log("publicationData", publicationData)
            document.getElementById("pubInfoHead").innerHTML=''
            document.getElementById("pubInfoBody").innerHTML=''
            headerRow=document.createElement("tr")
            headers1 = document.createElement("th")
            headers1.innerHTML = "Authors"
            headers2 = document.createElement("th")
            headers2.innerHTML = "AuthorOrderRank"
            headers3 = document.createElement("th")
            headers3.innerHTML = "Paper Title"
            headers4 = document.createElement("th")
            headers4.innerHTML = "Publication Citation"
            headers5 = document.createElement("th")
            headers5.innerHTML = "Link"
            headerRow.appendChild(headers1)
            headerRow.appendChild(headers2)
            headerRow.appendChild(headers3)
            headerRow.appendChild(headers4)
            headerRow.appendChild(headers5)
            document.getElementById("pubInfoBody").appendChild(headerRow)
            //console.log(confName, year)
            pubDataByConfAndYear = publicationData.filter(d=>{return d.Conference==confName && +d.Year==year})

            d3.csv('dataset/IEEEVISpapers1990-2020-Maindataset.csv', function(mainData){


                mainDataByConfYear = mainData.filter(d=>{return +d.Year==year && d.Conference==confName})

                console.log(" main data",mainDataByConfYear)

                for (var i in pubDataByConfAndYear){
                    for (var j in mainDataByConfYear){
                        if (pubDataByConfAndYear[i].Author.toUpperCase().includes(mainDataByConfYear[j].AuthorNames.toUpperCase()) ||
                            mainDataByConfYear[j].AuthorNames.toUpperCase().includes(pubDataByConfAndYear[i].Author.toUpperCase())){
                            row= document.createElement("tr")
                            col1=document.createElement("td")
                            col1.innerHTML=pubDataByConfAndYear[i].Author
                            col2= document.createElement("td")
                            col2.innerHTML=pubDataByConfAndYear[i].AuthorOrderRank
                            col3=document.createElement("td")
                            col3.innerHTML= mainDataByConfYear[j].Title
                            col4=document.createElement("td")
                            col4.innerHTML= mainDataByConfYear[j].PubsCited
                            col5=document.createElement("td")
                            col5.innerHTML= mainDataByConfYear[j].Link
                            row.appendChild(col1)
                            row.appendChild(col2)
                            row.appendChild(col3)
                            row.appendChild(col4)
                            row.appendChild(col5)
                            document.getElementById("pubInfoBody").appendChild(row)
                            console.log("inised")
                        }

                    }
                }
            })


            //console.log("pubdata",pubDataByConfAndYear )


        })
    }



})
