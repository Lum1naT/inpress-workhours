var id = '1P7taMklb6JNLoEHv7RGnkRz_ce3hKMqXkT5cjwdC5ig';
var gid = '1446721687';
var url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;
fetch(url)
    .then(response => response.text())
    .then(data => document.getElementById("machines").innerHTML = myItems(data.substring(47).slice(0, -2)));

function myItems(jsonString) {
    var json = JSON.parse(jsonString);
    var first = true;
    var result = ''
    json.table.rows.forEach(line => {
        var temp = ''
        line.c.forEach(cell => {
            try { var value = cell.f ? cell.f : cell.v } catch (e) { var value = '' }
            temp += value + " "
        })
        temp = temp.trimEnd()
        result += `<option value="${temp}">`

        if (first) {
            result = "";
            first = false;
        }

    })
    return result
}