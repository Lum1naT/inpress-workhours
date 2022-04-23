var id = '1a6EElxcMa7kGsiWU8oYtK94IwWV8FHhq_rBHt9Zl2o8';
var gid = '472944468';
var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
fetch(url)
  .then(response => response.text())
  .then(data => document.getElementById("machines").innerHTML=myItems(data.substring(47).slice(0, -2))  
  );
  function myItems(jsonString){
    var json = JSON.parse(jsonString);
    var first = true;
    var result = ''
    json.table.rows.forEach(line => {
      var temp = ''
      line.c.forEach(cell => {
          try{var value = cell.f ? cell.f : cell.v}
          catch(e){var value = ''}
          temp += value + " "
        }
      )
      temp = temp.trimEnd()
      result += `<option value="${temp}">`

      if (first) {
        result = "";
        first = false;
      }

    }
    )
    return result
  }

