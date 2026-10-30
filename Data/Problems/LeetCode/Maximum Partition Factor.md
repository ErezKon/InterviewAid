# 3710. Maximum Partition Factor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-partition-factor](https://leetcode.com/problems/maximum-partition-factor)
**Companies:** Gameskraft, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a 2D integer array `points`, where `points[i] = [xi, yi]` represents the coordinates of the `i`th point on the Cartesian plane.

The **Manhattan distance** between two points `points[i] = [xi, yi]` and `points[j] = [xj, yj]` is `|xi - xj| + |yi - yj|`.

Split the `n` points into **exactly two non-empty** groups. The **partition factor** of a split is the **minimum** Manhattan distance among all unordered pairs of points that lie in the same group.

Return the **maximum** possible **partition factor** over all valid splits.

Note: A group of size 1 contributes no intra-group pairs. When `n = 2` (both groups size 1), there are no intra-group pairs, so define the partition factor as 0.

**Constraints:**
- `2 <= points.length <= 500`
- `points[i] = [xi, yi]`
- `-10^8 <= xi, yi <= 10^8`

---

## Examples

```
Example 1:
  Input: points = [[0,0],[0,2],[2,0],[2,2]]
  Output: 4
  Explanation: We split the points into two groups: {[0, 0], [2, 2]} and {[0, 2], [2, 0]}.
    - In the first group, the only pair has Manhattan distance |0 - 2| + |0 - 2| = 4.
    - In the second group, the only pair also has Manhattan distance |0 - 2| + |2 - 0| = 4.
    The partition factor of this split is min(4, 4) = 4, which is maximal.
```

```
Example 2:
  Input: points = [[0,0],[0,1],[10,0]]
  Output: 11
  Explanation: We split the points into two groups: {[0, 1], [10, 0]} and {[0, 0]}.
    - In the first group, the only pair has Manhattan distance |0 - 10| + |1 - 0| = 11.
    - The second group is a singleton, so it contributes no pairs.
    The partition factor of this split is 11, which is maximal.
```

---

## Key Insight

> Try all split positions. For each split, compute the two numbers (or use modular arithmetic for large numbers) and find their GCD. The key optimization is efficient GCD computation for very large numbers.

---

## Approach

```
FUNCTION maxPartitionFactor(n)
    best ← 1
    FOR i ← 1 TO len(n) - 1 DO
        left ← parseInt(n[0:i])
        right ← parseInt(n[i:])
        IF right has no leading zeros (or handle accordingly) THEN
            best ← MAX(best, GCD(left, right))
    RETURN best
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n² × log(max_val))** — n splits, big-integer GCD per split |
| Space  | **O(n)** — number strings |

---

## Key Takeaway

> **Enumerate partitions + GCD** — try each split point, compute GCD of the two halves. For very large numbers, use big integer or modular techniques.
