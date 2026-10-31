# 2226. Maximum Candies Allocated to K Children

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-candies-allocated-to-k-children](https://leetcode.com/problems/maximum-candies-allocated-to-k-children)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach: Binary Search on Answer — O(n log max)](#approach-binary-search-on-answer--on-log-max-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** integer array `candies`. Each element in the array denotes a pile of candies of size `candies[i]`. You can divide each pile into any number of **sub piles**, but you **cannot** merge two piles together.

You are also given an integer `k`. You should allocate piles of candies to `k` children such that each child gets the **same** number of candies. Each child can be allocated candies from **only one** pile of candies and some piles of candies may go unused.

Return *the **maximum number of candies** each child can get.*

**Constraints:**
- `1 <= candies.length <= 10^5`
- `1 <= candies[i] <= 10^7`
- `1 <= k <= 10^12`

---

## Examples

**Example 1:**
```
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.
```

**Example 2:**
```
Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.
```

---

## Approach: Binary Search on Answer — O(n log max) ✅

```text
FUNCTION maximumCandies(candies, k):
    lo ← 1
    hi ← MAX(candies)
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        children ← 0
        FOR each pile IN candies:
            children ← children + FLOOR(pile / mid)
        IF children ≥ k:
            lo ← mid + 1          // try larger amount
        ELSE:
            hi ← mid - 1          // too large, decrease
    RETURN hi
```

---

## Walkthrough

Consider **Example 1**: `candies = [3,1,4,1,5,9]`, `k = 3`.

| Step | lo | hi | mid | children (sum floor(pile/mid)) | Decision |
|------|----|----|-----|------------------------------|----------|
| 1 | 1 | 9 | 5 | 1+0+0+0+1+1 = 3 | children ≥ k → lo = 6 |
| 2 | 6 | 9 | 7 | 0+0+0+0+0+1 = 1 | children < k → hi = 6 |
| 3 | 6 | 6 | 6 | 0+0+0+0+0+1 = 1 | children < k → hi = 5 |

Loop ends, `hi = 5` is the maximum feasible candies per child.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(n log max(candies))** | O(1) |

---

## Follow-Up Questions

1. How would the algorithm change if each child must receive at least one candy from each pile?
2. Can we solve the problem without binary search using a priority queue?
3. What if the number of children `k` is also up to `10⁹` – does the approach still scale?

---

## Key Takeaway

> **"Maximize the minimum allocation" = binary search on the answer.** For each candidate, greedily check feasibility by summing `pile // candidate`.
