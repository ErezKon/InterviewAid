# 3513. Number of Unique XOR Triplets I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-xor-triplets-i](https://leetcode.com/problems/number-of-unique-xor-triplets-i)
**Companies:** Meesho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate Pair XORs — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count unique XOR values from all triplets `(i, j, k)` where `i ≤ j ≤ k`.

---

## 2. Key Insight

> Precompute all pairwise XOR values into a set. Then XOR each pair result with each element to collect all unique triplet XOR values.

---

## 3. Approach: Enumerate Pair XORs — O(n²) ✅

```
FUNCTION uniqueXorTriplets(nums):
    pairXors = set()
    FOR i ← 0 TO n-1:
        FOR j ← i TO n-1:
            pairXors.ADD(nums[i] ^ nums[j])

    result = set()
    FOR px IN pairXors:
        FOR num IN nums:
            result.ADD(px ^ num)
    RETURN len(result)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² + P·n) where P = unique pair XORs |
| **Space** | O(P + R) |

---

## 5. Key Takeaway

> **Reduce triplet XOR to pair XOR + single.** Precompute pair XORs to avoid O(n³). XOR is associative: `a^b^c = (a^b)^c`.
