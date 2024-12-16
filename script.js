// Function to validate the login credentials
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'DA' && password === '123') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('calculatorContainer').style.display = 'block';
    } else {
        document.getElementById('loginError').innerText = 'Invalid username or password. Please try again.';
    }
}

// Function to show/hide fields for old customers
function toggleOldCustomerFields() {
    const customerType = document.getElementById('customerType').value;
    const newCustomerFields = document.getElementById('newCustomerFields');
    const oldCustomerFields = document.getElementById('oldCustomerFields');

    if (customerType === 'old') {
        newCustomerFields.style.display = 'none';
        oldCustomerFields.style.display = 'block';
    } else {
        newCustomerFields.style.display = 'block';
        oldCustomerFields.style.display = 'none';
    }
}

// Function to calculate the final limit
function calculateExpectedLimit() {
    const customerType = document.getElementById('customerType').value;
    const creditTrancheDays = parseFloat(document.getElementById('creditTrancheDays').value);
    const ccLimit = parseFloat(document.getElementById('ccLimit').value);

    if (isNaN(creditTrancheDays) || isNaN(ccLimit)) {
        document.getElementById('finalLimitOutput').innerText = 'Please enter valid numbers.';
        return;
    }

    let finalRotationalEligibility;

    if (customerType === 'new') {
        const totalPurchases = parseFloat(document.getElementById('totalPurchases').value);
        if (isNaN(totalPurchases)) {
            document.getElementById('finalLimitOutput').innerText = 'Please enter a valid Total Purchases.';
            return;
        }
        const projectedPurchases = totalPurchases * 0.2;
        const eligibilityBasisPurchasesOnly = (projectedPurchases / 12) * (creditTrancheDays / 30);
        finalRotationalEligibility = eligibilityBasisPurchasesOnly - ccLimit / 5;
    } else {
        const projectedPurchases = parseFloat(document.getElementById('projectedPurchases').value);
	const lastTotalPurchases = parseFloat(document.getElementById('lastTotalPurchases').value);
        const lastTbhPurchases = parseFloat(document.getElementById('lastTbhPurchases').value);

        if (
            isNaN(lastTotalPurchases) ||
            isNaN(lastTbhPurchases) ||
            isNaN(projectedPurchases)
        ) {
            document.getElementById('finalLimitOutput').innerText = 'Please enter valid values for Old Customer inputs.';
            return;
        }

        const purchaseDependency = (lastTbhPurchases / lastTotalPurchases) * 100;
        const eligibilityBasisPurchasesOnly = (projectedPurchases / 12) * (creditTrancheDays / 30);
        finalRotationalEligibility = eligibilityBasisPurchasesOnly - ccLimit * (purchaseDependency / 100);
    }

    document.getElementById('finalLimitOutput').innerText = finalRotationalEligibility.toFixed(2);
}