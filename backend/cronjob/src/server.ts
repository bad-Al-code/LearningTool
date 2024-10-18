import fs from "node:fs";
import path from "node:path";

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

const logFilePath = path.join(__dirname, "cron-job-logs.txt");
function logJobExecution(jobName: string) {
    const logMessage = `[${new Date().toLocaleString()}] ${jobName} excuted\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error("Failed tp log job execution: ", err);
        }
    });
}

scheduleJob(job1, 23, 48, 25);
scheduleJob(job2, 23, 48, 30);

scheduleJonInTimeZone(
    () => {
        console.log("job in IST executed");
    },
    23,
    49,
    "Asia/Kolkata"
);
