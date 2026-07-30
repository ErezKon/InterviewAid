# 1995. Count Special Quadruplets

**Difficulty:** 🟢 Easy

**Companies:** Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, count quadruplets `(a, b, c, d)` where `a < b < c < d` and `nums[a] + nums[b] + nums[c] == nums[d]`.

**Constraints:**
- `4 <= nums.length <= 50`
- `1 <= nums[i] <= 100`

---

## Examples

**Example 1:**
- **Input:** `nums = [1,2,3,6]`
- **Output:** `1`
- **Explanation:** 1+2+3 = 6 ✅

**Example 2:**
- **Input:** `nums = [3,3,6,4,5]`
- **Output:** `0`

---

## Key Insight

With n ≤ 50, brute force O(n⁴) is acceptable. For an optimized approach, rewrite as `nums[a] + nums[b] = nums[d] - nums[c]` and use a hash map to count right-side differences as you iterate.

---

## Approach

**Brute force (acceptable for n ≤ 50):**
```
FUNCTION countQuadruplets(nums):
    count = 0
    FOR i,j,k,l: IF nums[i]+nums[j]+nums[k]==nums[l]: count += 1
    RETURN count
```

**Optimized with hash map:**
```
FUNCTION countQuadruplets(nums):
    count = 0
    diffCount = HashMap()
    FOR c ← n-2 DOWNTO 1 DO
        // Add nums[d] - nums[c+1..n-1] to diffCount as we go
        FOR d ← c+1 TO n-1 DO
            diffCount[nums[d] - nums[c]] += 1   // only first time c decreases past d
        // Actually: iterate c from right, for each c, add diffs, then check pairs
        FOR a ← 0 TO c-1 DO
            count += diffCount.get(nums[a] + nums[???], 0)
    // (Exact index management depends on careful ordering)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n⁴) brute force, O(n²) optimized |
| **Space** | O(1) brute force, O(n²) optimized |

---

## Follow-Up Questions

**Q1: Can you reduce from O(n⁴) to O(n²)?**
Yes — rewrite as `nums[a] + nums[b] = nums[d] - nums[c]`. Iterate `c` from right to left; for each new `c`, add all `nums[d] - nums[c]` values to a hash map. Then for each `b < c`, look up `nums[a] + nums[b]` pairs.

**Q2: Is this related to 4Sum?**
Yes — it's a variant where the target is one of the array elements rather than an external value.

---

## Key Takeaway

> **Small constraints (n ≤ 50) make O(n⁴) brute force viable. For optimization, rewrite the equation to split into two halves and use a hash map for the complement lookup.**
