# 2534. Time Taken to Cross the Door

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/time-taken-to-cross-the-door](https://leetcode.com/problems/time-taken-to-cross-the-door)
**Companies:** Amazon, Google, Salesforce

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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
Simulate second by second with two FIFO queues, `q[0]` (enter) and `q[1]` (exit), and a direction flag `st` meaning "the door's preferred direction this second". Initially `st = 1` (door unused, so exit goes first). At each second `t`:
1. Push every person with `arrival[i] <= t` into `q[state[i]]` (indices arrive in increasing order, so each queue is ordered by index).
2. If both queues are non-empty, serve `q[st]` - this encodes "same direction as last second, or exit if the door was idle".
3. If exactly one queue is non-empty, set `st` to that direction and serve it.
4. If both are empty, the door is idle this second: reset `st = 1`.

Since `arrival[i] <= n`, the simulation ends within `2n + 1` seconds.

```text
FUNCTION timeTaken(arrival, state):
    SET n ← LENGTH(arrival)
    SET q ← [empty queue, empty queue]      // q[0] = enter, q[1] = exit
    SET answer ← ARRAY of size n
    SET st ← 1
    SET t ← 0
    SET i ← 0
    SET done ← 0
    WHILE done < n:
        WHILE i < n AND arrival[i] <= t:
            ENQUEUE(q[state[i]], i)
            SET i ← i + 1
        IF NOT EMPTY(q[0]) AND NOT EMPTY(q[1]):
            // keep st (previous direction, or exit after an idle second)
        ELSE IF NOT EMPTY(q[0]) OR NOT EMPTY(q[1]):
            SET st ← 0 IF NOT EMPTY(q[0]) ELSE 1
        ELSE:
            SET st ← 1                        // idle second
            SET t ← t + 1
            CONTINUE
        SET p ← DEQUEUE(q[st])
        SET answer[p] ← t
        SET done ← done + 1
        SET t ← t + 1
    RETURN answer
```

## Walkthrough
Example 1: `arrival = [0,1,1,2,4]`, `state = [0,1,0,0,1]`.

| t | arrivals | enter queue | exit queue | st before | rule | crosses |
|---|---|---|---|---|---|---|
| 0 | P0 (enter) | [0] | [] | 1 | only enter -> st = 0 | P0 enters, answer[0] = 0 |
| 1 | P1 (exit), P2 (enter) | [2] | [1] | 0 | both, keep st = 0 | P2 enters, answer[2] = 1 |
| 2 | P3 (enter) | [3] | [1] | 0 | both, keep st = 0 | P3 enters, answer[3] = 2 |
| 3 | - | [] | [1] | 0 | only exit -> st = 1 | P1 exits, answer[1] = 3 |
| 4 | P4 (exit) | [] | [4] | 1 | only exit | P4 exits, answer[4] = 4 |

Result: `[0,3,1,2,4]`, matching the expected output.

## Complexity Analysis
*Time*: O(n) - each person is enqueued and dequeued once, and there are at most `2n + 1` simulated seconds.
*Space*: O(n) - the queues and the answer array.

## Follow-Up Questions
1. How would you skip long idle gaps if arrival times could be as large as 10^9 (jump `t` to the next arrival and reset `st`)?
2. How would the simulation change if crossing took `k` seconds instead of one?
3. How would you generalize to several doors, each with its own direction state?

## Key Takeaway
Encode the tie-break rules as a single "preferred direction" flag: keep it while both queues are busy, switch it when only one side is waiting, and reset it to exit after an idle second. Then a plain two-queue simulation yields each person's crossing time.
