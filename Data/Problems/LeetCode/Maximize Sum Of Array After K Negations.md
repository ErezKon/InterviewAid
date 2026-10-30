# 1005. Maximize Sum Of Array After K Negations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximize-sum-of-array-after-k-negations](https://leetcode.com/problems/maximize-sum-of-array-after-k-negations)
**Companies:** Druva, Google, Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Sort — O(n log n)](#approach-greedy-sort--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums` and an integer `k`, modify the array in the following way:

- choose an index `i` and replace `nums[i]` with `-nums[i]`.

You should apply this process exactly `k` times. You may choose the same index `i` multiple times.

Return *the largest possible sum of the array after modifying it in this way*.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-100 <= nums[i] <= 100`
- `1 <= k <= 10^4`

---

## Examples

**Example 1:**
```
Input: nums = [4,2,3], k = 1
Output: 5
Explanation: Choose index 1 and nums becomes [4,-2,3].
```

**Example 2:**
```
Input: nums = [3,-1,0,2], k = 3
Output: 6
Explanation: Choose indices (1, 2, 2) and nums becomes [3,1,0,2].
```

**Example 3:**
```
Input: nums = [2,-3,-1,5,-4], k = 2
Output: 13
Explanation: Choose indices (1, 4) and nums becomes [2,3,-1,5,4].
```

---

## Key Insight

> **Negate the most negative elements first** (they become positive, increasing the sum the most). After all negatives are flipped, if k is still odd, negate the **smallest absolute value** element once (minimizing loss).

---

## Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION largestSumAfterKNegations(nums, k):
    SORT nums
    FOR i ← 0 TO n - 1:
        IF k > 0 AND nums[i] < 0:
            nums[i] = -nums[i]; k -= 1
    IF k % 2 == 1:
        nums[nums.index(MIN(nums))] *= -1
    RETURN SUM(nums)
```

---

## Walkthrough

```
nums = [3, -1, 0, 2], k = 3
sorted: [-1, 0, 2, 3]
```

| Step | Action | Array | k |
|------|--------|-------|---|
| 1    | Negate -1 | [1, 0, 2, 3] | 2 |
| 2    | No more negatives | — | 2 |
| 3    | k=2 is even → no extra negate | [1, 0, 2, 3] | 0 |

**Result:** 1 + 0 + 2 + 3 = **6** ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Greedy | **O(n log n)** | O(1) |

---

## Follow-Up Questions

**Q1: Why negate the smallest absolute value when k is odd?**
Each extra negation toggles a value. Toggling the smallest absolute value minimizes the sum reduction.

**Q2: What if there's a 0 in the array?**
Then extra negations on 0 have no effect — you can absorb any remaining k for free.

**Q3: Can this be done without sorting?**
Yes — use a min-heap. Push all elements, repeatedly pop the min and negate it k times. O(n + k log n).

---

## Key Takeaway

> **Negate the most negative elements first, then toggle the smallest |value| if k remains odd.** Simple greedy after sorting.
