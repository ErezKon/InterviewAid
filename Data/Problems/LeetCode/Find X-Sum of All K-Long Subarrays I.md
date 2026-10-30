# 3318. Find X-Sum of All K-Long Subarrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i](https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force per Window — O(n · k log k) ✅](#3-approach-brute-force-per-window)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an array `nums` of `n` integers and two integers `k` and `x`.

The **x-sum** of an array is calculated by the following procedure:

- Count the occurrences of all elements in the array.
- Keep only the occurrences of the top `x` most frequent elements. If two elements have the same number of occurrences, the element with the **bigger** value is considered more frequent.
- Calculate the sum of the resulting array.

**Note** that if an array has less than `x` distinct elements, its **x-sum** is the sum of the array.

Return an integer array `answer` of length `n - k + 1` where `answer[i]` is the **x-sum** of the subarray `nums[i..i + k - 1]`.

**Constraints:**
- `1 <= n == nums.length <= 50`
- `1 <= nums[i] <= 50`
- `1 <= x <= k <= nums.length`

---

## 2. Key Insight

> With small constraints, count frequencies per window, sort by (frequency, value) descending, take top x entries, and sum their contributions.

---

## 3. Approach: Brute Force per Window — O(n · k log k) ✅

```text
FUNCTION findXSum(nums, k, x):
    result ← []
    n ← LENGTH(nums)
    FOR i ← 0 TO n - k DO
        window ← nums[i : i + k]
        count ← COUNTER(window)               // frequency map
        top ← SORT(count.items(), KEY = (freq, value), DESCENDING)[:x]
        sum ← 0
        FOR (val, freq) IN top DO
            sum ← sum + val * freq
        END FOR
        APPEND sum TO result
    END FOR
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k log k) |
| **Space** | O(k) |

---

## 5. Examples

**Example 1:**
```
Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2
Output: [6,10,12]
Explanation: - For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
- For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
- For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.
```

**Example 2:**
```
Input: nums = [3,8,7,8,7,5], k = 2, x = 2
Output: [11,15,15,15,12]
Explanation: Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].
```

---

## 6. Walkthrough

Consider the first example step‑by‑step:
| Window indices | Window values | Frequency map | Top‑2 (value, freq) | Sum |
|----------------|---------------|---------------|--------------------|-----|
| 0‑2            | 1,2,2         | {1:1,2:2}     | (2,2), (1,1)       | 2*2+1*1 = 5 |
| 1‑3            | 2,2,3         | {2:2,3:1}     | (2,2), (3,1)       | 2*2+3*1 = 7 |
| 2‑4            | 2,3,3         | {2:1,3:2}     | (3,2), (2,1)       | 3*2+2*1 = 8 |

---

## 7. Follow-Up Questions
- How would you adapt the solution for `n, k ≤ 10⁵`?
- Can you maintain the top‑x frequencies with a balanced BST to achieve O(n log n)?
- What if the tie‑breaking rule changes to prioritize smaller values?

---

## 8. Key Takeaway

> For small constraints, a straightforward frequency count per window combined with sorting yields a simple and correct solution. The hard version requires a sliding‑window data structure to keep the top‑x frequencies efficiently.
