# 2158. Amount of New Area Painted Each Day

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/amount-of-new-area-painted-each-day](https://leetcode.com/problems/amount-of-new-area-painted-each-day)
**Companies:** Google, Uber

---

## 1. Problem Description

Given a list of painting intervals `paint[i] = [start, end]` for each day, return an array where the i‑th element is the amount of **new** (previously unpainted) area painted on day i. Overlapping intervals should only count the area that was not painted on any earlier day.

**Constraints:**
- `1 ≤ paint.length ≤ 10⁵`
- `0 ≤ start < end ≤ 5 × 10⁴`

---

## 2. Key Insight

> Use a **jump array** (similar to Union‑Find path compression). For each coordinate `x`, store `jump[x]` pointing to the next unpainted position. When painting `[start, end)`, walk from `start` following jumps, count newly painted cells, and compress the path to `end`.

---

## 3. Approach: Jump Array / Union‑Find — O(n · α) ✅

```
FUNCTION amountPainted(paint):
    MAX ← 5 × 10⁴
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

| paint intervals | new area per day |
|----------------|------------------|
| [[1,4],[2,5],[7,9]] | [3,1,2] |
| [[0,2],[1,3],[2,4]] | [2,1,1] |

*Explanation*: On day 1, cells 1‑3 are new (3). Day 2 only cell 4 is new (1). Day 3 cells 7‑8 are new (2).

---

## Walkthrough

**Example**: `paint = [[1,4],[2,5],[7,9]]`

1. Initialise `jump[i] = i` for all i.
2. Day 1 `[1,4)`:
   - i=1 (unpainted) → painted=1, jump[1]=4, i=2
   - i=2 (unpainted) → painted=2, jump[2]=4, i=3
   - i=3 (unpainted) → painted=3, jump[3]=4, i=4 (stop)
   - Result day 1 = 3.
3. Day 2 `[2,5)`:
   - i=2 → jump[2]=4 (painted before), next=4, compress jump[2]=5, i=4
   - i=4 (unpainted) → painted=1, jump[4]=5, i=5 (stop)
   - Result day 2 = 1.
4. Day 3 `[7,9)`:
   - i=7,8 are both unpainted → painted=2, jump[7]=9, jump[8]=9
   - Result day 3 = 2.

---

## Complexity Analysis

- **Time**: O(total painted cells · α) ≈ O(N · α) where α is the inverse Ackermann function (practically constant).
- **Space**: O(MAX coordinate) for the `jump` array (≈ 5 × 10⁴).

---

## Key Takeaway

> The jump‑array / path‑compression technique lets us skip already painted segments, turning overlapping‑interval painting into near‑linear time.
