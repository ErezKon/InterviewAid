# 947. Most Stones Removed with Same Row or Column

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-stones-removed-with-same-row-or-column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column)
**Companies:** Amazon, Bloomberg, Google, Medianet, Meta, Microsoft, Phonepe, Snapchat, Snowflake, Tekion

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find — O(n · α(n))](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Remove a stone if it shares a row or column with another remaining stone. Return the **maximum** stones that can be removed.

**Constraints:**
- `1 <= stones.length <= 1000`

---

## 2. Key Insight

> Stones sharing a row or column are "connected." Within each connected component of `k` stones, we can remove `k - 1` (leaving one). Answer = `total stones - number of connected components`.

---

## 3. Approach: Union-Find — O(n · α(n)) ✅

```
FUNCTION removeStones(stones):
    uf = UnionFind()

    FOR [r, c] IN stones:
        // Union row and column (offset column to avoid collision)
        uf.union(r, c + 10001)

    components = len(set(uf.find(r) for r, c in stones) | set(uf.find(c+10001) for r, c in stones))
    // Actually: count unique components among all stone positions

    RETURN len(stones) - numComponents
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · α(n)) — near-linear Union-Find |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Union rows with columns via Union-Find.** Each stone connects its row and column. The answer = stones - components. Offset columns by 10001 to avoid collision with row indices.
