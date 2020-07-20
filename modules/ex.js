var deepJS = defineWorkshop();


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


// ********************************

function defineWorkshop() { //module
	var currentEnrollment =[];
	var studentRecords = [];

	var publicAPI = {
		addStudent,
		enrollStudent,
		printCurrentEnrollment,
		enrollPaidStudents,
		remindUnpaidStudents,
	};
	return publicAPI;

	function addStudent(id,name,paid){
		studentRecords.push({ id, name, piad })
	}
	function enrollStudent(id) {
		if(!currentEnrollment.includes(id)){
			currentEnrollment.push(id);
		}
	}
	function printCurrentEnrollment() {
		printRecords(currentEnrollment);
	}
	function enrollPaidStudents() {
		currentEnrollment=paidStudentsToEnroll();
	}
	function remindUnpaidStudents() {
		remindUnpaid(currentEnrollment);
	}
	function getStudentFromId(studentId) {
		return studentRecords.find(matchId);
	
		// *************************
	
		function matchId(record) {
			return (record.id == studentId);
		}
	}
	
	function printRecords(recordIds) {
		var records = recordIds.map(getStudentFromId);
	
		records.sort(sortByNameAsc);
	
		records.forEach(printRecord);
	}
	
	function sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	}
	
	function printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	}
	
	function paidStudentsToEnroll() {
		var recordsToEnroll = studentRecords.filter(needToEnroll);
	
		var idsToEnroll = recordsToEnroll.map(getStudentId);
	
		return [ ...currentEnrollment, ...idsToEnroll ];
	}
	
	function needToEnroll(record) {
		return (record.paid && !currentEnrollment.includes(record.id));
	}
	
	function getStudentId(record) {
		return record.id;
	}
	
	function remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(notYetPaid);
	
		printRecords(unpaidIds);
	}
	
	function notYetPaid(studentId) {
		var record = getStudentFromId(studentId);
		return !record.paid;
	}
	
}
