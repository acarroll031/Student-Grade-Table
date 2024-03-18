//TODO: make counter for unsubmitted assignments not increase when a blank cell is clicked in and out of

////CHANGE GRADES////


////ADD ROWS/COLUMNS////


////SAVE AND RESTORE TABLE////

//TODO: add buttoms to save current table layout and restore saved layout

//TODO: add functionality to save table contents to be restored later (json??)



$(document).ready(function(){ //Wait until document has finished loading fully
    
    //Sets values to default for 10 rows, 5 assignment columns
    var unsubmitted = 50;
    var totalCells = 50;

    var numRows = 10; //Number of rows (used for adding new rows and increasing ids)
    var numCols = 5; //Number of assignment columns (used for adding new colums)

    //Grade arrays of size 10 to start
    var gradePercent = [];
    var gradeLetter = [];
    var gradeGPA = [];

    var currentGradePres = "percent";

    $('#unsubAss').text(unsubmitted);

    $("#gradeTable").on("focusout", ".assignment", function(){ //When cells of class 'assignment' (input cells) are unselected

        console.log("Running");
        var content = $(this).text();

        if( content === "" || content === "-") // If it is blank or '-'
        {
            $(this).css({ //Align centre and make background yellow
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-"); //If cell is empty, set back to '-'

            // unsubmitted++;
            // if(unsubmitted >= totalCells) //Stops count from increasing if nothing is changed
            // {
            //     unsubmitted = totalCells;
            // }

            averageRow($(this).attr("name"))
        }
        else if (isNaN(content)) // If it is not a number
        {
            $(this).css({ //Align centre and make background yellow
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-"); //Set back to '-'
            alert("Only accepts numbers in the range 0-100"); //Send a banner alert to the user
        }
        else if (content <=100 && content >=0) //If it is between 0 and 100
        {
            $(this).css({ //Align right and make background white
                "textAlign": "right",
                "background" : "white",
            });

            unsubmitted--;
            

            averageRow($(this).attr("name")); // Call averageRow function, including the name attribute to indicate what row it is
        }
        else //Catch all other numbers
        {
            $(this).css({ //Align centre and make background yellow
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-"); //Set back to '-'
            alert("Only accepts numbers in the range 0-100"); //Send a banner alert to the user
        }

        $('#unsubAss').text(unsubmitted);
        
    });
    
    ////Function that iterates through relevant row to calculate the average of the numbers
    function averageRow(name){

        //Initialise variables
        let sum = 0;
        let count = 0;
        let average = 0.0;
        
        let rowClass = "." + name; //Add '.' to indicate it is a class
        let avgID = "#" + name; // Add '#' to indicate it is an id
        
        $(rowClass).each(function(){ //Iterate through each of the cells in the given row (by class)

            let value = $(this).text(); //Let the text in the cell be a variable

            if(!isNaN(value)) //If the value in the cell is a number
            {
                sum += parseFloat(value); //Add  its value to the sum variable
                count++; //Incrament the count of cells to be averaged
            }
        })

        average = Math.round(sum/count); // Get the average of the row

        
        if(isNaN(average)) //Catches problem when removing all values from row
        {
            $(avgID).text('-'); //Resets the text back to empty ('-')
        }
        else //If the average is a valid number
        {
            $(avgID).css("text-align" , "right"); //Right align the number

            gradeStore(average, name); //Store the average in the grade arrays

            switch(currentGradePres){ //Based on what type of grade is being shown currently, update the cell
                case "percent":
                    $(avgID).text(gradePercent[name-1]);
                    break;
                case "letter":
                    $(avgID).text(gradeLetter[name-1]);
                    break;
                case "gpa":
                    $(avgID).text(gradeGPA[name-1]);
                    break;
            }

        }
    
        if(average < 60) //If avg less than 60 make cell red
        {
            $(avgID).css({
                "background" : "red",
                "color" : "white",
            })
        }
        else //Otherwise change cell back to white
        {
            $(avgID).css({
                "background" : "white",
                "color" : "black",
            })
        }

        if(count == 0) //If there are no longer any cells with content (if all content is removed)
        {
            $(avgID).css({ //Reset to centre text align and yellow background
                "textAlign": "center",
                "background" : "yellow",
            })
            $(this).text("-"); //Reset contents of cell to '-' (empty)
        }

    }

    function gradeStore(average, rowNumber){

        let letter, gpa;

        rowNumber -= 1; //removes 1 for array operations

        // if(gradePercent[rowNumber] == null) gradePercent.push(average);
        // else gradePercent[rowNumber] = average;
        gradePercent[rowNumber] = average; //Puts the number into the corresponding index in the array
        console.log(gradePercent);

        ////Letter Grade
        //Changes the letter based on the average percent grade
        if(average >= 93 && average <= 100) letter = "A";
        else if(average >= 90 && average <= 92) letter = "A-";
        else if(average >= 87 && average <= 89) letter = "B+";
        else if(average >= 83 && average <= 86) letter = "B";
        else if(average >= 80 && average <= 82) letter = "B-";
        else if(average >= 77 && average <= 79) letter = "C+";
        else if(average >= 73 && average <= 76) letter = "C";
        else if(average >= 70 && average <= 72) letter = "C-";
        else if(average >= 67 && average <= 69) letter = "D+";
        else if(average >= 63 && average <= 66) letter = "D";
        else if(average >= 60 && average <= 62) letter = "D-";
        else if(average < 60) letter = "F";


        // if(gradeLetter[rowNumber] == null) gradeLetter.push(letter);
        // else gradeLetter[rowNumber] = letter;
        gradeLetter[rowNumber] = letter; //Puts the number into the corresponding index in the array
        console.log(gradeLetter);

        ////GPA
        //Changes the gpa based on the average percent grade
        if(average >= 93 && average <= 100) gpa = "4.0";
        else if(average >= 90 && average <= 92) gpa = "3.7";
        else if(average >= 87 && average <= 89) gpa = "3.3";
        else if(average >= 83 && average <= 86) gpa = "3.0";
        else if(average >= 80 && average <= 82) gpa = "2.7";
        else if(average >= 77 && average <= 79) gpa = "2.3";
        else if(average >= 73 && average <= 76) gpa = "2.0";
        else if(average >= 70 && average <= 72) gpa = "1.7";
        else if(average >= 67 && average <= 69) gpa = "1.3";
        else if(average >= 63 && average <= 66) gpa = "1.0";
        else if(average >= 60 && average <= 62) gpa = "0.7";
        else if(average < 60) gpa = "0";

        // if(gradeGPA[rowNumber] == null) gradeGPA.push(gpa);
        // else gradeGPA[rowNumber] = gpa;
        gradeGPA[rowNumber] = gpa; //Puts the number into the corresponding index in the array
        console.log(gradeGPA);
    }

    $("#averageHead").click(function() {
    
            let gradeArray = [];
            let count = 0;
    
            //Based on the current presentation of the grades, pressing the button will move to the next one
            if(currentGradePres === "percent") 
            {
                gradeArray = gradeLetter; //Lets the blank array be the letter array

                $("#averageHead").text("Average (Letter)") //Updates the text in the average column header

                currentGradePres = "letter"; //Sets current grade presentation to letter
            }
            else if(currentGradePres === "letter") 
            {
                gradeArray = gradeGPA;

                $("#averageHead").text("Average (4.0)")

                currentGradePres = "gpa"
            }
            else if(currentGradePres === "gpa") 
            {
                gradeArray = gradePercent;

                $("#averageHead").text("Average (%)")

                currentGradePres = "percent";
            }
    
            $(".average").each(function() { //Iterates through each of the cells in the column, changing each to the corresponding grade in the array
    
                if(gradeArray[count] != null) //Skips if there is no item in the array
                {
                    $(this).text(gradeArray[count]);
                }
                count++;
            })
    })

    $('#addRow').click(function () {
        numRows++;

        //Create a new row element
        var newRow = $('<tr></tr>');

        // Append first two cells to new row, name and student number cells always added
        newRow.append('<td class="name" contenteditable="true"></td>');
        newRow.append('<td class="id" contenteditable="true"></td>');

        // Append assignment cells for the new row, adding the number of assignment cells needed depending on the number of columns
        for (var i = 0; i < numCols; i++) {
            newRow.append('<td class="assignment '+numRows+'" name="'+numRows+'" contenteditable="true">-</td>');
        }

        // Append the average cell for the new row
        newRow.append('<td class="average" id="'+numRows+'">-</td>');

        // Append the new row to the table
        $("#gradeTable").append(newRow);

        //Update total number of cells
        let newTotalCells = numCols * numRows; //Find new number of cells
        let cellDiff = newTotalCells - totalCells; //Find how many more cells there are

        unsubmitted += cellDiff; //Increase the unsubmitted cell count by how many more cells there are
        totalCells = newTotalCells //Set the total cell count to the new total cell count

        $('#unsubAss').text(unsubmitted); //Change unsubmitted counter 
    })

    $('#addCol').click(function () {

        numCols++;
        $('<th>Assignment ' +numCols+'</th>').insertBefore('#averageHead');

        var id = 0;
        $('tr').each(function () {
            $('<td class="assignment '+id+'"name="'+id+'" contenteditable="true">-</td>').insertBefore($(this).find('.average'));
            id++;
        });

        //Update total number of cells
        let newTotalCells = numCols * numRows; //Find new number of cells
        let cellDiff = newTotalCells - totalCells; //Find how many more cells there are

        unsubmitted += cellDiff; //Increase the unsubmitted cell count by how many more cells there are
        totalCells = newTotalCells //Set the total cell count to the new total cell count

        $('#unsubAss').text(unsubmitted); //Change unsubmitted counter 
    })

    $('#save').click(function() {

        // Save the HTML content of the table
        var savedTableHTML = $('#gradeTable').html();
   
        // Store the saved table HTML in localStorage
        localStorage.setItem('savedTableHTML', savedTableHTML);
        // Optionally, store any other relevant data or state
    });

    $('#restore').click(function() {

        // Retrieve the saved table HTML from localStorage
        var savedTableHTML = localStorage.getItem('savedTableHTML');
        if (savedTableHTML) { //If the save file exists
            // Restore the table HTML
            $('#gradeTable').html(savedTableHTML);
        } else { //Else send error
            alert('No saved data found.');
        }
    });
  });


