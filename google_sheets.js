var id = '1a6EElxcMa7kGsiWU8oYtK94IwWV8FHhq_rBHt9Zl2o8';
var gid = '57702643';
var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
fetch(url)
  .then(response => response.text())
  .then(data => document.getElementById("workers").innerHTML=myItems(data.substring(47).slice(0, -2))  
  );
  function myItems(jsonString){
    var json = JSON.parse(jsonString);
    var first = true;
    var table = ''
    var result = ''
    json.table.rows.forEach(ligne => {
      var temp = ''
      ligne.c.forEach(cellule => {
          try{var valeur = cellule.f ? cellule.f : cellule.v}
          catch(e){var valeur = ''}
          temp += valeur + " "
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

