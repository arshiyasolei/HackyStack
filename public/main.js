
window.onload = function(){
  // Cool title animation
    //https://wallpaperboat.com/hell-wallpapers
    //create the table

    new TypeIt("#typeme", {
        strings: "Contact Tracing by Hacky Stack",
        speed: 100,
        loop: true
      }).go();
      new TypeIt("#typeme2", {
        strings: "About Us",
        speed: 200,
        loop: true
      }).go();

  // Setup sigma window
  s = new sigma({
    container: 'graph container',
    settings: {
      scalingMode: "inside",
      sideMargin: 0,
      autoResize: false,
      autoRescale: true,
      labelThreshold: 0,
      animationsTime: 500,
      defaultNodeColor: '#ec5148'
    }
  });
  sigma.parsers.json('data.json', s, function() {
    s.refresh();
  });
  getlJason();
}

function updateGraph(data) {
  console.log(data);
  var nodeArray = {};
  for (var n of data["nodes"]) {
    nodeArray[n["id"]] = n["color"] == "#f00";
  }
  for (var i in data["edges"]) {
    if (nodeArray[data["edges"][i]["source"]] || nodeArray[data["edges"][i]["target"]]) {
      data["edges"][i]["color"] = "#f22";
    }
  }
  console.log(data["edges"]);
  s.graph.clear();
  s.graph.read(data);
  s.refresh();
  return data;
}

function getJason() {
  fetch("/getJason")
  .then(response => response.json())
  .then(json => updateGraph(json))
  .then(json => populateTable(json));
}

function animate() {
  sigma.plugins.animate(
    s,
    {
      x: 'grid_x',
      y: 'grid_y'
    }
  );
  console.log(s);
}

function populateTable(data) {
  var tableData = new Array();
  var nodeData = {};
  for (var person of data["nodes"]) {
    tableData.push([person["label"], person["color"] == "#f00", 0]);
    nodeData[person["id"]] = 0;
  }
  for (var edge of data["edges"]) {
    nodeData[edge["source"]] += 1;
    nodeData[edge["target"]] += 1;
  }

  for (var i in data["nodes"]) {
    tableData[i][2] = nodeData[data["nodes"][i]["id"]];
  }

  let table = document.getElementById("main_t_body")
    table.innerHTML = ''
    let head_tr = document.createElement("tr");
    for (let row of tableData) {
      tr = document.createElement("tr");
      if (row[1]) {
        tr.style = "background: #f99";
      }
      
      // Name
      td = document.createElement("td");
      td.innerHTML = row[0];
      tr.appendChild(td);

      // Infection status
      td = document.createElement("td");
      td.innerHTML = row[1] ? "Infected" : "Healthy";
      tr.appendChild(td);

      // Number of contacts
      td = document.createElement("td");
      td.innerHTML = row[2].toString();
      tr.appendChild(td);
      table.appendChild(tr);
    }
}

function addPerson() {
  console.log("infected?",document.getElementsByName("userinput_check")[0].checked
)
    let data = {
      name: document.getElementsByName("userinput_name")[0].value,
      infected: document.getElementsByName("userinput_check")[0].value
  };
  fetch("/postJason", {
    method: "POST",
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
    getJason()
  });
  event.preventDefault();
}





