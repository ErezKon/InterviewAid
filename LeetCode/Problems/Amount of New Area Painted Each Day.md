# 2158. Amount of New Area Painted Each Day

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/amount-of-new-area-painted-each-day](https://leetcode.com/problems/amount-of-new-area-painted-each-day)
**Companies:** Google, Uber

---

## 1. Problem Description

Given a list of painting intervals `paint[i] = [start, end]`, for each day return how much **new** (unpainted) area is painted. Later days only paint areas not already covered.

**Constraints:**
- `1 ≤ paint.length ≤ 10⁵`
- `0 ≤ start < end ≤ 5 × 10⁴`

---

## 2. Key Insight

> Use a **jump array** (like path compression). For each position `x`, store a pointer `jump[x]` to the next unpainted position. When painting `[start, end)`, walk from `start` following jump pointers, count new cells, and update pointers to jump to `end`.

---

## 3. Approach: Jump Array / Union-Find — O(n × α) ✅

```
FUNCTION amountPainted(paint):
    jump = [i for i in range(MAX_VAL + 1)]
    result = []

    FOR start, end IN paint:
        painted = 0
        i = start
        WHILE i < end:
            IF jump[i] == i:    // unpainted
                painted += 1
                jump[i] = end   // compress: skip to end
                i += 1
            ELSE:
                next = jump[i]
                jump[i] = end   // path compression
                i = next
        result.ADD(painted)

    RETURN result
```

| Time | Space |
|------|-------|
| O(n × α(n)) amortized | O(max coordinate) |

---

## Key Takeaway

> The jump/path-compression trick turns overlapping interval painting into near-linear time. Each cell is painted at most once, and path compression ensures re-visits are O(α). Similar to Union-Find without explicit union.
