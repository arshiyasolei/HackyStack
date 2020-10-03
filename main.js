window.onload = function(){
  // Cool title animation
    
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
  sigma.parsers.json('data.json', {
    container: 'graph container',
        settings: {
            scalingMode: "inside",
            sideMargin: 0,
            autoResize: false,
            autoRescale: true,
            labelThreshold: 0,
            defaultNodeColor: '#ec5148'
        }
    });
    getLocalJson();
}

function getLocalJson() {
  fetch("data.json")
  .then(response => response.json())
  .then(json => populateTable(json));
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

function add_workout() {
  let arr = ["name","reps","weight","date","lbs"]
  let paramString = '?'
  for (let x of arr){
    if (document.getElementsByName(`workoutinput_${x}`)[0].value === ""){
      paramString += `${x}=%20&`
    } else {
      paramString += `${x}=${document.getElementsByName(`workoutinput_${x}`)[0].value}&`
    }
  }
  let req = new XMLHttpRequest();
  console.log('test')
  //let payload = {longUrl:null};
  //payload.longUrl = document.getElementById('longUrl').value;
  req.open('GET', `/create_workout_l${paramString}`, true);
  //req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      
      console.log("done")
      get_workouts();
      //document.getElementById('originalUrl').textContent = response.longUrl;
      //document.getElementById('shortUrl').textContent = response.id;
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send();
  event.preventDefault();
}

function delete_workout(j){
return function() {
let req = new XMLHttpRequest();
//let payload = {longUrl:null};
//payload.longUrl = document.getElementById('longUrl').value;
req.open('GET', `/delete_workout_l?id=${document.getElementById(`row_id_${j}`).innerText}`, true);
//req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    
    console.log("done")
    get_workouts();
    //document.getElementById('originalUrl').textContent = response.longUrl;
    //document.getElementById('shortUrl').textContent = response.id;
  } else {
    console.log("Error in network request: " + req.statusText);
  }});
req.send();
event.preventDefault();
}
}

function update_workout(j){
  return function(){
  let arr = ["name","reps","weight","date","lbs"]
  console.log(j)
  let paramString = `?id=${document.getElementById(`row_id_${j}`).innerHTML}&`
  for (let x of arr){
    if (x === "date"){
      if (document.getElementById(`date_${j}`).value === ""){
        paramString += `${x}=%20&`
      } else {
        paramString += `${x}=${document.getElementById(`date_${j}`).value}&`
      }
    } else {
    console.log(document.getElementById(`${x}_${j}`))
    if (document.getElementById(`${x}_${j}`).innerHTML === ""){
      paramString += `${x}=%20&`
    } else {
      paramString += `${x}=${document.getElementById(`${x}_${j}`).innerHTML}&`
    }
  }
  }
  let req = new XMLHttpRequest();
  console.log(paramString)
  //let payload = {longUrl:null};
  //payload.longUrl = document.getElementById('longUrl').value;
  req.open('GET', `/update_workout_l${paramString}`, true);
  //req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      console.log("done")
      get_workouts();
      //document.getElementById('originalUrl').textContent = response.longUrl;
      //document.getElementById('shortUrl').textContent = response.id;
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send();
  event.preventDefault();
  }
}

function get_workouts(){
console.log("get workouts!")
let req = new XMLHttpRequest();
console.log('test')
//let payload = {longUrl:null};
//payload.longUrl = document.getElementById('longUrl').value;
req.open('GET', `/get_workout_l`, true);
//req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    let data = JSON.parse(req.responseText);
    console.log('d:',data)
    let table = document.getElementById("main_t_body")
    table.innerHTML = ''
    for (let j = 0; j < data.length; j ++){
      let head_tr = document.createElement("tr");
      //console.log(j.job , j.status)
      for (let p in data[j]) {
        let td;
        if (p === "date"){
          td = document.createElement("td");
          let inp = document.createElement("input")
          inp.type = "date"
          let txt = document.createTextNode(`${data[j][p]}`)
          txt.id = `txt_date_${j}`
          td.appendChild(txt);
          td.appendChild(inp);
          inp.className = 'form-control'
          inp.id = `date_${j}`
        }
        else if (p === 'id'){
          td = document.createElement("td");
          td.appendChild(document.createTextNode(`${data[j][p]}`));
          td.id = `row_id_${j}`
          td.style.display = 'none'; 
        } else {
          td = document.createElement("td");
          td.contentEditable = true;
          td.id = `${p}_${j}`
          td.appendChild(document.createTextNode(`${data[j][p]}`));
        }
        head_tr.appendChild(td)
      }
      let anotherTd = document.createElement("td");
      let btn = document.createElement("button");
      btn.className = "btn btn-primary"
      btn.innerText = "Edit"
      btn.onclick = update_workout(j)
      head_tr.appendChild(anotherTd)
      anotherTd.appendChild(btn);

      let anotherTd2 = document.createElement("td");
      let remove = document.createElement("button");
      remove.className = "btn btn-primary"
      remove.innerText = "Remove row"
      head_tr.appendChild(anotherTd2)
      remove.onclick = delete_workout(j)
      anotherTd2.appendChild(remove);
      //th.style.border = '1px solid black';
      table.appendChild(head_tr)
    }
    //document.getElementById('originalUrl').textContent = response.longUrl;
    //document.getElementById('shortUrl').textContent = response.id;
  } else {
    console.log("Error in network request: " + req.statusText);
  }});
req.send();

}
