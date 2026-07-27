# 3346. Maximum Frequency of an Element After Performing Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Sliding Window — O(n log n)](#approach-sort--sliding-window--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Each element can be changed by at most ±k. Find the maximum frequency of any single value after all operations.

---

## Key Insight

> Element `x` can become any value in `[x-k, x+k]`. Two elements can both become the same target if their ranges overlap. Sort, then sliding window: find the longest window where `nums[right] - nums[left] ≤ 2k`.

---

## Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION maxFrequency(nums, k):
    SORT nums
    left = 0; result = 0
    FOR right ← 0 TO n - 1:
        WHILE nums[right] - nums[left] > 2 * k:
            left += 1
        result = MAX(result, right - left + 1)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sliding window | **O(n log n)** | O(1) |

---

## Key Takeaway

> **"Change each by ±k" means ranges of width 2k. Sort and find the longest window within range 2k.** Same pattern as Maximum Beauty of an Array.
