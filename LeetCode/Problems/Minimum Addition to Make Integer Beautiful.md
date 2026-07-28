# 2457. Minimum Addition to Make Integer Beautiful

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Infosys, Meta
---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a positive integer `n` and a `target`, find the minimum non-negative integer `x` such that `n + x` has a digit sum ≤ `target`.

---

## Examples

**Example 1:**
```
Input: n = 16, target = 6
Output: 4
Explanation: 16 + 4 = 20, digit sum = 2 ≤ 6. Adding any smaller value keeps digit sum > 6.
```

**Example 2:**
```
Input: n = 467, target = 6
Output: 33
Explanation: 467 + 33 = 500, digit sum = 5 ≤ 6.
```

---

## Approach: Greedy Rounding — O(log² n) ✅

```text
FUNCTION makeIntegerBeautiful(n, target):
    original ← n
    IF digitSum(n) ≤ target THEN RETURN 0
    power ← 1
    WHILE digitSum(n) > target DO
        // Round up to next multiple of 10*power
        n ← CEIL(n / (10 * power)) * 10 * power
        power ← power * 10
    RETURN n - original
```

---

## Walkthrough

Consider `n = 467`, `target = 6`.

| Step | n | digitSum(n) | Action |
|------|---|-------------|--------|
| 0 | 467 | 17 | digitSum > target, power=1 |
| 1 | CEIL(467/10) * 10 = 470 | 11 | power←10 |
| 2 | CEIL(470/100) * 100 = 500 | 5 | digitSum ≤ target, stop |

Result: `x = 500 - 467 = 33`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy rounding | **O(log² n)** | **O(1)** |

---

## Follow-Up Questions

- How would you modify the algorithm if you needed the smallest `x` such that the digit sum is exactly `target`?
- Can this approach be extended to work with bases other than 10?

---

## Key Takeaway

> **Round up by increasing powers of 10** — each rounding zeros out digits from the right, reducing digit sum. Stop when the sum drops to the target.

---