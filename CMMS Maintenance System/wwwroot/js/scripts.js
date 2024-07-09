document.addEventListener('DOMContentLoaded', function () {
    console.log('Project Dashboard Loaded');

    // Initialize Bootstrap Datepicker
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        todayHighlight: true,
        autoclose: true
    }).on('changeDate', function (selected) {
        var startDate = $('#Startdate').datepicker('getDate');
        var endDate = $('#Enddate').datepicker('getDate');
        
        if (startDate) {
            $('#Enddate').datepicker('setStartDate', startDate);
        }
        if (endDate) {
            $('#Startdate').datepicker('setEndDate', endDate);
        }
        
        // Validate the dates
        if (startDate && endDate && endDate < startDate) {
            $('#error-message').show();
        } else {
            $('#error-message').hide();
        }
    });

    var modal = document.getElementById("popup-modal");
    var btn = document.getElementById("new-project-btn");
    var span = document.getElementsByClassName("close-btn")[0];

    // Function to reset datepickers
    function resetDatepickers() {
        $('#Startdate').datepicker('clearDates');
        $('#Enddate').datepicker('clearDates');
        $('#Startdate').attr('placeholder', 'Select Start Date');
        $('#Enddate').attr('placeholder', 'Select End Date');
        $('#error-message').hide();
    }

    // Show the modal when the button is clicked
    btn.onclick = function() {
        resetDatepickers();  // Reset datepickers when opening the modal
        modal.style.display = "block";
    }

    // Close the modal when the 'x' is clicked
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
