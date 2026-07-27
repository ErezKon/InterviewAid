# 1838. Frequency of the Most Frequent Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/frequency-of-the-most-frequent-element](https://leetcode.com/problems/frequency-of-the-most-frequent-element)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Phonepe, Ponyai, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Sliding Window — O(n log n) ✅](#3-approach-sort--sliding-window--on-log-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array `nums` and integer `k`, you can increment any element at most `k` times total. Return the maximum possible frequency of any single element.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= k <= 10⁵`

---

## 2. Key Insight

> Sort and use a sliding window. The cost to make all elements in `[left, right]` equal to `nums[right]` = `nums[right] * windowSize - windowSum`. Shrink the window when this exceeds `k`.

---

## 3. Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION maxFrequency(nums, k):
    SORT nums
    left = 0
    total = 0
    maxFreq = 1

    FOR right ← 0 TO n - 1:
        total += nums[right]
        // Cost to make all elements in window equal to nums[right]
        WHILE nums[right] * (right - left + 1) > total + k:
            total -= nums[left]
            left += 1
        maxFreq = MAX(maxFreq, right - left + 1)

    RETURN maxFreq
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Sort + sliding window** with cost = `target × windowSize - windowSum`. Classic pattern for "make all elements equal with budget k".
