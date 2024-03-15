//TODO: make counter for unsubmitted assignments increase when cell changed to empty without going over the total number of cells

////CHANGE GRADES////

//TODO: change final grade (average column) between percentage, american letter grand and american gpa, when the header of the column is pressed

////ADD ROWS/COLUMNS////

//TODO: add buttons to create rows and columns below the table

//TODO: add functionality to create new row below the last row in the table

//TODO: add functionality to create a new column between the last assignment column and the final grade column

////SAVE AND RESTORE TABLE////

//TODO: add buttoms to save current table layout and restore saved layout

//TODO: add functionality to save table contents to be restored later (json??)



$(document).ready(function(){ //Wait till document has finished loading fully
    
    var unsubmitted = 50;
    $('#unsubAss').text(unsubmitted);

    $(".assignment").focusout(function(){ //When cells of class 'assignment' (input cells) are click unselected

        var content = $(this).text();

        if( content === "" || content === "-") // If it is blank or '-'
        {
            $(this).css({ //Align centre and make background yellow
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-"); //If cell is empty, set back to '-'

            unsubmitted++;

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
        let avgID = "#" + name; // Add '#' to indicate it is an id;
        
        $(rowClass).each(function(){ //Iterate through each of the cells in the given row (by class)

            let value = $(this).text(); //Let the text in the cell be a variable

            if(!isNaN(value)) //If the value in the cell is a number
            {
                sum += parseFloat(value); //Add  its value to the sum variable
                count++; //Incrament the count of cells to be averaged
            }
        })

        average = sum/count; // Get the average of the row
        
        if(isNaN(average)) //Catches problem when removing all values from row
        {
            $(avgID).text('-'); //Resets the text back to empty ('-')
        }
        else //If the average is a valid number
        {
            $(avgID).text(average); // Change text in average cell for this row
            $(avgID).css("text-align" , "right"); //Right align the number
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


  });


