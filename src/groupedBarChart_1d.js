

d3.csv('dataset/1d.csv', function (data) {
    console.log("Before", data)
    fromYear = document.getElementById('fromYear1d').value
    toYear = document.getElementById('toYear1d').value
    data = data.filter(d => { return +d.Year >= +fromYear && +d.Year <= +toYear })

    infovischkbox = document.getElementById("infovischkbox").checked
    vastchkbox = document.getElementById("vastchkbox").checked
    vischkbox = document.getElementById("vischkbox").checked
    scivischkbox = document.getElementById("scivischkbk").checked

    console.log("infovischkbox", document.getElementById("infovischkbox").checked)

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

    if (document.getElementById("svg1d") != null) {
        document.getElementById("gpBc1d").removeChild(document.getElementById("svg1d"))
    }

    var container = d3.select('#gpBc1d'),
        width = 600,
        height = 650,
        margin = { top: 250, right: 20, bottom: 30, left: 50 },
        barPadding = 0,
        axisTicks = { qty: 5, outerSize: 0, dateFormat: '%m-%d' };


    var svg = container
        .append("svg")
        .attr("id", "svg1d")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0)//.tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale)//.ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
    //console.log(xScale0.bandwidth())
    xScale0.domain(confYearDict.map(d => d.Year));
    xScale1.domain(['Vis', 'InfoVis', 'VAST', 'SciVis']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, 40]);

    mouseoverSciVis = function (d) {
        populatePubInfo("SciVis", d.Year)
        document.getElementById("confChoosen").innerHTML = "The choosen conference is <b>SciVis</b> and the year is <b>" + d.Year +
            "</b> and the percentage of female is <b>" + d.SciVis.toFixed(2) + "</b>"
        d3.select(this).attr("stroke", "black").style('stroke-width', 1)
    }

    mouseoverVAST = function (d) {
        populatePubInfo("VAST", d.Year)
        document.getElementById("confChoosen").innerHTML = "The choosen conference is <b>VAST</b> and the year is <b>" + d.Year +
            "</b> and the percentage of female is <b>" + d.VAST.toFixed(2) + "</b>"
        d3.select(this).attr("stroke", "black").style('stroke-width', 1)
    }
    mouseoverInfoVis = function (d) {
        populatePubInfo("InfoVis", d.Year)
        document.getElementById("confChoosen").innerHTML = "The choosen conference is <b>InfoVis</b> and the year is <b>" + d.Year +
            "</b> and the percentage of female is <b>" + d.InfoVis.toFixed(2) + "</b>"
        d3.select(this).attr("stroke", "black").style('stroke-width', 1)
    }
    mouseoverVis = function (d) {
        populatePubInfo("Vis", d.Year)
        document.getElementById("confChoosen").innerHTML = "The choosen conference is <b>Vis</b> and the year is <b>" + d.Year +
            "</b> and the percentage of female is <b>" + d.Vis.toFixed(2) + "</b>"
        d3.select(this).attr("stroke", "black").style('stroke-width', 1)
    }
    conf = []
    color = []

    var model_name = svg.selectAll(".Year")
        .data(confYearDict)
        .enter().append("g")
        .attr("class", "Year")
        .attr("transform", d => `translate(${xScale0(d.Year)},0)`);

    /* Add field1 bars */
    if (vischkbox) {
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
            })
            .on("mouseover", mouseoverVis)
            .on("mouseout", function (d) { d3.select(this).attr("stroke", "").style('stroke-width', 0) })

        conf.push("Vis")
        color.push("yellow")
    }

    /* Add field2 bars */
    if (infovischkbox) {
        model_name.selectAll(".bar.InfoVis")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar InfoVis")
            .attr("id", "infovisbar")
            .style("fill", "red")
            .attr("x", d => xScale1('InfoVis'))
            .attr("y", d => yScale(d.InfoVis))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
                return height - margin.top - margin.bottom - yScale(d.InfoVis)
            })
            .on("mouseover", mouseoverInfoVis)
            .on("mouseout", function (d) { d3.select(this).attr("stroke", "").style('stroke-width', 0) })

        conf.push("InfoVis")
        color.push("red")
    }
    if (vastchkbox) {
        model_name.selectAll(".bar.VAST")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar VAST")
            .attr("id", "vastbar")
            .style("fill", "green")
            .attr("x", d => xScale1('VAST'))
            .attr("y", d => yScale(d.VAST))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
                return height - margin.top - margin.bottom - yScale(d.VAST)
            })
            .on("mouseover", mouseoverVAST)
            .on("mouseout", function (d) { d3.select(this).attr("stroke", "").style('stroke-width', 0) })

        conf.push("VAST")
        color.push("green")

    }

    if (scivischkbox) {
        model_name.selectAll(".bar.SciVis")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar SciVis")
            .attr("id", "scivisbar")
            .style("fill", "blue")
            .attr("x", d => xScale1('SciVis'))
            .attr("y", d => yScale(d.SciVis))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
                return height - margin.top - margin.bottom - yScale(d.SciVis)
            })
            .on("mouseover", mouseoverSciVis)
            .on("mouseout", function (d) { d3.select(this).attr("stroke", "").style('stroke-width', 0) })

        conf.push("SciVis")
        color.push("blue")
    }


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

    pubCiteSortOrder = "asc"
    var groupedPubAndMainData = []
    function sortByPubCitationAsc() {
        console.log("asc")
        document.getElementById("pubAsc").checked = true
        groupedPubAndMainData.sort(function (a, b) { return a.pubCited - b.pubCited })
        createTableElemets()

    }
    function sortByPubCitationDesc() {
        document.getElementById("pubDesc").checked = true
        groupedPubAndMainData.sort(function (a, b) { return b.pubCited - a.pubCited })
        createTableElemets()

    }



    function createTableElemets() {


        firstAuth = groupedPubAndMainData.filter(d => { return d.authorOrderRank == 'First' })
        middleAuth = groupedPubAndMainData.filter(d => { return d.authorOrderRank == 'Middle' })
        lastAuth = groupedPubAndMainData.filter(d => { return d.authorOrderRank == 'Last' })
        console.log("firstAuth", firstAuth)
        displayPieDistribution(firstAuth.length, middleAuth.length, lastAuth.length)

        document.getElementById("sortByPub").style.display = 'block'
        document.getElementById("pubAuthInfo").style.display = 'block'
        document.getElementById("confChoosen").style.display = 'block'
        document.getElementById("pubAsc").onclick = sortByPubCitationAsc
        document.getElementById("pubDesc").onclick = sortByPubCitationDesc
        document.getElementById("pubInfoHead").innerHTML = ''
        document.getElementById("pubInfoBody").innerHTML = ''
        headerRow = document.createElement("tr")
        headers1 = document.createElement("th")
        headers1.innerHTML = "Authors"
        headers2 = document.createElement("th")
        headers2.innerHTML = "AuthorOrderRank <em style='color:red'> Click Me </em>"
        headers2.onclick = function (d) {
            alert("Author Order Rank Distribution:\nFirst : " + firstAuth.length + "\nMiddle : " + middleAuth.length + "\nLast: " + lastAuth.length)

        }
        headers3 = document.createElement("th")
        headers3.innerHTML = "Paper Title"
        headers4 = document.createElement("th")
        headers4.innerHTML = 'Publication Citation'
        //headers4.addEventListener("click", sortByPubCitation)
        headers5 = document.createElement("th")
        headers5.innerHTML = "Link"
        //header6 = document.createElement("th")
        //header6.innerHTML = 'Career Age'

        headerRow.appendChild(headers1)
        headerRow.appendChild(headers2)
        //headerRow.appendChild(header6)
        headerRow.appendChild(headers3)
        headerRow.appendChild(headers4)
        headerRow.appendChild(headers5)
        document.getElementById("pubInfoBody").appendChild(headerRow)

        for (var i in groupedPubAndMainData) {
            row = document.createElement("tr")
            col1 = document.createElement("td")
            col1.innerHTML = groupedPubAndMainData[i].author
            col2 = document.createElement("td")
            col2.innerHTML = groupedPubAndMainData[i].authorOrderRank
            col3 = document.createElement("td")
            col3.innerHTML = groupedPubAndMainData[i].title
            col4 = document.createElement("td")
            col4.innerHTML = groupedPubAndMainData[i].pubCited
            col5 = document.createElement("td")
            col5a = document.createElement("a")
            col5a.setAttribute("target", "_blank")
            col5a.setAttribute("href", groupedPubAndMainData[i].link)
            col5a.innerHTML = groupedPubAndMainData[i].link
            col5.appendChild(col5a)

            //col6 = document.createElement("td")
            //col6.innerHTML = groupedPubAndMainData[i].careerAge

            //col5.innerHTML = groupedPubAndMainData[i].link

            row.appendChild(col1)
            row.appendChild(col2)
            //row.appendChild(col6)
            row.appendChild(col3)
            row.appendChild(col4)
            row.appendChild(col5)
            document.getElementById("pubInfoBody").appendChild(row)
        }
    }

    populatePubInfo = function (confName, year) {
        d3.csv('dataset/author_gender_info.csv', function (publicationData) {
            pubDataByConfAndYear = publicationData.filter(d => { return d.Conference == confName && +d.Year == year &&
                                                        d.Gender=='female' })
            d3.csv('dataset/IEEEVISpapers1990-2020-Maindataset.csv', function (mainData) {
                mainDataByConfYear = mainData.filter(d => { return +d.Year == year && d.Conference == confName })
                groupedPubAndMainData = []
                for (var i in pubDataByConfAndYear) {
                    for (var j in mainDataByConfYear) {
                        if (pubDataByConfAndYear[i].Author.toUpperCase().includes(mainDataByConfYear[j].AuthorNames.toUpperCase()) ||
                            mainDataByConfYear[j].AuthorNames.toUpperCase().includes(pubDataByConfAndYear[i].Author.toUpperCase())) {

                            obj = {
                                "author": pubDataByConfAndYear[i].Author,
                                "authorOrderRank": pubDataByConfAndYear[i].AuthorOrderRank,
                                "title": mainDataByConfYear[j].Title,
                                "pubCited": +mainDataByConfYear[j].PubsCited,
                                "link": mainDataByConfYear[j].Link,
                                "careerAge": pubDataByConfAndYear[i].CareerAge
                            }
                            groupedPubAndMainData.push(obj)
                        }
                    }
                }
                sortByPubCitationAsc()
            })

        })
    }

    function displayPieDistribution(first, middle, last) {

        document.getElementById("pieDiv").setAttribute("style", 'display:inline-block; width: 400px; height: 400px')

        totalAuthPos = first + middle + last
        firstPer = first / totalAuthPos * 100
        middlePer = middle / totalAuthPos * 100
        lastPer = last / totalAuthPos * 100

        console.log(totalAuthPos, firstPer, middlePer, lastPer)

        // Step 3
        var svg = d3.select("#pie"),
            piewidth = 400,
            pieheight = 500,
            pieradius = 150;


        var data = []
        color = []
        // Step 1    
        if (first != 0) {
            data.push({ name: "First", share: firstPer })
            color.push('#ffd384')
        }
        if (middle != 0) {
            data.push({ name: "Middle", share: middlePer })
            color.push('#94ebcd')
        }
        if (last != 0) {
            data.push({ name: "Last", share: lastPer })
            color.push('#fbaccc')
        }

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
            .style("font-size", 15);

    }


})
