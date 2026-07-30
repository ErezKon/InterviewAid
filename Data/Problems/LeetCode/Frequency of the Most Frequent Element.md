# 1838. Frequency of the Most Frequent Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/frequency-of-the-most-frequent-element](https://leetcode.com/problems/frequency-of-the-most-frequent-element)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Phonepe, Ponyai, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Sliding Window — O(n log n) ✅](#4-approach-sort--sliding-window--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given array `nums` and integer `k`, you can increment any element at most `k` times total. Return the maximum possible frequency of any single element.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= k <= 10⁵`

---

## 2. Examples

| nums | k | Output |
|------|---|--------|
| [1,2,4] | 5 | 3 |
| [1,4,8,13] | 5 | 2 |
| [3,9,6] | 2 | 1 |

*Explanation:* In the first example, increment `1` by `2` and `2` by `3` to make all elements `4`.

---

## 3. Key Insight

> Sort and use a sliding window. The cost to make all elements in `[left, right]` equal to `nums[right]` = `nums[right] * windowSize - windowSum`. Shrink the window when this exceeds `k`.

---

## 4. Approach: Sort + Sliding Window — O(n log n) ✅

```text
FUNCTION maxFrequency(nums, k):
    SORT nums
    left ← 0
    total ← 0
    maxFreq ← 1

    FOR right ← 0 TO LENGTH(nums) - 1:
        total ← total + nums[right]
        // Cost to raise all elements in window to nums[right]
        WHILE nums[right] * (right - left + 1) > total + k:
            total ← total - nums[left]
            left ← left + 1
        maxFreq ← MAX(maxFreq, right - left + 1)

    RETURN maxFreq
```

---

## 5. Walkthrough

Consider `nums = [1,2,4]`, `k = 5`.

| Step | left | right | window elements | total | cost = nums[right]*size - total | Action |
|------|------|-------|----------------|-------|--------------------------------|--------|
| Init | 0 | 0 | [1] | 1 | 1*1-1=0 | window ok, maxFreq=1 |
| Add | 0 | 1 | [1,2] | 3 | 2*2-3=1 ≤5 | window ok, maxFreq=2 |
| Add | 0 | 2 | [1,2,4] | 7 | 4*3-7=5 ≤5 | window ok, maxFreq=3 |

All elements can be raised to `4` using exactly `5` increments, achieving frequency `3`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if you could decrement elements instead of incrementing?
- Can you adapt the algorithm to return the element value that achieves the maximum frequency?
- What if the budget `k` is different for each element?

---

## 8. Key Takeaway

> **Sort + sliding window** with cost = `target × windowSize - windowSum`. Classic pattern for "make all elements equal with budget k".
