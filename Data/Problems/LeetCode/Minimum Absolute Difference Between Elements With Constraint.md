# 2817. Minimum Absolute Difference Between Elements With Constraint

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint](https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint)
**Companies:** Capital One, Google, Meta, Roblox, Sig, Tiktok, Uber, Visa

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** integer array `nums` and an integer `x`.

Find the **minimum absolute difference** between two elements in the array that are at least `x` indices apart.

In other words, find two indices `i` and `j` such that `abs(i - j) >= x` and `abs(nums[i] - nums[j])` is minimized.

Return *an integer denoting the **minimum** absolute difference between two elements that are at least* `x` *indices apart*.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁹`
- `0 ≤ x < nums.length`

---

## Examples

```
Example 1:
  Input: nums = [4,3,2,4], x = 2
  Output: 0
  Explanation: We can select nums[0] = 4 and nums[3] = 4.
  They are at least 2 indices apart, and their absolute difference is the minimum, 0.
  It can be shown that 0 is the optimal answer.
```

```
Example 2:
  Input: nums = [5,3,2,10,15], x = 1
  Output: 1
  Explanation: We can select nums[1] = 3 and nums[2] = 2.
  They are at least 1 index apart, and their absolute difference is the minimum, 1.
  It can be shown that 1 is the optimal answer.
```

```
Example 3:
  Input: nums = [1,2,3,4], x = 3
  Output: 3
  Explanation: We can select nums[0] = 1 and nums[3] = 4.
  They are at least 3 indices apart, and their absolute difference is the minimum, 3.
  It can be shown that 3 is the optimal answer.
```

---

## Key Insight

> Maintain a **SortedList** of elements seen at least `x` positions ago. For each `nums[i]`, binary search for the closest value in the sorted set. This gives O(log n) per query.

---

## Approach: SortedList + Sliding Window — O(n log n) ✅

```text
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
i=3: add nums[1]=3. sl=[3,4]. bisect(4)=2 → sl[1]-4=0. minDiff=0

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