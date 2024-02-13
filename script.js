// Add event listener to the form submission
document.getElementById('loveCalculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get input values
    const person1Name = document.getElementById('person1Name').value.trim();
    const person2Name = document.getElementById('person2Name').value.trim();
    const algorithm = document.getElementById('algorithm').value;

    try {
        // Validate input values
        validateInputs(person1Name, person2Name);

        // Call function to calculate compatibility
        const compatibilityScore = calculateCompatibility(person1Name, person2Name, algorithm);

        // Display result
        document.getElementById('result').innerText = `Compatibility Score is: ${compatibilityScore}%`;
    } catch (error) {
        // Display error message
        document.getElementById('result').innerText = error.message;
    }
});

// Function to validate input values
function validateInputs(person1Name, person2Name) {
    if (!person1Name || !person2Name) {
        throw new Error('Please enter both names 😊.');
    }
}

// Function to calculate compatibility score based on the selected algorithm
function calculateCompatibility(person1Name, person2Name, algorithm) {
    let compatibilityScore = 0;

    // Implement the selected algorithm
    switch (algorithm) {
        case 'name':
            compatibilityScore = calculateNameCompatibility(person1Name, person2Name);
            break;
        case 'numerology':
            compatibilityScore = calculateNumerologyCompatibility(person1Name, person2Name);
            break;
        case 'astrology':
            compatibilityScore = calculateAstrologyCompatibility(person1Name, person2Name);
            break;
        default:
            throw new Error('Select An Algorithm 😊.');
    }

    return compatibilityScore;
}

// Function to calculate compatibility score based on name compatibility algorithm
function calculateNameCompatibility(person1Name, person2Name) {
    // Placeholder implementation, replace with actual logic
    // For now, let's calculate compatibility based on the number of shared letters in the names
    const name1Set = new Set(person1Name.toLowerCase());
    const name2Set = new Set(person2Name.toLowerCase());
    const intersection = [...name1Set].filter(letter => name2Set.has(letter));
    const compatibilityPercentage = (intersection.length / Math.min(name1Set.size, name2Set.size)) * 100;
    return Math.round(compatibilityPercentage);
}

// Function to calculate compatibility score based on numerology algorithm
function calculateNumerologyCompatibility(person1Name, person2Name) {
    // Calculate the sum of numerical values of the letters in the names
    const name1NumericalValue = calculateNameNumericalValue(person1Name);
    const name2NumericalValue = calculateNameNumericalValue(person2Name);

    // Calculate the absolute difference between the numerical values
    const difference = Math.abs(name1NumericalValue - name2NumericalValue);

    // Normalize the difference to a percentage between 0 and 100
    const maxDifference = 26 * Math.max(person1Name.length, person2Name.length); // Max possible difference
    const compatibilityPercentage = (1 - difference / maxDifference) * 100;

    return Math.round(compatibilityPercentage); // Return the percentage as compatibility score
}


// Helper function to calculate the numerical value of a name
function calculateNameNumericalValue(name) {
    // A=1, B=2, ..., Z=26
    return name.toLowerCase().split('').reduce((acc, curr) => acc + (curr.charCodeAt(0) - 96), 0);
}

// Function to calculate compatibility score based on astrology algorithm
function calculateAstrologyCompatibility(person1Name, person2Name) {
    // Calculate the difference in the number of vowels in the names
    const vowels1 = countVowels(person1Name);
    const vowels2 = countVowels(person2Name);
    const difference = Math.abs(vowels1 - vowels2);

    // Normalize the difference to a percentage between 0 and 100
    const maxDifference = Math.max(person1Name.length, person2Name.length); // Max possible difference
    const compatibilityPercentage = (1 - difference / maxDifference) * 100;

    return Math.round(compatibilityPercentage); // Return the percentage as compatibility score
}


// Function to count the number of vowels in a string
function countVowels(str) {
    return str.toLowerCase().split('').reduce((count, char) => {
        if ('aeiou'.includes(char)) {
            return count + 1;
        }
        return count;
    }, 0);
}