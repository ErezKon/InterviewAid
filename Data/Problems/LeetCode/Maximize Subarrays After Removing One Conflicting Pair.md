# 3480. Maximize Subarrays After Removing One Conflicting Pair

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair](https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sweep Line + Difference Array — O(n + m)](#approach-sweep-line--difference-array--on--m-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of length `n` and `m` conflicting pairs (pairs of indices that cannot both appear in a subarray), find the maximum number of valid subarrays (containing no conflicting pair) after removing exactly **one** conflicting pair.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ m ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: n = 5, conflicts = [(1,3), (2,4), (3,5)]
Output: 9
Explanation: Removing the pair (2,4) unblocks the subarrays that include indices 2‑4, increasing the total count to 9.
```

**Example 2:**
```
Input: n = 4, conflicts = [(0,1), (2,3)]
Output: 6
Explanation: Removing either pair yields the same maximum of 6 valid subarrays.
```

---

## Key Insight

> Each conflicting pair `(a, b)` with `a < b` blocks all subarrays `[l, r]` where `l ≤ a` and `r ≥ b`. Removing one pair "unblocks" those subarrays. Use a sweep line to compute for each pair how many subarrays it uniquely blocks (blocked only by this pair). The best pair to remove is the one that uniquely blocks the most subarrays.

---

## Approach: Sweep Line + Difference Array — O(n + m) ✅

```text
FUNCTION maxSubarrays(n, conflicts):
    // Compute baseline valid subarrays without any removal
    baseline ← computeValidSubarrays(n, conflicts)
    bestGain ← 0
    FOR each conflict (a, b) IN conflicts:
        // Determine subarrays blocked only by this conflict
        uniqueBlocked ← subarraysUniquelyBlockedBy(a, b, conflicts)
        bestGain ← MAX(bestGain, uniqueBlocked)
    RETURN baseline + bestGain
```

---

## Walkthrough

Consider the first example with `n = 5` and conflicts `[(1,3), (2,4), (3,5)]`.

| Step | Action | Effect |
|------|--------|--------|
| 1 | Compute baseline subarrays ignoring removal. | Baseline = 6 (subarrays that avoid all conflicts). |
| 2 | For each conflict, count subarrays uniquely blocked. | `(1,3)` blocks 2 unique subarrays, `(2,4)` blocks 3, `(3,5)` blocks 1. |
| 3 | Choose conflict with max unique block count. | Remove `(2,4)` → gain = 3. |
| 4 | Add gain to baseline. | Result = 6 + 3 = 9 valid subarrays. |

The sweep line tracks the nearest right‑most blocker for each left index, and a difference array aggregates the unique contributions efficiently.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sweep line + difference array | **O(n + m)** | O(n + m) |

---

## Follow-Up Questions

- How would the solution change if you could remove **k** conflicting pairs instead of one?
- Can the technique be extended to weighted conflicts where each pair has a removal cost?
- What modifications are needed for a streaming version where conflicts arrive online?

---

## Key Takeaway

> **For "remove one constraint to maximize valid structures," compute the gain from removing each constraint using sweep line / difference array techniques.** The constraint that uniquely blocks the most structures is the best to remove.
