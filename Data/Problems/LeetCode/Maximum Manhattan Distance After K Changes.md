# 3443. Maximum Manhattan Distance After K Changes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes](https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes)
**Companies:** Bloomberg, Meta, Microsoft, Uber

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

You are given a string `s` consisting of characters `'N'`, `'S'`, `'E'`, `'W'` representing moves on a 2D grid. You can change **at most** `k` characters to any direction. Return the **maximum Manhattan distance** from the origin `(0, 0)` you can achieve at any point during the walk.

Manhattan distance = `|x| + |y|`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `0 <= k <= s.length`
- `s` consists of `'N'`, `'S'`, `'E'`, `'W'`

---

## Examples

**Example 1:**
```
Input:  s = "NWSE", k = 1
Output: 3
Explanation: Change 'S' to 'N' → "NWNE". After 3 steps at "NWN", position is (-1,2), distance=3.
```

**Example 2:**
```
Input:  s = "NSWWEW", k = 3
Output: 6
Explanation: Change all to consistent direction → max distance = 6.
```

---

## Key Insight

> Manhattan distance `|x| + |y|` equals `max(|diag1|, |diag2|)` where `diag1 = x + y` and `diag2 = x - y`. Track both diagonal sums along the path. At each step, the maximum we can achieve is the current diagonal distance plus `k` (each flip adds 2 to one diagonal, but we take the best at each prefix).

More precisely: at each step `i`, compute the maximum achievable distance by flipping up to `k` of the worst moves so far. The answer is `min(i+1, best_diag + 2*k)` evaluated at the best prefix.

---

## Approach

```
FUNCTION maxDistance(s, k)
    x ← 0, y ← 0
    result ← 0

    FOR i ← 0 TO len(s) - 1 DO
        IF s[i] = 'N' THEN y ← y + 1
        ELSE IF s[i] = 'S' THEN y ← y - 1
        ELSE IF s[i] = 'E' THEN x ← x + 1
        ELSE x ← x - 1                         // 'W'

        dist ← ABS(x) + ABS(y)
        // Each of k changes can add at most 2 to distance
        // But total distance capped at steps taken so far
        maxDist ← MIN(i + 1, dist + 2 * k)
        result ← MAX(result, maxDist)

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
s = "NWSE", k = 1
```

| Step | char | (x,y)  | dist | dist+2k | min(step,dist+2k) | result |
|------|------|--------|------|---------|--------------------|--------|
| 0    | N    | (0,1)  | 1    | 3       | min(1,3)=1         | 1      |
| 1    | W    | (-1,1) | 2    | 4       | min(2,4)=2         | 2      |
| 2    | S    | (-1,0) | 1    | 3       | min(3,3)=**3**     | **3**  |
| 3    | E    | (0,0)  | 0    | 2       | min(4,2)=2         | 3      |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass through the string |
| Space  | **O(1)** — constant extra space |

---

## Follow-Up Questions

1. **Why can each change add at most 2 to distance?**
   Changing a step from one direction to its opposite flips the contribution by 2 (e.g., S→N changes y by +2).

2. **Why cap at `i + 1`?**
   After `i+1` steps, the maximum possible distance is `i+1` (all steps in the same direction).

3. **Could we need to change a step to a non-opposite direction?**
   No — to maximize Manhattan distance, the optimal flip is always to the opposite of the current "worst" direction.

---

## Key Takeaway

> **Greedily flip the worst moves**: each of `k` changes adds at most 2 to the Manhattan distance, capped by the total steps taken — giving an elegant O(n) solution.
