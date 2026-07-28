# 3346. Maximum Frequency of an Element After Performing Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Each element in the array can be increased or decreased by at most `k`. After performing any number of such operations, determine the maximum possible frequency of any single value in the array.

---

## Examples

| nums | k | Output |
|------|---|--------|
| [1,2,4] | 1 | 2 |
| [3,3,3] | 0 | 3 |
| [1,5,9] | 3 | 1 |

*Explanation*: In the first example, we can change `1` to `2` (cost 1) and obtain two `2`s. In the second example, all elements are already equal. In the third example, the range of each element after ±3 does not overlap, so no two elements can become the same.

---

## Approach

The operation allows each element `x` to become any value in `[x‑k, x+k]`. Two elements can share a common target value iff their intervals overlap. After sorting the array, the problem reduces to finding the longest contiguous sub‑array where the difference between the maximum and minimum element is ≤ 2k. This is a classic sliding‑window / two‑pointer technique.

```text
FUNCTION maxFrequency(nums, k):
    SORT nums
    left ← 0
    result ← 0
    FOR right ← 0 TO LENGTH(nums) - 1:
        WHILE nums[right] - nums[left] > 2 * k:
            left ← left + 1
        result ← MAX(result, right - left + 1)
    RETURN result
```

---

## Walkthrough

Consider `nums = [1,2,4]` and `k = 1`.

| Step | right | nums[right] | left | nums[left] | Window Size | Condition `nums[right] - nums[left] ≤ 2k` |
|------|-------|-------------|------|------------|-------------|--------------------------------------------|
| Init | - | - | 0 | - | 0 | - |
| 1 | 0 | 1 | 0 | 1 | 1 | 0 ≤ 2 ✅ |
| 2 | 1 | 2 | 0 | 1 | 2 | 1 ≤ 2 ✅ |
| 3 | 2 | 4 | 0 | 1 | 3 | 3 > 2 ❌ → move left to 1, then 2 ≤ 2 ✅ |

The maximum window size observed is 2, so the answer is 2.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Sliding Window | **O(n log n)** (sorting) | O(1) |

---

## Follow-Up Questions

1. How would the solution change if each element could be changed by a different `k_i`?
2. Can you extend the approach to return the actual target value achieving the maximum frequency?
3. What if the cost of changing an element is proportional to the amount changed?

---

## Key Takeaway

> By converting each element to an interval `[x‑k, x+k]`, the problem becomes finding the longest sub‑array within a width of `2k`. A sorted array and sliding‑window efficiently capture this.
