# 3221. Maximum Array Hopping Score II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-array-hopping-score-ii](https://leetcode.com/problems/maximum-array-hopping-score-ii)
**Companies:** Zluri

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Monotonic Stack — O(n)](#approach-monotonic-stack--on-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array `nums`, you have to get the **maximum** score starting from index 0 and **hopping** until you reach the last element of the array.

In each **hop**, you can jump from index `i` to an index `j > i`, and you get a **score** of `(j - i) * nums[j]`.

Return the *maximum score* you can get.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Key Insight

> The DP recurrence `dp[j] = max(dp[i] + (j-i)*nums[j])` can be rewritten as `dp[j] = j*nums[j] + max(dp[i] - i*nums[j])`. This is a **convex hull trick / Li Chao tree** optimization. Alternatively, observe that the optimal strategy is to always jump to the **suffix maximum** — you never want to land on a non-maximum element.

Greedy: jump to the next element that is the suffix maximum from the current position.

---

## Approach: Monotonic Stack — O(n) ✅

```text
FUNCTION maxScore(nums):
    n ← LENGTH(nums)
    // Compute suffix maximum indices
    suffixMaxIdx ← n-1
    score ← 0
    i ← 0
    WHILE i < n-1:
        // Find next suffix maximum position
        j ← i + 1
        WHILE j < n AND nums[j] < nums[suffixMaxIdx]:
            j ← j + 1
        IF j == n:
            j ← suffixMaxIdx
        score ← score + (j - i) * nums[j]
        i ← j
    RETURN score
```

---

## Examples

**Example 1:**
```
Input: nums = [1,5,8]
Output: 16
Explanation: There are two possible ways to reach the last element:
- 0 -> 1 -> 2 with a score of (1 - 0) * 5 + (2 - 1) * 8 = 13.
- 0 -> 2 with a score of (2 - 0) * 8 = 16.
```

**Example 2:**
```
Input: nums = [4,5,2,8,9,1,3]
Output: 42
Explanation: We can do the hopping 0 -> 4 -> 6 with a score of (4 - 0) * 9 + (6 - 4) * 3 = 42.
```

---

## Walkthrough

Consider `nums = [1,3,2,5]`.
1. Start at index 0 (`value=1`). The suffix maximum from index 0 is at index 3 (`value=5`).
2. Jump to index 3: score `(3-0)*5 = 15`.
3. Reached the last index, stop. Total score = 15.

The greedy suffix‑max rule matches the optimal DP result.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack / Greedy | **O(n)** | O(n) |

---

## Key Takeaway

> **For large n, optimize the O(n²) DP using convex hull trick or greedy observation that only suffix maximums matter.** Jump to the nearest suffix max to maximize `(j-i) * nums[j]`.
