# 2817. Minimum Absolute Difference Between Elements With Constraint

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint](https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint)
**Companies:** Capital One, Google, Meta, Roblox, Sig, Tiktok, Uber, Visa

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `x`, find the minimum `|nums[i] - nums[j]|` where `|i - j| ≥ x`.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ x < nums.length`

---

## Key Insight

> Maintain a **SortedList** of elements seen at least `x` positions ago. For each `nums[i]`, binary search for the closest value in the sorted set. This gives O(log n) per query.

---

## Approach: SortedList + Sliding Window — O(n log n) ✅

```
FUNCTION minAbsoluteDifference(nums, x):
    IF x = 0 THEN RETURN 0
    sl ← SortedList()
    minDiff ← INFINITY

    FOR i ← x TO n - 1 DO
        sl.add(nums[i - x])    // add element at distance x behind

        // Find closest to nums[i] in sorted list
        idx ← sl.bisect_left(nums[i])
        IF idx < LEN(sl) THEN
            minDiff ← MIN(minDiff, sl[idx] - nums[i])
        IF idx > 0 THEN
            minDiff ← MIN(minDiff, nums[i] - sl[idx - 1])

    RETURN minDiff
```

---

## Walkthrough

```
nums = [4, 3, 2, 4], x = 2

i=2: add nums[0]=4. sl=[4]. bisect(2)=0 → sl[0]-2=2. minDiff=2
i=3: add nums[1]=3. sl=[3,4]. bisect(4)=2 → sl[1]-4=0. minDiff=0? 
     Actually sl[1]=4, 4-4=0 → minDiff=0

Return 0 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| SortedList + binary search | **O(n log n)** | **O(n)** |

---

## Follow-Up Questions

1. **Why SortedList?** Need efficient insertion and closest-value queries — a balanced BST or SortedList provides both in O(log n).
2. **Why add `nums[i-x]` at step `i`?** Ensures all elements in the sorted set are at least `x` positions before `i`.
3. **Can we use a different data structure?** A balanced BST (TreeSet in Java) works similarly.

---

## Key Takeaway

> **Sliding sorted set** — maintain elements at sufficient distance in a sorted structure. Binary search for closest value gives O(n log n) for constrained nearest-pair queries.

---
