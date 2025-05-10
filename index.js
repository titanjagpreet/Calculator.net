document.addEventListener("DOMContentLoaded", () => {
  const inputDisplay = document.querySelector(".display-input");
  const outputDisplay = document.querySelector(".display-output");
  const calcButtons = document.querySelectorAll(".calculator button");

  let currentInput = "";
  let lastResult = "";
  let degMode = false;

  const updateDisplays = () => {
    inputDisplay.textContent = currentInput || "0";
  };

  const importTrigInDeg = () => {
    math.import(
      {
        sin: (x) => math.sin(math.unit(x, "deg")),
        cos: (x) => math.cos(math.unit(x, "deg")),
        tan: (x) => math.tan(math.unit(x, "deg")),
        asin: (x) => math.asin(x) * (180 / Math.PI),
        acos: (x) => math.acos(x) * (180 / Math.PI),
        atan: (x) => math.atan(x) * (180 / Math.PI),
      },
      { override: true }
    );
  };

  const importTrigInRad = () => {
    math.import(
      {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        asin: Math.asin,
        acos: Math.acos,
        atan: Math.atan,
      },
      { override: true }
    );
  };

  const specialMappings = {
    π: "pi",
    e: "e",
    "x²": "^2",
    "x³": "^3",
    xʸ: "^(",
    "√x": "sqrt(",
    "3√x": "nthRoot(",
    "y√x": "nthRoot(",
    "1/x": "1/(",
    "±": "-(",
    EXP: "*10^(",
    "sin⁻¹": "asin(",
    "cos⁻¹": "acos(",
    "tan⁻¹": "atan(",
    ln: "log(",
    log: "log10(",
    "n!": "factorial(",
    "%": "/100",
    Ans: () => lastResult,
    RND: () => Math.random().toFixed(5),
  };

  const autoWrapFunctions = (expression) => {
    const functions = [
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "sqrt",
      "log10",
      "log",
      "factorial",
      "nthRoot",
    ];
    for (let fn of functions) {
      const regex = new RegExp(`${fn}(\\d+(\\.\\d+)?)`, "g");
      expression = expression.replace(regex, `${fn}($1)`);
    }
    return expression;
  };

  const replaceMappings = (expression) => {
    // Replace longer keys first (e.g. sin⁻¹ before sin)
    const sortedKeys = Object.keys(specialMappings).sort(
      (a, b) => b.length - a.length
    );
    for (let key of sortedKeys) {
      const mapped =
        typeof specialMappings[key] === "function"
          ? specialMappings[key]()
          : specialMappings[key];
      expression = expression.split(key).join(mapped);
    }
    return expression;
  };

  const displayError = (msg = "Error") => {
    outputDisplay.textContent = msg;
    outputDisplay.style.color = "red";
  };

  calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const btnText =
        button.childNodes.length > 1
          ? button.childNodes[button.childNodes.length - 1].nodeValue.trim()
          : button.textContent.trim();

      if (btnText === "AC") {
        currentInput = "";
        outputDisplay.textContent = "0";
        outputDisplay.style.color = "white";
        updateDisplays();
        return;
      }

      if (btnText === "Back") {
        currentInput = currentInput.slice(0, -1);
        updateDisplays();
        return;
      }

      if (btnText === "Deg") {
        degMode = true;
        return;
      }

      if (btnText === "Rad") {
        degMode = false;
        return;
      }

      if (btnText === "=") {
        try {
          degMode ? importTrigInDeg() : importTrigInRad();
          let expr = currentInput;
          expr = replaceMappings(expr);
          expr = autoWrapFunctions(expr);
          const result = math.evaluate(expr);
          outputDisplay.textContent = result;
          outputDisplay.style.color = "white";
          lastResult = result;
        } catch (err) {
          displayError("Invalid Expression");
          console.error("Evaluation Error:", err);
        }
        return;
      }

      // Dynamic values like Ans, RND
      if (typeof specialMappings[btnText] === "function") {
        currentInput += specialMappings[btnText]();
      } else if (specialMappings[btnText]) {
        currentInput += specialMappings[btnText];
      } else {
        currentInput += btnText;
      }

      updateDisplays();
    });
  });
});
