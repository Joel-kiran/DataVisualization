d3.csv('dataset/IEEEVISpapers1990-2020-Maindataset.csv', function (data) {

    fromYearForce = document.getElementById("fromYearForce").value
    toYearForce = document.getElementById("toYearForce").value

    scivisconf = data.filter(d=>d.Conference=="SciVis")
    infovis = data.filter(d=>d.Conference=="InfoVis")
    vis = data.filter(d=>d.Conference=="Vis")
    vast = data.filter(d=>d.Conference=="VAST")

    scivisconf.sort(function(a,b){return b.PubsCited-a.PubsCited})
    infovis.sort(function(a,b){return b.PubsCited-a.PubsCited})
    vis.sort(function(a,b){return b.PubsCited-a.PubsCited})
    vast.sort(function(a,b){return b.PubsCited-a.PubsCited})
    
    scivisconf=scivisconf.slice(0,250)
    infovis=infovis.slice(0,250)
    vis=vis.slice(0,250)
    vast=vast.slice(0,250)

    data= scivisconf.concat(infovis, vis, vast);
    data = data.sort((a, b) => 1 - Math.random())

    data=data.filter(d=>(d.Year >=fromYearForce) && (d.Year <= toYearForce) )
    console.log("data", data)

    width = 1400
    height = 500
    var svg = d3.select("#allPapers")
        .style("width", width)
        .style("height", height)

    var layout = d3.forceSimulation(data)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collisions', d3.forceCollide(12))
        //.force('charge', d3.forceManyBody().strength(-25))
        .on('tick', ticked)

    var node = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", d => {
            if (d.Conference == 'Vis') return "orange"
            else if (d.Conference == 'InfoVis') return "magenta"
            else if (d.Conference == "VAST") return "green"
            else if (d.Conference == "SciVis") return "blue"
        })
        .attr("r", d => d.PubsCited / 6)
        .on("mouseover", d=>{
            document.getElementById("paperIfno").style.visibility="visible"
            document.getElementById("paperIfno").innerHTML="PublicationCitation: <b>"+d.PubsCited+"</b>, PaperTitle: <b>"
                + d.Title+"</b>"
        })
        .on("mouseout", d=>{
            document.getElementById("paperIfno").style.visibility="hidden"
            //document.getElementById("paperIfno").innerHTML=""
        })


    function ticked() {
        svg.selectAll("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
    }
})