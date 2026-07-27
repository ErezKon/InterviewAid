# 1007. Minimum Domino Rotations For Equal Row

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-domino-rotations-for-equal-row](https://leetcode.com/problems/minimum-domino-rotations-for-equal-row)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Check Two Candidates — O(n)](#approach-check-two-candidates--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two rows of dominoes (`tops` and `bottoms`), you can rotate any domino (swap its top and bottom). Return the **minimum number of rotations** so that all values in `tops` are the same, or all values in `bottoms` are the same. Return `-1` if impossible.

**Constraints:**
- `2 ≤ tops.length ≤ 2 × 10⁴`
- `1 ≤ tops[i], bottoms[i] ≤ 6`

---

## Examples

**Example 1:**
```
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation: Rotate dominoes at index 1 and 3 → tops = [2,2,2,2,2,2].
```

---

## Key Insight

> If a solution exists, the target value must appear on every domino (top or bottom). There are only **2 candidates**: `tops[0]` and `bottoms[0]`. Check each — count rotations needed for top-row and bottom-row, take the minimum.

---

## Approach: Check Two Candidates — O(n) ✅

```
FUNCTION minDominoRotations(tops, bottoms):
    FUNCTION check(target):
        topRot = botRot = 0
        FOR i in range(len(tops)):
            IF tops[i] != target AND bottoms[i] != target: RETURN -1
            IF tops[i] != target: topRot += 1
            IF bottoms[i] != target: botRot += 1
        RETURN MIN(topRot, botRot)

    result = check(tops[0])
    IF result != -1: RETURN result
    RETURN check(bottoms[0])
```

---

## Walkthrough

```
tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Check target = 2 (tops[0]):
```

| i | tops[i] | bottoms[i] | Has 2? | topRot | botRot |
|---|---------|-----------|--------|--------|--------|
| 0 | 2 | 5 | ✓ top | 0 | 1 |
| 1 | 1 | 2 | ✓ bot | 1 | 1 |
| 2 | 2 | 6 | ✓ top | 1 | 2 |
| 3 | 4 | 2 | ✓ bot | 2 | 2 |
| 4 | 2 | 3 | ✓ top | 2 | 3 |
| 5 | 2 | 2 | ✓ both | 2 | 3 |

**Result:** min(2, 3) = **2** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — at most 2 passes |
| **Space** | O(1) |

---

## Follow-Up Questions

1. **Why only check 2 candidates?** If the answer exists, every domino must contain the target. The first domino has only 2 values — one of them must be the target.
2. **What if tops[0] == bottoms[0]?** Only one candidate to check.
3. **Could we check all 6 values (1-6)?** Yes, but unnecessary — only 2 candidates matter.

---

## Key Takeaway

> When every position must contain the target value, the **first position constrains candidates** to at most 2 — check each in O(n) for a clean, optimal solution.
