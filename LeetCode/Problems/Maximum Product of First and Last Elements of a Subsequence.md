# 3584. Maximum Product of First and Last Elements of a Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-first-and-last-elements-of-a-subsequence](https://leetcode.com/problems/maximum-product-of-first-and-last-elements-of-a-subsequence)
**Companies:** Kla

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, find a subsequence of length ≥ 2 that maximizes the **product of its first and last elements**.

**Constraints:**
- `2 <= nums.length <= 10^5`

---

## Key Insight

> A subsequence's first element is some `nums[i]` and last is some `nums[j]` where `i < j`. We want to maximize `nums[i] × nums[j]`. Consider both large positives and large negatives (two negatives make a positive product).

---

## Approach

```
FUNCTION maxProduct(nums)
    // Track max and min from left, max and min from right
    // The answer is max of:
    //   max_left × max_right (two positives)
    //   min_left × min_right (two negatives)
    // For all valid (i < j) pairs, simplify to tracking extremes
    RETURN MAX over all i < j of nums[i] × nums[j]
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — track running extremes |
| Space  | **O(1)** — constant |

---

## Key Takeaway

> **Track extremes** — the max product of first/last of any subsequence reduces to finding the best pair `(nums[i], nums[j])` with `i < j`. Track running max/min and suffix max/min.
