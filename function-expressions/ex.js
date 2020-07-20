function getStudentById(studentId) {
	return studentRecords.find(function matchId(record){ //function callback
		return (record.id == studentId);  //matches student id with the record id
	});
}
function printRecords(recordIds) {
	var records = recordIds.map(getStudentById);  //takes a list of student ids

	records.sort(function sortByNameAsc(record1,record2){ //sort names in ascending order(callback function)
		if(record1.name < record2.name) {
			return -1;
		}
		else if(record1.name > record2.name){
			return 1;
		}
		else {
			return 0;
		}
	});
		records.forEach(function printRecord(record){
			console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Unpaid"}`);
			
	});
}

function paidStudentsToEnroll() {
	var recordsToEnroll = studentRecords.filter(function needToEnroll(record){
		return (record.paid && !currentEnrollment.includes(record.id)) //if not currenrEnrollments includes record of ids 
	})
	var idsToEnroll = recordsToEnroll.map(function getStudentById(record){
		return record.id;   //lists the student's ids
	});
	return [...currentEnrollment,...idsToEnroll];
}

function remindUnpaid(recordIds) {
	var unpaidIds = recordIds.filter(function isUnpaid(studentId){
		var record = getStudentById(studentId);
		return !record.paid;  //list of ids who's record is in the unpaid
	});
	printRecords(unpaidIds);
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
