document.addEventListener("DOMContentLoaded", function() {
    const travelBoxes = document.querySelectorAll(".travel-box");
    const flightBox = document.getElementById("flight-box");
    const service_content = document.querySelectorAll(".service");

    flightBox.classList.add("clicked");

    service_content[0].classList.add('active');


    travelBoxes.forEach(function(box) {
        box.addEventListener("click", function() {
            // Remove the "clicked" class from all travel boxes
            travelBoxes.forEach(function(box) {
                box.classList.remove("clicked");
            });
            // Add the "clicked" class to the clicked travel box
            box.classList.add("clicked");

            // Remove the "active" class from all service content
            service_content.forEach(function(service) {
                service.classList.remove('active');
            });
            // Add the "active" class to the corresponding service content
            const travelIndex = Array.from(travelBoxes).indexOf(box);
            // Add the "active" class to the corresponding service content
            service_content[travelIndex].classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const openPopupBtn = document.querySelector("#traveller");
    const closePopupBtn = document.querySelector("#close-popup");
    const popupContainer = document.querySelector(".traveller-container");

    openPopupBtn.addEventListener("click", function() {
        popupContainer.classList.add("active");
    });

    closePopupBtn.addEventListener("click", function() {
        popupContainer.classList.remove("active");
    });
});


// Initialize variables to store passenger counts
let adultsCount = 1;
let childrenCount = 0;
let infantsCount = 0;

// Function to handle increment and decrement
function stepper(id, action) {
    let inputElement = document.getElementById(id + "-input");
    const travellerAlert = document.getElementById('traveller-alert');
    travellerAlert.classList.remove("active");

    switch (id) {
        case "adults":
            if (action === 'increment' && adultsCount < 9) {
                adultsCount++;
            } else if (action === 'decrement' && adultsCount > 1) {
                if (infantsCount === adultsCount) {
                    document.getElementById('adults-decrement').disabled = true;
                    document.getElementById('adults-decrement').classList.add('disabled');
                    travellerAlert.classList.add("active");
                    
                } else {
                    document.getElementById('adults-decrement').disabled = false;
                    adultsCount--;
                }
            }
            inputElement.value = adultsCount;
            break;
        case "children":
            if (action === 'increment' && adultsCount + childrenCount < 9) {
                childrenCount++;
            } else if (action === 'decrement' && childrenCount > 0) {
                childrenCount--;
            }
            inputElement.value = childrenCount;
            break;
        case "infants":
            if (action === 'increment' && adultsCount + childrenCount + infantsCount < 9) {

                // Check if infantsCount equals adultsCount to disable increment button
                if (infantsCount === adultsCount) {
                    document.getElementById('infants-increment').disabled = true;
                    const infantinbut = document.getElementById('infants-increment');
                    infantinbut.classList.add('disabled');
                    travellerAlert.classList.add("active");
                } else {
                    document.getElementById('infants-increment').disabled = false;
                    infantsCount++;
                }
                
            } else if (action === 'decrement' && infantsCount > 0) {
                infantsCount--;
            }
            inputElement.value = infantsCount;
            break;
        default:
            break;
    }

    // Update total travelers and disable/enable increment buttons based on total
    updateIncrementButtons();
}


// Function to update total travelers count
function updateTotalTravellers() {
    let totalTravellers = adultsCount + childrenCount + infantsCount;
    document.getElementById("total-travellers").value = totalTravellers;
    if (totalTravellers>=2) {
        document.getElementById("traveller-s").textContent = "Travellers";
    }
}

// Function to disable increment buttons when total exceeds 9
function updateIncrementButtons() {
    let totalTravellers = adultsCount + childrenCount + infantsCount;

    // Enable all increment buttons first
    document.querySelectorAll('.input-stepper button').forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });

    // Disable increment buttons if total exceeds 9
    if (totalTravellers >= 9) {
        document.querySelectorAll('.input-stepper button').forEach(button => {
            if (button.innerText === '+') {
                button.disabled = true;
                button.classList.add('disabled');
            }
        });
    }
}


document.getElementById("apply-button").addEventListener("click", function() {
    const popupContainer = document.querySelector(".traveller-container");
    popupContainer.classList.remove("active");
    updateTotalTravellers();
});




document.addEventListener("DOMContentLoaded", function() {
    const moreIcon = document.querySelector(".more-icon");
    const dropdown = document.querySelector(".dropdown");
    let timeoutId;

    // Function to show dropdown
    function showDropdown() {
        clearTimeout(timeoutId); // Clear any existing timeout
        dropdown.style.display = "block";
    }

    // Function to hide dropdown after delay
    function hideDropdown() {
        timeoutId = setTimeout(function() {
            dropdown.style.display = "none";
        }, 300); // 1000 milliseconds = 1 second
    }

    // Show dropdown on moreIcon hover
    moreIcon.addEventListener("mouseenter", function() {
        showDropdown();
    });

    // Hide dropdown on moreIcon mouseleave after delay
    moreIcon.addEventListener("mouseleave", function() {
        hideDropdown();
    });

    // Keep dropdown visible when hovering over it
    dropdown.addEventListener("mouseenter", function() {
        showDropdown();
    });

    // Hide dropdown when mouse leaves dropdown
    dropdown.addEventListener("mouseleave", function() {
        hideDropdown();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const departureInput = document.getElementById("departure-input");
    const returnInput = document.getElementById("return-input");
    const calendarPopupButtons = document.querySelectorAll(".inputbox button");
    const prevIcon = document.getElementById("prev");
    const nextIcon = document.getElementById("next");
    const calendarWrapper = document.querySelector(".wrapper");

    // Function to show calendar below the input box
    function showCalendar(inputElement) {
        calendarWrapper.style.display = "block";
        const inputRect = inputElement.getBoundingClientRect();
        calendarWrapper.style.top = inputRect.bottom + "px";
        calendarWrapper.style.left = inputRect.left + "px";

        // Remove previous event listeners on days
        const days = document.querySelectorAll(".days li.day");
        days.forEach(day => day.removeEventListener('click', handleCalendarClick));

        // Event listener for calendar days
        function handleCalendarClick() {
            if (this.classList.contains("inactive")) {
                return; // Do nothing if the day is inactive
            }
        
            const selectedDay = parseInt(this.textContent);
            const selectedMonth = currMonth; // currMonth is defined in the outer scope
            const selectedYear = currYear; // currYear is defined in the outer scope
            const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
        
            // Format the date as DD/MM/YYYY
            const formattedDate = `${selectedDay}/0${selectedMonth + 1}/${selectedYear}`;
        
            // Determine which input field triggered the calendar selection
            if (departureInput.classList.contains('active')) {
                departureInput.value = formattedDate;
                departureInput.classList.remove('active');
                returnInput.classList.add('active');
            } else if (returnInput.classList.contains('active')) {
                // Validate that return date is not earlier than departure date
                const departureDateParts = departureInput.value.split('/');
                const departureDate = new Date(departureDateParts[2], departureDateParts[1] - 1, departureDateParts[0]);
                
                if (selectedDate < departureDate) {
                    alert('Return date cannot be earlier than departure date');
                    return;
                }
        
                returnInput.value = formattedDate;
                returnInput.classList.remove('active');
                calendarWrapper.style.display = "none";
            }
        
            // Hide calendar after selecting date
            calendarWrapper.style.display = "none";
        }
        
        
        

        // Add event listener for calendar days
        days.forEach(day => day.addEventListener('click', handleCalendarClick));
    }

    // Event listener for Departure input and calendar popup button
    departureInput.addEventListener("click", function() {
        showCalendar(departureInput);
        departureInput.classList.add('active');
        returnInput.classList.remove('active');
    });


    // Event listener for Return input and calendar popup button
    returnInput.addEventListener("click", function() {
        showCalendar(returnInput);
        returnInput.classList.add('active');
        departureInput.classList.remove('active');
    });

    // Event listener for calendar popup buttons
    calendarPopupButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (button === calendarPopupButtons[0]) {
                showCalendar(departureInput);
            } else if (button === calendarPopupButtons[1]) {
                showCalendar(returnInput);
            }
        });
    });

    const daysTag = document.querySelector(".days");
    const currentDate = document.querySelector(".current-date");
    const prevNextIcon = document.querySelectorAll(".icons span");

    let date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();
    let selectedDate = date.getDate(); // Track the selected date

    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];

    const renderCalendar = () => {
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
        let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayOfMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday = (i === selectedDate && currMonth === date.getMonth() && currYear === date.getFullYear()) ? "active" : "";
            let currentDate = new Date(currYear, currMonth, i);
            if (currentDate < new Date()) {
                liTag += `<li class="day inactive">${i}</li>`;
            } else {
                liTag += `<li class="day ${isToday}">${i}</li>`;
            }
        }

        for (let i = lastDayOfMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
        }

        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;

        // Disable previous icon if viewing the current month
        if (currMonth === date.getMonth()) {
            prevIcon.classList.add("disabled");
        } else {
            prevIcon.classList.remove("disabled");
        }
    };

    renderCalendar();

    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            if (icon === prevIcon && currMonth === date.getMonth()) {
                return; // Do nothing if trying to navigate to previous month in current month view
            }

            currMonth = icon === prevIcon ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth, date.getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }

            // Reset selectedDate to today's date when changing month
            selectedDate = date.getDate();
            renderCalendar();
        });
    });

    // Event listener to close calendar when clicking outside
    document.addEventListener("click", function(event) {
        if (!calendarWrapper.contains(event.target) && !departureInput.contains(event.target) && !returnInput.contains(event.target) && !calendarPopupButtons[0].contains(event.target) && !calendarPopupButtons[1].contains(event.target)) {
            calendarWrapper.style.display = "none";
        }
    });
});

const roundTripRadio = document.querySelector('input[value="Round Trip"]');
roundTripRadio.checked = true;

document.addEventListener("DOMContentLoaded", function() {

    const returnInput = document.getElementById("return");
    const oneWayRadio = document.querySelector('input[value="One Way"]');
    const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');

    // Function to handle radio button change event
    function handleTripTypeChange() {
        if (oneWayRadio.checked) {
            returnInput.style.display = "none"; // Hide the return input
        } else {
            returnInput.style.display = "block"; // Show the return input
        }
    }

    // Initial state on page load
    handleTripTypeChange();

    // Event listener for trip type radio buttons
    tripTypeRadios.forEach(radio => {
        radio.addEventListener("change", handleTripTypeChange);
    });
});



// Select all dropdowns
const dropdowns = document.querySelectorAll('.class-dropdown');

// Event listener for document click
document.addEventListener('click', function(event) {
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = document.querySelector('.menu');
        const options = document.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');

        // Toggle dropdown open/close when select is clicked
        select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        });

        // Close dropdown when clicking outside
        if (!dropdown.contains(event.target)) {
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
        }

        // Event listeners for options inside the dropdown
        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');
                options.forEach(option => {
                    option.classList.remove('list-item-active');
                });
                option.classList.add('list-item-active');
            });
        });
    });
});



// autocomplete sections

let availableKeywords = [
    'Agartala (IXA)',
    'Agatti (AGX)',
    'Agra (AGR)',
    'Ahmedabad (AMD)',
    'Aizawl (AJL)',
    'Amritsar (ATQ)',
    'Aurangabad (IXU)',
    'Ayodhya (AYJ)',
    'Bagdogra (IXB)',
    'Bareilly (BEK)',
    'Belagavi (IXG)',
    'Bengaluru (BLR)',
    'Bhopal (BHO)',
    'Bhubaneswar (BBI)',
    'Chandigarh (IXC)',
    'Chennai (MAA)',
    'Coimbatore (CJB)',
    'Darbhanga (DBR)',
    'Dehradun (DED)',
    'Delhi (DEL)',
    'Deoghar (DGH)',
    'Dharamshala (DHM)',
    'Dibrugarh (DIB)',
    'Dimapur (DMU)',
    'Diu (DIU)',
    'Durgapur (RDP)',
    'Gaya (GAY)',
    'Goa (GOI)',
    'Gondia (GDB)',
    'Gorakhpur (GOP)',
    'Guwahati (GAU)',
    'Gwalior (GWL)',
    'Hirasar (HSR)',
    'Hubli (HBX)',
    'Hyderabad (HYD)',
    'Imphal (IMF)',
    'Indore (IDR)',
    'Itanagar (HGI)',
    'Jabalpur (JLR)',
    'Jagdalpur (JGB)',
    'Jaipur (JAI)',
    'Jaisalmer (JSA)',
    'Jammu (IXJ)',
    'Jharsuguda (JRG)',
    'Jodhpur (JDH)',
    'Jorhat (JRH)',
    'Kadapa (CDP)',
    'Kannur (CNN)',
    'Kanpur (KNU)',
    'Khajuraho (HJR)',
    'Kochi (COK)',
    'Kolhapur (KLH)',
    'Kolkata (CCU)',
    'Kozhikode (CCJ)',
    'Kurnool (KJB)',
    'Leh (IXL)',
    'Lucknow (LKO)',
    'Madurai (IXM)',
    'Mangaluru (IXE)',
    'Mumbai (BOM)',
    'Mysuru (MYQ)',
    'Nagpur (NAG)',
    'Nashik (ISK)',
    'North Goa (GOX)',
    'Pantnagar (PGH)',
    'Patna (PAT)',
    'Port Blair (IXZ)',
    'Prayagraj (IXD)',
    'Pune (PNQ)',
    'Raipur (RPR)',
    'Rajahmundry (RJA)',
    'Rajkot (RAJ)',
    'Ranchi (IXR)',
    'Salem (SXV)',
    'Shillong (SHL)',
    'Shirdi (SAG)',
    'Shivamogga (RQY)',
    'Silchar (IXS)',
    'Srinagar (SXR)',
    'Surat (STV)',
    'Thiruvananthapuram (TRV)',
    'Tiruchirappalli (TRZ)',
    'Tirupati (TIR)',
    'Tuticorin (TCR)',
    'Udaipur (UDR)',
    'Vadodara (BDQ)',
    'Varanasi (VNS)',
    'Vijayawada (VGA)',
    'Visakhapatnam (VTZ)'
];


const resultsBox = document.querySelector(".result-box");
const frominputBox = document.getElementById("wherefrom-input-box");
const toinputBox = document.getElementById("whereto-input-box");

// Event listener for 'wherefrom-input-box'
frominputBox.onkeyup = function(){
    let result = [];
    let input = frominputBox.value;
    if(input.length){
        result = availableKeywords.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    display(result);

    if(!result.length) {
        resultsBox.innerHTML = '';
    }
};

// Event listener for 'whereto-input-box'
toinputBox.onkeyup = function(){
    let result = [];
    let input = toinputBox.value;
    if(input.length){
        result = availableKeywords.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    displayTo(result);

    if(!result.length) {
        resultsBox.innerHTML = '';
    }
};

function display(result){
    resultsBox.style.display = "block";
    const inputRect = frominputBox.getBoundingClientRect();
    resultsBox.style.top = inputRect.bottom + "px";
    resultsBox.style.left = inputRect.left + "px";

    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function displayTo(result){
    resultsBox.style.display = "block";
    const inputRect = toinputBox.getBoundingClientRect();
    resultsBox.style.top = inputRect.bottom + "px";
    resultsBox.style.left = inputRect.left + "px";
    
    const content = result.map((list)=>{
        return "<li onclick=selectInputTo(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    frominputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}

function selectInputTo(list){
    toinputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}










    
    const locbutton = document.getElementById('search-button3');

    function gotLocation(position) {

    }

    function failedToGet() {
        console.log('There was some issue')
    }

    locbutton.addEventListener('click', async () => {
        navigator.geolocation.getCurrentPosition(gotLocation, failedToGet)
    });



document.getElementById("search-button").addEventListener("click", function() {

    var searchResults = document.querySelector('.flight-search-results');
    searchResults.classList.add('active');


    var depDate = document.getElementById("departure-input").value;

    var deptDD = depDate.substring(0,2);
    var deptMM = depDate.substring(3,5);
    var deptYYYY = depDate.substring(6);
    var dept = deptDD + deptMM + deptYYYY;
    var dept2 = deptYYYY + deptMM + deptDD;

    var returnDate = document.getElementById("return-input").value;

    var retDD = returnDate.substring(0,2);
    var retMM = returnDate.substring(3,5);
    var retYYYY = returnDate.substring(6);
    var ret = retDD + retMM + retYYYY;
    var ret2 = retYYYY + retMM + retDD;

    fromCity = frominputBox.value.slice(-4,-1);
    toCity = toinputBox.value.slice(-4,-1);

    // Example assuming you have inputs for each parameter
    var mmtitinerary = fromCity + "-"+ toCity +"-"+ depDate +"_"+ toCity + "-" + fromCity + "-"+ returnDate;
    var tripType = "R";
    var mmtpaxType = "A-"+ adultsCount +"_C-"+ childrenCount+"_I-"+infantsCount;
    var intl = "false";
    var cabinClass = "E";
    var ccde = "IN";
    var lang = "eng";

    var mmtqueryString = `?itinerary=${encodeURIComponent(mmtitinerary)}&tripType=${encodeURIComponent(tripType)}&paxType=${encodeURIComponent(mmtpaxType)}&intl=${encodeURIComponent(intl)}&cabinClass=${encodeURIComponent(cabinClass)}&ccde=${encodeURIComponent(ccde)}&lang=${encodeURIComponent(lang)}`;
    var mmtURL = `https://www.makemytrip.com/flight/search${mmtqueryString}`;

    var ytrqueryString = `?type=${encodeURIComponent(tripType)}&viewName=normal&flexi=0&noOfSegments=2&origin=${encodeURIComponent(fromCity)}&originCountry=IN&destination=${encodeURIComponent(toCity)}&destinationCountry=IN&flight_depart_date=${encodeURIComponent(deptDD)}%2F${encodeURIComponent(deptMM)}%2F${encodeURIComponent(deptYYYY)}&arrivalDate=${encodeURIComponent(retDD)}%2F${encodeURIComponent(retMM)}%2F${encodeURIComponent(retYYYY)}&ADT=${encodeURIComponent(adultsCount)}&CHD=${encodeURIComponent(childrenCount)}&INF=${encodeURIComponent(infantsCount)}&class=Economy&source=fresco-hotels&unqvaldesktop=137811170120`;
    var ytrURL = `https://flight.yatra.com/air-search-ui/dom2/trigger${ytrqueryString}`;

    var clrqueryString = `?adults=${encodeURIComponent(adultsCount)}&childs=${encodeURIComponent(childrenCount)}&infants=${encodeURIComponent(infantsCount)}&class=Economy&depart_date=${encodeURIComponent(depDate)}&from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&intl=n&origin=${encodeURIComponent(fromCity)}%20-%20N\City%20Name,%20IN&destination=${encodeURIComponent(toCity)}%20-%20Cityname,%20IN&sft=&sd=1720423609827&rnd_one=R&utm_source=google&utm_medium=cpc&utm_campaign=BR_Cleartrip-Desktab&sourceCountry=City%20Name&destinationCountry=CityName&return_date=${encodeURIComponent(returnDate)}`;
    var clrURL = `https://www.cleartrip.com/flights/results${clrqueryString}`;

    var ixqueryString = `?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${encodeURIComponent(dept)}&returnDate=${encodeURIComponent(ret)}&adults=${encodeURIComponent(adultsCount)}&children=${encodeURIComponent(childrenCount)}&infants=${encodeURIComponent(infantsCount)}&class=e&source=Search%20Form`;
    var ixURL = `https://www.ixigo.com/search/result/flight${ixqueryString}`;   
    
    var goqueryString = `-${encodeURIComponent(fromCity)}-${encodeURIComponent(toCity)}-${encodeURIComponent(dept2)}-${encodeURIComponent(ret2)}-${encodeURIComponent(adultsCount)}-${encodeURIComponent(childrenCount)}-${encodeURIComponent(infantsCount)}-E-D/`;
    var goURL = `https://www.goibibo.com/flights/air${goqueryString}`;   

    // Update the href attribute of the <a> tag
    document.getElementById("mmt-link").setAttribute("href", mmtURL);
    document.getElementById("yatra-link").setAttribute("href", ytrURL);
    document.getElementById("ct-link").setAttribute("href", clrURL);
    document.getElementById("ix-link").setAttribute("href", ixURL);
    document.getElementById("go-link").setAttribute("href", goURL);
});
    
    
    



