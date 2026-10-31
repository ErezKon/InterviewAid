# 2158. Amount of New Area Painted Each Day

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/amount-of-new-area-painted-each-day](https://leetcode.com/problems/amount-of-new-area-painted-each-day)
**Companies:** Google, Uber

---

## 1. Problem Description

There is a long and thin painting that can be represented by a number line. You are given a **0-indexed** 2D integer array `paint` of length `n`, where `paint[i] = [starti, endi]`. This means that on the `ith` day you need to paint the area **between** `starti` and `endi`.

Painting the same area multiple times will create an uneven painting so you only want to paint each area of the painting at most **once**.

Return *an integer array* `worklog` *of length* `n`*, where* `worklog[i]` *is the amount of **new** area that you painted on the* `ith` *day.*

**Constraints:**
- `1 ≤ paint.length ≤ 10⁵`
- `paint[i].length == 2`
- `0 ≤ starti < endi ≤ 5 × 10⁴`

---

## 2. Key Insight

> Use a **jump array** (similar to Union-Find path compression). For each coordinate `x`, store `jump[x]` pointing to the next unpainted position. When painting `[start, end)`, walk from `start` following jumps, count newly painted cells, and compress the path to `end`.

---

## 3. Approach: Jump Array / Union-Find — O(n · α) ✅

```
FUNCTION amountPainted(paint):
    MAX ← 5 × 10⁴
    jump ← [i FOR i IN 0..MAX]
    result ← []
    FOR start, end IN paint:
        painted ← 0
        i ← start
        WHILE i < end:
            IF jump[i] == i:               // unpainted
                painted ← painted + 1
                jump[i] ← end            // compress to end
                i ← i + 1
            ELSE:
                next ← jump[i]
                jump[i] ← end            // path compression
                i ← next
        result.APPEND(painted)
    RETURN result
```

---

## Examples

```
Example 1:
  Input: paint = [[1,4],[4,7],[5,8]]
  Output: [3,3,1]
  Explanation:
  On day 0, paint everything between 1 and 4.
  The amount of new area painted on day 0 is 4 - 1 = 3.
  On day 1, paint everything between 4 and 7.
  The amount of new area painted on day 1 is 7 - 4 = 3.
  On day 2, paint everything between 7 and 8.
  Everything between 5 and 7 was already painted on day 1.
  The amount of new area painted on day 2 is 8 - 7 = 1.

Example 2:
  Input: paint = [[1,4],[5,8],[4,7]]
  Output: [3,3,1]
  Explanation:
  On day 0, paint everything between 1 and 4.
  The amount of new area painted on day 0 is 4 - 1 = 3.
  On day 1, paint everything between 5 and 8.
  The amount of new area painted on day 1 is 8 - 5 = 3.
  On day 2, paint everything between 4 and 5.
  Everything between 5 and 7 was already painted on day 1.
  The amount of new area painted on day 2 is 5 - 4 = 1.

Example 3:
  Input: paint = [[1,5],[2,4]]
  Output: [4,0]
  Explanation:
  On day 0, paint everything between 1 and 5.
  The amount of new area painted on day 0 is 5 - 1 = 4.
  On day 1, paint nothing because everything between 2 and 4 was already painted on day 0.
  The amount of new area painted on day 1 is 0.
```

<!-- leftover (invisible chars, could not remove): 1, cells 1-3 are new (3). Day 2 only cell 4 is new (1). Day 3 cells  -->

---

## Walkthrough

**Example**: `paint = [[1,4],[2,5],[7,9]]`

1. Initialise `jump[i] = i` for all i.
2. Day 1 `[1,4)`:
   - i=1 (unpainted) → painted=1, jump[1]=4, i=2
   - i=2 (unpainted) → painted=2, jump[2]=4, i=3
   - i=3 (unpainted) → painted=3, jump[3]=4, i=4 (stop)
   - Result day 1 = 3.
3. Day 2 `[2,5)`:
   - i=2 → jump[2]=4 (painted before), next=4, compress jump[2]=5, i=4
   - i=4 (unpainted) → painted=1, jump[4]=5, i=5 (stop)
   - Result day 2 = 1.
4. Day 3 `[7,9)`:
   - i=7,8 are both unpainted → painted=2, jump[7]=9, jump[8]=9
   - Result day 3 = 2.

---

## Complexity Analysis

- **Time**: O(total painted cells · α) ≈ O(N · α) where α is the inverse Ackermann function (practically constant).
- **Space**: O(MAX coordinate) for the `jump` array (≈ 5 × 10⁴).

---

## Key Takeaway

> The jump-array / path-compression technique lets us skip already painted segments, turning overlapping-interval painting into near-linear time.
