const svg = d3.select(".responsive-svg-container")
                .append("svg")
                .attr("viewBox", "0 0 600 500")
                .style("border", "1px solid black");

d3.csv("data/gb_medals_dataset.csv", d3.autoType).then(data => {
    console.log(data);
    gb_medal_linechart(data);
});

const gb_medal_linechart = (data) => {
    const width = 600;
    const height = 500;
    const margin = {top:60, bottom:50, left:40, right:60};

    const innerHeight = height - margin.top -margin.bottom;
    const innerWidth = width - margin.left - margin.right;


    const innerChart = d3.select("svg")
                        .append("g")
                        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const xScale = d3.scaleBand()
                .domain(data.map(d=> d.Year))
                //.domain([2000, 2024])
                .range([0, innerWidth])
                ;

    const yScale = d3.scaleLinear()
                .domain([0,30])
                .range([innerHeight, 0]);
    
    const xAxis = d3.axisBottom(xScale);
              

    const yAxis = d3.axisLeft(yScale);

    innerChart
            .append("g")
            .call(yAxis);

    innerChart
            .append("g")
            .attr("class", "the-x-axis")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis);
    
    d3.selectAll(".the-x-axis text")
            .attr("font-size", "12")
            .attr("x", "-30");

const medals_colours = [{medal:"Bronze", color: "#826a25ff"}, 
          {medal:"Silver",color: "#646b72ff"},
          {medal: "Gold", color: "#edd81ee7"}];

const gold_gb = data.filter(d => d.medal === "Gold" && d.Year === 2012);
    console.log(gold_gb);
const silver_gb = data.filter(d => d.medal === "Silver" && d.Year === 2016);
const bronze_gb = data.filter(d=> d.medal === "Bronze" && d.Year === 2024);


const medals = ["Gold", "Silver", "Bronze"]
medals.forEach( medal =>

{
    const filteredData = data.filter(d=> d.medal=== medal);


    const lineGenerator = d3.line()
                        .x(d=> xScale(d.Year))
                        .y(d=> yScale(d.medal_count))
                        .curve(d3.curveCatmullRom);
    

    innerChart
        .append("path")
           // .attr("class", `line -${medal}`)
            .attr("d", lineGenerator(filteredData))
            .attr("fill", "none")     
            .style("stroke", () => { 
            const match = medals_colours.find(d=> d.medal === medal)
            return match.color;
        })
            .attr("stroke-width", 3);

    //Annotations - Bronze mini story         
    innerChart
     .append("line")
        .attr("x1", xScale(2024))
        .attr("x2", xScale(2024) +40)
        .attr("y1", yScale(data[data.length -1].medal_count))
        .attr("y2", yScale(data[data.length -1].medal_count))
        .attr("stroke", "black") 
        .attr("stroke-dasharray", "4,4") ;

    innerChart
     .append("line")
        .attr("x1", xScale(2016))
        .attr("x2", xScale(2024) +40)
        .attr("y1", yScale(data[data.length -3].medal_count))
        .attr("y2", yScale(data[data.length -3].medal_count))
        .attr("stroke", "black") 
        .attr("stroke-dasharray", "4,4") ;
    
    innerChart
        .append("line")
        .attr("x1", xScale(2024)+ 40)
        .attr("x2", xScale(2024) +40)
        .attr("y1", yScale(data[data.length -3].medal_count))
        .attr("y2", yScale(data[data.length -1].medal_count))
        .attr("stroke", "black") ;
    
    innerChart
        .append("text")
        .text("12 increase Bronze")
        .attr("y", (yScale(data[data.length -1].medal_count) + yScale(data[data.length -3].medal_count))/2)
        .attr("x", xScale(2024) + 45)
        .attr("fill", "black")
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "auto")
        .attr("font-size", 9)
        .attr("font-family", "sans-serif");



    // Annotations Gold    
    innerChart
        .append("text")
        .text("29 Record Golds in London")
        .attr("x", xScale(2012) - 160)
        .attr("y", 6)
        .attr("fill", "black")
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "auto")
        .attr("font-size", 9)
        .attr("font-family", "sans-serif");

    innerChart
        .append("line")
        .attr("x1", xScale(2012))
        .attr("x2", xScale(2012)-40)
        .attr("y1", yScale(data[data.length -1].medal_count))
        .attr("y2", yScale(data[data.length -1].medal_count) - 4)
        .attr("stroke", "black") ;    
    


    leftAxisLabel = svg 
                    .append("text")
                    .attr("dominant-baseline", "hanging");
    leftAxisLabel
        .append("tspan")
        .text("Medals")
        .style("font-family", "sans-serif")
        .attr("y", 20);

    bottomAxisLabel = svg
        .append("text")
        .attr("dominant-baseline", "middle");

    bottomAxisLabel
        .append("tspan")
        .text("Olympic games")
        .style("font-family", "sans-serif")
        .attr("y", height - 15)
        .attr("x", innerWidth/2);

    const x_key = 440
    const y_key = 350

    innerChart
        .append("rect")
        .attr("class", "key-container")
        .attr("opacity", 0.5)
        .attr("stroke-width", "2")
        .attr("stroke", "black")
        .attr("fill", "white")
        .attr("x", x_key - 50)
        .attr("y", y_key -100)
        .attr("width", 140)
        .attr("height", 100);

    const key = innerChart
            .append("g")
            .attr("class", "key")
            .attr("transform",`translate(${x_key}, ${y_key})`);
    
    const height_podium = 45

    key
        .append("rect")
        .attr("x", "0")
        .attr("y", ` ${-height_podium}`)
        .attr("height", height_podium)
        .attr("width", 40)
        .attr("fill","#edd81ee7");

   

    key
        .append("text")
        .text(`${gold_gb[0].medal_count}`)
        .attr("x", 15)
        .attr("y", -8)
        .attr("fill", "black")
        .attr("font-weight", 500)
        .attr("font-family", "sans-serif")
        .attr("font-size", 12);
    
    key
    .append("rect")
        .attr("x", "-40")
        .attr("y", `${-height_podium * 0.6}`)
        .attr("height", height_podium * 0.6)
        .attr("width", 40)
        .attr("fill","#646b72ff");


    key
        .append("text")
        .text(`${silver_gb[0].medal_count}`)
        .attr("x", -20)
        .attr("y", -8)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12);

     key
    .append("rect")
        .attr("x", "40")
        .attr("y", `${-height_podium* 0.45}`)
        .attr("height", height_podium * 0.45)
        .attr("width", 40)
        .attr("fill","#826a25ff");

    key 
        .append("text")
        .text(`${bronze_gb[0].medal_count}`)
        .attr("y", -8)
        .attr("x", 60)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", 12)
        .attr("font-family", "sans-serif");

    

    
    
    key 
        .append("text")
        .text("GB mini medal podium")
        .attr("x", 15)
        .attr("y", -85)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12);


    // Flags for the olympics where that medal had the highest count

    //france first as easiest

    key
       .append("rect")
       .attr("x","52")
       .attr("y",`${(-height_podium* 0.4) - 20}`) 
       .attr("width", 8)
       .attr("height", 10)
       .attr("fill", "blue");

    key
       .append("rect")
       .attr("x","60")
       .attr("y",`${(-height_podium* 0.4) - 20}`) 
       .attr("width", 8)
       .attr("height", 10)
       .attr("fill", "white");

    key
       .append("rect")
       .attr("x","68")
       .attr("y",`${(-height_podium* 0.4) - 20}`) 
       .attr("width", 8)
       .attr("height", 10)
       .attr("fill", "red");

    // Brazil equally hard as GB

    key 
        .append("rect")
        .attr("x", "-30")
        .attr("y", `${(-height_podium * 0.6) -20}`)
        .attr("width", "24")
        .attr("height", "12")
        .attr("fill", "green");
    
    key
        .append("rect")
        .attr("x", "-24")
        .attr("y",`${(-height_podium * 0.6) -19}`)
        .attr("width", "12")
        .attr("height", 9.5)
        .attr("fill", "yellow");
   
    key 
        .append("circle")
        .attr("cx", "-18")
        .attr("cy", `${(-height_podium * 0.6) -14}`)
        .attr("r", 4)
        .attr("fill", "blue");
   
    // Great Britain

    key
        .append("rect")
        .attr("x", "10")
        .attr("y", ` ${-height_podium-20}`)
        .attr("height", 10)
        .attr("width","24")
        .attr("fill","blue");
    
    key 
        .append("line")
        .attr("x1", 34)
        .attr("y1", `${-height_podium-20}`)
        .attr("x2", 10)
        .attr("y2", `${-height_podium-10}`)
        .attr("stroke", "white");

    key 
        .append("line")
        .attr("x1", 10)
        .attr("x2", 34)
        .attr("y1", `${-height_podium-20}`)
        .attr("y2", `${-height_podium-10}`)
        .attr("stroke", "white");

    key
        .append("rect")
        .attr("x", 10)
        .attr("y", `${-height_podium -16}`)
        .attr("width", 24)
        .attr("height", 3)
        .attr("fill", "red");
    key
        .append("rect")
        .attr("x", 20.5)
        .attr("y", `${-height_podium-20}`)
        .attr("width", 3)
        .attr("height", 10)
        .attr("fill", "red");


    

    
});


}
 