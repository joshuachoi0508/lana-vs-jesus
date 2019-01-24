function renderTwitterBarChart(inputData, dom_element_to_append_to, yaxisLabel, colorScheme) {

    var margin = {top: 40, right: 40, bottom: 150, left: 90},
    width = 300 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var color = d3.scale.ordinal()
    .range(colorScheme);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

    var svg = d3.select(dom_element_to_append_to).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    inputData.forEach(function(d) {
        d.label = d.label;
        d.value = +d.value;
    });

    x.domain(inputData.map(function(d) { return d.label; }));
    y.domain([0, d3.max(inputData, function(d) { return +d.value; })]);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -5)
    .attr("dy", "1.71em")
    .attr("dx", ".29em")
    .style("text-anchor", "end")
    .text(yaxisLabel);

    svg.append("g")
    .attr("class", "x axis")
    .call(xAxis)
    .attr("transform",
        "translate(" + 0 + "," + height + ")")

    svg.selectAll("bar")
    .data(inputData)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.label); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .attr('fill', function(d, i) {
        return color(d.label);
    });

    var tooltip = d3.select(dom_element_to_append_to)
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'label');
    tooltip.append('div')
    .attr('class', 'value');

    svg.selectAll(".bar")
    .on('mouseover', function(d) {
        tooltip.select('.label').html(d.label + "</b>");
        tooltip.select('.value').html(d.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b>");

        tooltip.style('display', 'block');
        tooltip.style('opacity', 2);
    })
    .on('mousemove', function(d) {

        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function(d) {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });
}
