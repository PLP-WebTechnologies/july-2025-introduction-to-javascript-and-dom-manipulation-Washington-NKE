
        // PART 1: Variables, Data Types, Operators, and Conditionals
        
        // Game state variables (different data types)
        let secretNumber = Math.floor(Math.random() * 100) + 1; // Number
        let attempts = 0; // Number
        let score = 100; // Number
        let gamesWon = 0; // Number
        let gameHistory = []; // Array
        let isGameActive = true; // Boolean
        let playerName = "Player"; // String
        
        function makeGuess() {
            // Get user input and validate
            const guessInput = document.getElementById('guessInput');
            const guess = parseInt(guessInput.value);
            
            // Part 1: Conditionals and data validation
            if (!guess || guess < 1 || guess > 100) {
                showMessage("Please enter a valid number between 1 and 100!", "error");
                return;
            }
            
            if (!isGameActive) {
                showMessage("Game is over! Start a new game.", "info");
                return;
            }
            
            attempts++;
            let message = "";
            let messageType = "";
            
            // Complex conditional logic
            if (guess === secretNumber) {
                // Win condition
                message = ` Congratulations! You guessed it in ${attempts} attempts! Score: ${score}`;
                messageType = "success";
                gamesWon++;
                isGameActive = false;
                updateStats();
            } else if (guess < secretNumber) {
                // Too low
                message = " Too low! Try a higher number.";
                messageType = "error";
                score = Math.max(0, score - 5); // Ternary-like operator usage
            } else {
                // Too high  
                message = " Too high! Try a lower number.";
                messageType = "error";
                score = Math.max(0, score - 5);
            }
            
            // Store guess in history
            gameHistory.push({
                guess: guess,
                attempt: attempts,
                feedback: message
            });
            
            showMessage(message, messageType);
            updateGuessHistory();
            updateStats();
            guessInput.value = "";
            
            console.log(`Attempt ${attempts}: Guess ${guess}, Secret: ${secretNumber}`);
        }
        

        // PART 2: Functions (Reusability)
        
        // Function 1: Message display utility
        function showMessage(text, type) {
            const messageDiv = document.getElementById('gameMessage');
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
            messageDiv.classList.remove('hidden');
            
            // Auto-hide after 5 seconds for non-success messages
            if (type !== "success") {
                setTimeout(() => {
                    messageDiv.classList.add('hidden');
                }, 5000);
            }
        }
        
        // Function 2: Calculate and format game statistics
        function calculateStats() {
            const totalGuesses = gameHistory.length;
            const averageScore = gamesWon > 0 ? Math.round(score / gamesWon * 100) / 100 : 0;
            const winRate = totalGuesses > 0 ? Math.round((gamesWon / totalGuesses) * 100) : 0;
            
            const stats = formatGameStats(totalGuesses, averageScore, winRate);
            
            document.getElementById('functionDemo').innerHTML = stats;
            document.getElementById('functionDemo').classList.remove('hidden');
        }
        
        // Function 3: Format statistics (helper function)
        function formatGameStats(total, avgScore, winRate) {
            return `
                <h4> Game Statistics</h4>
                <p><strong>Total Guesses:</strong> ${total}</p>
                <p><strong>Games Won:</strong> ${gamesWon}</p>
                <p><strong>Current Score:</strong> ${score}</p>
                <p><strong>Win Rate:</strong> ${winRate}%</p>
                <p><strong>Status:</strong> ${isGameActive ? 'Game Active' : 'Game Over'}</p>
            `;
        }
        
        // Function 4: Generate random facts
        function generateRandomFacts() {
            const facts = [
                "JavaScript was created in just 10 days!",
                "The number " + secretNumber + " is currently the secret number.",
                "You've made " + attempts + " attempts so far.",
                "Random fact: " + Math.floor(Math.random() * 1000) + " is a random number!",
                "Your current score is " + score + " points."
            ];
            
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            document.getElementById('functionDemo').innerHTML = `<h4> Random Fact:</h4><p>${randomFact}</p>`;
            document.getElementById('functionDemo').classList.remove('hidden');
        }
        
 
        // PART 3: Loops (for, while, forEach)
        
        // Loop Example 1: Countdown using while loop
        function startCountdown() {
            const countdownDiv = document.getElementById('countdownDisplay');
            countdownDiv.classList.remove('hidden');
            
            let count = 5;
            const countdownInterval = setInterval(() => {
                countdownDiv.textContent = count > 0 ? `Countdown: ${count}` : " GO!";
                
                if (count <= 0) {
                    clearInterval(countdownInterval);
                    setTimeout(() => {
                        countdownDiv.classList.add('hidden');
                    }, 1000);
                }
                count--;
            }, 1000);
        }
        
        // Loop Example 2: Generate number pattern using for loop
        function generatePattern() {
            let pattern = "<h4> Number Patterns:</h4>";
            
            // For loop - multiplication table
            pattern += "<p><strong>Multiplication Table (5x):</strong> ";
            for (let i = 1; i <= 10; i++) {
                pattern += `${5 * i} `;
            }
            pattern += "</p>";
            
            // While loop - fibonacci sequence
            pattern += "<p><strong>Fibonacci Sequence:</strong> ";
            let a = 0, b = 1, count = 0;
            pattern += a + " " + b + " ";
            while (count < 8) {
                let next = a + b;
                pattern += next + " ";
                a = b;
                b = next;
                count++;
            }
            pattern += "</p>";
            
            document.getElementById('loopDemo').innerHTML = pattern;
            document.getElementById('loopDemo').classList.remove('hidden');
        }

        // PART 4: DOM Manipulation

        let themeToggle = false;
        
        // DOM Interaction 1: Theme toggle (class manipulation)
        function changeTheme() {
            const container = document.querySelector('.container');
            const body = document.body;
            
            if (!themeToggle) {
                // Dark theme
                body.style.backgroundColor = '#2c2c2c';
                container.style.backgroundColor = '#3c3c3c';
                container.style.color = '#ffffff';
                themeToggle = true;
            } else {
                // Light theme
                body.style.backgroundColor = '#f0f0f0';
                container.style.backgroundColor = 'white';
                container.style.color = '#333';
                themeToggle = false;
            }
        }
        
        // DOM Interaction 2: Create and add dynamic elements
        function addGameElement() {
            const dynamicContent = document.getElementById('dynamicContent');
            
            // Create new element
            const newElement = document.createElement('div');
            newElement.className = 'message success';
            newElement.innerHTML = `
                <h4> Dynamically Created Element!</h4>
                <p>Created at: ${new Date().toLocaleTimeString()}</p>
                <p>Random number: ${Math.floor(Math.random() * 100)}</p>
                <button onclick="this.parentElement.remove()">Remove This Element</button>
            `;
            
            // Add to DOM
            dynamicContent.appendChild(newElement);
        }
        
        // UTILITY FUNCTIONS
        
        function updateStats() {
            document.getElementById('attempts').textContent = attempts;
            document.getElementById('score').textContent = score;
            document.getElementById('gamesWon').textContent = gamesWon;
        }
        
        function updateGuessHistory() {
            const historyDiv = document.getElementById('guessHistory');
            historyDiv.innerHTML = '<h4> Guess History:</h4>';
            
            // Use forEach to display history
            gameHistory.forEach(entry => {
                const historyItem = document.createElement('div');
                historyItem.textContent = `Attempt ${entry.attempt}: Guessed ${entry.guess}`;
                historyDiv.appendChild(historyItem);
            });
        }
        
        function resetGame() {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            score = 100;
            gameHistory = [];
            isGameActive = true;
            
            updateStats();
            document.getElementById('guessHistory').innerHTML = '';
            document.getElementById('gameMessage').classList.add('hidden');
            document.getElementById('guessInput').value = '';
            
            console.log("New game started! Secret number:", secretNumber);
        }
        
        // Initialize game on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Page loaded, game ready!");
            updateStats();
        });
        
        // Allow Enter key to submit guess
        document.getElementById('guessInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });
