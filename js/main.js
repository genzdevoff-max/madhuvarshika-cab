(function () {
  "use strict";

  var WHATSAPP_NUMBER = "919159154525";
  var BUSINESS_NAME = "Madhuvarshika Cab Service";
  var DEFAULT_MESSAGE = "Hello " + BUSINESS_NAME + "! I would like to enquire about a taxi booking.";

  function waUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function todayISO() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  function displayDate(value) {
    if (!value) {
      return "";
    }
    var parts = value.split("-");
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var defaultUrl = waUrl(DEFAULT_MESSAGE);
  ["floatingWa", "mobileWa"].forEach(function (id) {
    var link = document.getElementById(id);
    if (link) {
      link.href = defaultUrl;
    }
  });

  var menuBtn = document.getElementById("menuBtn");
  var navlinks = document.getElementById("navlinks");

  function isMenuOpen() {
    return navlinks ? navlinks.classList.contains("is-open") : false;
  }

  function setMenu(open) {
    if (!menuBtn || !navlinks) {
      return;
    }
    navlinks.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (menuBtn && navlinks) {
    menuBtn.addEventListener("click", function () {
      setMenu(!isMenuOpen());
    });

    navlinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (isMenuOpen() && !navlinks.contains(event.target) && !menuBtn.contains(event.target)) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isMenuOpen()) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    var wide = window.matchMedia("(min-width: 901px)");
    var closeOnWide = function (event) {
      if (event.matches) {
        setMenu(false);
      }
    };
    if (wide.addEventListener) {
      wide.addEventListener("change", closeOnWide);
    } else if (wide.addListener) {
      wide.addListener(closeOnWide);
    }
  }

  var siteHeader = document.getElementById("siteHeader");
  var navAnchors = navlinks
    ? Array.prototype.slice.call(navlinks.querySelectorAll('a[href^="#"]:not(.btn)'))
    : [];
  var observedSections = navAnchors
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function updateScrollState() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", scrollY > 8);
    }
    if (!observedSections.length) {
      return;
    }
    var marker = scrollY + 130;
    var current = observedSections[0];
    observedSections.forEach(function (section) {
      if (section.offsetTop <= marker) {
        current = section;
      }
    });
    navAnchors.forEach(function (link) {
      if (current && link.getAttribute("href") === "#" + current.id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var scrollTicking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollTicking) {
        return;
      }
      scrollTicking = true;
      window.requestAnimationFrame(function () {
        updateScrollState();
        scrollTicking = false;
      });
    },
    { passive: true }
  );
  updateScrollState();

  var form = document.getElementById("bookingForm");
  if (!form) {
    return;
  }

  var nameInput = document.getElementById("name");
  var phoneInput = document.getElementById("phone");
  var pickupInput = document.getElementById("pickup");
  var dropInput = document.getElementById("drop");
  var dateInput = document.getElementById("date");
  var returnDateInput = document.getElementById("returnDate");
  var returnField = document.getElementById("returnField");
  var tripSelect = document.getElementById("trip");
  var vehicleSelect = document.getElementById("vehicle");
  var passengersSelect = document.getElementById("passengers");
  var timeInput = document.getElementById("time");
  var notesInput = document.getElementById("notes");
  var submitBtn = document.getElementById("submitBtn");
  var formStatus = document.getElementById("formStatus");
  var submitLocked = false;

  var unlockTimer = null;

  function setMinDates() {
    var today = todayISO();
    if (dateInput) {
      dateInput.min = today;
    }
    if (returnDateInput) {
      returnDateInput.min = dateInput && dateInput.value ? dateInput.value : today;
    }
  }

  function needsReturnDate() {
    return tripSelect && tripSelect.value === "Round trip";
  }

  function syncReturnField() {
    if (!returnField || !returnDateInput) {
      return;
    }
    var needed = needsReturnDate();
    returnField.hidden = !needed;
    returnDateInput.required = needed;
    if (!needed) {
      returnDateInput.value = "";
      clearFieldError(returnDateInput);
    }
    setMinDates();
  }

  function fieldError(input) {
    return document.getElementById(input.id + "Error");
  }

  function clearFieldError(input) {
    if (!input) {
      return;
    }
    var field = input.closest(".field");
    if (field) {
      field.classList.remove("has-error");
    }
    input.removeAttribute("aria-invalid");
    var error = fieldError(input);
    if (error) {
      error.textContent = "";
    }
  }

  function showFieldError(input, message) {
    var field = input.closest(".field");
    if (field) {
      field.classList.add("has-error");
    }
    input.setAttribute("aria-invalid", "true");
    var error = fieldError(input);
    if (error) {
      error.textContent = message;
    }
  }

  function clearStatus() {
    if (!formStatus) {
      return;
    }
    formStatus.className = "form-status";
    formStatus.textContent = "";
  }

  function showStatus(type, message, fallbackUrl) {
    if (!formStatus) {
      return;
    }
    formStatus.className = "form-status is-" + type;
    formStatus.innerHTML = "";
    var p = document.createElement("p");
    p.textContent = message;
    formStatus.appendChild(p);

    if (fallbackUrl) {
      var btn = document.createElement("a");
      btn.href = fallbackUrl;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      btn.className = "btn btn--sm";
      btn.textContent = "Open WhatsApp Chat";
      formStatus.appendChild(btn);
    }
  }

  function isValidPhone(value) {
    var digits = value.replace(/\D/g, "");
    var local = digits;
    if (digits.length === 12 && digits.indexOf("91") === 0) {
      local = digits.slice(2);
    } else if (digits.length === 11 && digits.charAt(0) === "0") {
      local = digits.slice(1);
    }
    return local.length === 10 && /^[6-9]/.test(local);
  }

  function validateForm() {
    var firstInvalid = null;

    controls.forEach(clearFieldError);

    function fail(input, message) {
      showFieldError(input, message);
      if (!firstInvalid) {
        firstInvalid = input;
      }
    }

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      fail(nameInput, "Please enter your name.");
    }

    if (!phoneInput.value.trim()) {
      fail(phoneInput, "Please enter your phone number.");
    } else if (!isValidPhone(phoneInput.value)) {
      fail(phoneInput, "Enter a valid 10-digit Indian mobile number.");
    }

    if (!pickupInput.value.trim() || pickupInput.value.trim().length < 2) {
      fail(pickupInput, "Please enter your pickup location.");
    }

    if (!dropInput.value.trim() || dropInput.value.trim().length < 2) {
      fail(dropInput, "Please enter your destination.");
    }

    if (!dateInput.value) {
      fail(dateInput, "Please choose your travel date.");
    } else if (dateInput.value < todayISO()) {
      fail(dateInput, "Travel date cannot be in the past.");
    }

    if (needsReturnDate()) {
      if (!returnDateInput.value) {
        fail(returnDateInput, "Please choose a return date.");
      } else if (dateInput.value && returnDateInput.value < dateInput.value) {
        fail(returnDateInput, "Return date cannot be before the travel date.");
      }
    }

    if (!tripSelect.value) {
      fail(tripSelect, "Please choose a trip type.");
    }

    return firstInvalid;
  }

  var controls = [nameInput, phoneInput, pickupInput, dropInput, dateInput, returnDateInput, tripSelect, vehicleSelect, passengersSelect, timeInput, notesInput].filter(Boolean);
  controls.forEach(function (control) {
    control.addEventListener("input", function () {
      clearFieldError(control);
    });
    control.addEventListener("change", function () {
      clearFieldError(control);
    });
  });

  if (dateInput) {
    dateInput.addEventListener("change", function () {
      if (returnDateInput) {
        returnDateInput.min = dateInput.value || todayISO();
        if (returnDateInput.value && returnDateInput.value < dateInput.value) {
          returnDateInput.value = "";
        }
      }
    });
  }

  if (tripSelect) {
    tripSelect.addEventListener("change", syncReturnField);
  }

  document.querySelectorAll("[data-trip]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!tripSelect) {
        return;
      }
      tripSelect.value = link.getAttribute("data-trip");
      syncReturnField();
      clearFieldError(tripSelect);
      clearStatus();
    });
  });

  document.querySelectorAll("[data-vehicle]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!vehicleSelect) {
        return;
      }
      vehicleSelect.value = link.getAttribute("data-vehicle");
      clearFieldError(vehicleSelect);
      clearStatus();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submitLocked) {
      return;
    }

    clearStatus();
    var firstInvalid = validateForm();
    if (firstInvalid) {
      showStatus("error", "Please correct the highlighted fields and try again.");
      firstInvalid.focus();
      return;
    }

    var lines = [
      "Hello " + BUSINESS_NAME + "! I would like to request a taxi booking.",
      "",
      "Name: " + nameInput.value.trim(),
      "Phone: " + phoneInput.value.trim(),
      "Pickup: " + pickupInput.value.trim(),
      "Destination: " + dropInput.value.trim(),
      "Travel date: " + displayDate(dateInput.value)
    ];

    if (needsReturnDate()) {
      lines.push("Return date: " + displayDate(returnDateInput.value));
    }

    lines.push(
      "Pickup time: " + (timeInput.value || "Not specified"),
      "Trip type: " + tripSelect.value
    );

    if (vehicleSelect && vehicleSelect.value) {
      lines.push("Vehicle: " + vehicleSelect.value);
    }

    lines.push(
      "Passengers: " + passengersSelect.value,
      "Additional details: " + (notesInput.value.trim() || "None"),
      "",
      "Please confirm availability, vehicle and fare details."
    );

    var url = waUrl(lines.join("\n"));

    submitLocked = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("is-busy");
    }

    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (window.innerWidth <= 768);
    if (isMobile) {
      window.location.href = url;
    } else {
      var win = window.open(url, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = url;
      }
    }

    showStatus(
      "info",
      "Opening WhatsApp chat with your filled details... If it did not open automatically, tap below:",
      url
    );

    if (unlockTimer) {
      window.clearTimeout(unlockTimer);
    }
    unlockTimer = window.setTimeout(function () {
      submitLocked = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-busy");
      }
    }, 2500);
  });

  if (submitBtn) {
    submitBtn.disabled = false;
  }

  setMinDates();
  syncReturnField();
})();
