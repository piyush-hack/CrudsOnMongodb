var data = document.getElementById("helper").getAttribute("data");
data = JSON.parse(data);
var count = Object.keys(data).length;



var tbody = document.getElementById("tbody");

for (x in data) {
    var tr = document.createElement("tr");

    var td0 = document.createElement("td");

    var sendbox = document.createElement("input");
    sendbox.type = "checkbox";
    sendbox.setAttribute("id", "sendM" + data[x]["id"])
    sendbox.onclick = function () {
        savedata(this.id);
    }

    td0.appendChild(sendbox);

    tr.appendChild(td0);

    var td1 = document.createElement("td");
    td1.innerHTML = data[x]["id"];
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    td2.innerHTML = data[x]["name"];
    td2.setAttribute("id", "name" + data[x]["id"])

    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.innerHTML = data[x]["email"];
    td3.setAttribute("id", "email" + data[x]["id"])

    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.innerHTML = data[x]["phoneno"];
    td4.setAttribute("id", "phoneno" + data[x]["id"])

    tr.appendChild(td4);

    var td5 = document.createElement("td");
    td5.innerHTML = data[x]["hobbies"];
    td5.setAttribute("id", "hobbies" + data[x]["id"])

    tr.appendChild(td5);

    var td6 = document.createElement("td");

    var updatebtn = document.createElement("button");
    updatebtn.classList.add("btn");
    updatebtn.classList.add("btn-warning");
    updatebtn.innerHTML = "Update";
    updatebtn.style.margin = "0pc 10px 0px 0px";
    updatebtn.setAttribute("id", "up" + data[x]["id"])
    updatebtn.setAttribute("data-toggle", "modal");
    updatebtn.setAttribute("data-target", "#myModal");

    updatebtn.onclick = function () {
        updatedata(this.id);
    }
    td6.appendChild(updatebtn);

    var deletebtn = document.createElement("button");
    deletebtn.classList.add("btn");
    deletebtn.classList.add("btn-danger");
    deletebtn.innerHTML = "Delete";
    deletebtn.setAttribute("id", "de" + data[x]["id"])
    deletebtn.onclick = function () {
        httpGetAsync(this.id);
    }
    td6.appendChild(deletebtn);

    tr.appendChild(td6);

    tbody.appendChild(tr);
}

function httpGetAsync(debtnid) {
    var id = debtnid.slice(2,);
    window.location.href = "http://crudsmongodb.herokuapp.com/?id=" + id + "&status=delete";
}

function updatedata(upbtnid) {
    var id = upbtnid.slice(2,);
    var myname = document.getElementById("name" + id).innerHTML;
    var myphoneno = document.getElementById("phoneno" + id).innerHTML;
    var myemail = document.getElementById("email" + id).innerHTML;
    var myhobbies = document.getElementById("hobbies" + id).innerHTML;

    document.getElementById("up_id").value = id;
    document.getElementById("name").value = myname;
    document.getElementById("email").value = myemail;
    document.getElementById("phoneno").value = myphoneno;
    document.getElementById("hobbies").value = myhobbies;
    document.getElementById("subbtn").innerHTML = "Update";
    document.getElementById("formhead").innerHTML = "UPDATE DATA OF TABLE";


}

var dataToBeSend = {

};
function savedata(senderId) {
    var id = senderId.slice(5,);

    var myname = document.getElementById("name" + id).innerHTML;
    var myphoneno = document.getElementById("phoneno" + id).innerHTML;
    var myemail = document.getElementById("email" + id).innerHTML;
    var myhobbies = document.getElementById("hobbies" + id).innerHTML;
    var adddata = {
        "name": `${myname}`,
        "email": `${myemail}`,
        "phone": `${myphoneno}`,
        "hobbies": `${myhobbies}`,
    };
    var datas = "data" + id;

    if (document.getElementById(senderId).checked != false) {
        dataToBeSend[datas] = adddata;
    } else {
        delete dataToBeSend[datas];
    }
    document.getElementById("maildata").value = JSON.stringify(dataToBeSend)
}

if(!window.location.hash.includes("#freshpage")) {
    window.location.href += "#freshpage";
    window.location.reload()
}





