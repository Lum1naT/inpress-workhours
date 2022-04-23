Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    
    result = "";

    if (hrs > 0) result += hrs + " hod. ";
    if (mins > 0) result += mins + " min.";

    return "Odpracováno: " + result;
  }


  function validateForm() {
    let form = $("#form");
    let date = $("#date").val();

    let start_date = $("#start-date").val();
    let start_time = $("#start-time").val();

    let end_date = $("#end-date").val();
    let end_time = $("#end-time").val();


    if (end_time === "" || start_time === ""){
        alert("Chybí čas");
        return false;
    }
    if (end_date === "" || start_date === ""){
        alert("Chybí datum");
        return false;
    }
    let start_mili = new Date(start_date + " " + start_time).getTime()
    let end_mili = new Date(end_date + " " + end_time).getTime()
    console.log(start_mili)
    console.log(end_mili)
    console.log(start_mili >= end_mili)
    if(start_mili >= end_mili){
        alert("datum musí být v budoucnosti!");
        return false;
    }

      if (date == "") {
        alert("Datum musí být vyplněno");
        return false;
      }
  }