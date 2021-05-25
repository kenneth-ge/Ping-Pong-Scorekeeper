let checks = document.querySelectorAll('input')
let snackbar = document.getElementById('snackbar');
let errorSnackbar = document.getElementById('errorSnackbar');
let selectTwoSnackbar = document.getElementById('selectTwoSnackbar');
let nameField = document.getElementById('name')

let selectiveCheck = e => {
    var checkedChecks = document.querySelectorAll("input.check:checked");
    if (checkedChecks.length > 2) {
        //show snackbar
        snackbar.className = "snackbar show";

        setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        return false;
    }
    return true
}

for (checkbox of checks) {
    console.log(checkbox)
    checkbox.onclick = selectiveCheck
}

function newName() {
    let name = nameField.value

    if (name && name.length > 0) {
        fetch(`/addName?name=${name}`).then(response => response.json()).then(response => {
            if (response.success) {
                window.location.reload()
            } else {
                errorSnackbar.className = "snackbar show";

                setTimeout(function () { errorSnackbar.className = errorSnackbar.className.replace("show", ""); }, 3000);
            }
        })
    }
}

var checkboxes
function startGame() {
    checkboxes = document.querySelectorAll('input.check:checked');

    if (checkboxes.length == 2) {
        let name1 = checkboxes[0].value
        let name2 = checkboxes[1].value

        document.getElementById('name1').value = '1'
        document.getElementById('name2').value = '2'

        document.getElementById('name1l').innerHTML = name1
        document.getElementById('name2l').innerHTML = name2

        document.getElementById("myForm").style.display = "block";
    } else {
        selectTwoSnackbar.className = "snackbar show";

        setTimeout(function () { selectTwoSnackbar.className = selectTwoSnackbar.className.replace("show", ""); }, 3000);
    }
}

function startGame2() {
    const rbs = document.querySelectorAll('input[name="name"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    if (selectedValue) {
        if (selectedValue == '1') {
            window.location.href = `/game?name1=${checkboxes[0].value}&name2=${checkboxes[1].value}`
        }else{
            window.location.href = `/game?name2=${checkboxes[0].value}&name1=${checkboxes[1].value}`
        }
    }
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}