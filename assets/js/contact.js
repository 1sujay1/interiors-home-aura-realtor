document.addEventListener("DOMContentLoaded", function () {
  // Banner contact form API integration
  var form = document.getElementById("contactFormBanner");
  var msgBox = document.getElementById("contactBannerMsg");
  var submitBtn = form.querySelector('button[type="submit"]');
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msgBox.style.display = "none";
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var mobile = form.mobile.value.trim();
    var message = form.message.value.trim();

    if (!name || !email || !mobile) {
      msgBox.style.display = "block";
      msgBox.style.color = "#d32f2f";
      msgBox.textContent = "Please fill all fields.";
      return;
    }
    submitBtn.disabled = true;
    var originalText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
    fetch(`${BaseURL}/api/v1/client/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "INTERIORS_HOME_AURA_REALTOR",
        name,
        email,
        phone: mobile,
        message,
      }),
    })
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Failed to submit. Please try again.");
        }
        return res.json();
      })
      .then(function (data) {
        msgBox.style.display = "block";
        msgBox.style.color = "#388e3c";
        msgBox.textContent = "Thank you! Your message has been sent.";
        form.reset();
      })
      .catch(function (err) {
        msgBox.style.display = "block";
        msgBox.style.color = "#d32f2f";
        msgBox.textContent =
          err.message || "Submission failed. Please try again.";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });

  // Fixed contact form API integration (mobile)
  var fixedForm = document.getElementById("fixedContactFormBanner");
  var fixedMsgBox = document.getElementById("fixedContactBannerMsg");
  if (fixedForm) {
    var fixedSubmitBtn = fixedForm.querySelector('button[type="submit"]');
    fixedForm.addEventListener("submit", function (e) {
      e.preventDefault();
      fixedMsgBox.style.display = "none";
      var name = fixedForm.name.value.trim();
      var email = fixedForm.email.value.trim();
      var mobile = fixedForm.mobile.value.trim();
      if (!name || !email || !mobile) {
        fixedMsgBox.style.display = "block";
        fixedMsgBox.style.color = "#d32f2f";
        fixedMsgBox.textContent = "Please fill all fields.";
        return;
      }
      fixedSubmitBtn.disabled = true;
      var originalText = fixedSubmitBtn.textContent;
      fixedSubmitBtn.textContent = "Submitting...";
      fetch(`${BaseURL}/api/v1/client/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: "INTERIORS_HOME_AURA_REALTOR",
          name,
          email,
          phone: mobile,
          message: "",
        }),
      })
        .then(function (res) {
          if (res.status !== 200) {
            throw new Error("Failed to submit. Please try again.");
          }
          return res.json();
        })
        .then(function (data) {
          fixedMsgBox.style.display = "block";
          fixedMsgBox.style.color = "#388e3c";
          fixedMsgBox.textContent = "Thank you! Your message has been sent.";
          fixedForm.reset();
        })
        .catch(function (err) {
          fixedMsgBox.style.display = "block";
          fixedMsgBox.style.color = "#d32f2f";
          fixedMsgBox.textContent =
            err.message || "Submission failed. Please try again.";
        })
        .finally(function () {
          fixedSubmitBtn.disabled = false;
          fixedSubmitBtn.textContent = originalText;
        });
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var bookingForm = document.getElementById("booking_form");
  if (!bookingForm) return;
  var successMsg = document.getElementById("success_message_col");
  var errorMsg = document.getElementById("error_message");
  var submitBtn = bookingForm.querySelector('input[type="submit"]');
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (successMsg) {
      successMsg.textContent = "";
      successMsg.style.display = "none";
    }
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
    }
    var name = bookingForm?.name?.value?.trim();
    var email = bookingForm?.email?.value?.trim();
    var mobile = bookingForm?.mobile?.value?.trim();
    var message = bookingForm?.message?.value?.trim();
    if (!name || !email || !mobile) {
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.style.color = "#d32f2f";
        errorMsg.textContent = "Please fill all required fields.";
      }
      return;
    }
    submitBtn.disabled = true;
    var originalText = submitBtn.value;
    submitBtn.value = "Submitting...";
    fetch(`${BaseURL}/api/v1/client/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "INTERIORS_HOME_AURA_REALTOR",
        name,
        email,
        phone: mobile,
        message,
      }),
    })
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Failed to submit. Please try again.");
        }
        return res.json();
      })
      .then(function (data) {
        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.style.color = "#388e3c";
          successMsg.textContent = "Thank you! Your request has been sent.";
        }
        bookingForm.reset();
      })
      .catch(function (err) {
        if (errorMsg) {
          errorMsg.style.display = "block";
          errorMsg.style.color = "#d32f2f";
          errorMsg.textContent =
            err.message || "Submission failed. Please try again.";
        }
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.value = originalText;
      });
  });
});
