# 334. Increasing Triplet Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/increasing-triplet-subsequence](https://leetcode.com/problems/increasing-triplet-subsequence)
**Companies:** Amazon, Bloomberg, Coupang, Google, Meta, Microsoft, Nutanix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Track Two Smallest — O(n), O(1) ✅](#3-approach-track-two-smallest--on-o1-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return true if there exists `i < j < k` such that `nums[i] < nums[j] < nums[k]`.

---

## 2. Key Insight

> Track the two smallest values seen so far. If any value exceeds both, we have an increasing triplet.

---

## 3. Approach: Track Two Smallest — O(n), O(1) ✅

```
FUNCTION increasingTriplet(nums):
    first = second = infinity

    FOR num IN nums:
        IF num <= first:
            first = num
        ELSE IF num <= second:
            second = num
        ELSE:
            RETURN true    // found num > second > first

    RETURN false
```

---

## 4. Key Takeaway

> `first` = smallest so far, `second` = smallest value greater than some previous `first`. Finding any `num > second` completes the triplet. O(n) time, O(1) space.
