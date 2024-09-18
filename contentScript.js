'use strict';

function simulateClick(element) {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(event);
}

function startGame() {
    const startButton = document.querySelector('.Game_game__container__1I7MG .bn-svg');
    if (startButton) {
        console.log('找到开始按钮，点击开始游戏...');
        simulateClick(startButton);
    } else {
        console.log('未找到开始按钮。');
    }
}

function playGame() {
    const canvas = document.querySelector('.canvas-wrapper canvas');
    if (canvas) {
        console.log('找到画布，模拟游戏操作...');
        const interval = setInterval(() => {
            const rect = canvas.getBoundingClientRect();
            const x = rect.left + (rect.width / 2);
            const y = rect.top + (rect.height / 2);
            simulateClick(canvas);
            console.log('在画布位置点击:', x, y);
        }, 1000);
    } else {
        console.log('未找到画布。');
    }
}

function clickTaskTab() {
    const taskTab = Array.from(document.querySelectorAll('.components_container__tab__1mbN9')).find(tab => {
        return tab.innerText.includes('任务');
    });

    if (taskTab) {
        console.log('找到 "任务" 标签，正在点击...');
        taskTab.click(); 
        return true;
    } else {
        console.log('未找到 "任务" 标签。');
        return false;
    }
}

function clickIncompleteTask() {
    const tasks = document.querySelectorAll('.Tasks_taskItem__16PwK');
    let foundIncompleteTask = false;
    for (const task of tasks) {
        const checkIcon = task.querySelector('img[src*="check.png"]');
        if (!checkIcon) {
            console.log('找到未完成的任务，正在点击...');
            task.click(); // 执行点击未完成的任务
            foundIncompleteTask = true;
            break;
        }
    }
    return foundIncompleteTask;
}

function clickContinueButton() {
    const continueButton = document.querySelector('.DailyLogin_login__button__15aOK');
    if (continueButton) {
        console.log('找到 "继续" 按钮，正在点击...');
        continueButton.click(); // 执行点击“继续”按钮
        return true;
    } else {
        console.log('未找到 "继续" 按钮。');
        return false;
    }
}

window.addEventListener('load', function() {
    if (document.readyState === 'complete') {
        // 执行点击操作
        let clicked = false;
        const interval = setInterval(() => {
            clicked = clickTaskTab();
            if (clicked) {
                clearInterval(interval);
                const taskInterval = setInterval(() => {
                    const found = clickIncompleteTask();
                    if (!found) {
                        clearInterval(taskInterval);
                        console.log('未找到更多未完成的任务。');
                    }
                }, 1000);
            }
        }, 1000);
        const continueInterval = setInterval(() => {
            const clickedContinue = clickContinueButton();
            if (clickedContinue) {
                clearInterval(continueInterval);
            }
        }, 1000);
    }
});
