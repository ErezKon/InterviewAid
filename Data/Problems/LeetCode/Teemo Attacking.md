# 495. Teemo Attacking

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/teemo-attacking](https://leetcode.com/problems/teemo-attacking)
**Companies:** Amazon, Google, Jane Street, Riot Games, Tcs
---

## Problem Description
Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for exactly `duration` seconds. More formally, an attack at second `t` will mean Ashe is poisoned during the **inclusive** time interval `[t, t + duration - 1]`. If Teemo attacks again **before** the poison effect ends, the timer for it is **reset**, and the poison effect will end `duration` seconds after the new attack.

You are given a **non-decreasing** integer array `timeSeries`, where `timeSeries[i]` denotes that Teemo attacks Ashe at second `timeSeries[i]`, and an integer `duration`.

Return *the **total** number of seconds that Ashe is poisoned*.

**Constraints:**
- `1 <= timeSeries.length <= 10^4`
- `0 <= timeSeries[i], duration <= 10^7`
- `timeSeries` is sorted in **non-decreasing** order.

## Examples
```
Example 1:
  Input: timeSeries = [1,4], duration = 2
  Output: 4
  Explanation: Teemo's attacks on Ashe go as follows:
  - At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.
  - At second 4, Teemo attacks, and Ashe is poisoned for seconds 4 and 5.
  Ashe is poisoned for seconds 1, 2, 4, and 5, which is 4 seconds in total.
```
```
Example 2:
  Input: timeSeries = [1,2], duration = 2
  Output: 3
  Explanation: Teemo's attacks on Ashe go as follows:
  - At second 1, Teemo attacks, and Ashe is poisoned for seconds 1 and 2.
  - At second 2 however, Teemo attacks again and resets the poison timer. Ashe is poisoned for seconds 2 and 3.
  Ashe is poisoned for seconds 1, 2, and 3, which is 3 seconds in total.
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
