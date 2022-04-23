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

    return result;
  }


  function validateForm() {
    let form = $("#form");
    
  }


  function calculateTimeSpent(){
    let start_date = $("#start-date").val();
    let start_time = $("#start-time").val();

    let end_date = $("#end-date").val();
    let end_time = $("#end-time").val();
    if (end_time === "" || start_time === ""){
        console.log("no time");
        return "";
    }
    if (end_date === "" || start_date === ""){
        console.log("no date");
        return "";
    }
    let start_mili = new Date(start_date + " " + start_time).getTime()
    let end_mili = new Date(end_date + " " + end_time).getTime()
    console.log(start_mili)
    console.log(end_mili)
    console.log(start_mili >= end_mili)
    if(start_mili >= end_mili){
        document.getElementById("time-calculation").innerHTML="<p> Datum musí být v budoucnosti </p>";
        return "";
    } else {
        difference = msToTime(end_mili - start_mili);
        console.log("diff: " + difference);
        document.getElementById("time-calculation").innerHTML="<p>Odpracováno: <b>"+difference+"</b></p>";
        $("#time-spent").attr("value", difference);
        return difference
    }
}


function addToLog(data, form){
    var status = false;
    if(data === "Accepted"){
        console.log("ok");
        var status = true;
    }

    var order_number = $("#order-number").val();
    var worker = $("#worker").val();
    var operation = $("#work-type").val();
    var machine = $("#work-machine").val();
    var now = new Date(new Date().getTime()).toLocaleTimeString()

    document.getElementById("log").innerHTML += `<li>${now} - ${order_number} - ${worker} - ${operation}, ${machine}</li>`  


}

$("#form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = "https://hook.eu1.make.com/j93ll3zxaiqt5ws7nea5cxbzxesiomun";
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
    console.log(start_mili >= end_mili)
    if(start_mili >= end_mili){
        alert("datum musí být v budoucnosti!");
        return false;
    }

    if (date == "") {
        alert("Datum musí být vyplněno");
        return false;
    }

    $("#time-spent").attr("value", calculateTimeSpent());

    
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
          addToLog(data, form);
        }
    });
    
});

