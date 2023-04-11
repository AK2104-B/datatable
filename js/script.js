let table;
let ans = {};
var editor;
let number = 1;
let upob;
var popUp;
let n = 2;
let r = 1;
const add_btn = document.getElementById("plus");
const parent = document.getElementById("parent");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///data table///
$(document).ready(function () {
    let e = 0;
    // Add event listener for opening and closing details
    $('#example').on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        } else {
            // Open this row
            row.child(format(row.data())).show();
        }
    });

    $('#example').on('requestChild.dt', function (e, row) {
        row.child(format(row.data())).show();


    });
    table = $('#example').DataTable({
        data: myArray,
        rowId: 'id',
        stateSave: true,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { data: 'firstName' },
            { data: 'lastName' },
            {
                data: null,
                "mRender": function (o) {
                    return (new Date(o.dateOfBirth).toString().slice(4, 16));

                }
            },
            { data: 'contactNumber' },
            { data: 'email' },
            { data: 'address' },
            {
                "data": null,
                "bSortable": false,
                className: "dt-center",
                "mRender": function (o) {
                    return `<button class="custom-btn btn-3 btnAction m-1 edit editcu" id="` + o._id + `" onclick="edit(this.id)" data-toggle="modal" data-target="#exampleModalCenter">
                                  <span><i class="fas fa-edit editcu"></i></span></button>
                                  <button class="custom-btn btn-3 btnAction m-1 delete editcu" id='delete${o._id}' onclick=delet("${o._id}")>
                                <span><i class="fa fa-trash" aria-hidden="true"></i></span></button>
                                 `;
                }

            }

        ],
        order: [[1, 'asc']],
    });
    function format(d) {
        // `d` is the original data object for the row
        console.log(d);
        let t =
            `<table cellpadding="4" cellspacing="0" border="0" style="padding-left:50px; width:100%" class="dt-control" >
                <tr>
                    <td>Degree:</td>
                    <td>InstituteName:</td>
                    <td>StartDate:</td>
                    <td>PassoutYear:</td>
                    <td>Percentage:</td>
                    <td>Backlogs:</td>
                </tr> `
        let str = "";
        for (let i = 0; i < d.Education.length; i++) {
            str += `<tr>`

            str += `<td>${d.Education[i].degree}</td>`
            str += `<td>${d.Education[i].instituteName}</td>`
            str += `<td>${new Date(d.Education[i].startDate).toString().slice(4, 16)}</td>`
            str += `<td>${(d.Education[i].passoutYear)}</td>`
            str += `<td>${d.Education[i].percentage}</td>`
            str += `<td>${d.Education[i].backlogs}</td>`

            str += `</tr>`
        }
        str += '</table>'
        t += str;
        return (t);
    }
});
///button///

add_btn.addEventListener("click", () => {
    if (n === 0) { n = 2 }
    const new_field = document.createElement("div");
    new_field.setAttribute("id", "field" + n);
    new_field.setAttribute("class", "col");
    new_field.setAttribute("class", "d-flex justify-content-center flex-row mb-3");
    new_field.innerHTML = `
<div class="col pe-3 " id="degree-main-div${n} ">

    <input type="text" class="form-control" id="degree${n}" placeholder="Degree ">
    <b><span id="degree_err${n}" class="text-danger"> </span></b>
</div>
<div class="col pe-3 " id="collage-main-div${n}">

    <input type="text" class="form-control" name="" id="collage${n}" placeholder="Collage">
    <b><span id="collage_err${n}" class="text-danger"> </span></b>
</div>
<div class="col pe-3  " id="start-main-div${n}">

    <input type="date" class="form-control"  id="starting${n}">
    <b><span id="sdate_err${n}" class="text-danger"> </span></b>
</div>
<div class="col pe-3 " id="end-main-div${n}">

    <input type="number" class="form-control"  id="ending${n}" min="0000" max="5000" placeholder="YYYY">
    <b><span id="edate_err${n}" class="text-danger "> </span></b>
</div>
<div class="col pe-3 " id="cgpa-main-div${n}">

    <input type="number" class="form-control" placeholder="%" id="cgpa-degree${n}">
    <b><span id="cgpa_err${n}" class="text-danger"> </span></b>
</div>
<div class="col pe-3" id="backlog-main-div${n}">

    <input type="number" class="form-control" placeholder="if any" id="backlog${n}">
    <b><span id="backlog_err${n}" class="text-danger"> </span></b>
</div>
<div class="col  d-flex justify-content-end" id="delete-div${n}">
<button id="delete${n}" onclick="remove(field${n})" type="button" class="btn btn-outline-danger cd"><i class="fa fa-trash" aria-hidden="true"></i></button>

</div>
    `;
    parent.appendChild(new_field);
    n++;
});

function validate() {
    // to hide update button

    ans = {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        contactNumber: "",
        email: "",
        address: "",
        Education: []
    }

    let te = 0;
    let re = 0;
    var d = false;
    const first = document.getElementById("firstname").value;
    const ferror = document.getElementById("firstnam");
    const last = document.getElementById("lastname").value;
    const lerror = document.getElementById("lastnam");
    const dateofbirth = document.getElementById("dateofbirth").value;
    const dateerror = document.getElementById("dateofbirt");
    const contact = document.getElementById("contact").value;
    const conterr = document.getElementById("contac");
    const email = document.getElementById("email").value;
    const emailerror = document.getElementById("emai");
    const address = document.getElementById("address").value;
    const addresserror = document.getElementById("addres");
    var regName = /^[a-zA-Z]+$/;
    var regValue = /^[0-9]+$/;
    var phoneno = /^\d{10}$/;
    var mailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (first == " " || first >= 0) {
        d = false;
        te++;
        seterr(ferror);
    }
    else {
        d = true;
        re++;
        ans.firstName = first;
        removeerr(ferror);
    }

    //lastname name validation
    if (last == " " || last >= 0) {
        d = false;
        te++;
        seterr(lerror);
    }
    else {
        d = true;
        re++;
        ans.lastName = last;
        removeerr(lerror);
    }

    //date of birth
    if (dateofbirth == '') {
        d = false;
        te++;
        seterr(dateerror);
    }
    else {
        d = true;
        re++;

        ans.dateOfBirth = new Date(dateofbirth);
        removeerr(dateerror);
    }
    //contact information
    if (contact == '') {
        d = false;
        te++;
        seterr(conterr);
    }
    else {
        d = true;
        re++;
        ans.contactNumber = contact;
        removeerr(conterr);
    }
    //email validation
    if (!mailFormat.test(email)) {
        d = false;
        te++;
        seterr(emailerror);
    }
    else {
        d = true;
        re++;
        ans.email = email;
        removeerr(emailerror);
    }
    //address validation
    if (address == " ") {
        d = false;
        te++;
        seterr(addresserror);

    }
    else {
        d = true;
        re++;
        ans.address = address;
        removeerr(addresserror);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //dinamic components
    if (n == 0) { n = 2 }
    for (let i = 0; i < n; i++) {

        if (document.getElementById("degree" + i)) {
            const degree = document.getElementById("degree" + i).value;
            const degree_err = document.getElementById("degree_err" + i);
            const collage = document.getElementById("collage" + i).value;
            const collage_err = document.getElementById("collage_err" + i);
            const starting = document.getElementById("starting" + i).value;
            const starting_err = document.getElementById("sdate_err" + i);
            const ending = document.getElementById("ending" + i).value;
            const ending_err = document.getElementById("edate_err" + i);
            const cgpa = document.getElementById("cgpa-degree" + i).value;
            const cgpa_err = document.getElementById("cgpa_err" + i);
            const backlog = document.getElementById("backlog" + i).value;
            const backlog_err = document.getElementById("backlog_err" + i);
            //degree validation
            if (degree == " ") {
                d = false;
                te++;
                seterr(degree_err);
            }
            else {
                d = true;
                re++;
                removeerr(degree_err);
            }
            //collage validation
            if (collage == " ") {
                d = false;
                te++;
                seterr(collage_err);
            }
            else {
                d = true;
                re++;
                removeerr(collage_err);
            }
            //starting date
            if (starting == '') {
                d = false;
                te++;
                seterr(starting_err);
            }
            else {
                d = true;
                re++;
                removeerr(starting_err);
            }
            //ending validation
            if (ending == '') {
                d = false;
                te++;
                seterr(ending_err);
            }
            else {
                d = true;
                re++;
                removeerr(ending_err);
            }
            //cgpa
            if (!regValue.test(cgpa)) {
                d = false;
                te++;
                seterr(cgpa_err);
            }
            else {
                d = true;
                re++;
                removeerr(cgpa_err);
            }
            //backlog
            if (!regValue.test(backlog)) {
                d = false;
                te++;
                seterr(backlog_err);
            }
            else {
                d = true;
                re++;
                removeerr(backlog_err);
            }
        } else {
            continue;
        }
    }
    if (d == true && te == 0) {

        console.log(ans.dateOfBirth);
        let objnew = {};
        let arr = [];
        for (let i = 0; i < n; i++) {
            if (document.getElementById(`degree${i}`)) {
                var nd = new Date(document.getElementById(`starting${i}`).value);
                var end = new Date(document.getElementById(`ending${i}`).value);
                objnew = {
                    degree: document.getElementById(`degree${i}`).value,
                    instituteName: document.getElementById(`collage${i}`).value,
                    startDate: nd.getFullYear() + '-' + (nd.getMonth() + 1).toString().padStart(2, 0) + '-' + (nd.getDate() + 1).toString().padStart(2, 0),
                    passoutYear: end.getFullYear(),
                    percentage: document.getElementById(`cgpa-degree${i}`).value,
                    backlogs: document.getElementById(`backlog${i}`).value
                }
                arr.push(objnew);
            }
            else {
                continue;
            }
        }
        //to display the data

        ans.Education = arr;

        mydata = JSON.stringify(ans);
        console.log(mydata)
        let up = document.getElementById("submit");
        if (up.style.display != "none") {

            (async () => {
                let rawResponse = await fetch('http://192.168.3.51:1100/api/addUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ans),
                });
            })().catch(error => {
                console.log(error)
            });
            setTimeout(function () {
                table.ajax.reload();
            }, 500);
            console.log(ans);
            // number++;
        }
        else {
            upob = ans;
        }
        document.getElementById("my-form").reset();
        r++;
    }
    return d;
};
document.getElementById("my-form").addEventListener("submit", (e) => {
    e.preventDefault();
});
function remove(field) {

    parent.removeChild(field);

}
//error seter/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function seterr(id) {
    // console.log(id);
    id.innerHTML = "Invalid Input";
}
//remove error////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeerr(id) {
    id.innerHTML = " ";
}
//delete function
function delet(str) {
    let pop = confirm("Want To Delete The Row?")
    if (pop) {
        const deapi = 'http://192.168.3.51:1100/api/deleteUserbyId/' + str;
        fetch(deapi, { method: 'DELETE' })

        setTimeout(function () {
            table.ajax.reload();
        }, 5);
    }
}
function edit(idbtn) {
    let a
    document.getElementById("update").style = "display:block;";
    document.getElementById("submit").style.display = "none";
    let res = "http://192.168.3.51:1100/api/getUserById/" + idbtn;
    myedit();
    async function myedit() {
        const response = await fetch(res);
        a = await response.json();
        let esd = new Date(a.data[0].dateOfBirth);

        console.log(esd.getMonth() + "-" + esd.getDate() + "-" + esd.getFullYear());

        document.getElementById('firstname').value = a.data[0].firstName;
        document.getElementById('lastname').value = a.data[0].lastName;
        document.getElementById('dateofbirth').value = (esd.getFullYear() + "-" + (esd.getMonth() + 1).toString().padStart(2, 0) + "-" + esd.getDate().toString().padStart(2, 0));
        document.getElementById('email').value = a.data[0].email;
        document.getElementById('address').value = a.data[0].address;
        n = 0;
        for (let pn = 0; pn < a.data[0].Education.length; pn++) {
            if (parent.children.length < a.data[0].Education.length) {
                const new_field = document.createElement("div");
                new_field.setAttribute("id", "field" + n);
                new_field.setAttribute("class", "col");
                new_field.setAttribute("class", "d-flex justify-content-center flex-row mb-3");
                new_field.innerHTML = `
            <div class="col pe-3 " id="degree-main-div${n} ">
            
                <input type="text" class="form-control" id="degree${n}" placeholder="Degree ">
                <b><span id="degree_err${n}" class="text-danger"> </span></b>
            </div>
            <div class="col pe-3 " id="collage-main-div${n}">
            
                <input type="text" class="form-control" name="" id="collage${n}" placeholder="Collage">
                <b><span id="collage_err${n}" class="text-danger"> </span></b>
            </div>
            <div class="col pe-3  " id="start-main-div${n}">
            
                <input type="date" class="form-control"  id="starting${n}">
                <b><span id="sdate_err${n}" class="text-danger"> </span></b>
            </div>
            <div class="col pe-3 " id="end-main-div${n}">
            
                <input type="number" class="form-control"  id="ending${n}" min="0000" max="5000" placeholder="YYYY">
                <b><span id="edate_err${n}" class="text-danger "> </span></b>
            </div>
            <div class="col pe-3 " id="cgpa-main-div${n}">
            
                <input type="number" class="form-control" placeholder="%" id="cgpa-degree${n}">
                <b><span id="cgpa_err${n}" class="text-danger"> </span></b>
            </div>
            <div class="col pe-3" id="backlog-main-div${n}">
            
                <input type="number" class="form-control" placeholder="if any" id="backlog${n}">
                <b><span id="backlog_err${n}" class="text-danger"> </span></b>
            </div>
            <div class="col  d-flex justify-content-end" id="delete-div${n}">
            <button id="delete${n}" onclick="remove(field${n})" type="button" class="btn btn-outline-danger cd"><i class="fa fa-trash" aria-hidden="true"></i></button>
            
            </div>
                `;
                parent.appendChild(new_field);
                n++;
            }
        }
        let f = 0;

        for (let j = 0; j < a.data[0].Education.length; j++) {
            let es = new Date(a.data[0].Education[j].startDate);
            let ep = new Date(a.data[0].Education[j].passoutYear);
            document.getElementById(`degree${f}`).value = a.data[0].Education[j].degree;
            document.getElementById(`collage${f}`).value = a.data[0].Education[j].instituteName;
            document.getElementById(`starting${f}`).value = (es.getFullYear() + "-" + (es.getMonth() + 1).toString().padStart(2, 0) + "-" + es.getDate().toString().padStart(2, 0));
            document.getElementById(`ending${f}`).value = (ep.getFullYear());
            document.getElementById(`cgpa-degree${f}`).value = a.data[0].Education[j].percentage;
            document.getElementById(`backlog${f}`).value = a.data[0].Education[j].backlogs;
            f++;
        }
        //for update functionality
        document.getElementById("update").onclick = () => {
            const res = validate();
            if (res) {
                let up = 'http://192.168.3.51:1100/api/updateUser/' + idbtn;
                (async () => {
                    let rawResponse = await fetch(up, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(upob),
                    });
                })().catch(error => {
                    console.log(error)
                });
                setTimeout(function () {
                    table.ajax.reload();
                }, 500);
            }
        }
    }
}
//to reset form after///////////////////////////////////////////////////////////////////////////////////////////////////
function resetform() {
    document.getElementById("firstnam").innerHTML = " ";
    document.getElementById("lastnam").innerHTML = " ";
    document.getElementById("dateofbirt").innerHTML = " ";
    document.getElementById("contac").innerHTML = " ";
    document.getElementById("emai").innerHTML = " ";
    document.getElementById("addres").innerHTML = " ";
    document.getElementById("firstname").value = " ";
    document.getElementById("lastname").value = " ";
    document.getElementById("dateofbirth").value = " ";
    document.getElementById("contact").value = " ";
    document.getElementById("email").value = " ";
    document.getElementById("address").value = " ";
    for (let i = 0; i < 2; i++) {
        document.getElementById(`degree${i}`).value = " ";
        document.getElementById(`collage${i}`).value = " ";
        document.getElementById(`starting${i}`).value = " ";
        document.getElementById(`ending${i}`).value = " ";
        document.getElementById(`cgpa-degree${i}`).value = " ",
        document.getElementById(`backlog${i}`).value = " ";
        document.getElementById(`degree_err${i}`).innerHTML = " ";
        document.getElementById(`collage_err${i}`).innerHTML = " ",
        document.getElementById(`sdate_err${i}`).innerHTML = " ",
        document.getElementById(`edate_err${i}`).innerHTML = " ",
        document.getElementById(`cgpa_err${i}`).innerHTML = " ",
        document.getElementById(`backlog_err${i}`).innerHTML = " ";
    }
    const nu = document.getElementById("parent").children.length;
    while (parent.firstChild) {
        if (parent.children.length == 2) {
            break;
        }
        parent.removeChild(parent.lastChild);
    }
}
document.getElementById("addbtn").addEventListener("click", () => {
    resetform();
    document.getElementById("submit").style.display = "block";
    document.getElementById("update").style.display = "none";
    n = 0;
});
