const display = document.querySelector(".display");
const myInputs = document.querySelectorAll("form>input");
const form = document.querySelector("form");

myInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    checkValidation(input);
  });

  input.addEventListener("blur", (e) => {
    checkValidation(input);
  });
});

form.addEventListener("submit", (e) => {
  if (form.checkValidity()) {
    alert("SUBMITTED! All the fields are Valid.");
  } else if (form.checkValidity() === false) {
    e.preventDefault();
    let valueMissing = false;
    Array.from(form.elements).forEach((element) => {
      if (element.validity.valueMissing) {
        valueMissing = true;
        element.setCustomValidity("Required fields missing!");
      } else {
        element.setCustomValidity("");
      }
    });

    if (valueMissing) {
      alert("Required fields missing!");
    } else {
      alert("SUBMISSION ABORTED! Some of the fields are Invalid.");
    }
  }
});

function checkValidation(input) {
  if (input.className === "email") {
    const email = input.value;
    const parts = email.split("@");
    const parts2 = email.split(".");
    if (
      !(
        parts.length === 2 &&
        parts[0].length >= 1 &&
        parts[1].includes(".") &&
        !email.includes("..")
      ) ||
      parts2[1] < 1
    ) {
      input.setCustomValidity("Error");
      display.textContent = "Invalid email address!";
    } else {
      input.setCustomValidity("");
      display.textContent = "";
    }
  } else if (input.className === "postalCode") {
    const validPostalCodeChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -";

    let validPostal = true;
    const postalChars = Array.from(input.value);

    for (let char of postalChars) {
      if (!validPostalCodeChars.includes(char)) {
        validPostal = false;
        break;
      }
    }

    if (input.value.length < 2) {
      input.setCustomValidity("Error");
      display.textContent = "Postal code cannot have less than 2 characters";
    } else if (
      input.value.includes("  ") ||
      input.value.includes("--") ||
      input.value.includes(" -") ||
      input.value.includes("- ")
    ) {
      input.setCustomValidity("Error");
      display.textContent = "Invalid postal code";
    } else if (!validPostal) {
      display.textContent =
        "Postal code cannot have other special characters besides Space and hyphen";
      input.setCustomValidity("Error");
    } else {
      input.setCustomValidity("");
      display.textContent = "";
    }
  } else if (
    input.classList.contains("password") ||
    input.classList.contains("confirmPassword")
  ) {
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const chars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
    const allowedChars =
      uppercaseLetters + lowercaseLetters + chars + "0123456789";

    const passwordInput = document.querySelector(".password");
    const confirmPasswordInput = document.querySelector(".confirmPassword");

    let hasLower = false;
    let hasUpper = false;
    let hasNumber = false;
    let hasSpecialChar = false;

    const passwordChars = Array.from(input.value);
    for (let pass of passwordChars) {
      if (lowercaseLetters.includes(pass)) {
        hasLower = true;
      }
      if (uppercaseLetters.includes(pass)) {
        hasUpper = true;
      }
      if ("0123456789".includes(pass)) {
        hasNumber = true;
      }
      if (chars.includes(pass)) {
        hasSpecialChar = true;
      }
    }
    if (!(hasLower && hasUpper && hasNumber && hasSpecialChar)) {
      input.setCustomValidity("Error");
      display.textContent =
        "Password must have at least one lowercase letter, uppercase letter, number and special character";
    } else if (input.value.length < 16) {
      input.setCustomValidity("Error");
      display.textContent = "Password cannot be less than 16 characters";
    } else if (passwordInput.value != confirmPasswordInput.value) {
      input.setCustomValidity("Error");
      display.textContent = "Both Passwords should match!";
    } else {
      input.setCustomValidity("");
      display.textContent = "";
    }
  }
}
