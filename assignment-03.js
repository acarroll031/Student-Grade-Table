// function changeAlignment(id, value) {
//     console.log('Running');
//     var element = document.getElementById(id);
//     var content = element.value;
//     console.log(content);
//     if(!isNaN(content) && value <=100 && content >= 0)
//     {
//         console.log("Right");
//         element.style.textAlign = 'right';
//         e
//     }
//     else if(content == "")
//     {  
//         element.style.textAlign = 'center';
//         element.innerText = '-';
//         // alert("Only accepts numbers in the range 0-100");
//     }
//     else
//     {
//         console.log("Center");
//         element.style.textAlign = 'center';
//         element.innerText = '-';
//         // alert("Only accepts numbers in the range 0-100");
//     }
// }

$(document).ready(function(){

    var grades = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
    ];
    
    $(".assignment").focusout(function(){
        console.log("jQuery");
        var content = $(this).text();
        console.log(content);
        console.log($(this).attr("value"));
        if(isNaN(content)) // If it is not a number
        {
            $(this).css({
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-");
            alert("Only accepts numbers in the range 0-100");
            
            // addToArray(content, $(this).attr("id"));
        }
        else if (content === "" || content === "-") //If it is blank or -
        {
            $(this).css({
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-");
        }
        else if (content <=100 && content >=0) //If it is between 0 and 100
        {
            $(this).css({
                "textAlign": "right",
                "background" : "white",
            });

            averageRow($(this).attr("name"));
            // var rowId = $(this).closest('tr').index() - 1;
            // var colId = $(this).index() - 2; //-2 coz first 2 columns are not assignment data
            // console.log(rowId);
            // console.log(colId);
            // grades[rowId][colId] = content;
            // console.log(grades[rowId]);

            // averageArray(rowId);
        }
        else //Catch all other numbers
        {
            $(this).css({
                "textAlign": "center",
                "background" : "yellow",
            });
            $(this).text("-");
            alert("Only accepts numbers in the range 0-100");
        }
    });
    
    function averageRow(id){

    //     let sum = count = average = 0;
    //     for(let i = 0; i < grades[row].length; i++)
    //     {
    //         sum += parseFloat(grades[row][i]);
    //         count++;
    //     }

    //     average = sum/count;
    //     id = toString(row);
    //     $(row).text(average);
    let rowClass = "." + id; //Add '.' to indicate it is a class
    let sum = 0;
    let count = 0;
    let average = 0.0;
    $(rowClass).each(function(){
        let value = $(this).text();
        if(!isNaN(value))
        {
            sum += parseFloat(value);
        }
        count++;
    })
    average = sum/count;
    let avgID = "#" + id; // Add ' avg' to differentiate the class of the average cell;
    $(avgID).text(average);
    }


  });


