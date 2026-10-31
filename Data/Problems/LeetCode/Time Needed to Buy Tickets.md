# 2073. Time Needed to Buy Tickets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/time-needed-to-buy-tickets](https://leetcode.com/problems/time-needed-to-buy-tickets)
**Companies:** Amazon, Bloomberg, Google, Innovaccer, Meta, Microsoft, Twitter, Uber

---

## Problem Description

There are `n` people in a line queuing to buy tickets, where the `0`th person is at the **front** of the line and the `(n - 1)`th person is at the **back** of the line.

You are given a **0-indexed** integer array `tickets` of length `n` where the number of tickets that the `i`th person would like to buy is `tickets[i]`.

Each person takes **exactly 1 second** to buy a ticket. A person can only buy **1 ticket at a time** and has to go back to **the end** of the line (which happens **instantaneously**) in order to buy more tickets. If a person does not have any tickets left to buy, the person will **leave** the line.

Return *the **time taken** for the person **initially** at position* `k` *(0-indexed) to finish buying tickets*.

**Constraints:**
- `n == tickets.length`
- `1 <= n <= 100`
- `1 <= tickets[i] <= 100`
- `0 <= k < n`

## Examples

**Example 1:**
```
Input: tickets = [2,3,2], k = 2
Output: 6
Explanation:
- The queue starts as [2,3,2], where the kth person is underlined.
- After the person at the front has bought a ticket, the queue becomes [3,2,1] at 1 second.
- Continuing this process, the queue becomes [2,1,2] at 2 seconds.
- Continuing this process, the queue becomes [1,2,1] at 3 seconds.
- Continuing this process, the queue becomes [2,1] at 4 seconds. Note: the person at the front left the queue.
- Continuing this process, the queue becomes [1,1] at 5 seconds.
- Continuing this process, the queue becomes [1] at 6 seconds. The kth person has bought all their tickets, so return 6.
```

**Example 2:**
```
Input: tickets = [5,1,1,1], k = 0
Output: 8
Explanation:
- The queue starts as [5,1,1,1], where the kth person is underlined.
- After the person at the front has bought a ticket, the queue becomes [1,1,1,4] at 1 second.
- Continuing this process for 3 seconds, the queue becomes [4] at 4 seconds.
- Continuing this process for 4 seconds, the queue becomes [] at 8 seconds. The kth person has bought all their tickets, so return 8.
```

## Approach
Observe that each person `i` contributes `min(tickets[i], tickets[k])` seconds if `i ≤ k`, otherwise `min(tickets[i], tickets[k] - 1)`. Summing these values yields the answer in O(n) time.

```text
FUNCTION timeRequiredToBuy(tickets, k):
    SET target ← tickets[k]
    SET time ← 0
    FOR i FROM 0 TO LENGTH(tickets) - 1:
        IF i ≤ k:
            SET time ← time + MIN(tickets[i], target)
        ELSE:
            SET time ← time + MIN(tickets[i], target - 1)
    RETURN time
```

## Walkthrough
For `tickets = [2,3,2]`, `k = 2` (target = 2):
| i | tickets[i] | i ≤ k? | contribution |
|---|------------|--------|--------------|
| 0 | 2 | yes | min(2,2)=2 |
| 1 | 3 | yes | min(3,2)=2 |
| 2 | 2 | yes | min(2,2)=2 |
Total time = 2+2+2 = 6 seconds.

## Complexity Analysis
*Time*: O(n) – one pass over the array.
*Space*: O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you handle a dynamic queue where new people can join at any time?
2. Can you compute the order of ticket purchases for all individuals, not just person `k`?
3. What changes if each person can buy multiple tickets per second?

## Key Takeaway
The total waiting time equals the sum of bounded contributions from each person, allowing a direct O(n) calculation without simulation.
