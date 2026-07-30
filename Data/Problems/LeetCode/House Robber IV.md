# 2560. House Robber IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/house-robber-iv](https://leetcode.com/problems/house-robber-iv)
**Companies:** Amazon, Arcesium, Bloomberg, Cashfree, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search on Answer — O(n log max) ✅](#3-approach-binary-search-on-answer)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Find the minimum "capability" (max value among robbed houses) needed to rob at least `k` non-adjacent houses.

---

## 2. Key Insight

> Binary search on the capability. For a given cap, greedily check if we can pick ≥ k non-adjacent houses with value ≤ cap.

---

## 3. Approach: Binary Search on Answer — O(n log max) ✅

```
FUNCTION minCapability(nums, k):
    lo ← MIN(nums)
    hi ← MAX(nums)

    WHILE lo < hi:
        mid ← (lo + hi) / 2
        IF canRob(nums, k, mid):
            hi ← mid
        ELSE:
            lo ← mid + 1

    RETURN lo

FUNCTION canRob(nums, k, cap):
    count ← 0
    i ← 0
    WHILE i < LENGTH(nums):
        IF nums[i] ≤ cap:
            count ← count + 1
            i ← i + 2    // skip adjacent house
        ELSE:
            i ← i + 1
    RETURN count ≥ k
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [2,3,5,9], k = 2
Output: 5
Explanation: Capability 5 allows robbing houses with values 2 and 5 (non‑adjacent). Minimum such capability is 5.
```

**Example 2:**
```
Input: nums = [2,7,9,3,1], k = 3
Output: 7
Explanation: With capability 7 we can rob houses 2,7,1 (indices 0,1,4) respecting non‑adjacency.
```

---

## 5. Walkthrough

Take `nums = [2,3,5,9]`, `k = 2`.
1. lo=2, hi=9 → mid=5. `canRob` with cap=5 picks 2 (index0) then skips index1, picks 5 (index2) → count=2 ≥ k, so hi=5.
2. lo=2, hi=5 → mid=3. `canRob` with cap=3 picks 2 (index0), skips index1, cannot pick 5 → count=1 < k, so lo=4.
3. lo=4, hi=5 → mid=4. `canRob` with cap=4 picks 2 only → count=1 < k, lo=5.
Now lo=hi=5, answer=5.

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log M) | O(1) |
where `M` is the range between min and max house values.

---

## 7. Follow-Up Questions

1. How would the solution change if houses were arranged in a binary tree?
2. Can you extend the approach to handle a variable cooldown period between robberies?
3. What if each house also had a penalty cost for robbing it?

---

## Key Takeaway

> **Binary search on the answer** combined with a greedy feasibility check efficiently finds the minimal capability for robbing at least `k` non‑adjacent houses.
