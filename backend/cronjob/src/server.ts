function task() {
    console.log(`Task execued at ${new Date().toLocaleTimeString()}`);
}

function getNextExecutionDelay(
    hour: number,
    minute: number,
    second: number = 0
) {
    const now = new Date();
    const nextExecution = new Date();

    nextExecution.setHours(hour, minute, second, 0);

    if (nextExecution <= now) {
        nextExecution.setDate(nextExecution.getDate() + 1);
    }

    return nextExecution.getTime() - now.getTime();
}

function scheduleDailyTask(hour: number, minute: number, second: number = 0) {
    const delay = getNextExecutionDelay(hour, minute, second);

    setTimeout(() => {
        task();

        setInterval(task, 24 * 60 * 60 * 1000);
    }, delay);
}

scheduleDailyTask(23, 16);
