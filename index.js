function runConsoleOutput(button) {
    var codeContainer = button.closest('.code-container');
    var outputDiv = codeContainer.querySelector('.output-div');
    outputDiv.textContent = '';

    // Capture console.log output
    var consoleLogOutput = [];
    var oldConsoleLog = console.log;

    console.log = function (...args) {
      var message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
      consoleLogOutput.push(message);
      oldConsoleLog.apply(console, args);
    };

    // Get user input
    var userInput = codeContainer.querySelector('.user-input').value;

    // Execute user code
    try {
      eval(userInput);
    } catch (error) {
      console.error(error);
      consoleLogOutput.push('Error: ' + error.message);
    }

    // Display console output on the screen
    outputDiv.textContent = consoleLogOutput.join('\n');
  }

  function handleEnter(event, textarea) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      runConsoleOutput(textarea.nextElementSibling);
    }
  }

  function addCodeContainer() {
    var codeContainer = document.createElement('div');
    codeContainer.classList.add('code-container');

    var userInput = document.createElement('textarea');
    userInput.classList.add('user-input', 'language-javascript'); 
    userInput.placeholder = 'Type your code here';
    userInput.spellcheck = false;
    userInput.addEventListener('keydown', function (event) {
      handleEnter(event, this);
      handleShortcut(event, codeContainer);
    });

    var runButton = document.createElement('button');
    runButton.textContent = 'Run Code';
    runButton.addEventListener('click', function () {
      runConsoleOutput(this);
    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
      deleteCodeContainer(this);
    });

    var outputDiv = document.createElement('div');
    outputDiv.classList.add('output-div');

    var controlButtons = document.createElement('div');
    controlButtons.classList.add('control-buttons');
    controlButtons.appendChild(runButton);
    controlButtons.appendChild(deleteButton);

    codeContainer.appendChild(userInput);
    codeContainer.appendChild(controlButtons);
    codeContainer.appendChild(outputDiv);

    document.body.insertBefore(codeContainer, document.getElementById('addButton'));
  }

  function deleteCodeContainer(button) {
    var codeContainer = button.closest('.code-container');
    codeContainer.remove();
  }

  function handleShortcut(event, codeContainer) {
    if (event.key === 'm' && event.ctrlKey) {
        event.preventDefault();
        addCodeContainer();
    } else if (event.key === 'x' && event.ctrlKey) {
        event.preventDefault();
        deleteCodeContainer(codeContainer.querySelector('.delete-button'));
    }
}