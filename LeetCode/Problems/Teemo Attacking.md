# 495. Teemo Attacking

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/teemo-attacking](https://leetcode.com/problems/teemo-attacking)
**Companies:** Amazon, Google, Jane Street, Riot Games, Tcs
---

## Problem Description
You are given a sorted integer array `timeSeries` where `timeSeries[i]` denotes the start time of Teemo's i‑th attack. Each attack makes the enemy poisoned for `duration` seconds. If a new attack occurs before the previous poison effect ends, the poison timer resets to `duration` seconds from the new attack. Return the total number of seconds the enemy is poisoned.

## Examples
**Example 1:**
```
Input: timeSeries = [1,4], duration = 2
Output: 4
Explanation: Poison intervals are [1,3) and [4,6); total = 2 + 2 = 4.
```
**Example 2:**
```
Input: timeSeries = [1,2], duration = 2
Output: 3
Explanation: The second attack occurs at time 2, extending the poison to [1,4). Total = 3 seconds.
```

## Approach
Iterate through the attack times. For each attack, add the smaller of `duration` and the gap to the next attack (if any). After the loop, add the full `duration` for the last attack.

```text
FUNCTION findPoisonedDuration(timeSeries, duration):
    total ← 0
    FOR i FROM 0 TO LENGTH(timeSeries) - 2:
        gap ← timeSeries[i+1] - timeSeries[i]
        total ← total + MIN(duration, gap)
    // add duration for the final attack
    total ← total + duration
    RETURN total
```

## Walkthrough
| i | timeSeries[i] | gap to next | Added to total |
|---|---------------|------------|----------------|
| 0 | 1 | 3 (4-1) | MIN(2,3)=2 |
| 1 | 4 | – | add full duration 2 |
Result = 4 seconds.

## Complexity Analysis
- Time: O(n) where n is the number of attacks.
- Space: O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would you handle overlapping intervals if attacks could be unsorted?
2. Can you compute the poisoned time using a sweep‑line approach?
3. What changes are needed if each attack has a different duration?

## Key Takeaway
Summing the minimum of the fixed duration and the gap between consecutive attacks yields the total poisoned time efficiently.
