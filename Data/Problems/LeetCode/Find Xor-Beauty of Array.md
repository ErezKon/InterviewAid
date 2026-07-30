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
Input: nums = [1,2,3]
Output: 0
Explanation: XOR of all elements = 1 XOR 2 XOR 3 = 0.
```

**Example 2:**
```
Input: nums = [5,5,5,5]
Output: 0
Explanation: Even count of each bit cancels out, resulting XOR is 0.
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
