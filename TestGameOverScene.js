export default class TestGameOverScene extends Phaser.Scene {
    constructor() {
      super('testGameOverScene');
      this.score;
    }
  
    init(data) {
      console.log(data);
      this.score = data;
    }
  
    preload() {
  
    }
  
    create() {
      // Display the "Game Over!" text
      this.add.text(400, 190, 'Game Over!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
      this.add.text(400, 220, 'Score: ' + this.score, { fontSize: '28px', fill: '#fff' }).setOrigin(0.5);
          this.add.text(400, 260, 'Refresh page to play again').setOrigin(0.5);
  
      // Create an HTML input element for the username
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'username';
      input.placeholder = 'Enter your username';
      input.style.fontSize = '20px';
      input.style.width = '300px';
      input.style.position = 'absolute';
      input.style.left = '250px';
      input.style.top = '250px';
      input.style.zIndex = '1000'; // Ensure it's above the game canvas
  
      // Add the input field to the document body
      document.body.appendChild(input);
  
      // Create a button for submitting the username
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Submit';
      button.style.fontSize = '18px';
      button.style.width = '100px';
      button.style.height = '30px';
      button.style.backgroundColor = '#4CAF50';
      button.style.color = 'white';
      button.style.position = 'absolute';
      button.style.left = '350px';
      button.style.top = '300px';
      button.style.zIndex = '1000'; // Ensure it's above the game canvas
  
      // Add event listener to the button
      button.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        console.log('Username:', username);
  
        fetch('https://localhost:7236/Game', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            score: this.score,
          })
        })
          .then(() => {
            console.log('new user score added');
                      button.style.display = 'none';
                      input.style.display = 'none';
          });
      });
  
      // Add the button to the document body
      document.body.appendChild(button);
    }
  }