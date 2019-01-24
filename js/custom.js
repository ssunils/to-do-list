// JavaScript Document
// Author : Sunil Soundarapandian
//Created on : 7/13/2013
// Function for Sort by Description

function sortByName() {
    $("ul.to-do li").sort(function (a, b) {
        var aTxt = $(a).find(".desc").text().toLowerCase(),
            bTxt = $(b).find(".desc").text().toLowerCase();
        if (aTxt > bTxt) return 1;
        if (aTxt < bTxt) return -1;
        return 0;
    }).each(function () {
        $("ul").append(this);
        $(".last-child").removeClass("last-child");
        $("ul li:last").addClass("last-child");
    });
}
function sortByDate(){
	$("ul.to-do li").sort(function (a, b) {
		var aDate = $(a).find(".date").text().split('-'),
			aSortDate = new Date(aDate[1] + "/" + aDate[0] + "/" + aDate[2]),
			bDate = $(b).find(".date").text().split('-'),
			bSortDate = new Date(bDate[1] + "/" + bDate[0] + "/" + bDate[2]);
		if (new Date(aSortDate) > new Date(bSortDate)) return 1;
		if (new Date(aSortDate) < new Date(bSortDate)) return -1;
		return 0;
	}).each(function () {
		$("ul").append(this);
	});
}
$(document).ready(function () {
    //add Class to last element for cross browser
    $(".to-do li:last").addClass("last-child");
    $(".addNew").click(function () {
        var inp = '<li class="last-child addNewR"><span class="desc"><input name="(Description)" value="(Description)" type="text" /></span>' +
            '<span class="date"><input type="text" name="(dd-mm-yyyy)" maxlength="10" value="(dd-mm-yyyy)" /></span></li>';
        $(".sortbyDate.active").removeClass("active");
        if ($(".addNewR").size() == 0) {
            $(".last-child").removeClass("last-child");
            $("ul.to-do").append(inp);
            $(this).addClass("active");
        }
        $(".addButton").slideDown();
    });
    $(".addButton").click(function () {
        var description = $(".desc input").val(),
            date = $(".date input").val(),
            bits = date.split('-'),
            findDate = 0;
        switch (bits[1] - 1) {
        case 1:
            findDate = (bits[2] % 4 == 0 && bits[2] % 100) || bits[2] % 400 == 0 ? 29 : 28;
            break;
        case 8:
        case 3:
        case 5:
        case 10:
            findDate = 30;
            break;
        default:
            findDate = 31;
            break;
        }
        var dtRegex = new RegExp(/^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d$/);
        if ($(".desc input").val() == "(Description)") {
            alert("Please enter a Description");
        }else if (dtRegex.test(date) == false || findDate < bits[0]) {
            alert("Please enter a valid Date");
        }else {
            $("input", ".addNewR").remove();
            $(".addNewR .date").text(date);
            $(".addNewR .desc").text(description);
            $(".addNewR").removeClass("addNewR");
            $(this).slideUp(500);
            sortByName();
            $(".active").removeClass("active");
        }
    });
    $("ul").on('focus', "input", function () {
        var val = $(this).val();
        if (val == "") {
            $(this).val($(this).attr('name'));
        } else if (val == "(Description)" || val == "(dd-mm-yyyy)") {
            $(this).val('');
        }
        $(this).on('blur', function () {
            var val2 = $(this).val();
            if (val2 == '') {
                $(this).val($(this).attr('name'));
            }
        });
    });
    // Function for Sort by date
    $("a.sortbyDate").click(function () {
        if (!$(".addNewR").size() == 0) {
			if (confirm("Unsaved To-Do's will be discarded")){
				$(".addNewR").remove();
				$(".addButton").slideUp();
            	sortByDate();
            $(".active").removeClass("active");
            $(this).addClass("active");
			}
        }else{
			sortByDate();
			$(".active").removeClass("active");
            $(this).addClass("active");
		}
        $(".last-child").removeClass("last-child");
        $("ul li:last").addClass("last-child");

    });
    sortByName()
});