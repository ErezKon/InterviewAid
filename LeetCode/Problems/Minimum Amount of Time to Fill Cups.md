# 2335. Minimum Amount of Time to Fill Cups

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups](https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups)
**Companies:** Google

---

## Problem Description

You are given an integer array `amount` of length 3 where `amount[i]` represents the number of cups of the *i*‑th type that need to be filled. In each second you may fill **either** one cup of any type **or** two cups of different types simultaneously. Return the minimum number of seconds required to fill all cups.

Constraints:
- `amount.length == 3`
- `0 <= amount[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: amount = [1,4,2]
Output: 4
Explanation: Fill two different types each second: (4,2) → (3,1) → (2,0) → (1,0) → (0,0). Total 4 seconds.
```

**Example 2:**
```
Input: amount = [5,4,4]
Output: 7
Explanation: The largest type has 5 cups, which dominates the schedule.
```

---

## Approach

**Algorithm:** The answer is the maximum of two values:
1. The largest single amount (`max(amount)`).
2. The ceiling of half the total cups (`ceil(sum(amount) / 2)`).
The schedule can always achieve this bound by pairing cups of different types whenever possible.

Pseudocode:
```text
FUNCTION minimumFillTime(amount):
    total ← SUM(amount)
    maxVal ← MAX(amount)
    RETURN MAX(maxVal, CEIL(total / 2))
```
---

## Walkthrough

For `amount = [1,4,2]`:
- `total = 7`, `maxVal = 4`.
- `ceil(total/2) = 4`.
- Result = `max(4,4) = 4` seconds.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Direct formula | O(1) | O(1) |
---

## Follow‑Up Questions

1. How would the problem change if you could fill up to three cups per second as long as they are of different types?
2. What if each cup type had a different fill rate (e.g., one cup per second for type 0, two per second for type 1)?
---

## Key Takeaway

> The minimum time is constrained by the larger of the biggest single pile and the total number of cups halved (rounded up).