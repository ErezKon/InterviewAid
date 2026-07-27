# 2527. Find Xor-Beauty of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-xor-beauty-of-array](https://leetcode.com/problems/find-xor-beauty-of-array)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Math Simplification — O(n) ✅](#3-approach-math-simplification--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

The XOR-beauty of an array is defined as XOR of `((nums[i] | nums[j]) & nums[k])` for all triples `(i, j, k)`. Compute it.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Through mathematical analysis, most terms cancel out via XOR. The result simplifies to just `XOR of all elements in nums`.

---

## 3. Approach: Math Simplification — O(n) ✅

```
FUNCTION xorBeauty(nums):
    result ← 0
    FOR num IN nums DO
        result ^= num
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> The triple XOR expression simplifies to just `XOR(nums)` — prove by analyzing each bit position and noting that most pairings cancel.
