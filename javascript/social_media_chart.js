var data = [{
        site: 'Instagram',
        stats: [4500000, 4300000]
    },
    {
        site: 'Twitter',
        stats: [2027307, 3277946]
    },
    {
        site: 'YouTube',
        stats: [1208495, 2141490]
    }
];

var ids = ['LDR', 'JC'];
var personName = ['Lana Del Rey', 'Jesus'];

// Let's populate the categoeries checkboxes
d3.select('.categories').selectAll('.checkbox')
    .data(ids)
    .enter()
    .append('div')
    .attr('class', 'checkbox')
    .append('label').html(function (id, index) {
        var checkbox = '<input id="' + id + '" type="checkbox" class="category">';
        return checkbox + personName[index];
    });

// some variables declarations
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 100
    },
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// the scale for the site age value
var x = d3.scale.linear().range([0, width]);

// the scale for each site
var y0 = d3.scale.ordinal().rangeBands([0, height], .1);
// the scale for each site age
var y1 = d3.scale.ordinal();

// just a simple scale of colors
var color = d3.scale.ordinal()
    .range(["#3182bd", "#008c3c", "#7b6888"]);

//
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.format(".2s"));

var yAxis = d3.svg.axis()
    .scale(y0)
    .orient("left");

var svg = d3.select(".graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.select('.categories').selectAll('.category').on('change', function () {
    var x = d3.select('.categories').selectAll('.category:checked');
    var ids = x[0].map(function (category) {
        return category.id;
    });
    updateGraph(ids);
});
renderGraph();

function renderGraph() {
    x.domain([0, 0]);
    // y0 domain is all the site names
    y0.domain(data.map(function (d) {
        return d.site;
    }));
    // y1 domain is all the age names, we limit the range to from 0 to a y0 band
    y1.domain(personName).rangeRoundBands([0, y0.rangeBand()]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
}

function updateGraph(selectedIds) {

    var statesData = data.map(function (stateData) {
        return {
            site: stateData.site,
            totalCounts: selectedIds.map(function (selectedId) {
                var index = ids.findIndex(function (id) {
                    return selectedId === id;
                });
                return {
                    id: ids[index],
                    name: personName[index],
                    value: stateData.stats[index]
                };
            })
        }
    });


    // x domain is between 0 and the maximun value in any totalCounts.value
    x.domain([0, d3.max(statesData, function (d) {
        return d3.max(d.totalCounts, function (d) {
            return d.value
        });
    })]);
    // y0 domain is all the site names
    y0.domain(statesData.map(function (d) {
        return d.site;
    }));
    // y1 domain is all the age names, we limit the range to from 0 to a y0 band
    y1.domain(ids).rangeRoundBands([0, y0.rangeBand()]);

    svg.selectAll('.axis.x').call(xAxis);
    svg.selectAll('.axis.y').call(yAxis);

    var site = svg.selectAll(".site")
        .data(statesData);

    site.enter().append("g")
        .attr("class", "site")
        .attr("transform", function (d) {
            return "translate(0, " + y0(d.site) + ")";
        });

    var age = site.selectAll("rect")
        .data(function (d) {
            return d.totalCounts;
        });

    // we append a new rect every time we have an extra data vs dom element
    age.enter().append("rect")
        .attr('width', 0);

    // this updates will happend neither inserting new elements or updating them
    age
        .attr("x", 0)
        .attr("y", function (d, index) {
            return y1(ids[index]);
        })
        .attr("id", function (d) {
            return d.id;
        })
        .style("fill", function (d) {
            return color(d.name);
        })
        .text(function (d) {
            return d.name
        })
        .transition()
        .attr("width", function (d) {
            return x(d.value);
        })
        .attr("height", y1.rangeBand());

    age.exit().transition().attr("width", 0).remove();

    var legend = svg.selectAll(".legend")
        .data(statesData[0].totalCounts.map(function (age) {
            return age.name;
        }));

    legend.enter().append("g");
    legend
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + (200 + i * 20) + ")";
        });

    var legendColor = legend.selectAll('.legend-color').data(function (d) {
        return [d];
    });
    legendColor.enter().append("rect");
    legendColor
        .attr('class', 'legend-color')
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    var legendText = legend.selectAll('.legend-text').data(function (d) {
        return [d];
    });;

    legendText.enter().append("text");
    legendText
        .attr('class', 'legend-text')
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        });

    legend.exit().remove();
}