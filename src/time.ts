import { DeepReadonly } from "./deep-readonly.model.ts";

const TIME_CONSTANTS: DeepReadonly<{ [key: string]: number }> = {
  NUM_MILLIS_PER_DAY: 1000 * 60 * 60 * 24,
};

function getMillisTill(hour: number) {
  const numMillisPerDay = TIME_CONSTANTS.NUM_MILLIS_PER_DAY;

  const now = new Date();
  const nowMillis = now.getTime();
  const hourMillis = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0).getTime();

  let millisTill = hourMillis - nowMillis;

  if (millisTill < 0) {
    millisTill += numMillisPerDay;
  }

  return millisTill;
}

export function setIntervalAtHour(hour: number, callback: () => void): void {
  const millsTillHour = getMillisTill(hour);
  const currentTime = (new Date()).getTime();
  const intervalTime = new Date(currentTime + millsTillHour);

  console.log(`Interval set to start repeating at ${intervalTime.toString()}`);

  setTimeout(() => {
    callback();

    setInterval(() => {
      callback();
    }, TIME_CONSTANTS.NUM_MILLIS_PER_DAY);
  }, getMillisTill(hour));
}
