var InProgress=0;
var AllTasks=0;
var Completed=0;
var Archived=0;
var deleteCounter=0;// to control if we display delete all button or not
var counter=0; // counter for each task (id/class) and checkbox
var shown=0; // default value for all tasks list
var hoverRow;
var hoverRowClass;
var hoverName;
var hoverDate;
var hoverCounter;
var hoverDescription;
var taskNameID;
var taskDateID;
var taskDescriptionID;
var dummy=0;
var hoverNameId;

$(document).ready(function() { 
    // call the tablesorter plugin 
    $("table").tablesorter(); 
}); 

$(function(){
	$("#datepicker1").datepicker(
		);
});

$(function(){
	hideText();
	$("#datepicker").datepicker(
		);
	$(".AllTasks").show();
	$(".Inprogress").hide();
	$(".Completed").hide();
	$(".Archived").hide();
	$("#deleteButton").hide();
	$("#addButton").show();
	$("#col4").hide(); //for all and in progress
	$("#Arc-col4").hide(); // for archived
	$("#comp-col4").hide(); //for completed

	//$("#actionButton").hide();
});

function hideText(){
   	document.getElementById('dummy').style.display = 'none';
 }
function saveHTML(){
    document.getElementById("dummy").value= document.all[0].innerHTML;
    //alert(document.getElementById("dummy").value) 
}
function allTasks() { // show the task page
	$("#col4").hide();
	document.getElementById('taskListName').innerHTML="All Tasks";
	$(".AllTasks").show();
	$(".Inprogress").hide();
	$(".Completed").hide();
	$(".Archived").hide();
	shown=0; 

}
function inProgressTasks() { // show the task page
	$("#col4").hide();
	document.getElementById('taskListName').innerHTML="In Progress";
	$(".Inprogress").show();
	$(".AllTasks").hide();
	$(".Completed").hide();
	$(".Archived").hide();
	shown=1; 
}
function completedTasks() { // show the task page
	$("#col4").hide();
	document.getElementById('taskListName').innerHTML="Completed";
	$(".Completed").show();
	$(".Inprogress").hide();
	$(".AllTasks").hide();
	$(".Archived").hide();
	shown=2; 
}
function archivedTasks() { // show the task page
	$("#col4").hide();
	document.getElementById('taskListName').innerHTML="Archived";
	$(".Archived").show();
	$(".Inprogress").hide();
	$(".Completed").hide();
	$(".AllTasks").hide();
	shown=3; 
}


function saveNewTask(){  // save a task 4 the first time
	counter++;
	var i // to save counter
	var table=document.getElementById('AllTasks');
	var taskName=document.getElementById('taskName').value;
	var dueDate=$('#datepicker').datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
	dueDate.id="dueDate"+counter;
	var row=document.createElement("tr");
	var col1=document.createElement("td");
	var col2=document.createElement("td");
	var col3=document.createElement("td");
	var col4=document.createElement("td");
	var taskDescription=document.createElement("p");
	taskDescription.innerText=document.getElementById('description').value;
	var col5=document.createElement("td");
	col5.innerText=taskDescription.innerText;
	col5.id="taskDescriptionID"+counter;
	$('#'+col5.id).hide();
	col4.id="col4"+counter;
	var actionButton2=$('#actionButton');
	var actionButton = actionButton2.clone();
	actionButton.attr("id","actionButtonId"+counter);
	actionButton.attr("className","actionButtonClass"+counter);
	//actionButton.id="actionButtonId"+counter;
	//actionButton.className="actionButtonClass"+counter;
	actionButton.appendTo(col4);
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "name";
	checkbox.value = "value";
	checkbox.id = "checkboxId"+counter;
	checkbox.className="checkboxClass"+counter;
	//checkboxCounter++;
	col1.appendChild(checkbox);
	col2.innerText=taskName;
	col3.innerText=dueDate;
	//col4.appendChild(actionButton);
	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	row.id="rowId"+counter;
	row.className="rowClass"+counter;
	$('#AllTasks').prepend(row);
	//table.appendChild(row);
	AllTasks++;
	$('#'+col4.id).hide();
	$('#'+col5.id).hide();
	
	i=counter;

	var no = document.getElementById('allNo'); // number displayed next to task list name
	no.innerText=AllTasks;	

	$('#'+row.id).hover(
    function() {
    	hoverRow=row.id;
    	hoverRowClass=row.className;
		hoverName=col2.innerText;
 		hoverDate=col3.innerText;
		hoverDescription =col5.innerText;
		hoverCounter=i;
		//taskName.id = "try";
		//taskNameID = "try";
        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);

$('#'+actionButton.id).hover(
    function() {

        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);
	document.getElementById(checkbox.id).onclick = function() {
		if ( this.checked ) {
			deleteChecked();
		} 
		else{
			donotDelete();
		}
	};
	$(table).trigger("update");
	$(table).trigger("appendCache");
		// to add to inprogress too
			SaveInProgressTask();
			allTasks();

	var saveHTML = document.documentElement.innerHTML;
}




function SaveInProgressTask(){ //save task by default after adding it to all tasks (for the 1st time)
	var i;
	var table=document.getElementById('InProgress');
	var taskName=document.getElementById('taskName').value;
	var dueDate=$('#datepicker').datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
	var taskDescription=document.getElementById('description').value;
	taskDescription.id="taskDescriptionIDTwo"+counter;
	var row=document.createElement("tr");
	var col1=document.createElement("td");
	var col2=document.createElement("td");
	var col3=document.createElement("td");
	var col4=document.createElement("td");

	

	//DESCRIPTION
	var taskDescription=document.createElement("p");
	taskDescription.innerText=document.getElementById('description').value;
	var col5=document.createElement("td");
	col5.innerText=taskDescription.innerText;
	col5.id="taskDescriptionIDTwo"+counter;


	col4.id="col4Two"+counter;
	var actionButton2=$('#actionButton');
	var actionButton = actionButton2.clone();
	actionButton.attr("id","actionButtonIdTwo"+counter);
	actionButton.attr("className","actionButtonClass"+counter);
	actionButton.appendTo(col4);
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "name";
	checkbox.value = "value";
	checkbox.id = "checkboxIdTwo"+counter; // id for inprogress
	checkbox.className="checkboxClass"+counter;
	col1.appendChild(checkbox);
	col2.innerText=taskName;
	col3.innerText=dueDate;
	col2.id="taskNameIDTwo"+counter;
	col3.id="dueDateIdTwo"+counter;
	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	row.id="rowId"+counter;
	row.id="rowIdTwo"+counter;
	row.className="rowClass"+counter;
	$('#InProgress').prepend(row);
	//table.appendChild(row);


	$('#'+col4.id).hide();
	$('#'+col5.id).hide();

	InProgress++;
	i=counter;
	
	var no = document.getElementById('inNo'); // number displayed next to task list name
	no.innerText=InProgress;	
	$('#'+row.id).hover(
    function() {
		hoverRow=row.id;
    	hoverRowClass=row.className;
		hoverName=col2.innerText;
 		hoverDate=col3.innerText;
		hoverCounter=i;
		hoverDescription =col5.innerText;
        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);

$('#'+actionButton.id).hover(
    function() {

        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);
	document.getElementById(checkbox.id).onclick = function() {
    if ( this.checked ) {
        deleteChecked();
    } 
    else{
    	donotDelete();
    }
};
	$(table).trigger("update");
	$(table).trigger("appendCache");

}



function saveArchive(){
	var i;
	var tempShown=shown;
	var table=document.getElementById('Archived');
	var taskName=hoverName;
	var dueDate=hoverDate;
	var row=document.createElement("tr");
	var col1=document.createElement("td");
	var col2=document.createElement("td");
	var col3=document.createElement("td");
	var col4=document.createElement("td");
	col4.id="col4Four"+hoverCounter;

	//DESCRIPTION
	var taskDescription=document.createElement("p");
	taskDescription.innerText=hoverDescription;
	var col5=document.createElement("td");
	col5.innerText=taskDescription.innerText;
	col5.id="taskDescriptionIDFour"+counter;


	var actionButton2=$('#actionButton2');
	var actionButton = actionButton2.clone();
	actionButton.attr("id","actionButtonIdFour"+hoverCounter);
	actionButton.attr("className","actionButtonClass"+hoverCounter);
	actionButton.appendTo(col4);
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "name";
	checkbox.value = "value";
	checkbox.id = "checkboxIdFour"+hoverCounter; // id for inprogress
	checkbox.className="checkboxClass"+hoverCounter;
	col1.appendChild(checkbox);
	col2.innerText=taskName;
	col3.innerText=dueDate;
	col2.id="taskNameIDFour"+counter;
	col3.id="dueDateIdFour"+counter;
	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	row.id="rowIdFour"+hoverCounter;
	row.className="rowClass"+hoverCounter;
	$('#Archived').prepend(row);
	//table.appendChild(row);
	i=hoverCounter;

	
	$('#'+col4.id).hide();
	$('#'+col5.id).hide();


	Archived++;
	var no = document.getElementById('arcNo'); // number displayed next to task list name
	no.innerText=Archived;	
	$('#'+row.id).hover(
    function() {
		hoverRow=row.id;
    	hoverRowClass=row.className;
		hoverName=col2.innerText;
 		hoverDate=col3.innerText;
		hoverCounter=i;
		hoverDescription =col5.innerText;
        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);

$('#'+actionButton.id).hover(
    function() {

        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);

	document.getElementById(checkbox.id).onclick = function() {
    if ( this.checked ) {
        deleteChecked();
    } 
    else{
    	donotDelete();
    }

};
			allTasks();
			if ($('#rowId'+hoverCounter).is(":visible")){
			    //remove it from other tasks
    			$('#rowId'+hoverCounter).hide();
				AllTasks--;
				var no = document.getElementById('allNo'); // number displayed next to task list name
				no.innerText=AllTasks;
			}
			inProgressTasks(); //make it visible to delete task if exist
			if ($('#rowIdTwo'+hoverCounter).is(":visible")){
				$('#rowIdTwo'+hoverCounter).hide();
				InProgress--;
				var no = document.getElementById('inNo'); // number displayed next to task list name
				no.innerText=InProgress;
			}
			
			completedTasks(); //make it visible to delete task if exist
			if ($('#rowIdThree'+hoverCounter).is(":visible")){
				$('#rowIdThree'+hoverCounter).hide();
				Completed--;
				var no = document.getElementById('compNo'); // number displayed next to task list name
				no.innerText=Completed;
			}

		if (tempShown==0){
			allTasks();
		}
		else if (tempShown==1){
			inProgressTasks();
		}
		else if (tempShown==2){
			completedTasks();
		}
		else if (tempShown==3){
			archivedTasks();
		}
		$(table).trigger("update");
		$(table).trigger("appendCache");
}



function saveCompleted(){
	var i;
	var tempShown=shown;
	var table=document.getElementById('Completed');
	var taskName=hoverName;
	var dueDate=hoverDate;
	var row=document.createElement("tr");
	var col1=document.createElement("td");
	var col2=document.createElement("td");
	var col3=document.createElement("td");
	var col4=document.createElement("td");
	col4.id="col4Three"+hoverCounter;

	//DESCRIPTION
	var taskDescription=document.createElement("p");
	taskDescription.innerText=hoverDescription;
	var col5=document.createElement("td");
	col5.innerText=taskDescription.innerText;
	col5.id="taskDescriptionIDThree"+counter;

	var actionButton2=$('#actionButton3');
	var actionButton = actionButton2.clone();
	actionButton.attr("id","actionButtonIdThree"+hoverCounter);
	actionButton.attr("className","actionButtonClass"+hoverCounter);
	actionButton.appendTo(col4);
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "name";
	checkbox.value = "value";
	checkbox.id = "checkboxIdThree"+hoverCounter; 
	checkbox.className="checkboxClass"+hoverCounter;
	col1.appendChild(checkbox);
	col2.innerText=taskName;
	col3.innerText=dueDate;
	col2.id="taskNameIDThree"+counter;
	col3.id="dueDateIdThree"+counter;
	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	row.id="rowIdThree"+hoverCounter;
	row.className="rowClass"+hoverCounter;
	$('#Completed').prepend(row);
	//table.appendChild(row);
	i=hoverCounter;

	$('#'+col4.id).hide();
	$('#'+col5.id).hide();

	Completed++;
	var no = document.getElementById('compNo'); // number displayed next to task list name
	no.innerText=Completed;	
	$('#'+row.id).hover(
    function() {
		hoverRow=row.id;
    	hoverRowClass=row.className;
		hoverName=col2.innerText;
 		hoverDate=col3.innerText;
		hoverCounter=i;
		hoverDescription =col5.innerText;
        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);

$('#'+actionButton.id).hover(
    function() {

        $('#'+col4.id).show();
        $(this).addClass('hover');
    },
    function() {
       $('#'+col4.id).hide();
       $(this).removeClass("hover");
    }
	);

	document.getElementById(checkbox.id).onclick = function() {
    if ( this.checked ) {
        deleteChecked();
    } 
    else{
    	donotDelete();
    }

};


 // clear in progress
 			inProgressTasks(); //make it visible to delete task if exist
			if ($('#rowIdTwo'+hoverCounter).is(":visible")){
				$('#rowIdTwo'+hoverCounter).hide();
				InProgress--;
				var no = document.getElementById('inNo'); // number displayed next to task list name
				no.innerText=InProgress;
			}
		var newRow=$('#rowId'+hoverCounter);
		var table2=document.getElementById("allTasks");
		//newRow.prependto(table2);
		//$(table2).append(row);

		$("#rowId"+1).after(newRow);
		$('#rowId'+hoverCounter).css('text-decoration','line-through');

			if (tempShown==0){
			allTasks();
		}
		else if (tempShown==1){
			inProgressTasks();
		}
		else if (tempShown==2){
			completedTasks();
		}
		else if (tempShown==3){
			archivedTasks();
		}
		$(table).trigger("update");
		$(table).trigger("appendCache");

}






function deleteChecked(){ // show delete all box
	deleteCounter++;
	$("#addButton").hide();
	$("#deleteButton").show();

}
function donotDelete(){ //remove the delete all box
	deleteCounter--;
	if (deleteCounter==0){
		$("#addButton").show();
		$("#deleteButton").hide();
	}
}

function deleteAll(){
	var tempShown=shown; //to return to ur last location
	var i=1;
	while (i<=counter){
		if(($('#checkboxId' +i).is(":checked"))||($('#checkboxIdTwo'+i).is(":checked"))||($('#checkboxIdThree'+i).is(":checked"))||($('#checkboxIdFour'+i).is(":checked"))){ 
			allTasks();
			if ($('#rowId'+i).is(":visible")){
				AllTasks--;
				var no = document.getElementById('allNo'); // number displayed next to task list name
				no.innerText=AllTasks;
			}
			inProgressTasks(); //make it visible to delete task if exist
			if ($('#rowIdTwo'+i).is(":visible")){
				InProgress--;
				var no = document.getElementById('inNo'); // number displayed next to task list name
				no.innerText=InProgress;
			}
			
			completedTasks(); //make it visible to delete task if exist
			if ($('#rowIdThree'+i).is(":visible")){
				Completed--;
				var no = document.getElementById('compNo'); // number displayed next to task list name
				no.innerText=Completed;
			}
			archivedTasks(); //make it visible to delete task if exist
			if ($('#rowIdFour'+i).is(":visible")){
				Archived--;
				var no = document.getElementById('arcNo'); // number displayed next to task list name
				no.innerText=Archived;
			}	
			$('.rowClass'+i).hide();    	
		}
		i++;
	}
		if (tempShown==0){
			allTasks();
		}
		else if (tempShown==1){
			inProgressTasks();
		}
		else if (tempShown==2){
			completedTasks();
		}
		else if (tempShown==3){
			archivedTasks();
		}
		$("#addButton").show();
		$("#deleteButton").hide();
		deleteCounter=0;
		$(table).trigger("update");
		$(table).trigger("appendCache");

}

function ClearFields() {

     document.getElementById("taskName").value = "";
     $.datepicker._clearDate('#datepicker');
	 document.getElementById("description").value = "";
}

function editTask() {
	//ClearFields();
	//$('#editModal').show();
	var $datepicker = $('#datepicker1');
	$datepicker.datepicker();
	$datepicker.datepicker('setDate', hoverDate);
	document.getElementById("taskName1").value = hoverName;
	document.getElementById("description1").value = hoverDescription;
	$('#editModal').show();
}

function saveEdit() {
	//var x = document.getElementById(taskNameID);
	//var y = document.getElementById(taskDateID);
	//var x=hoverName;
	//var y = hoverDate;
	var x = document.getElementById("taskName1").value;
	var y = $('#datepicker1').datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
	var z=document.getElementById('description1').value;
		//taskNameID.innerHTML = x;
		//hoverName=x;
 		//hoverDate=y;
//		hoverDescription = description;
	var tempShown=shown;
			allTasks();
			if ($('#rowId'+hoverCounter).is(":visible")){
				document.getElementById("taskNameID"+hoverCounter).innerText=x;
				document.getElementById("dueDateId"+hoverCounter).innerText=y;
				document.getElementById("taskDescriptionID"+hoverCounter).innerText=z;
			}
			inProgressTasks(); //make it visible to delete task if exist
			if ($('#rowIdTwo'+hoverCounter).is(":visible")){
				document.getElementById("taskNameIDTwo"+hoverCounter).innerText=x;
				document.getElementById("dueDateIdTwo"+hoverCounter).innerText=y;
				document.getElementById("taskDescriptionIDTwo"+hoverCounter).innerText=z;
			}
			
			completedTasks(); //make it visible to delete task if exist
			if ($('#rowIdThree'+hoverCounter).is(":visible")){
				document.getElementById("taskNameIDThree"+hoverCounter).innerText=x;
				document.getElementById("dueDateIdThree"+hoverCounter).innerText=y;
				document.getElementById("taskDescriptionIDThree"+hoverCounter).innerText=z;
			}
			archivedTasks(); //make it visible to delete task if exist
			if ($('#rowIdFour'+hoverCounter).is(":visible")){
			document.getElementById("taskNameIDFour"+hoverCounter).innerText=x;
			document.getElementById("dueDateIdFour"+hoverCounter).innerText=y;
			document.getElementById("taskDescriptionIDFour"+hoverCounter).innerText=z;
			}	

		if (tempShown==0){
			allTasks();
		}
		else if (tempShown==1){
			inProgressTasks();
		}
		else if (tempShown==2){
			completedTasks();
		}
		else if (tempShown==3){taskNameID
			archivedTasks();
		}
	if( document.getElementById('taskName').value === '' ){
      alert('The task name is a required field.');
    }
	cancelEditModal();
}

function cancelEditModal() {
	$('#editModal').hide();
	$('.modal-backdrop').remove();
}

function validateInput() {
	if( document.getElementById('taskName').value === '' ){
      alert('The task name is a required field.');
    }
	else{
		saveNewTask();
		$('#myModal').hide();
		$('.modal-backdrop').remove();
	}
}

function deleteOneTask(){
	var tempShown=shown; //to return to ur last location
			allTasks();
			if ($('#rowId'+hoverCounter).is(":visible")){
				AllTasks--;
				var no = document.getElementById('allNo'); // number displayed next to task list name
				no.innerText=AllTasks;
			}
			inProgressTasks(); //make it visible to delete task if exist
			if ($('#rowIdTwo'+hoverCounter).is(":visible")){
				InProgress--;
				var no = document.getElementById('inNo'); // number displayed next to task list name
				no.innerText=InProgress;
			}
			
			completedTasks(); //make it visible to delete task if exist
			if ($('#rowIdThree'+hoverCounter).is(":visible")){
				Completed--;
				var no = document.getElementById('compNo'); // number displayed next to task list name
				no.innerText=Completed;
			}
			archivedTasks(); //make it visible to delete task if exist
			if ($('#rowIdFour'+hoverCounter).is(":visible")){
				Archived--;
				var no = document.getElementById('arcNo'); // number displayed next to task list name
				no.innerText=Archived;
			}	
			$('.rowClass'+hoverCounter).hide(); 
		if (tempShown==0){
			allTasks();
		}
		else if (tempShown==1){
			inProgressTasks();
		}
		else if (tempShown==2){
			completedTasks();
		}
		else if (tempShown==3){
			archivedTasks();
		}			
		$(table).trigger("update");
		$(table).trigger("appendCache");	
}

