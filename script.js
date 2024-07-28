// Define data and parameters
const data = [
    { year: 2010, value: 50 },
    { year: 2011, value: 55 },
    { year: 2012, value: 60 },
    { year: 2013, value: 65 },
    { year: 2014, value: 70 },
    { year: 2015, value: 75 }
];

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

// Create SVG container
const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Define scales
const x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 0]);

// Add axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

// Add bars
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "#69b3a2");
