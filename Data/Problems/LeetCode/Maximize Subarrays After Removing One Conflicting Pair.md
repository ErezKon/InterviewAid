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

You are given an integer `n` which represents an array `nums` containing the numbers from 1 to `n` in order. Additionally, you are given a 2D array `conflictingPairs`, where `conflictingPairs[i] = [a, b]` indicates that `a` and `b` form a conflicting pair.

Remove **exactly** one element from `conflictingPairs`. Afterward, count the number of non-empty subarrays of `nums` which do not contain both `a` and `b` for any remaining conflicting pair `[a, b]`.

Return the **maximum** number of subarrays possible after removing **exactly** one conflicting pair.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= conflictingPairs.length <= 2 * n`
- `conflictingPairs[i].length == 2`
- `1 <= conflictingPairs[i][j] <= n`
- `conflictingPairs[i][0] != conflictingPairs[i][1]`

---

## Examples

**Example 1:**
```
Input: n = 4, conflictingPairs = [[2,3],[1,4]]
Output: 9
Explanation: - Remove [2, 3] from conflictingPairs. Now, conflictingPairs = [[1, 4]].
- There are 9 subarrays in nums where [1, 4] do not appear together. They are [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
- The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 9.
```

**Example 2:**
```
Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]
Output: 12
Explanation: - Remove [1, 2] from conflictingPairs. Now, conflictingPairs = [[2, 5], [3, 5]].
- There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
- The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 12.
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

The sweep line tracks the nearest right-most blocker for each left index, and a difference array aggregates the unique contributions efficiently.

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
