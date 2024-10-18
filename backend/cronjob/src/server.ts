function task() {
    console.log(`Task execued at ${new Date().toLocaleTimeString()}`);
}

function job2() {
    console.log(`Job 2 executed at ${new Date().toLocaleDateString()}`);
}

function job1() {
    console.log(`Job 1 executed at ${new Date().toLocaleDateString()}`);
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

function scheduleJob(
    job: () => void,
    hour: number,
    minute: number,
    second: number = 0
) {
    const delay = getNextExecutionDelay(hour, minute, second);

    setTimeout(() => {
        job();

        setInterval(job, 24 * 60 * 60 * 1000);
    }, delay);
}

function getNextExecutionInTimeZone(
    hour: number,
    minute: number,
    timeZone: string
) {
    const now = new Date();
    const nextExecution = new Date(
        new Intl.DateTimeFormat("en-us", {
            timeZone: timeZone,
            year: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }).format(now)
    );

    nextExecution.setHours(hour, minute, 0, 0);

    if (nextExecution <= now) {
        nextExecution.setDate(nextExecution.getDate() + 1);
    }

    return nextExecution.getTime() - now.getTime();
}

function scheduleJonInTimeZone(
    job: () => void,
    hour: number,
    minute: number,
    timeZone: string
) {
    const delay = getNextExecutionInTimeZone(hour, minute, timeZone);

    setTimeout(() => {
        job();

        setInterval(job, 24 * 60 * 60 * 1000);
    }, delay);
}

function adjustForDST(
    job: () => void,
    hour: number,
    minute: number,
    timeZone: string
) {
    const now = new Date();
    let lastOffset = now.getTimezoneOffset();

    setInterval(() => {
        const currentOffset = new Date().getTimezoneOffset();

        if (currentOffset !== lastOffset) {
            console.log("DST change detected. Adjusting schedule...");
            lastOffset = currentOffset;

            scheduleJob;
        }
    });
}

scheduleJob(job1, 23, 34, 0);
scheduleJob(job2, 23, 34, 30);

scheduleJonInTimeZone(
    () => {
        console.log("job in IST executed");
    },
    23,
    44,
    "Asia/Kolkata"
);
