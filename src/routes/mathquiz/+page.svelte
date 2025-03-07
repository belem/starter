<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { SiteFooter } from '$lib/components/ui-enhanced/index';
	import * as m from '$lib/paraglide/messages.js';
  import { fade, scale } from 'svelte/transition';
  
  // Game settings
  let settings = {
    operationRules: 'additionSubtraction',
    numberRange: '100',
    supportCarry: true,
    supportBorrow: true,
    timerDuration: '180', // in seconds
  };
  
  // Game state
  let screen = 'settings'; // 'settings', 'game', 'results'
  let currentQuestion = null;
  let score = 0;
  let timeLeft = 0;
  let timer;
  let records = {};
  let newRecord = false;
  
  // Audio
  let audioContext;
  let sounds = {
    correct: null,
    wrong: null,
    gameOver: null
  };
  
  onMount(() => {
    loadRecords();
  });
  
  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
  
  function startGame() {
    screen = 'game';
    score = 0;
    timeLeft = parseInt(settings.timerDuration);
    generateQuestion();
    
    // Start countdown
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
    
    // Initialize audio if not already done
    initAudio();
  }
  
  function initAudio() {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create sounds
        createSound('correct', [330, 415, 494], 0.1);
        createSound('wrong', [200, 150], 0.1);
        createSound('gameOver', [494, 392, 330, 294, 220], 0.15);
      }
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }
  
  function createSound(name, frequencies, duration) {
    sounds[name] = () => {
      if (!audioContext) return;
      
      frequencies.forEach((frequency, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.3;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime + i * duration);
        oscillator.stop(audioContext.currentTime + (i + 1) * duration);
        
        // Fade out
        gainNode.gain.exponentialRampToValueAtTime(
          0.01, audioContext.currentTime + (i + 1) * duration
        );
      });
    };
  }
  
  function playSound(name) {
    if (sounds[name]) {
      sounds[name]();
    }
  }
  
  function generateQuestion() {
    const range = parseInt(settings.numberRange);
    let num1, num2, answer, operation, questionStr;
    const operations = getEnabledOperations();
    
    // Randomly select an operation from enabled ones
    operation = operations[Math.floor(Math.random() * operations.length)];
    
    switch (operation) {
      case '+':
        if (settings.supportCarry) {
          num1 = Math.floor(Math.random() * range);
          num2 = Math.floor(Math.random() * (range - num1));
        } else {
          // No carry: ensure the sum of digits doesn't exceed 9
          do {
            num1 = Math.floor(Math.random() * range);
            num2 = Math.floor(Math.random() * (range - num1));
          } while (hasCarry(num1, num2));
        }
        answer = num1 + num2;
        questionStr = `${num1} + ${num2} = ?`;
        break;
        
      case '-':
        if (settings.supportBorrow) {
          num1 = Math.floor(Math.random() * range);
          num2 = Math.floor(Math.random() * num1);
        } else {
          // No borrow: ensure each digit of num1 is >= corresponding digit of num2
          do {
            num1 = Math.floor(Math.random() * range);
            num2 = Math.floor(Math.random() * num1);
          } while (hasBorrow(num1, num2));
        }
        answer = num1 - num2;
        questionStr = `${num1} - ${num2} = ?`;
        break;
        
      case '*':
        // For multiplication, use smaller numbers
        const maxFactor = Math.min(12, Math.floor(Math.sqrt(range)));
        num1 = Math.floor(Math.random() * maxFactor) + 1;
        num2 = Math.floor(Math.random() * maxFactor) + 1;
        answer = num1 * num2;
        questionStr = `${num1} × ${num2} = ?`;
        break;
        
      case '/':
        // For division, ensure we have whole number answers
        num2 = Math.floor(Math.random() * 10) + 1; // Divisor between 1 and 10
        answer = Math.floor(Math.random() * 10) + 1; // Quotient between 1 and 10
        num1 = num2 * answer; // Calculate dividend
        questionStr = `${num1} ÷ ${num2} = ?`;
        break;
    }
    
    // Generate 3 incorrect options
    let options = [answer];
    while (options.length < 4) {
      // Offset by +/- 1 to 10
      let incorrectOption;
      do {
        const offset = Math.floor(Math.random() * 10) + 1;
        incorrectOption = Math.random() < 0.5 
          ? answer + offset 
          : Math.max(0, answer - offset);
      } while (options.includes(incorrectOption) || incorrectOption < 0);
      
      options.push(incorrectOption);
    }
    
    // Shuffle options
    options = shuffleArray(options);
    
    currentQuestion = {
      question: questionStr,
      options: options,
      correctAnswer: answer
    };
  }
  
  function getEnabledOperations() {
    switch (settings.operationRules) {
      case 'addition':
        return ['+'];
      case 'subtraction':
        return ['-'];
      case 'additionSubtraction':
        return ['+', '-'];
      case 'multiplication':
        return ['*'];
      case 'division':
        return ['/'];
      case 'multiplicationDivision':
        return ['*', '/'];
      case 'all':
        return ['+', '-', '*', '/'];
      default:
        return ['+', '-'];
    }
  }
  
  function hasCarry(a, b) {
    // Check if addition of these numbers involves carry
    let aStr = a.toString();
    let bStr = b.toString();
    
    // Pad the shorter number with leading zeros
    while (aStr.length < bStr.length) aStr = '0' + aStr;
    while (bStr.length < aStr.length) bStr = '0' + bStr;
    
    // Check each digit position
    for (let i = aStr.length - 1; i >= 0; i--) {
      if (parseInt(aStr[i]) + parseInt(bStr[i]) > 9) {
        return true;
      }
    }
    return false;
  }
  
  function hasBorrow(a, b) {
    // Check if subtraction of these numbers involves borrowing
    let aStr = a.toString();
    let bStr = b.toString();
    
    // Pad the shorter number with leading zeros
    while (bStr.length < aStr.length) bStr = '0' + bStr;
    
    // Check each digit position
    for (let i = aStr.length - 1; i >= 0; i--) {
      if (parseInt(aStr[i]) < parseInt(bStr[i])) {
        return true;
      }
    }
    return false;
  }
  
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  function checkAnswer(selectedOption) {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      score++;
      playSound('correct');
    } else {
      playSound('wrong');
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      generateQuestion();
    }, 700);
    
    return isCorrect; // Return for animation purposes
  }
  
  function endGame() {
    clearInterval(timer);
    screen = 'results';
    playSound('gameOver');
    
    // Check if new record
    const settingKey = getSettingKey();
    
    if (!records[settingKey] || score > records[settingKey]) {
      records[settingKey] = score;
      localStorage.setItem('quickCalcRecords', JSON.stringify(records));
      newRecord = true;
    } else {
      newRecord = false;
    }
  }
  
  function getSettingKey() {
    return `${settings.operationRules}_${settings.numberRange}_${settings.supportCarry}_${settings.supportBorrow}_${settings.timerDuration}`;
  }
  
  function formatSettingKey(key) {
    const parts = key.split('_');
    let operationText = '';
    
    switch (parts[0]) {
      case 'addition': operationText = m.qcz_addition(); break;
      case 'subtraction': operationText = m.qcz_subtraction(); break;
      case 'additionSubtraction': operationText = m.qcz_additionSubtraction(); break;
      case 'multiplication': operationText = m.qcz_multiplication(); break;
      case 'division': operationText = m.qcz_division(); break;
      case 'multiplicationDivision': operationText = m.qcz_multiplicationDivision(); break;
      case 'all': operationText = m.qcz_all(); break;
    }
    
    return `${operationText} (${parts[1]}) - ${formatTime(parts[4])}`;
  }
  
  function resetGame() {
    goToSettings();
  }
  
  function goToSettings() {
    screen = 'settings';
    clearInterval(timer);
  }
  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  function loadRecords() {
    try {
      const storedRecords = localStorage.getItem('quickCalcRecords');
      if (storedRecords) {
        records = JSON.parse(storedRecords);
      }
    } catch (e) {
      console.error('Error loading records:', e);
      records = {};
    }
  }
</script>

<svelte:head>
	<title>{m.title()} - {m.seo_qcz_title()}</title>
	<meta name="keywords" content="{m.seo_qcz_keywords()}, {m.seo_schulte_keywords()}" />
	<meta name="description" content="{m.seo_qcz_description()}, {m.seo_schulte_description()}" />
</svelte:head>

  <main class="qcz bg-sky-50 dark:bg-gray-900 grid w-auto grid-cols-1 justify-items-center items-center justify-center p-4">
    {#if screen === 'settings'}
      <div class="w-full max-w-md bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4" transition:fade>
        <h2 class="text-xl font-bold text-center mb-6 text-sky-600">{m.qcz_gameSettings()}</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-500 mb-2">{m.qcz_rules()}:</label>
          <select bind:value={settings.operationRules} class="w-full p-2 border rounded-md">
            <option value="addition">{m.qcz_addition()}</option>
            <option value="subtraction">{m.qcz_subtraction()}</option>
            <option value="additionSubtraction">{m.qcz_additionSubtraction()}</option>
            <option value="multiplication">{m.qcz_multiplication()}</option>
            <option value="division">{m.qcz_division()}</option>
            <option value="multiplicationDivision">{m.qcz_multiplicationDivision()}</option>
            <option value="all">{m.qcz_all()}</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-500 mb-2">{m.qcz_nr()}:</label>
          <select bind:value={settings.numberRange} class="w-full p-2 border rounded-md">
            <option value="100">{m.qcz_within_100()}</option>
            <option value="1000">{m.qcz_within_1000()}</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-500 mb-2">{m.qcz_carry()}:</label>
          <div class="flex items-center">
            <input type="checkbox" bind:checked={settings.supportCarry} id="supportCarry" class="mr-2">
            <label for="supportCarry">{m.qcz_yes()}</label>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-500 mb-2">{m.qcz_borrow()}:</label>
          <div class="flex items-center">
            <input type="checkbox" bind:checked={settings.supportBorrow} id="supportBorrow" class="mr-2">
            <label for="supportBorrow">{m.qcz_yes()}</label>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 dark:text-gray-500 mb-2">{m.qcz_timer()}:</label>
          <select bind:value={settings.timerDuration} class="w-full p-2 border rounded-md">
            <option value="30">30 {m.qcz_seconds()}</option>
            <option value="60">1 {m.qcz_minute()}</option>
            <option value="120">2 {m.qcz_minutes()}</option>
            <option value="180">3 {m.qcz_minutes()}</option>
            <option value="300">5 {m.qcz_minutes()}</option>
          </select>
        </div>

        <button on:click={startGame} class="w-full py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors shadow-md">
          {m.qcz_start()}
        </button>
      </div>

      <div class="w-full max-w-md bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 rounded-lg shadow-lg p-6" transition:fade>
        <h2 class="text-xl font-bold text-center mb-4 text-sky-600">{m.qcz_preRecords()}</h2>
        {#if Object.keys(records).length === 0}
          <p class="text-center text-gray-500">{m.qcz_noRecords()}</p>
        {:else}
          <div class="overflow-y-auto max-h-44">
            {#each Object.entries(records) as [key, value]}
              <div class="mb-2 p-2 bg-sky-50 dark:bg-gray-900 rounded-md">
                <p class="text-sm">
                  <span class="font-semibold">{m.qcz_setting()}:</span> {formatSettingKey(key)}
                </p>
                <p class="text-sm">
                  <span class="font-semibold">{m.qcz_best()}:</span> {value}
                </p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {:else if screen === 'game'}
      <div class="w-full max-w-md" transition:fade>
        <!-- Timer and Score -->
				<h3 class="text-xl text-center font-bold mb-8 mt-[-42px]">{m.qcz_title()}</h3>
        <div class="flex justify-between items-center">
          <div class="text-xl bg-sky-100 dark:bg-sky-900 px-4 py-2 rounded-lg">
            {m.qcz_score()}: {score}
          </div>
          <div class="text-xl bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-lg">
            {m.qcz_time()}: {formatTime(timeLeft)}
          </div>
        </div>

        <!-- Question container -->
        <div class="py-6 mb-6 text-center">
          <div class="text-3xl font-bold mb-8">{currentQuestion.question}</div>
          
          <div class="grid grid-cols-2 gap-4">
            {#each currentQuestion.options as option, index}
              <button 
                on:click={() => checkAnswer(option)} 
                class="option-btn bg-sky-500 hover:bg-sky-600 text-white py-4 text-xl font-bold rounded-lg shadow-sm transition-all"
              >
                {option}
              </button>
            {/each}
          </div>
        </div>
      </div>
    {:else if screen === 'results'}
      <div class="w-full max-w-md bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center" transition:scale>
        <h2 class="text-2xl font-bold mb-4">{m.qcz_complete()}</h2>
        
        <div class="text-4xl font-bold text-sky-600 mb-6">{score}</div>
        
        {#if newRecord}
          <div class="bg-yellow-100 border-2 border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 animate-pulse">
            <strong>{m.qcz_congra()}</strong> {m.qcz_newrecord()}
          </div>
        {/if}
        
        <button on:click={resetGame} class="w-full py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors shadow-md mb-4">
          {m.qcz_playagain()}
        </button>
        
        <button on:click={goToSettings} class="w-full py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors shadow-md">
          {m.qcz_changeSettings()}
        </button>
      </div>
    {/if}
  </main>
 

<style>
	.option-btn {
    transition: all 0.3s ease;
  }
  
  .option-btn:hover {
    transform: scale(1.05);
  }
  
  :global(.option-btn.correct) {
    animation: pulse 0.5s;
    background-color: #10B981;
  }
  
  :global(.option-btn.wrong) {
    animation: shake 0.5s;
    background-color: #EF4444;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  
  /* Animation for the record notification */
  .animate-pulse {
    animation: pulse 2s infinite;
  }
</style>
