# 2857. Count Pairs of Points With Distance k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-pairs-of-points-with-distance-k](https://leetcode.com/problems/count-pairs-of-points-with-distance-k)
**Companies:** Google

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

Given a 2D integer array `coordinates` and an integer `k`, return the number of pairs `(i, j)` where `i < j` and the **XOR distance** between `coordinates[i]` and `coordinates[j]` equals `k`:

`(x1 XOR x2) + (y1 XOR y2) == k`

**Constraints:**
- `2 <= coordinates.length <= 5 × 10^4`
- `0 <= coordinates[i][0], coordinates[i][1] <= 10^6`
- `0 <= k <= 100`

---

## Examples

**Example 1:**
- **Input:** `coordinates = [[1,2],[4,2],[1,3],[5,2]], k = 5`
- **Output:** `2`
- **Explanation:** Pairs: (0,1) → (1⊕4)+(2⊕2) = 5+0 = 5 ✅, (2,3) → (1⊕5)+(3⊕2) = 4+1 = 5 ✅.

---

## Key Insight

Since `k ≤ 100`, we can enumerate how `k` splits between the X and Y XOR components. If `(x1 XOR x2) = a` and `(y1 XOR y2) = b`, then `a + b = k` with `0 ≤ a ≤ k`. There are only `k + 1 ≤ 101` possible splits.

For each split `(a, b)`: given a point `(x, y)`, we need `x2 = x XOR a` and `y2 = y XOR b`. Use a hash map to look up previously seen points.

---

## Approach

```
FUNCTION countPairs(coordinates, k):
    count = 0
    seen = HashMap()  // (x, y) → frequency

    FOR each (x, y) IN coordinates DO
        FOR a ← 0 TO k DO
            b = k - a
            target = (x XOR a, y XOR b)
            count += seen[target]   // 0 if not present
        seen[(x, y)] += 1

    RETURN count
```

---

## Walkthrough

**Input:** `coordinates = [[1,2],[4,2],[1,3],[5,2]], k = 5`

| Point | a loop checks | Matches found | count |
|---|---|---|---|
| (1,2) | a=0..5, targets: (1⊕a, 2⊕(5-a)) | seen is empty | 0 |
| (4,2) | a=5: target=(4⊕5,2⊕0)=(1,2) → seen has (1,2)=1 | 1 match | 1 |
| (1,3) | a=0..5, no matches in seen | 0 | 1 |
| (5,2) | a=4: target=(5⊕4,2⊕1)=(1,3) → seen has (1,3)=1 | 1 match | 2 |

**Result:** `2` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × k) — for each point, enumerate k+1 splits |
| **Space** | O(n) — hash map of points |

With n ≤ 50,000 and k ≤ 100: ~5 million operations.

---

## Follow-Up Questions

**Q1: Why can't we use the standard two-sum hash map approach directly?**
XOR distance doesn't decompose into a single lookup key. We need to split it into X and Y components and enumerate all `k + 1` possible splits.

**Q2: What if k were large (e.g., 10^6)?**
Then this approach would be O(n × k) which is too slow. You'd need a different technique, possibly using XOR tries or frequency arrays.

**Q3: Why XOR distance instead of Manhattan or Euclidean?**
XOR distance has algebraic properties (self-inverse, bitwise) that make the enumeration trick work. Manhattan distance allows a simpler split but doesn't require the XOR pairing trick.

---

## Key Takeaway

> **When the "distance" is a sum of two XOR terms and the target is small, enumerate all (a, b) splits of the target and use a hash map to look up complementary points. The small target bound makes this efficient.**
