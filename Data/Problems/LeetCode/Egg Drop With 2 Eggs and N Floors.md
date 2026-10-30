# 1884. Egg Drop With 2 Eggs and N Floors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/egg-drop-with-2-eggs-and-n-floors](https://leetcode.com/problems/egg-drop-with-2-eggs-and-n-floors)
**Companies:** Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach 1: DP](#approach-1-dp--on-)
- [Approach 2: Math Formula](#approach-2-math-formula--o√n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given **two identical** eggs and you have access to a building with `n` floors labeled from `1` to `n`.

You know that there exists a floor `f` where `0 <= f <= n` such that any egg dropped at a floor **higher** than `f` will **break**, and any egg dropped **at or below** floor `f` will **not break**.

In each move, you may take an **unbroken** egg and drop it from any floor `x` (where `1 <= x <= n`). If the egg breaks, you can no longer use it. However, if the egg does not break, you may **reuse** it in future moves.

Return *the **minimum number of moves** that you need to determine **with certainty** what the value of *`f` is.

**Constraints:**
- `1 <= n <= 1000`

---

## Examples

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: We can drop the first egg from floor 1 and the second egg from floor 2.
If the first egg breaks, we know that f = 0.
If the second egg breaks but the first egg didn't, we know that f = 1.
Otherwise, if both eggs survive, we know that f = 2.
```

**Example 2:**
```
Input: n = 100
Output: 14
Explanation: One optimal strategy is:
- Drop the 1st egg at floor 9. If it breaks, we know f is between 0 and 8. Drop the 2nd egg starting from floor 1 and going up one at a time to find f within 8 more drops. Total drops is 1 + 8 = 9.
- If the 1st egg does not break, drop the 1st egg again at floor 22. If it breaks, we know f is between 9 and 21. Drop the 2nd egg starting from floor 10 and going up one at a time to find f within 12 more drops. Total drops is 2 + 12 = 14.
- If the 1st egg does not break again, follow a similar process dropping the 1st egg from floors 34, 45, 55, 64, 72, 79, 85, 90, 94, 97, 99, and 100.
Regardless of the outcome, it takes at most 14 drops to determine f.
```

---

## Key Insight

> With 2 eggs, if you drop egg 1 from floor `k` and it breaks, you must linear-scan floors 1 to `k-1` with egg 2 (worst case `k-1` moves). To minimize worst case, make each "segment" decrease by 1: drop at `k`, then `k + (k-1)`, then `k + (k-1) + (k-2)`, etc. This gives `k + (k-1) + ... + 1 = k(k+1)/2 ≥ n`, so `k = ⌈(-1 + √(1+8n)) / 2⌉`.

---

## Approach 1: DP — O(n) ✅

```
FUNCTION twoEggDrop(n):
    // dp[j] = min moves for j floors with 2 eggs
    dp = array of size n+1
    dp[0] = 0; dp[1] = 1

    FOR j ← 2 TO n:
        dp[j] = j  // worst case: linear scan with 1 egg
        FOR k ← 1 TO j:
            // Drop from floor k: max(break=k-1 linear, survive=dp[j-k]) + 1
            worst = 1 + MAX(k - 1, dp[j - k])
            dp[j] = MIN(dp[j], worst)

    RETURN dp[n]
```

---

## Approach 2: Math Formula — O(√n) ✅

```
FUNCTION twoEggDrop(n):
    k = 1
    WHILE k * (k + 1) / 2 < n:
        k += 1
    RETURN k
```

Find smallest `k` where `k(k+1)/2 ≥ n`.

---

## Walkthrough

```
n = 100

Math approach: find k where k(k+1)/2 ≥ 100
  k=13: 13×14/2 = 91 < 100
  k=14: 14×15/2 = 105 ≥ 100 ✅

Strategy with k=14:
  Drop 1 at floor 14 (if breaks: check 1-13 = 13 more = 14 total)
  If survives: drop at 14+13=27 (if breaks: check 15-26 = 12 more = 14 total)
  If survives: drop at 27+12=39 ... and so on
  Floors: 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100

Answer: 14 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | O(n²) | O(n) |
| Math | O(√n) | O(1) |

---

## Follow-Up Questions

**Q1: What about k eggs and n floors (LC 887)?**
> Generalize to `dp[k][n]`. With `k` eggs and `n` floors: `dp[k][n] = 1 + min over x of max(dp[k-1][x-1], dp[k][n-x])`. Can be solved in O(kn log n) with binary search.

**Q2: Why does the decreasing-interval strategy work for 2 eggs?**
> Each segment gets shorter by 1 to equalize worst-case across all drop positions. If egg 1 breaks later, you've used more moves on egg 1 but have fewer floors to scan with egg 2.

---

## Key Takeaway

> **2-egg problem reduces to finding smallest `k` where `k(k+1)/2 ≥ n`. The decreasing-interval strategy equalizes worst-case across all scenarios. Classic interview math/DP problem.**
