# 2534. Time Taken to Cross the Door

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/time-taken-to-cross-the-door](https://leetcode.com/problems/time-taken-to-cross-the-door)
**Companies:** Amazon, Google, Salesforce

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below use different priority rules and return a total time; the official problem returns each person's crossing second. Correct idea: two queues (enter/exit) and a state `st` (1 = previous second idle or exit, 0 = enter). Each second, enqueue arrivals; if both queues are non-empty serve `q[st]`, if exactly one is non-empty switch `st` to it and serve it, otherwise set `st = 1`. O(n).*

There are `n` persons numbered from `0` to `n - 1` and a door. Each person can enter or exit through the door once, taking one second.

You are given a **non-decreasing** integer array `arrival` of size `n`, where `arrival[i]` is the arrival time of the `i`th person at the door. You are also given an array `state` of size `n`, where `state[i]` is `0` if person `i` wants to enter through the door or `1` if they want to exit through the door.

If two or more persons want to use the door at the **same** time, they follow the following rules:

- If the door was **not** used in the previous second, then the person who wants to **exit** goes first.
- If the door was used in the previous second for **entering**, the person who wants to enter goes first.
- If the door was used in the previous second for **exiting**, the person who wants to **exit** goes first.
- If multiple persons want to go in the same direction, the person with the **smallest** index goes first.

Return *an array* `answer` *of size* `n` *where* `answer[i]` *is the second at which the* `i`th *person crosses the door*.

**Note** that:

- Only one person can cross the door at each second.
- A person may arrive at the door and wait without entering or exiting to follow the mentioned rules.

**Constraints:**
- `n == arrival.length == state.length`
- `1 <= n <= 10^5`
- `0 <= arrival[i] <= n`
- `arrival` is sorted in **non-decreasing** order.
- `state[i]` is either `0` or `1`.

## Examples

**Example 1:**
```
Input: arrival = [0,1,1,2,4], state = [0,1,0,0,1]
Output: [0,3,1,2,4]
Explanation: At each second we have the following:
- At t = 0: Person 0 is the only one who wants to enter, so they just enter through the door.
- At t = 1: Person 1 wants to exit, and person 2 wants to enter. Since the door was used the previous second for entering, person 2 enters.
- At t = 2: Person 1 still wants to exit, and person 3 wants to enter. Since the door was used the previous second for entering, person 3 enters.
- At t = 3: Person 1 is the only one who wants to exit, so they just exit through the door.
- At t = 4: Person 4 is the only one who wants to exit, so they just exit through the door.
```

**Example 2:**
```
Input: arrival = [0,0,0], state = [1,0,1]
Output: [0,2,1]
Explanation: At each second we have the following:
- At t = 0: Person 1 wants to enter while persons 0 and 2 want to exit. Since the door was not used in the previous second, the persons who want to exit get to go first. Since person 0 has a smaller index, they exit first.
- At t = 1: Person 1 wants to enter, and person 2 wants to exit. Since the door was used in the previous second for exiting, person 2 exits.
- At t = 2: Person 1 is the only one who wants to enter, so they just enter through the door.
```

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
