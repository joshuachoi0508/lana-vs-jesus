# Lana vs Jesus

Live site: [Lana vs. Jesus](https://joshuachoi0508.github.io/lana-vs-jesus/)

`Lana vs Jesus` is a tongue-in-cheek project that compares the singer Lana Del Rey with Jesus using different charts/diagrams by `D3`, `Javascript`, `HTML`, and `CSS`.

## Visuals
### Word Cloud
Text Analysis section of the project has two word clouds. Each word's text-size is based on the frequency of the word used in a certain writing (in this case Lana's songs and the Bible) and the color of the word is based on the polarity of the word (green for positive/neutral and red for negative). Whenever the page is refreshed, the clouds appear with cool animation. It was made using d3.layout.cloud created by Jason Davies.

Coloring based on polarity:
```javascript
var color = d3.scale.quantize()
    .domain([-max, max])
    .range([d3.hcl(36, 65, 50), d3.hcl(150, 65, 50)]);

.style("fill", function (d) {
    return color(d[person].polarity);
})
```
Font-size based on frequency: 
```javascript
.style("font-size", function (d) {
    return font_size(d[person].count) + "px";
})
```

![WordCloudGif](./readMe/word_clouds.gif)
### Pie Chart
Writing Credits section has two pie charts. Visitors can hover over the charts to see different writers involved in writing Lana's songs and the Bible. They were made using d3 layout created by Lisa Nguyen.

Moveover effect: 
```javascript
path.on('mouseover', function (d) { // when mouse enters div      
    var total = d3.sum(dataset.map(function (d) { // calculate the total number of writers in the dataset         
        return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
    }));
    var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
    tooltip.select('.label').html(d.data.label); // set current label           
    tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
    tooltip.style('display', 'block'); // set display                     
});

path.on('mouseout', function () { // when mouse leaves div                        
    tooltip.style('display', 'none'); // hide tooltip for that element
});
```

![PieChart](./readMe/pie_chart.gif)

### Bar Chart
Social Media Presence section has three different social media platforms (Instagram, Twitter, and YouTube) and Lana/Jesus's social presence on each platform. Similar to the pie chart, users can hover over the charts to see the exact number of followers/subscribers Lana/Jesus has in a particular platform.

![BarChart](./readMe/bar_chart.gif)