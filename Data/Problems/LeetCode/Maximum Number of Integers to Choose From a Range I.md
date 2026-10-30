# 2554. Maximum Number of Integers to Choose From a Range I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-i](https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-i)

**Companies:** Amazon, Microsoft, Paypal
---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `banned` and two integers `n` and `maxSum`. You are choosing some number of integers following the below rules:

- The chosen integers have to be in the range `[1, n]`.
- Each integer can be chosen **at most once**.
- The chosen integers should not be in the array `banned`.
- The sum of the chosen integers should not exceed `maxSum`.

Return *the **maximum** number of integers you can choose following the mentioned rules*.

**Constraints:**
- `1 <= banned.length <= 10^4`
- `1 <= banned[i], n <= 10^4`
- `1 <= maxSum <= 10^9`

---

## Examples

```
Example 1:
  Input: banned = [1,6,5], n = 5, maxSum = 6
  Output: 2
  Explanation: You can choose the integers 2 and 4.
    2 and 4 are from the range [1, 5], both did not appear in banned, and their sum is 6, which did not exceed maxSum.
```

```
Example 2:
  Input: banned = [1,2,3,4,5,6,7], n = 8, maxSum = 1
  Output: 0
  Explanation: You cannot choose any integer while following the mentioned conditions.
```

```
Example 3:
  Input: banned = [11], n = 7, maxSum = 50
  Output: 7
  Explanation: You can choose the integers 1, 2, 3, 4, 5, 6, and 7.
    They are from the range [1, 7], all did not appear in banned, and their sum is 28, which did not exceed maxSum.
```

---

## Key Insight

> **Greedy**: pick the smallest available numbers first (they contribute least to the sum), maximizing how many we can pick before hitting `maxSum`.

---

## Approach

```
FUNCTION maxCount(banned, n, maxSum)
    bannedSet ← SET(banned)
    count ← 0
    total ← 0

    FOR i ← 1 TO n DO
        IF i NOT IN bannedSet AND total + i ≤ maxSum THEN
            total ← total + i
            count ← count + 1

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
banned = [1,6,5], n = 5, maxSum = 6
bannedSet = {1, 5, 6}
```

| i | Banned? | total + i | ≤ 6? | Action     | count | total |
|---|---------|-----------|------|------------|-------|-------|
| 1 | Yes     | —         | —    | Skip       | 0     | 0     |
| 2 | No      | 2         | ✅   | Pick       | 1     | 2     |
| 3 | No      | 5         | ✅   | Pick       | **2** | 5     |
| 4 | No      | 9         | ❌   | Can't pick | 2     | 5     |
| 5 | Yes     | —         | —    | Skip       | 2     | 5     |

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass through [1..n] |
| Space  | **O(b)** — hash set of banned numbers |

---

## Follow-Up Questions

1. **What if n were up to 10^9?**
   Use binary search instead of iteration (see Range II version).

2. **What if we wanted maximum sum instead of maximum count?**
   Pick the largest non-banned numbers first instead.

3. **Why pick smallest first?**
   Smallest numbers add least to the sum, leaving budget for more numbers.

---

## Key Takeaway

> **Greedy smallest-first** — to maximize count under a sum budget, always pick the cheapest available items first.
