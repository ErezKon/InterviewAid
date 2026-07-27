# 1881. Maximum Value after Insertion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-value-after-insertion](https://leetcode.com/problems/maximum-value-after-insertion)
**Companies:** Amazon

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

Given a string `n` representing a very large integer (possibly negative) and a digit `x` (0–9), insert `x` at any position to **maximize** the resulting integer value. Return the result as a string.

**Constraints:**
- `1 ≤ n.length ≤ 10⁵`
- `n` is a valid integer (may start with `-`)
- `1 ≤ x ≤ 9`

---

## Examples

**Example 1:**
```
Input:  n = "99", x = 9
Output: "999"
Explanation: Insert 9 anywhere — all positions give "999".
```

**Example 2:**
```
Input:  n = "-13", x = 2
Output: "-123"
Explanation: Insert 2 between 1 and 3 to get -123 (greater than -213 or -132).
```

---

## Key Insight

> For a **positive** number, insert `x` before the **first digit smaller than x** (to push smaller digits right, making the number larger). For a **negative** number, insert `x` before the **first digit larger than x** (to push larger digits right, making the absolute value smaller, hence the number larger).

---

## Approach

```
FUNCTION maxValue(n, x):
    isNegative ← (n[0] = '-')
    start ← 1 IF isNegative ELSE 0

    FOR i ← start TO LEN(n) - 1 DO
        digit ← INT(n[i])
        IF isNegative AND digit > x THEN
            RETURN n[0..i-1] + STR(x) + n[i..]
        ELSE IF NOT isNegative AND digit < x THEN
            RETURN n[0..i-1] + STR(x) + n[i..]

    RETURN n + STR(x)    // Append at end if no position found
```

---

## Walkthrough

```
n = "-13", x = 2

isNegative = true, start = 1

i=1: digit='1' → 1 > 2? No → continue
i=2: digit='3' → 3 > 2? Yes → insert before index 2
     Result: "-1" + "2" + "3" = "-123"

Return "-123" ✅  (−123 > −132 > −213)
```

```
n = "99", x = 9

isNegative = false, start = 0

i=0: digit='9' → 9 < 9? No → continue
i=1: digit='9' → 9 < 9? No → continue
No insertion point found → append: "99" + "9" = "999"

Return "999" ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single-pass greedy | **O(n)** | **O(n)** for result string |

---

## Follow-Up Questions

1. **What if x = 0?** For positive numbers, 0 is always ≤ other digits, so it appends at the end. For negative numbers, 0 < all digits, so it inserts at the very front (after `-`), making `-0...` which is correct.
2. **Why scan left-to-right?** We want the inserted digit to appear as early as possible (for positive) or delay large digits as long as possible (for negative).
3. **What about leading zeros?** The problem guarantees `n` is a valid integer, so the only zero-concern is negative numbers getting `-0...`, which the problem considers valid.

---

## Key Takeaway

> **Greedy digit insertion:** for positive numbers, insert before the first smaller digit; for negative numbers, insert before the first larger digit — a single-pass O(n) solution.

---
