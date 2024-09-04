// Function to validate the login credentials
function validateLogin() {
    // Get username and password inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if credentials match the predefined values
    if (username === 'DA' && password === '123') {
        // Hide the login form and show the calculator
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('calculatorContainer').style.display = 'block';
    } else {
        // Display error message if credentials are incorrect
        document.getElementById('loginError').innerText = 'Invalid username or password. Please try again.';
    }
}

// Function to calculate the final limit
function calculateFinalLimit() {
    // Get input values
    const totalPurchases = parseFloat(document.getElementById('totalPurchases').value);
    const ccLimit = parseFloat(document.getElementById('ccLimit').value);
    const highestPurchase = parseFloat(document.getElementById('highestPurchase').value);

    // Validate inputs
    if (isNaN(totalPurchases) || isNaN(ccLimit) || isNaN(highestPurchase)) {
        document.getElementById('finalLimitOutput').innerText = 'Please enter valid numbers.';
        return;
    }

    // Perform hidden calculations
    const projectedPurchases = totalPurchases * 1.1; // Projected Purchases (next 12 months)
    const averageProjectedPurchases = projectedPurchases / 12; // Average projected purchases
    const eligibilityBasisPurchasesOnly = averageProjectedPurchases * 3; // Eligibility basis purchases only
    const lessCCLimit = ccLimit / 10; // Less CC Limit
    const finalRotationalEligibility = eligibilityBasisPurchasesOnly - lessCCLimit; // Final Rotational Eligibility
    const projectedPurchase = highestPurchase * 1.1; // Projected Purchase
    const eligibleLimit = (projectedPurchase * 90 / 30) - lessCCLimit; // Eligible Limit

    // Calculate Final Limit
    const finalLimit = eligibleLimit - finalRotationalEligibility;

    // Display the result
    document.getElementById('finalLimitOutput').innerText = finalLimit.toFixed(2);
}