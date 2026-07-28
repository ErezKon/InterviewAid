# 2534. Time Taken to Cross the Door

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Salesforce

---

## Problem Description
A door has a single entry/exit point. People arrive at integer timestamps and each person either wants to **enter** or **exit**. At each second, the door can process at most one person. If both an entering and exiting person are waiting, the person who performed the opposite action in the previous second gets priority. If no one performed the opposite action previously, entering has priority. Compute the total time needed for all people to pass through the door.

## Examples
| arrivals | actions | Output | Explanation |
|----------|---------|--------|-------------|
| `[0,0,1,5]` | `['enter','exit','enter','enter']` | `7` | At t=0, two people arrive; `enter` goes first (priority), then `exit` at t=1, etc. |
| `[2,2,2]` | `['exit','exit','enter']` | `5` | Priority switches after each opposite action.

## Approach
Simulate using two queues (enter and exit) and track the last processed action. At each second:
1. Enqueue newly arrived people into the appropriate queue.
2. Choose the next person based on priority rules.
3. Process one person and update `lastAction`.
Continue until both queues are empty.

```text
FUNCTION timeToCrossDoor(arrivalTimes, actions):
    SET enterQueue ← empty queue
    SET exitQueue ← empty queue
    SET i ← 0  // index over arrivals
    SET time ← 0
    SET lastAction ← NONE
    WHILE i < LENGTH(arrivalTimes) OR NOT EMPTY(enterQueue) OR NOT EMPTY(exitQueue):
        // enqueue arrivals at current time
        WHILE i < LENGTH(arrivalTimes) AND arrivalTimes[i] = time:
            IF actions[i] = 'enter':
                ENQUEUE(enterQueue, i)
            ELSE:
                ENQUEUE(exitQueue, i)
            SET i ← i + 1
        // decide who to process
        IF NOT EMPTY(enterQueue) AND NOT EMPTY(exitQueue):
            IF lastAction = 'enter':
                SET idx ← DEQUEUE(exitQueue)
                SET lastAction ← 'exit'
            ELSE IF lastAction = 'exit':
                SET idx ← DEQUEUE(enterQueue)
                SET lastAction ← 'enter'
            ELSE: // no previous action
                SET idx ← DEQUEUE(enterQueue)
                SET lastAction ← 'enter'
        ELSE IF NOT EMPTY(enterQueue):
            SET idx ← DEQUEUE(enterQueue)
            SET lastAction ← 'enter'
        ELSE IF NOT EMPTY(exitQueue):
            SET idx ← DEQUEUE(exitQueue)
            SET lastAction ← 'exit'
        // processed one person this second
        SET time ← time + 1
    RETURN time
```

## Walkthrough
For the first example `[0,0,1,5]` with actions `enter, exit, enter, enter`:
| time | arrivals enqueued | queues (E/E) | lastAction | processed |
|------|-------------------|--------------|------------|-----------|
| 0 | idx0→enter, idx1→exit | E:[0] X:[1] | NONE | enter (idx0) |
| 1 | idx2→enter (arrives) | E:[2] X:[1] | enter | exit (idx1) |
| 2 | – | E:[2] | exit | enter (idx2) |
| 3‑5 | – | – | – | idle |
| 5 | idx3→enter | E:[3] | enter | enter (idx3) |
Total time = 7.

## Complexity Analysis
*Time*: O(n) – each person is enqueued and dequeued once.
*Space*: O(n) – queues store pending people.

## Follow‑Up Questions
1. How would you modify the algorithm for multiple doors working in parallel?
2. What if processing time varies per person?
3. Can you compute the exact order of processed people without simulation?

## Key Takeaway
A priority‑aware simulation using two queues and tracking the last action yields the total crossing time efficiently.
