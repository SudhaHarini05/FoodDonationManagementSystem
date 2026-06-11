let donations = JSON.parse(localStorage.getItem("donations")) || [];

// SAVE DATA
function saveData() {
    localStorage.setItem("donations", JSON.stringify(donations));
}

// ADD DONATION (USER)
function addDonation() {

    let food = document.getElementById("food").value;
    let qty = document.getElementById("qty").value;
    let loc = document.getElementById("loc").value;
    let time = document.getElementById("time").value;

    if (!food || !qty || !loc || !time) {
        alert("Fill all fields");
        return;
    }

    donations.push({
        food,
        qty,
        loc,
        time,
        status: "Available"
    });

    saveData();

    alert("Donation Added");

    renderUserTable();

    document.getElementById("food").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("time").value = "";
}

// USER TABLE
function renderUserTable() {

    let table = document.getElementById("userData");
    if (!table) return;

    table.innerHTML = "";

    donations.forEach(d => {
        table.innerHTML += `
        <tr>
            <td>${d.food}</td>
            <td>${d.qty}</td>
            <td>${d.loc}</td>
            <td>${d.time}</td>
            <td>${d.status}</td>
        </tr>`;
    });
}

// ADMIN TABLE
function renderAdminTable() {

    let table = document.getElementById("adminData");
    if (!table) return;

    table.innerHTML = "";

    donations.forEach((d, i) => {
        table.innerHTML += `
        <tr>
            <td>${d.food}</td>
            <td>${d.qty}</td>
            <td>${d.loc}</td>
            <td>${d.time}</td>
            <td>${d.status}</td>
            <td>
                <button onclick="markClaimed(${i})">Claim</button>
                <button onclick="deleteItem(${i})" style="background:red;">Delete</button>
            </td>
        </tr>`;
    });
}

// ADMIN ACTIONS
function markClaimed(i) {
    donations[i].status = "Claimed";
    saveData();
    renderAdminTable();
}

function deleteItem(i) {
    donations.splice(i, 1);
    saveData();
    renderAdminTable();
}