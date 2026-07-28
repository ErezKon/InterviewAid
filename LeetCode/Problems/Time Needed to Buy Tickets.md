# 2073. Time Needed to Buy Tickets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/time-needed-to-buy-tickets](https://leetcode.com/problems/time-needed-to-buy-tickets)
**Companies:** Amazon, Bloomberg, Google, Innovaccer, Meta, Microsoft, Twitter, Uber

---

## Problem Description
A line of people is waiting to buy tickets. `tickets[i]` denotes the number of tickets person `i` wants. The queue processes in order: each person buys one ticket per second, then moves to the end of the line if they still need more. Given the index `k` of a specific person, return the total seconds required for that person to finish buying all their tickets.

## Examples
| tickets | k | Output | Explanation |
|---------|---|--------|-------------|
| `[2,3,2]` | `2` | `6` | Person 2 buys tickets at seconds 1,3,5,6 (others interleave). |
| `[5,1,1,1]` | `0` | `8` | Person 0 cycles through the queue until all 5 tickets are bought. |

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

## Follow‑Up Questions
1. How would you handle a dynamic queue where new people can join at any time?
2. Can you compute the order of ticket purchases for all individuals, not just person `k`?
3. What changes if each person can buy multiple tickets per second?

## Key Takeaway
The total waiting time equals the sum of bounded contributions from each person, allowing a direct O(n) calculation without simulation.
