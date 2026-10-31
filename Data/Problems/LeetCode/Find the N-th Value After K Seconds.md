# 3179. Find the N-th Value After K Seconds

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-n-th-value-after-k-seconds](https://leetcode.com/problems/find-the-n-th-value-after-k-seconds)
**Companies:** Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Simulation or Combinatorics — O(n·k) or O(1) ✅](#3-approach-simulation-or-combinatorics)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given two integers `n` and `k`.

Initially, you start with an array `a` of `n` integers where `a[i] = 1` for all `0 <= i <= n - 1`. After each second, you simultaneously update each element to be the sum of all its preceding elements plus the element itself. For example, after one second, `a[0]` remains the same, `a[1]` becomes `a[0] + a[1]`, `a[2]` becomes `a[0] + a[1] + a[2]`, and so on.

Return the **value** of `a[n - 1]` after `k` seconds.

Since the answer may be very large, return it **modulo** `10⁹ + 7`.

**Constraints:**
- `1 <= n, k <= 1000`

---

## 2. Key Insight

> After `k` prefix-sum operations on `[1,1,...,1]`, the n-th element equals `C(n+k-1, k)` (binomial coefficient). This is because repeated prefix sum is equivalent to convolution with the sequence of 1s.

---

## 3. Approach: Simulation or Combinatorics — O(n·k) or O(1) ✅

```text
FUNCTION valueAfterKSeconds(n, k):
    // Direct formula: C(n+k-1, k) mod (10^9 + 7)
    RETURN binomial(n + k - 1, k) MOD (10^9 + 7)

    // Or simulate k rounds of prefix sum on array of n ones
```

---

## Examples

```
Example 1:
  Input: n = 4, k = 5
  Output: 56
  Explanation:
    Second | State After
    0      | [1,1,1,1]
    1      | [1,2,3,4]
    2      | [1,3,6,10]
    3      | [1,4,10,20]
    4      | [1,5,15,35]
    5      | [1,6,21,56]

Example 2:
  Input: n = 5, k = 3
  Output: 35
  Explanation:
    Second | State After
    0      | [1,1,1,1,1]
    1      | [1,2,3,4,5]
    2      | [1,3,6,10,15]
    3      | [1,4,10,20,35]
```

---

## Walkthrough

**Example `n = 4, k = 3`**

| Step | Array state |
|------|-------------|
| Start | `[1,1,1,1]` |
| 1st second | `[1,2,3,4]` |
| 2nd second | `[1,3,6,10]` |
| 3rd second | `[1,4,10,20]` |

The 4th element after 3 seconds is `20`, matching `C(4+3-1,3) = C(6,3) = 20`.

---

## Follow-Up Questions

1. How would you extend the solution to support queries asking for any index `i` after `k` seconds?
2. Can the approach be adapted for an initial array with arbitrary values instead of all ones?
3. What if the modulo were a non-prime number—how would you compute the binomial efficiently?

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + k) — compute binomial with modular inverse |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Repeated prefix sum** on all-ones is equivalent to computing a binomial coefficient `C(n+k-1, k)`. Use modular arithmetic for large values.
