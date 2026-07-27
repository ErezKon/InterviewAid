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

Start with array `[1, 1, ..., 1]` of length `n`. Each second, replace each element with the prefix sum up to that index. After `k` seconds, return the n-th element (mod 10⁹+7).

**Constraints:**
- `1 <= n, k <= 1000`

---

## 2. Key Insight

> After `k` prefix-sum operations on `[1,1,...,1]`, the n-th element equals `C(n+k-1, k)` (binomial coefficient). This is because repeated prefix sum is equivalent to convolution with the sequence of 1s.

---

## 3. Approach: Simulation or Combinatorics — O(n·k) or O(1) ✅

```
FUNCTION valueAfterKSeconds(n, k):
    // Direct formula: C(n+k-1, k) mod (10^9 + 7)
    RETURN binomial(n + k - 1, k) MOD (10^9 + 7)

    // Or simulate k rounds of prefix sum on array of n ones
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + k) — compute binomial with modular inverse |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Repeated prefix sum** on all-ones is equivalent to computing a binomial coefficient `C(n+k-1, k)`. Use modular arithmetic for large values.
