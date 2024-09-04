function calculate() {
    // Get the values from the input fields
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;

    // Perform a simple calculation (e.g., addition)
    const result = parseFloat(input1) + parseFloat(input2);

    // Display the result
    document.getElementById('output').innerText = isNaN(result) ? 'Invalid input' : result;
}