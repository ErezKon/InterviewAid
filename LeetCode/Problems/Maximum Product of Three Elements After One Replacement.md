# 3732. Maximum Product of Three Elements After One Replacement

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-three-elements-after-one-replacement](https://leetcode.com/problems/maximum-product-of-three-elements-after-one-replacement)
**Companies:** Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, you can replace **at most one** element with any value. Return the **maximum product** of any three elements.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `-10^5 <= nums[i] <= 10^5`

---

## Key Insight

> Without replacement, the max product is from either the 3 largest or 2 smallest + largest. With one replacement, we can change one element to maximize the product — consider replacing elements adjacent to the critical positions (top 3 largest, bottom 2 smallest).

---

## Approach

```
FUNCTION maxProduct(nums)
    SORT nums
    n ← len(nums)
    // Without replacement: standard two candidates
    // With replacement: try replacing each of the 4-5 critical elements
    // For each candidate triple, try replacing one element optimally
    // The answer uses the top 4 largest and bottom 3 smallest
    candidates ← all products of 3 from nums[0..2] and nums[n-4..n-1]
    RETURN MAX(candidates)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — constant |

---

## Key Takeaway

> **Extend the "three numbers" pattern** — with one replacement, consider a slightly larger window of extreme elements (top 4, bottom 3) and evaluate all candidate triples.
