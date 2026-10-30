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

You are given an integer array `nums` of length `n`, where `nums` is a **permutation** of the numbers in the range `[1, n]`.

A **XOR triplet** is defined as the XOR of three elements `nums[i] XOR nums[j] XOR nums[k]` where `i <= j <= k`.

Return the number of **unique** XOR triplet values from all possible triplets `(i, j, k)`.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= n`
- `nums` is a permutation of integers from `1` to `n`.

---

## Examples

**Example 1:**
```
Input: nums = [1,2]
Output: 2
Explanation: The possible XOR triplet values are:
- (0, 0, 0) → 1 XOR 1 XOR 1 = 1
- (0, 0, 1) → 1 XOR 1 XOR 2 = 2
- (0, 1, 1) → 1 XOR 2 XOR 2 = 1
- (1, 1, 1) → 2 XOR 2 XOR 2 = 2
The unique XOR values are {1, 2}, so the output is 2.
```

**Example 2:**
```
Input: nums = [3,1,2]
Output: 4
Explanation: The possible XOR triplet values include:
- (0, 0, 0) → 3 XOR 3 XOR 3 = 3
- (0, 0, 1) → 3 XOR 3 XOR 1 = 1
- (0, 0, 2) → 3 XOR 3 XOR 2 = 2
- (0, 1, 2) → 3 XOR 1 XOR 2 = 0
The unique XOR values are {0, 1, 2, 3}, so the output is 4.
```

---

## 2. Key Insight

> Precompute all pairwise XOR values into a set. Then XOR each pair result with each element to collect all unique triplet XOR values.

---

## 3. Approach: Enumerate Pair XORs — O(n²) ✅

```
FUNCTION uniqueXorTriplets(nums):
    n ← LENGTH(nums)
    pairXors ← SET()
    FOR i ← 0 TO n-1:
        FOR j ← i TO n-1:
            pairXors.ADD(nums[i] XOR nums[j])
    result ← SET()
    FOR px IN pairXors:
        FOR num IN nums:
            result.ADD(px XOR num)
    RETURN SIZE(result)
```

---

## Walkthrough

Consider `nums = [1,2,3]`.

1. Pair XORs: `{1^1=0, 1^2=3, 1^3=2, 2^2=0, 2^3=1, 3^3=0}` → `{0,1,2,3}`.
2. For each pair XOR `px`, XOR with each array element:
   - `px=0`: results `{0^1=1, 0^2=2, 0^3=3}`.
   - `px=1`: results `{1^1=0, 1^2=3, 1^3=2}`.
   - `px=2`: results `{2^1=3, 2^2=0, 2^3=1}`.
   - `px=3`: results `{3^1=2, 3^2=1, 3^3=0}`.
   Union of all results = `{0,1,2,3}`.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² + P·n) where P = number of unique pair XORs |
| **Space** | O(P + R) where R = number of unique triplet XORs |

---

## Follow-Up Questions

- How would you adapt the solution if the array size were up to 10⁵? (Hint: use a linear basis to compress XOR space.)
- Can you compute the sum of all unique XOR values instead of just the count?

---

## 5. Key Takeaway

> **Reduce triplet XOR to pair XOR + single.** Precompute pair XORs to avoid O(n³). XOR is associative: `a^b^c = (a^b)^c`.
