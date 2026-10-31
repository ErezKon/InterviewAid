# 2335. Minimum Amount of Time to Fill Cups

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups](https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups)
**Companies:** Google

---

## Problem Description

You have a water dispenser that can dispense cold, warm, and hot water. Every second, you can either fill up `2` cups with **different** types of water, or `1` cup of any type of water.

You are given a **0-indexed** integer array `amount` of length `3` where `amount[0]`, `amount[1]`, and `amount[2]` denote the number of cold, warm, and hot water cups you need to fill respectively. Return *the **minimum** number of seconds needed to fill up all the cups*.

**Constraints:**
- `amount.length == 3`
- `0 <= amount[i] <= 100`

---

## Examples

```
Example 1:
  Input: amount = [1,4,2]
  Output: 4
  Explanation: One way to fill up the cups is:
  Second 1: Fill up a cold cup and a warm cup.
  Second 2: Fill up a warm cup and a hot cup.
  Second 3: Fill up a warm cup and a hot cup.
  Second 4: Fill up a warm cup.
  It can be proven that 4 is the minimum number of seconds needed.
```

```
Example 2:
  Input: amount = [5,4,4]
  Output: 7
  Explanation: One way to fill up the cups is:
  Second 1: Fill up a cold cup, and a hot cup.
  Second 2: Fill up a cold cup, and a warm cup.
  Second 3: Fill up a cold cup, and a warm cup.
  Second 4: Fill up a warm cup, and a hot cup.
  Second 5: Fill up a cold cup, and a hot cup.
  Second 6: Fill up a cold cup, and a warm cup.
  Second 7: Fill up a hot cup.
```

```
Example 3:
  Input: amount = [5,0,0]
  Output: 5
  Explanation: Every second, we fill up a cold cup.
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

## Follow-Up Questions

1. How would the problem change if you could fill up to three cups per second as long as they are of different types?
2. What if each cup type had a different fill rate (e.g., one cup per second for type 0, two per second for type 1)?
---

## Key Takeaway

> The minimum time is constrained by the larger of the biggest single pile and the total number of cups halved (rounded up).