# 3027. Find the Number of Ways to Place People II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii)
**Companies:** Google, Meta, Uber
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Greedy Scan — O(n²) ✅](#3-approach-sort--greedy-scan--on²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given a 2D array `points` of size `n x 2` representing integer coordinates of some points on a 2D-plane, where `points[i] = [x_i, y_i]`.

We define the **right** direction as positive x-axis (**increasing x-coordinate**) and the **left** direction as negative x-axis (**decreasing x-coordinate**). Similarly, we define the **up** direction as positive y-axis (**increasing y-coordinate**) and the **down** direction as negative y-axis (**decreasing y-coordinate**).

You have to place `n` people, including Alice and Bob, at these points such that there is **exactly one** person at every point. Alice wants to be alone with Bob, so Alice will build a rectangular fence with Alice's position as the **upper left corner** and Bob's position as the **lower right corner** of the fence (**Note** that the fence **might not** enclose any area, i.e. it can be a line). If any person other than Alice and Bob is either **inside** the fence or **on** the fence, Alice will be sad.

Return *the number of **pairs of points** where you can place Alice and Bob, such that Alice **does not** become sad on building the fence*.

**Note** that Alice can only build a fence with Alice's position as the upper left corner, and Bob's position as the lower right corner. For example, Alice cannot build either of the fences with four corners `(1, 1)`, `(1, 3)`, `(3, 1)`, and `(3, 3)`, because:

- With Alice at `(3, 3)` and Bob at `(1, 1)`, Alice's position is not the upper left corner and Bob's position is not the lower right corner of the fence.
- With Alice at `(1, 3)` and Bob at `(1, 1)` (as a rectangle instead of a line), Bob's position is not the lower right corner of the fence.

**Constraints:**
- `2 <= n <= 1000`
- `points[i].length == 2`
- `-10^9 <= points[i][0], points[i][1] <= 10^9`
- All `points[i]` are distinct.

---

## 2. Examples

**Example 1:**
```
Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation: There is no way to place Alice and Bob such that Alice can build a fence with Alice's position as the upper left corner and Bob's position as the lower right corner. Hence we return 0.
```

**Example 2:**
```
Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
- Place Alice at (4, 4) and Bob at (6, 2).
- Place Alice at (2, 6) and Bob at (4, 4).
You cannot place Alice at (2, 6) and Bob at (6, 2) because the person at (4, 4) will be inside the fence.
```

**Example 3:**
```
Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
- Place Alice at (1, 1) and Bob at (3, 1).
- Place Alice at (1, 3) and Bob at (1, 1).
You cannot place Alice at (1, 3) and Bob at (3, 1) because the person at (1, 1) will be on the fence.
Note that it does not matter if the fence encloses any area, the first and second fences are valid.
```

---

## 3. Approach: Sort + Greedy Scan — O(n²) ✅

```text
FUNCTION numberOfPairs(points):
    // Sort by x ascending, y descending
    SORT(points BY x ASC, y DESC)
    SET n ← LENGTH(points)
    SET count ← 0
    FOR i ← 0 TO n - 1:
        SET maxY ← -∞
        FOR j ← i + 1 TO n - 1:
            IF points[j][1] <= points[i][1]:
                // Bob candidate: lower or equal y
                IF points[j][1] > maxY:
                    SET count ← count + 1    // no interior point with higher y
            SET maxY ← MAX(maxY, points[j][1])
    RETURN count
```

---

## 4. Walkthrough

Take points `[[0,0],[1,2],[2,1],[3,3]]`.
1. After sorting: `[(0,0),(1,2),(2,1),(3,3)]`.
2. For `i=0` (point (0,0)), scan j:
   - j=1: y=2 > 0 → not a lower-right candidate.
   - j=2: y=1 > 0 → not candidate.
   - j=3: y=3 > 0 → not candidate.
   No pairs from i=0.
3. For `i=1` (1,2), maxY starts `-∞`.
   - j=2: y=1 ≤ 2 and 1 > -∞ → count++ (pair (1,2)). maxY=1.
   - j=3: y=3 > 2 → not candidate.
   Resulting count = 1.
Continue similarly for remaining i to obtain total valid pairs.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — double loop after sorting |
| **Space** | O(1) extra (in-place sort) |

---

## 6. Follow-Up Questions

- How would you handle `n` up to 10⁵? (Consider sweep line with segment tree.)
- What if points can share the same x or y coordinate?
- Can the problem be extended to count unordered pairs only?

---

## 7. Key Takeaway

> **Sorting + tracking max intermediate y** eliminates the inner O(n) check. After sorting, a Bob is valid only if no previously seen point has a higher y, enabling an O(n²) solution.
