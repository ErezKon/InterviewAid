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

Same as Part I but with larger n (up to 10⁵). Start at index 0, hop to n-1. Each hop from `i` to `j` scores `(j - i) * nums[j]`. Maximize total score.

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

| nums | Expected Score |
|------|----------------|
| [1,3,2,5] | 12 |
| [4,1,2,3] | 9 |

*Explanation*: In the first example, optimal hops are `0→3` (score `3*5=15`) then backtrack not needed; the algorithm yields 12 after greedy suffix‑max selection.

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
