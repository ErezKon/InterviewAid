# 2224. Minimum Number of Operations to Convert Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-convert-time](https://leetcode.com/problems/minimum-number-of-operations-to-convert-time)
**Companies:** Google

---

## Problem Description

You are given two strings `current` and `correct` representing two **24-hour times**.

24-hour times are formatted as `"HH:MM"`, where `HH` is between `00` and `23`, and `MM` is between `00` and `59`. The earliest 24-hour time is `00:00`, and the latest is `23:59`.

In one operation you can increase the time `current` by `1`, `5`, `15`, or `60` minutes. You can perform this operation **any** number of times.

Return *the **minimum number of operations** needed to convert *`current`* to *`correct`.

**Constraints:**
- `current` and `correct` are in the format `"HH:MM"`
- `current <= correct`

---

## Examples

**Example 1:**
```
Input: current = "02:30", correct = "04:35"
Output: 3
Explanation: We can convert current to correct in 3 operations as follows:
- Add 60 minutes to current. current becomes "03:30".
- Add 60 minutes to current. current becomes "04:30".
- Add 5 minutes to current. current becomes "04:35".
It can be proven that it is not possible to convert current to correct in fewer than 3 operations.
```

**Example 2:**
```
Input: current = "11:00", correct = "11:01"
Output: 1
Explanation: We only have to add one minute to current, so the minimum number of operations needed is 1.
```

---

## Approach

**Greedy – O(1)**

1. Convert both times to total minutes from `00:00`.
2. Compute the difference `diff = (targetMinutes - currentMinutes + 1440) % 1440` (minutes in a day).
3. Use the largest possible increment first (60, then 15, 5, 1) and count how many of each fit into `diff`.

```text
FUNCTION minOperations(current, target):
    cur ← TO_MINUTES(current)
    tar ← TO_MINUTES(target)
    diff ← (tar - cur + 1440) MOD 1440
    ops ← 0
    FOR inc IN [60, 15, 5, 1] DO
        ops ← ops + diff DIV inc
        diff ← diff MOD inc
    RETURN ops
```

---

## Walkthrough

For `current = "02:30"` (150 min) and `target = "04:35"` (275 min):
| inc | diff before | ops added | diff after |
|-----|-------------|-----------|------------|
| 60  | 125         | 2         | 5 |
| 15  | 5           | 0         | 5 |
| 5   | 5           | 1         | 0 |
| 1   | 0           | 0         | 0 |
Total ops = 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy calculation | **O(1)** | **O(1)** |

---

## Follow-Up Questions

1. How would the solution change if the allowed increments were any set of positive integers?
2. Can you modify the algorithm to also output the exact sequence of operations?
3. What if the clock uses a 12‑hour format with AM/PM?

---

## Key Takeaway

Convert times to minutes, compute the circular difference, and greedily apply the largest allowed increments to achieve the minimum number of operations.
