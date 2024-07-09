document.addEventListener('DOMContentLoaded', function () {
    console.log('Project Dashboard Loaded');

    // Initialize the datepicker
    $('#datepicker').datepicker();

    // Show the datepicker when the button is clicked
    document.getElementById('new-project-btn').addEventListener('click', function () {
        document.getElementById('datepicker-container').style.display = 'block';
    });
});
