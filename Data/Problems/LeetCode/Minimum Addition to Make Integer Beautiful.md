# 2457. Minimum Addition to Make Integer Beautiful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-addition-to-make-integer-beautiful](https://leetcode.com/problems/minimum-addition-to-make-integer-beautiful)

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

You are given two positive integers `n` and `target`.

An integer is considered **beautiful** if the sum of its digits is less than or equal to `target`.

Return the *minimum **non-negative** integer* `x` *such that* `n + x` *is beautiful*. The input will be generated such that it is always possible to make `n` beautiful.

**Constraints:**
- `1 ≤ n ≤ 10¹²`
- `1 ≤ target ≤ 150`
- The input will be generated such that it is always possible to make `n` beautiful.

---

## Examples

```
Example 1:
  Input: n = 16, target = 6
  Output: 4
  Explanation: Initially n is 16 and its digit sum is 1 + 6 = 7. After adding 4, n becomes 20 and digit sum becomes 2 + 0 = 2. It can be shown that we can not make n beautiful with adding non-negative integer less than 4.
```

```
Example 2:
  Input: n = 467, target = 6
  Output: 33
  Explanation: Initially n is 467 and its digit sum is 4 + 6 + 7 = 17. After adding 33, n becomes 500 and digit sum becomes 5 + 0 + 0 = 5. It can be shown that we can not make n beautiful with adding non-negative integer less than 33.
```

```
Example 3:
  Input: n = 1, target = 1
  Output: 0
  Explanation: Initially n is 1 and its digit sum is 1, which is already smaller than or equal to target.
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