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

Given an integer array `nums` and an integer `k`, you must negate one element exactly `k` times (you can negate the same element multiple times). Return the **maximum sum** of the array.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁴`
- `-100 ≤ nums[i] ≤ 100`
- `1 ≤ k ≤ 10⁴`

---

## Examples

**Example 1:**
```
Input:  nums = [4,2,3], k = 1
Output: 5
Explanation: Negate 2 → [-4,2,3]? No — negate to get max sum: negate nothing useful.
             Actually: negate index 0: [-4,2,3] sum=1. Better: negate nothing isn't an option.
             Must negate once: negate 2 → [4,-2,3] sum=5.
```

**Example 2:**
```
Input:  nums = [3,-1,0,2], k = 3
Output: 6
Explanation: Negate -1 → [3,1,0,2], then negate 0 twice → no change. Sum = 6.
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
