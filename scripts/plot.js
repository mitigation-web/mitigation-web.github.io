//TODO disable scrolling; when in developer options: drawPlot->close options->deletePlot => then map wrong css
//method to draw the Plot
function drawPlot(json_values) {
    var x1 = json_values["x"];
    var y1 = json_values["y"];
    var z1 = json_values["seq"].slice();
    var stringList = [];
    for (var i = 0; i < z1.length; i++) {
        var tmp_x1 = json_values["x"][i];
        var tmp_y1 = json_values["y"][i];
        var tmp = z1[i][0];
        if (tmp.length > 0) {
            var string = tmp_x1 + "$" + "<br>" + tmp_y1 + " secured visitors" + "<br>" + components_to_pretty_nanmes[tmp[0]];
            for (var j = 1; j < tmp.length; j++) {
                string += "<br>" + components_to_pretty_nanmes[tmp[j]];
            }
            stringList.push(string);
        } else {
            var string = tmp_x1 + "$" + "<br>" + tmp_y1 + " secured visitors";
            stringList.push(string);
        }
    }

    var trace = {
        x: x1,
        y: y1,
        mode: 'lines+markers',
        name: 'hv',
        text: stringList,
        line: {shape: 'hv', color: 'red'},
        type: 'scatter',
        hoverinfo: "text",
        fillcolor: 'gray',
        textfont: {color: 'black'}
    };
    var layout = {
        plot_bgcolor: "#333333",
        paper_bgcolor: "#333333",
        xaxis: {
            color: '#fff',
            title: 'Costs of mitigations in $'
        },
        yaxis: {
            color: '#fff',
            //tickformat: ',.0%',
            title: 'secured visitors'
        }

    }

    document.getElementById('myPlot').style.display = 'block'; //document.getElementById('frame').style.display == 'none' ? 'block' : 'none'; return false;
    Plotly.newPlot('myPlot', [trace], layout);
}

//method to make the Plot disappear
function deletePlot() {
    document.getElementById('myPlot').innerHTML = "";
    document.getElementById('myPlot').style.display = 'none';
}

function parseJSON(frontier_json) {
    json_values = {};
    var x_values = [];
    var y_values = [];
    var seq = [];
    for (var j = 0; j < frontier_json.length; j++) {
        x_values.push(frontier_json[j]["cost"]);
        y_values.push(frontier_json[j]["reward"]);
        seq.push(frontier_json[j]["sequences"]);
    }
    json_values["x"] = x_values;
    json_values["y"] = y_values;
    json_values["seq"] = seq;
    return json_values;
}