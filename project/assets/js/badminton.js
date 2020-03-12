
// Create Responsive Court
Promise.all([
    d3.json('../../src/data/zoneData.json'),
    d3.json('../../src/data/hitType.json')
]).then(function (files) {

    const courtChart = d3.select('#court')
        .append("div")
        .attr("id", 'court-container')
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 610 1340")
        .attr("id", 'court-content-responsive')

    const court = d3.select('#court-content-responsive')

    // Set Margin
    const margin = { left: 160, right: 350, top: 20, bottom: 100 };



    // Measurements For Court
    const courtWidth = 610 - margin.left - margin.right;
    const courtHeight = courtWidth / 61 * 67

    const graphDistanceX = 80;
    const graphDistanceY = 20;
    const graphWidth = 100;
    const graphHeight = 100


    const sideLineLeftCoordinates = { x1: courtWidth / 61 * 4.2 + margin.left, y1: margin.top, x2: courtWidth / 61 * 4.2 + margin.left, y2: margin.top + 2 * courtHeight };

    const sideLineRightCoordinates = { x1: margin.left + courtWidth - courtWidth / 61 * 3.2, y1: margin.top, x2: margin.left + courtWidth - courtWidth / 61 * 3.2, y2: margin.top + 2 * courtHeight };

    const doubleServeLineHeight = courtWidth / 61 * 7.2;
    const doubleServeLineCoordinatesTop = { x1: margin.left, y1: margin.top + doubleServeLineHeight, x2: margin.left + courtWidth, y2: margin.top + doubleServeLineHeight };
    const doubleServeLineCoordinatesBottom = { x1: margin.left, y1: margin.top + 2 * courtHeight - doubleServeLineHeight, x2: margin.left + courtWidth, y2: margin.top + 2 * courtHeight - doubleServeLineHeight };


    const serveLineHeight = courtHeight / 61 * 19.8;
    const serveLineCoordinatesTop = { x1: margin.left, y1: margin.top + courtHeight - serveLineHeight, x2: margin.left + courtWidth, y2: margin.top + courtHeight - serveLineHeight }
    const serveLineCoordinatesBottom = { x1: margin.left, y1: margin.top + courtHeight + serveLineHeight, x2: margin.left + courtWidth, y2: margin.top + courtHeight + serveLineHeight }

    const middleLineHeight = courtHeight - serveLineHeight;
    const middleLineCoordinatesTop = { x1: margin.left + courtWidth / 2, y1: margin.top, x2: margin.left + courtWidth / 2, y2: margin.top + middleLineHeight }
    const middleLineCoordinatesBottom = { x1: margin.left + courtWidth / 2, y1: margin.top + courtHeight + serveLineHeight, x2: margin.left + courtWidth / 2, y2: margin.top + courtHeight + serveLineHeight + middleLineHeight }

    // Measurements For Areas
    const areaWidth = courtWidth / 2;
    const areasFrontHeight = courtHeight / 67 * 26;
    const areasMiddleHeight = courtHeight / 67 * 24;
    const areasBackHeight = courtHeight / 67 * 17;

    const area1CoordinatesTop = { x: courtWidth / 2 + margin.left, y: margin.top + areasBackHeight + areasMiddleHeight, width: areaWidth, height: areasFrontHeight }
    const area2CoordinatesTop = { x: margin.left, y: margin.top + areasBackHeight + areasMiddleHeight, width: areaWidth, height: areasFrontHeight };
    const area3CoordinatesTop = { x: courtWidth / 2 + margin.left, y: margin.top + areasBackHeight, width: areaWidth, height: areasMiddleHeight };
    const area4CoordinatesTop = { x: margin.left, y: margin.top + areasBackHeight, width: areaWidth, height: areasMiddleHeight };
    const area5CoordinatesTop = { x: courtWidth / 2 + margin.left, y: margin.top, width: areaWidth, height: areasBackHeight };
    const area6CoordinatesTop = { x: margin.left, y: margin.top, width: areaWidth, height: areasBackHeight };

    const area1CoordinatesBottom = { x: margin.left, y: margin.top + courtHeight, width: areaWidth, height: areasFrontHeight }
    const area2CoordinatesBottom = { x: courtWidth / 2 + margin.left, y: margin.top + courtHeight, width: areaWidth, height: areasFrontHeight };
    const area3CoordinatesBottom = { x: margin.left, y: margin.top + courtHeight + areasFrontHeight, width: areaWidth, height: areasMiddleHeight };
    const area4CoordinatesBottom = { x: courtWidth / 2 + margin.left, y: margin.top + courtHeight + areasFrontHeight, width: areaWidth, height: areasMiddleHeight };
    const area5CoordinatesBottom = { x: margin.left, y: margin.top + courtHeight + areasFrontHeight + areasMiddleHeight, width: areaWidth, height: areasBackHeight };
    const area6CoordinatesBottom = { x: courtWidth / 2 + margin.left, y: margin.top + courtHeight + areasFrontHeight + areasMiddleHeight, width: areaWidth, height: areasBackHeight };

    /*Measurements for Player Thumbnails */
    const playerThumbnails = { width: 50, height: 60 }

    /* Measurments for bar chart*/
    const barChartWidth = graphWidth;
    const barChartHeight = graphHeight - 30;

    const barChartX = d3.scaleBand().rangeRound([0, barChartWidth]).padding(0.3);
    const barChartY = d3.scaleLinear().rangeRound([barChartHeight, 0]);

    const barChartXAxis = d3.axisBottom(barChartX).tickSize(0)


    var barChartYAxis = d3.axisLeft(barChartY)
        .tickSize(0)
        .ticks(3, '%')

    // Outer Background
    const courtOverall = court.append('rect')
        .attr('x', margin.left - courtWidth / 61 * 4.2)
        .attr('y', margin.top - courtWidth / 61 * 4.2)
        .attr('width', courtWidth + 2 * courtWidth / 61 * 4.2)
        .attr('height', 2 * courtHeight + 2 * courtWidth / 61 * 4.2)
        .style('fill', '#07933E');
    // Draw Area
    const area1Top = court.append('g')

    area1Top.append('rect')
        .classed('clickableArea', true)
        .property('value', '1')
        .attr('x', area1CoordinatesTop.x)
        .attr('y', area1CoordinatesTop.y)
        .attr('width', area1CoordinatesTop.width - 1)
        .attr('height', area1CoordinatesTop.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E');
    area1Top.append('text')
        .attr('x', area1CoordinatesTop.x + areaWidth / 2.1)
        .attr('y', area1CoordinatesTop.y + areasFrontHeight / 1.6)
        .attr('width', area1CoordinatesTop.width)
        .attr('height', area1CoordinatesTop.height)
        .text('1')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area2Top = court.append('g');

    area2Top.append('rect')
        .classed('clickableArea', true)
        .property('value', '2')
        .attr('x', area2CoordinatesTop.x + 1)
        .attr('y', area2CoordinatesTop.y)
        .attr('width', area2CoordinatesTop.width - 2)
        .attr('height', area2CoordinatesTop.height - 2)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area2Top.append('text')
        .attr('x', area2CoordinatesTop.x + areaWidth / 2.1)
        .attr('y', area2CoordinatesTop.y + areasFrontHeight / 1.6)
        .attr('width', area2CoordinatesTop.width)
        .attr('height', area2CoordinatesTop.height)
        .text('2')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area3Top = court.append('g')

    area3Top.append('rect')
        .classed('clickableArea', true)
        .property('value', '3')
        .attr('x', area3CoordinatesTop.x)
        .attr('y', area3CoordinatesTop.y)
        .attr('width', area3CoordinatesTop.width - 1)
        .attr('height', area3CoordinatesTop.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')

    area3Top.append('text')
        .attr('x', area3CoordinatesTop.x + areaWidth / 2.1)
        .attr('y', area3CoordinatesTop.y + areasMiddleHeight / 1.6)
        .attr('width', area3CoordinatesTop.width)
        .attr('height', area3CoordinatesTop.height)
        .text('3')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area4Top = court.append('g')

    area4Top.append('rect')
        .classed('clickableArea', true)
        .property('value', '4')
        .attr('x', area4CoordinatesTop.x + 1)
        .attr('y', area4CoordinatesTop.y)
        .attr('width', area4CoordinatesTop.width - 2)
        .attr('height', area4CoordinatesTop.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')

    area4Top.append('text')
        .attr('x', area4CoordinatesTop.x + areaWidth / 2.1)
        .attr('y', area4CoordinatesTop.y + areasMiddleHeight / 1.6)
        .attr('width', area4CoordinatesTop.width)
        .attr('height', area4CoordinatesTop.height)
        .text('4')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area5Top = court.append('g')

    area5Top.append('rect')
        .classed('clickableArea', true)
        .property('value', '5')
        .attr('x', area5CoordinatesTop.x)
        .attr('y', area5CoordinatesTop.y)
        .attr('width', area5CoordinatesTop.width - 1)
        .attr('height', area5CoordinatesTop.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')


    area5Top.append('text')
        .attr('x', area5CoordinatesTop.x + areaWidth / 2.1)
        .attr('y', area5CoordinatesTop.y + areasBackHeight / 1.6)
        .attr('width', area5CoordinatesTop.width - 1)
        .attr('height', area5CoordinatesTop.height - 1)
        .text('5')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area6Top = court.append('g')
    area6Top.append('rect')
        .classed('clickableArea', true)
        .property("value", '6')
        .attr('x', area6CoordinatesTop.x + 1)
        .attr('y', area6CoordinatesTop.y)
        .attr('width', area6CoordinatesTop.width - 2)
        .attr('height', area6CoordinatesTop.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area6Top.append('text')
        .attr('x', area6CoordinatesTop.x + areaWidth / 2.1)
        .attr('y', area6CoordinatesTop.y + areasBackHeight / 1.6)
        .attr('width', area6CoordinatesTop.width)
        .attr('height', area6CoordinatesTop.height)
        .text('6')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')



    // Bottom Court Areas
    const area1Bottom = court.append('g')
    area1Bottom.append('rect')
        .classed('clickableArea', true)
        .property("value", '11')
        .attr('x', area1CoordinatesBottom.x)
        .attr('y', area1CoordinatesBottom.y)
        .attr('width', area1CoordinatesBottom.width - 1)
        .attr('height', area1CoordinatesBottom.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area1Bottom.append('text')
        .attr('x', area1CoordinatesBottom.x + areaWidth / 2.1)
        .attr('y', area1CoordinatesBottom.y + areasBackHeight / 1.6)
        .attr('width', area1CoordinatesBottom.width)
        .attr('height', area1CoordinatesBottom.height)
        .text('1')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area2Bottom = court.append('g')
    area2Bottom.append('rect')
        .classed('clickableArea', true)
        .property("value", '22')
        .attr('x', area2CoordinatesBottom.x)
        .attr('y', area2CoordinatesBottom.y)
        .attr('width', area2CoordinatesBottom.width - 1)
        .attr('height', area2CoordinatesBottom.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area2Bottom.append('text')
        .attr('x', area2CoordinatesBottom.x + areaWidth / 2.1)
        .attr('y', area2CoordinatesBottom.y + areasBackHeight / 1.6)
        .attr('width', area2CoordinatesBottom.width)
        .attr('height', area2CoordinatesBottom.height)
        .text('2')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')



    const area3Bottom = court.append('g')
    area3Bottom.append('rect')
        .classed('clickableArea', true)
        .property("value", '33')
        .attr('x', area3CoordinatesBottom.x)
        .attr('y', area3CoordinatesBottom.y)
        .attr('width', area3CoordinatesBottom.width - 1)
        .attr('height', area3CoordinatesBottom.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area3Bottom.append('text')
        .attr('x', area3CoordinatesBottom.x + areaWidth / 2.1)
        .attr('y', area3CoordinatesBottom.y + areasBackHeight / 1.6)
        .attr('width', area3CoordinatesBottom.width)
        .attr('height', area3CoordinatesBottom.height)
        .text('3')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area4Bottom = court.append('g')
    area4Bottom.append('rect')
        .classed('clickableArea', true)
        .property("value", '44')
        .attr('x', area4CoordinatesBottom.x)
        .attr('y', area4CoordinatesBottom.y)
        .attr('width', area4CoordinatesBottom.width - 1)
        .attr('height', area4CoordinatesBottom.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area4Bottom.append('text')
        .attr('x', area4CoordinatesBottom.x + areaWidth / 2.1)
        .attr('y', area4CoordinatesBottom.y + areasBackHeight / 1.6)
        .attr('width', area4CoordinatesBottom.width)
        .attr('height', area4CoordinatesBottom.height)
        .text('4')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area5Bottom = court.append('g')
    area5Bottom.append('rect')
        .classed('clickableArea', true)
        .property("value", '55')
        .attr('x', area5CoordinatesBottom.x)
        .attr('y', area5CoordinatesBottom.y)
        .attr('width', area5CoordinatesBottom.width - 1)
        .attr('height', area5CoordinatesBottom.height - 1)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area5Bottom.append('text')
        .attr('x', area5CoordinatesBottom.x + areaWidth / 2.1)
        .attr('y', area5CoordinatesBottom.y + areasBackHeight / 1.6)
        .attr('width', area5CoordinatesBottom.width)
        .attr('height', area5CoordinatesBottom.height)
        .text('5')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')

    const area6Bottom = court.append('g')
    area6Bottom.append('rect')
        .classed('clickableArea', true)
        .property("value", '66')
        .attr('x', area6CoordinatesBottom.x)
        .attr('y', area6CoordinatesBottom.y)
        .attr('width', area6CoordinatesBottom.width)
        .attr('height', area6CoordinatesBottom.height)
        .style('stroke', '#8BFF90')
        .style('opacity', '0.4')
        .style('fill', '#07933E')
    area6Bottom.append('text')
        .attr('x', area6CoordinatesBottom.x + areaWidth / 2.1)
        .attr('y', area6CoordinatesBottom.y + areasBackHeight / 1.6)
        .attr('width', area6CoordinatesBottom.width)
        .attr('height', area6CoordinatesBottom.height)
        .text('6')
        .style('fill', '#FF6C6C')
        .style('font-size', '12px')


    /*Draw Court*/
    const courtBackgroundTop = court.append('rect')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', courtWidth)
        .attr('height', courtHeight)
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', '0.5');

    const courtBackgroundBottom = court.append('rect')
        .attr('x', margin.left)
        .attr('y', margin.top + courtHeight)
        .attr('width', courtWidth)
        .attr('height', courtHeight)
        .style('fill', 'none')
        .style('stroke', 'white');

    const sideLineLeft = court.append('line')
        .style('stroke', 'white')
        .attr('x1', sideLineLeftCoordinates.x1)
        .attr('y1', sideLineLeftCoordinates.y1)
        .attr('x2', sideLineLeftCoordinates.x2)
        .attr('y2', sideLineLeftCoordinates.y2);

    const sideLineRight = court.append('line')
        .style('stroke', 'white')
        .attr('x1', sideLineRightCoordinates.x1)
        .attr('y1', sideLineRightCoordinates.y1)
        .attr('x2', sideLineRightCoordinates.x2)
        .attr('y2', sideLineRightCoordinates.y2);

    const doubleServeLineTop = court.append('line')
        .style('stroke', 'white')
        .attr('x1', doubleServeLineCoordinatesTop.x1)
        .attr('y1', doubleServeLineCoordinatesTop.y1)
        .attr('x2', doubleServeLineCoordinatesTop.x2)
        .attr('y2', doubleServeLineCoordinatesTop.y2);

    const doubleServeLineBottom = court.append('line')
        .style('stroke', 'white')
        .attr('x1', doubleServeLineCoordinatesBottom.x1)
        .attr('y1', doubleServeLineCoordinatesBottom.y1)
        .attr('x2', doubleServeLineCoordinatesBottom.x2)
        .attr('y2', doubleServeLineCoordinatesBottom.y2);


    const serveLineTop = court.append('line')
        .style('stroke', 'white')
        .attr('x1', serveLineCoordinatesTop.x1)
        .attr('y1', serveLineCoordinatesTop.y1)
        .attr('x2', serveLineCoordinatesTop.x2)
        .attr('y2', serveLineCoordinatesTop.y2);

    const serveLineBottom = court.append('line')
        .style('stroke', 'white')
        .attr('x1', serveLineCoordinatesBottom.x1)
        .attr('y1', serveLineCoordinatesBottom.y1)
        .attr('x2', serveLineCoordinatesBottom.x2)
        .attr('y2', serveLineCoordinatesBottom.y2);


    const middleLineTop = court.append('line')
        .style('stroke', 'white')
        .attr('x1', middleLineCoordinatesTop.x1)
        .attr('y1', middleLineCoordinatesTop.y1)
        .attr('x2', middleLineCoordinatesTop.x2)
        .attr('y2', middleLineCoordinatesTop.y2);

    const middleLineBottom = court.append('line')
        .style('stroke', 'white')
        .attr('x1', middleLineCoordinatesBottom.x1)
        .attr('y1', middleLineCoordinatesBottom.y1)
        .attr('x2', middleLineCoordinatesBottom.x2)
        .attr('y2', middleLineCoordinatesBottom.y2);

    // Net
    const netLine = court.append('line')
        .style('stroke', 'white')
        .style('stroke-width', '3px')
        .attr('x1', margin.left - courtWidth / 61 * 4.2)
        .attr('y1', margin.top + courtHeight)
        .attr('x2', margin.left + courtWidth + courtWidth / 61 * 4.2)
        .attr('y2', margin.top + courtHeight);

    const category1 = court.append('g')
    category1.append('text')
        .attr('x', margin.left + courtWidth + graphDistanceX + 12)
        .attr('y', margin.top)
        .text('Drop Areas Ratio')
        .style('font-size', '7')
        .style('fill', 'white')

    category1.append('svg:image')
        .attr('x', margin.left + courtWidth + graphDistanceX)
        .attr('y', margin.top - 6)
        .attr('height', 8)
        .attr('xlink:href', '../assets/img/icon-badminton.svg')

    const category2 = court.append('g')
    category2.append('text')
        .text('Hit Types Ratio')
        .style('font-size', '7')
        .style('fill', 'white')
        .attr('transform', `translate(${margin.left + courtWidth + graphDistanceX + 12}, ${margin.top + graphHeight + graphDistanceY})`)
    category2.append('svg:image')
        .attr('x', margin.left + courtWidth + graphDistanceX)
        .attr('y', margin.top + graphHeight + graphDistanceY - 6)
        .attr('height', 8)
        .attr('xlink:href', '../assets/img/icon-badminton.svg')

    


    /*Data Viz, including areaPie chart, bar chart, etc.*/
    /*areaPie Chart*/
    var areaData = files[0];
    var area1Filter = areaData.find(function (d) {
        return d.hit_zone == 1;
    })
    var area1Data = area1Filter.fall_zone
    var colorScale = d3.scaleOrdinal()
        .domain(area1Data)
        .range(['#4379a7', '#59a14f', '#f29e2b', '#edc948', '#e15759', '#b07aa1', '#76b7b2', '#ff9da7']);
    var arc = d3.arc()
        .innerRadius(20)
        .outerRadius(35)
    var areaPie = d3.pie()
        .value(function (d) {
            return d.zone_percentage;
        });


    var areaPieChart = category1.append("g")
        .attr("width", graphWidth)
        .attr("height", graphWidth)
        .append("g")
        .attr("transform", `translate( ${margin.left + courtWidth + graphWidth}, ${margin.top + graphHeight / 2})`)
        .selectAll(".arc")
        .data(areaPie(area1Data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            console.log(d.data)
            return colorScale(d.data.zone_name);
        });

    var areaPielegend = category1.append("g")
        .attr("width", 200)
        .attr("height", 400)
        .selectAll("g")
        .data(area1Data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return `translate(${margin.left + courtWidth + graphWidth + graphDistanceX /1.5}, ${38 + i * 10})`; });

    areaPielegend.append("rect")
        .classed('legend', true)
        .attr("width", 5)
        .attr("height", 5)
        .style("fill", function (d) {
            return colorScale(d.zone_name);
        });

    areaPielegend.append("text")
        .classed('legend', true)
        .attr("x", 10)
        .attr("y", 3)
        .attr("dy", ".35em")
        .style('fill', function (d) {
            return colorScale(d.zone_name);
        })
        .style('font-size', '6px')
        .text(function (d) { return d.zone_name; });

    areaPielegend.append("text")
        .classed('legend', true)
        .attr("x", 16)
        .attr("y", 3)
        .attr("dy", ".35em")
        .style('fill', 'white')
        .style('font-size', '6px')
        .text(function (d) { return (d.zone_percentage * 100).toFixed(1) + "%"; });


    /* Bar Chart */

    let hitData = files[1]

    console.log(hitData)
    var area1HitFilter = hitData.find(function (d) {
        return d.hit_zone == 1;
    })
    var area1HitData = area1HitFilter.fall_zone
    console.log(area1HitData)

    // scale the range of hit data
    barChartX.domain(area1HitData.map(function (d) { return d.hit_type_name_cn; }));
    barChartY.domain([0, d3.max(area1HitData, function (d) { return d.hit_type_percentage; })]);

    // x axis
    category2.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX }, ${barChartHeight + margin.top + graphHeight + graphDistanceY * 2.5})`)
        .call(barChartXAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("dx", function (d) { return barChartX(d.hit_type_name_cn) + barChartX.bandwidth() / 2; })
        .attr("dy", ".8em")
        .style('fill', 'white');
    // // y axis
    category2.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${margin.top + graphHeight + graphDistanceY * 2.5})`)
        .call(barChartYAxis)
        .append("text")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("比例")
        .style('font-size', '6px')
        // .style('fill', 'white')

    // bars
    category2.selectAll("bar")
        .data(area1HitData)
        .enter().append("rect")
        .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${margin.top + graphHeight + graphDistanceY * 2.5})`)
        .attr("class", "bar")
        .attr("x", function (d) { return barChartX(d.hit_type_name_cn); })
        .attr("width", barChartX.bandwidth())
        .attr("y", function (d) { return barChartY(d.hit_type_percentage); })
        .attr("height", function (d) { return barChartHeight - barChartY(d.hit_type_percentage); })
        .style('fill', '#F8B66D')

    // text on top of bars
    category2.selectAll("text.bar")
        .data(area1HitData)
        .enter().append("text")
        .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${margin.top + graphHeight + graphDistanceY * 2.5})`)
        .attr("class", "bar")
        .attr("text-anchor", "middle")
        .attr("x", function (d) { return barChartX(d.hit_type_name_cn) + barChartX.bandwidth() / 2; })
        .attr("y", function (d) { return barChartY(d.hit_type_percentage) - 4; })
        .text(function (d) { return (d.hit_type_percentage * 100).toFixed(1) + '%'; })
        .style('fill', 'white');

    // styling bar chart
    category2.selectAll(".yAxis>.tick>text")
        .each(function (d, i) {
            d3.select(this).style("font-size", '6px').style('fill', 'white');
        });
    category2.selectAll(".xAxis>.tick>text")
        .each(function (d, i) {
            d3.select(this).style("font-size", '6px').style('fill', 'white');
        });

    category2.selectAll('path.domain')
        .each(function (d, i) {
            d3.select(this).style("stroke-width", '0.4').style('fill', 'white');
        });

    category2.selectAll('text.bar')
        .each(function (d, i) {
            d3.select(this).style("font-size", '6px').style('fill', 'white');
        });


   
    
       



 
    /*Player Thumbnails */
    const player1 = court.append('svg:image')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + courtHeight)
        .attr('height', playerThumbnails.height)
        .attr('xlink:href', '../assets/img/Chen_Long.jpg')

    const player1Nationality = court.append('svg:image')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + courtHeight + playerThumbnails.height + 4)
        .attr('height', 6)
        .attr('xlink:href', '../assets/img/china.png')

    const player1Name = court.append('text')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + courtHeight + playerThumbnails.height + 20)
        .text('Name: Chen Long')
        .style('fill', 'white')
        .style('font-size', '6px')
    const player1Ranking = court.append('text')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + courtHeight + playerThumbnails.height + 32)
        .text('World Ranking：3')
        .style('fill', 'white')
        .style('font-size', '6px')

    const player2 = court.append('svg:image')
        .attr('x', margin.left / 2)
        .attr('y', margin.top)
        .attr('height', playerThumbnails.height)
        .attr('xlink:href', '../assets/img/Axelsen_Viktor.jpg')

    const player2Nationality = court.append('svg:image')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + playerThumbnails.height + 4)
        .attr('height', 6)
        .attr('xlink:href', '../assets/img/denmark.png')

    const player2Name = court.append('text')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + playerThumbnails.height + 20)
        .text('Name：Axelsen Viktor')
        .style('fill', 'white')
        .style('font-size', '6px')
    const player2Ranking = court.append('text')
        .attr('x', margin.left / 2)
        .attr('y', margin.top + playerThumbnails.height + 32)
        .text('World Ranking：5')
        .style('fill', 'white')
        .style('font-size', '6px')

    const hitTypeArray = [[
        { text: '该运动员在', color: 'white' },
        { text: '1', color: '#f58e1c' },
        { text: '号区域概率最高的出球方式:', color: 'white' }
    ],
    [
        { text: '搓球', color: '#f58e1c' },
        { text: '后', color: 'white' },
        { text: '杀球', color: '#f58e1c' }
    ],
    [
        { text: '此出球方式占比： ', color: 'white' },
        { text: '20%', color: '#f58e1c' }
    ],
    [
        { text: '战术执行成功率： ', color: 'white' },
        { text: '34.93%', color: '#f58e1c' }
    ],
    ]



    /* Handle Clickable areas on court*/
    d3.selectAll('rect.clickableArea')
        .on('mouseover', function (d) {
            d3.select(this)
                // .style('fill', 'black')
                .style('cursor', 'pointer');

        })
    // .on('mouseout', function (d) {
    //     d3.select(this)
    //         .style('fill', 'none')
    //         .style('cursor', 'default')
    // })

    d3.selectAll('rect.clickableArea')
        .on('click', function (d) {
            var selectedOption = d3.select(this).property("value")
            updateCourt(selectedOption)
            d3.selectAll('.clickableArea')
                .style('fill', '#07933E')
            d3.select(this)
                .style('fill', 'black')
        });

    /*Update Court & Data Viz when click any areas on the court*/
    function updateCourt(selectedGroup) {
        d3.selectAll('.legend').remove()
        d3.selectAll('.arc').remove()
        d3.selectAll('.xAxis').remove()
        d3.selectAll('.yAxis').remove()
        d3.selectAll('.bar').remove()
        var zoneDataFilter = areaData.find(function (d) {
            return d.hit_zone == selectedGroup;
        })
        var thisAreaData = zoneDataFilter.fall_zone;



        colorScale = d3.scaleOrdinal()
            .domain(thisAreaData)
            .range(['#4379a7', '#59a14f', '#f29e2b', '#edc948', '#e15759', '#b07aa1', '#76b7b2', '#ff9da7']);



        category1.append("g")
            .attr("width", graphWidth)
            .attr("height", graphWidth)
            .append("g")
            .attr("transform", `translate( ${margin.left + courtWidth + graphWidth}, ${margin.top + graphHeight / 2})`)
            .selectAll(".arc")
            .data(areaPie(thisAreaData))
            .enter()
            .append("g")
            .attr("class", "arc")
            .append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return colorScale(d.data.zone_name);
            });

        var areaPielegend = category1.append("g")
            .attr("width", 200)
            .attr("height", 400)
            .selectAll("g")
            .data(thisAreaData)
            .enter()
            .append("g")
            .attr("transform", function (d, i) { return `translate(${margin.left + courtWidth + graphWidth + graphDistanceX / 1.5}, ${30 + i * 10})`; });

        areaPielegend.append("rect")
            .classed('legend', true)
            .attr("width", 5)
            .attr("height", 5)
            .style("fill", function (d) {
                return colorScale(d.zone_name);
            }
            );

        areaPielegend.append("text")
            .classed('legend', true)
            .attr("x", 10)
            .attr("y", 3)
            .attr("dy", ".35em")
            .style('fill', function (d) {
                return colorScale(d.zone_name);
            })
            .style('font-size', '6px')
            .text(function (d) { return d.zone_name; })
        areaPielegend.append("text")
            .classed('legend', true)
            .attr("x", 16)
            .attr("y", 3)
            .attr("dy", ".35em")
            .style('fill', 'white')
            .style('font-size', '6px')
            .text(function (d) { return (d.zone_percentage * 100).toFixed(1) + "%"; });;


        var hitDataFilter = hitData.find(function (d) {
            return d.hit_zone == selectedGroup;
        })
        var thisAreaHitData = hitDataFilter.fall_zone;

        console.log(thisAreaHitData)

        // scale the range of hit data
        barChartX.domain(thisAreaHitData.map(function (d) { return d.hit_type_name_cn; }));
        barChartY.domain([0, d3.max(thisAreaHitData, function (d) { return d.hit_type_percentage; })]);

        // x axis
        category2.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${barChartHeight + margin.top + graphHeight + graphDistanceY * 2.5})`)
            .call(barChartXAxis)
            .selectAll("text")
            .style("text-anchor", "middle")
            .attr("x", function (d) { return barChartX(d.hit_type_name_cn) + barChartX.bandwidth() / 2; })
            .attr("dy", ".8em");
        // // y axis
        category2.append("g")
            .attr("class", "yAxis")
            .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${margin.top + graphHeight + graphDistanceY * 2.5})`)
            .call(barChartYAxis)
            .append("text")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("比例")
            .style('font-size', '6px')

        // bars
        category2.selectAll("bar")
            .data(thisAreaHitData)
            .enter().append("rect")
            .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${margin.top + graphHeight + graphDistanceY * 2.5})`)
            .attr("class", "bar")
            .attr("x", function (d) { return barChartX(d.hit_type_name_cn); })
            .attr("width", barChartX.bandwidth())
            .attr("y", function (d) { return barChartY(d.hit_type_percentage); })
            .attr("height", function (d) { return barChartHeight - barChartY(d.hit_type_percentage); })
            .style('fill', '#F8B66D')

        // text on top of bars
        category2.selectAll("text.bar")
            .data(thisAreaHitData)
            .enter().append("text")
            .attr("transform", `translate(${margin.left + courtWidth + graphDistanceX}, ${margin.top + graphHeight + graphDistanceY * 2.5})`)
            .attr("class", "bar")
            .attr("text-anchor", "middle")
            .attr("x", function (d) { return barChartX(d.hit_type_name_cn) + barChartX.bandwidth() / 2; })
            .attr("y", function (d) { return barChartY(d.hit_type_percentage) - 4; })
            .text(function (d) { return (d.hit_type_percentage * 100).toFixed(1) + '%'; })
            .style('fill', 'white');

        category2.selectAll(".yAxis>.tick>text")
            .each(function (d, i) {
                d3.select(this).style("font-size", '6px').style('fill', 'white');
            });
        category2.selectAll(".xAxis>.tick>text")
            .each(function (d, i) {
                d3.select(this).style("font-size", '6px').style('fill', 'white');
            });
        category2.selectAll('text.bar')
            .each(function (d, i) {
                d3.select(this).style("font-size", '6px').style('fill', 'white');
            });

        category2.selectAll('path.domain')
            .each(function (d, i) {
                d3.select(this).style("stroke-width", '0.4').style('fill', 'white');
            });


      


       
 

    }





}).catch(function (err) {
    // handle error here
})
