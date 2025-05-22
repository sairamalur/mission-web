(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);


// events

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar-container');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Example event data
            {
                title: 'Sample Event',
                start: '2024-08-15',
                location: 'Sample Location',
                description: 'Sample Event Description',
                url: 'https://example.com/register', // Registration link
                contact: 'contact@example.com' // Contact information
            }
            // Add more events here
        ],
        eventClick: function(info) {
            // Update event details based on clicked event
            document.getElementById('event-title').textContent = info.event.title;
            document.getElementById('event-date').textContent = info.event.startStr;
            document.getElementById('event-location').textContent = info.event.extendedProps.location || 'N/A';
            document.getElementById('event-details-description').textContent = info.event.extendedProps.description || 'N/A';
            document.getElementById('event-registration-link').href = info.event.extendedProps.url || '#';
            document.getElementById('event-registration-link').textContent = info.event.extendedProps.url ? 'Register Here' : 'N/A';
            document.getElementById('event-contact').textContent = info.event.extendedProps.contact || 'N/A';
        }
    });

    document.getElementById('date-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var month = document.getElementById('select-month').value;
        var year = document.getElementById('select-year').value;

        if (!month || !year) {
            alert('Please select both month and year.');
            return;
        }

        var selectedDate = `${year}-${month.padStart(2, '0')}-01`; // Default to the first day of the selected month

        // Show the calendar
        document.getElementById('calendar').style.display = 'block';
        calendar.gotoDate(selectedDate); // Update calendar to the selected month

        // Render the calendar
        calendar.render();
    });
});

// donation
document.addEventListener('DOMContentLoaded', function () {
    const donationAmount = document.getElementById('donationAmount');
    const customAmountField = document.querySelector('.custom-amount');
    const paymentMethod = document.getElementById('paymentMethod');
    const paymentDetails = document.querySelector('.payment-details');
    const form = document.getElementById('donationForm');
    const paymentNumber = document.getElementById('paymentNumber');

    // Show/hide custom amount field based on donation amount selection
    donationAmount.addEventListener('change', function () {
        if (donationAmount.value === 'custom') {
            customAmountField.classList.remove('d-none');
        } else {
            customAmountField.classList.add('d-none');
        }
    });

    // Show/hide payment details field based on payment method selection
    paymentMethod.addEventListener('change', function () {
        if (paymentMethod.value) {
            paymentDetails.classList.remove('d-none');
        } else {
            paymentDetails.classList.add('d-none');
        }
    });

    // Form submission handling
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Clear previous validity messages
        form.classList.remove('was-validated');
        paymentNumber.setCustomValidity('');
        
        // Check form validity
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Validate payment number based on payment method
            if (paymentMethod.value && !paymentNumber.value) {
                paymentNumber.setCustomValidity('Please enter your payment number.');
                paymentNumber.reportValidity();
                return;
            } else {
                paymentNumber.setCustomValidity(''); // Clear the custom validity
            }

            // If the form is valid, show a SweetAlert success message
            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your donation has been received. Thank you for your generosity!',
                confirmButtonText: 'OK'
            });
        }
        
        form.classList.add('was-validated');
    });
});
// volunteer
document.getElementById('volunteerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Thank you for volunteering. We will reach out to you shortly with more information.',
        confirmButtonText: 'Okay'
    });
});