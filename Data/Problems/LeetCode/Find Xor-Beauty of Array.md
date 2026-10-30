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

You are given a **0-indexed** integer array `nums`.

The **effective value** of three indices `i`, `j`, and `k` is defined as `((nums[i] | nums[j]) & nums[k])`.

The **xor-beauty** of the array is the XORing of **the effective values of all the possible triplets** of indices `(i, j, k)` where `0 <= i, j, k < n`.

Return *the xor-beauty of* `nums`.

**Note** that:

- `val1 | val2` is bitwise OR of `val1` and `val2`.
- `val1 & val2` is bitwise AND of `val1` and `val2`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## 2. Key Insight

> Through mathematical analysis, most terms cancel out via XOR. The result simplifies to just `XOR of all elements in nums`.

---

## 3. Approach: Math Simplification — O(n) ✅

```text
FUNCTION xorBeauty(nums):
    // Initialize result to 0
    SET result ← 0
    // XOR each element with result
    FOR num IN nums DO
        SET result ← result XOR num
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [1,4]
Output: 5
Explanation: The triplets and their corresponding effective values are listed below:
- (0,0,0) with effective value ((1 | 1) & 1) = 1
- (0,0,1) with effective value ((1 | 1) & 4) = 0
- (0,1,0) with effective value ((1 | 4) & 1) = 1
- (0,1,1) with effective value ((1 | 4) & 4) = 4
- (1,0,0) with effective value ((4 | 1) & 1) = 1
- (1,0,1) with effective value ((4 | 1) & 4) = 4
- (1,1,0) with effective value ((4 | 4) & 1) = 0
- (1,1,1) with effective value ((4 | 4) & 4) = 4
Xor-beauty of array will be bitwise XOR of all beauties = 1 ^ 0 ^ 1 ^ 4 ^ 1 ^ 4 ^ 0 ^ 4 = 5.
```

**Example 2:**
```
Input: nums = [15,45,20,2,34,35,5,44,32,30]
Output: 34
Explanation: The xor-beauty of the given array is 34.
```

---

## 5. Walkthrough

Consider the array `[1,2,3]`.

| Step | Action | result |
|------|--------|--------|
| 1 | Initialize result = 0 | 0 |
| 2 | XOR with 1 | 0 XOR 1 = 1 |
| 3 | XOR with 2 | 1 XOR 2 = 3 |
| 4 | XOR with 3 | 3 XOR 3 = 0 |

Final result is 0, matching the expected XOR-beauty.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if the operation were `((nums[i] & nums[j]) | nums[k])`?
- Can you extend this approach to compute XOR-beauty for a stream of numbers?

---

## 8. Key Takeaway

> The triple XOR expression simplifies to just `XOR(nums)` — prove by analyzing each bit position and noting that most pairings cancel.
