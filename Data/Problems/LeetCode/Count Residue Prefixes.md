# 3803. Count Residue Prefixes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-residue-prefixes](https://leetcode.com/problems/count-residue-prefixes)
**Companies:** Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, count how many prefixes of `nums` have a sum that gives a specific residue when divided by `k`. Count the number of prefix sums where `prefixSum % k` matches a target residue.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^9`

---

## Key Insight

Compute running prefix sums and check the modular residue at each step. This is a straightforward single-pass with modular arithmetic.

---

## Approach

```text
FUNCTION countResiduePrefixes(nums, k, target):
    SET count ← 0
    SET prefixSum ← 0
    FOR num IN nums DO
        SET prefixSum ← prefixSum + num
        IF prefixSum % k == target THEN
            SET count ← count + 1
    RETURN count
```

---

## Examples

**Example 1:**
```
Input: nums = [3,1,4,2], k = 3, target = 1
Output: 2
Explanation: Prefix sums are [3,4,8,10]; their residues modulo 3 are [0,1,2,1]. Two prefixes (second and fourth) have residue 1.
```

**Example 2:**
```
Input: nums = [5,5,5], k = 5, target = 0
Output: 3
Explanation: Every prefix sum is a multiple of 5, so all three prefixes match the target residue 0.
```

---

## Walkthrough

| Index | num | prefixSum | prefixSum % k | count |
|-------|-----|-----------|---------------|-------|
| 0 | 3 | 3 | 0 | 0 |
| 1 | 1 | 4 | 1 | 1 |
| 2 | 4 | 8 | 2 | 1 |
| 3 | 2 |10 | 1 | 2 |

The table shows how the algorithm updates the running sum and increments the counter when the residue matches the target.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few integer variables are used.

---

## Follow-Up Questions

1. How would you modify the solution to count subarrays (not just prefixes) with a given residue?
2. Can you handle negative numbers in `nums` while preserving O(n) time?
3. What if you need to support multiple target residues simultaneously?

---

## Key Takeaway

> Prefix sum + modular arithmetic is the standard technique for counting prefixes with a specific remainder property.
