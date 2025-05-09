document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements
    const inputDisplay = document.querySelector(".display-input");
    const outputDisplay = document.querySelector(".display-output");
    const calcButtons = document.querySelectorAll(".calculator button");
  
    // State variables
    let currentInput = "";
    let lastResult = "";
    let degMode = false; // Default mode: radians
  
    // Helper: Update display fields
    const updateDisplays = () => {
      inputDisplay.textContent = currentInput || "0";
    };
  
    // Setup custom mathjs functions for degree mode
    const importTrigInDeg = () => {
      math.import(
        {
          sin: function (x) {
            return math.sin(math.unit(x, "deg"));
          },
          cos: function (x) {
            return math.cos(math.unit(x, "deg"));
          },
          tan: function (x) {
            return math.tan(math.unit(x, "deg"));
          },
          asin: function (x) {
            return math.asin(x) * (180 / Math.PI);
          },
          acos: function (x) {
            return math.acos(x) * (180 / Math.PI);
          },
          atan: function (x) {
            return math.atan(x) * (180 / Math.PI);
          }
        },
        { override: true }
      );
    };
  
    // Reset to default mathjs functions (radian mode)
    const importTrigInRad = () => {
      // Reload mathjs to reset any overrides (if needed)
      // For simplicity, you may also keep track of mode and import only when switching modes.
      // Here we assume that the default functions are in place when degMode is false.
    };
  
    // Event handler for calculator buttons
    calcButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Extract the visible button text. If the button contains an input (radio), ignore that part.
        const btnText = button.childNodes.length > 1 ? button.childNodes[button.childNodes.length - 1].nodeValue.trim() : button.textContent.trim();
  
        // Handle special buttons based on their text content
        if (btnText === "AC") {
          currentInput = "";
          outputDisplay.textContent = "0";
        } else if (btnText === "Back") {
          currentInput = currentInput.slice(0, -1);
        } else if (btnText === "=") {
          // Evaluate expression using mathjs with error handling.
          try {
            // Set trigonometric function mode based on the current mode.
            if (degMode) {
              importTrigInDeg();
            } else {
              importTrigInRad();
            }
  
            // Evaluate the expression stored in currentInput.
            const result = math.evaluate(currentInput);
            outputDisplay.textContent = result;
            lastResult = result;
          } catch (error) {
            outputDisplay.textContent = "Error";
            console.error("Calculation error:", error);
          }
        } else if (btnText === "Ans") {
          // Append the last result to the current input.
          currentInput += lastResult;
        } else if (btnText === "Deg") {
          degMode = true;
          // Optionally, visually indicate that degree mode is active.
        } else if (btnText === "Rad") {
          degMode = false;
          // Optionally, visually indicate that radian mode is active.
        } else {
          // Append the button text to the current input.
          currentInput += btnText;
        }
  
        // Update the input display after handling the button click.
        updateDisplays();
      });
    });
  });
  