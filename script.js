class Schedule {
	constructor(id) {
		this.baseURL = "https://siseveeb.voco.ee/veebilehe_andmed/tunniplaan?grupp="+id+"&nadal="+weekStart;
	}

	set data(data) {
		this.allData = data;
		this.currentDate = data.nadal;
		this.lastUpdated = data.viimane_muudatus;
		this.times = data.ajad;
		this.classes = data.tunnid
	}

	getClasses(day) { //Gets classes for N day of the week. (1-5)
		return this.classes[Object.keys(this.classes)[day-1]]
	}
}

var weekDay = new Date().getDay(); //Get weekday index
var weekStart = new Date(Date.now() - 86400000*(weekDay-1)) //Subtract time to get to Monday
.toISOString().split('T')[0] //Convert to YYYY-MM-DD

groups = {ita: new Schedule(1433), its: new Schedule(1508)}

function getSchedule(group) {
	fetch(group.baseURL)
	.then(function(res) {
		return res.json()
	})
	.then(function(resJson) {
		group.data = resJson
	})
	.catch(function(e) {
		console.log("Error")
		console.log(e)
	})
}

var tableRows = [];
var times = ["08:30", "10:15", "11:55", "14:10", "15:45", "17:15"];
var detailVars = ["aine", "ruum", "opetaja"];
var details = ["Aeg", "Aine", "Klassiruum", "\xD5petaja"];

function createTable() {
	let table = document.createElement("table");
	let headerRow = document.createElement("tr");
	headerRow.classList.add("header-row");
	for(let i=0; i<4; i++) {
		let headerText = document.createElement("th");
		headerText.textContent = details[i];
		headerText.classList.add("header-text");
		headerRow.appendChild(headerText);
	}
	table.appendChild(headerRow);

	for(let i=0; i<6; i++) {
		let row = document.createElement("tr");
		let time = document.createElement("th");
		row.classList.add("table-row");
		time.textContent = times[i];
		time.classList.add("table-time");
		row.appendChild(time);
		tableRows.push(row);
		table.appendChild(row);
	}
	document.querySelector("#table-container").appendChild(table);
}

createTable();

const days = ["P\u00fchap\u00e4ev", "Esmasp\u00e4ev", "Teisip\u00e4ev", "Kolmap\u00e4ev", "Neljap\u00e4ev", "Reede", "Laup\u00e4ev"]; //getDay starts at sundays (americans be like)
function populateTable(group, day) {
	document.querySelector("#date-display").textContent = days[new Date(new Date(weekStart)-86400000+86400000*displayedDay).getDay()];
	for(let i in group.getClasses(day)) {
		let classInfo = group.getClasses(day)[i];
		let timeSlot = times.indexOf(classInfo.algus)
		for(let i in detailVars) {
			let elem = document.createElement("td");
			elem.textContent = classInfo[detailVars[i]];
			elem.classList.add("table-text")
			tableRows[timeSlot].appendChild(elem);
		}
		//times.indexOf(groupClass.algus);
	}
	for(let i in tableRows) {
		tableRows[i].childElementCount === 1 ? tableRows[i].classList.add("hidden-row") : tableRows[i].classList.remove("hidden-row")
	}
}

function clearTable() {
	for(let i in tableRows) {
		while(tableRows[i].childElementCount>1) { //more than 1 to exclude the headers
			tableRows[i].children[1].remove();
		}
	}
}

if (!displayedGroup) { //this shouldn't trigger but just in case
	displayedGroup = "ita";
}
let displayedDay = 1;

function changeDay(which) {
	displayedDay += which;
	displayedDay = Math.max(Math.min(displayedDay, 5), 1); //keep it between [1,5]
	clearTable();
	populateTable(groups[displayedGroup], displayedDay);
}

function init() {
	getSchedule(groups[displayedGroup]); //await didn't work here i don't know why
	setTimeout(function(){populateTable(groups[displayedGroup], 1)},500);
	for(let i in groups) {
		if(i !== displayedGroup) { //The displayed group already has data, no need to get twice
			getSchedule(groups[i]);
		}
	}
}

init()
