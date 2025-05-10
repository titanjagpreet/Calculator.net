# calculator.net 🧮

A powerful, responsive, and scientific web calculator built using HTML, CSS, and Vanilla JavaScript. It supports both standard and scientific operations, and uses `math.js` under the hood for accurate evaluation.

---

## 🚀 Features

- **Standard Arithmetic**: Addition, subtraction, multiplication, division, percentage.
- **Scientific Functions**:
    - Trigonometric: `sin`, `cos`, `tan` with Degree/Radian toggle.
    - Inverse Trigonometric: `sin⁻¹`, `cos⁻¹`, `tan⁻¹`
    - Exponentials: `x²`, `x³`, `x^y`, `10^x`, `e^x`
    - Logarithms: `log` (base 10), `ln` (natural log)
    - Roots: `√x`, `³√x`, `y√x`
    - Constants: `π`, `e`
    - Other: `1/x`, `n!`, `EXP`, `±`, `RND`, `Ans`, `Back`, `AC`, `MR`, `M+`, `M-`
- **Display**:
    - Dual-screen calculator (input and result).
    - Smart error handling with user-friendly messages.

---

## 🧩 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend Logic**: JavaScript using `math.js` library for expression parsing and evaluation.
- **Library**: [math.js](https://mathjs.org/) (v11.5.1)

---

## 📂 Project Structure

```bash
calculator.net/
├── index.html        # Main calculator UI
├── style.css         # Styling for layout and components
├── index.js          # Logic and functionality for calculations
├── calculator-white.svg  # Logo/Icon
```

---

## 🛠️ Usage

1. Clone the repo:
    
    ```bash
    git clone https://github.com/yourusername/calculator.net.git
    cd calculator.net
    ```
    
2. Open `index.html` in your browser.

> No build setup required. Pure frontend application.
> 

---

## 💡 Implementation Highlights

- Expression parser that automatically transforms `sin45` to `sin(45)` and handles `log100`, `ln5`, etc.
- Supports both degree and radian modes using toggles.
- Includes error-safe evaluation with meaningful messages on invalid inputs.
- Auto-replacement of common symbols: `π` → `pi`, `√` → `sqrt`, etc.

---

## 📸 Preview

![](https://chatgpt.com/c/preview.png)

---

## 📚 License

This project is open-source and available under the [MIT License](https://chatgpt.com/c/LICENSE).

---

## 🙌 Acknowledgements

- Thanks to [math.js](https://mathjs.org/) for enabling accurate math expression evaluation.