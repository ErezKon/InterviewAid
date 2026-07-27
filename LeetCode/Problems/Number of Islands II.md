# 305. Number of Islands II

**Difficulty:** 🔴 Hard
**Acceptance:** 37.0%
**LeetCode:** [https://leetcode.com/problems/number-of-islands-ii](https://leetcode.com/problems/number-of-islands-ii)
**Companies:** Amazon, Aurora, Google, Meta, Moloco, Phonepe, Tiktok, Uber, Walmart Labs, Waymo

---

## 1. Problem Description

Given an m×n grid initially all water, process a list of positions where land is added one at a time. After each addition, return the number of islands.

---

## 2. Approach: Union-Find — O(L·α(mn)) ✅

```
FUNCTION numIslands2(m, n, positions):
    parent = {}
    rank = {}
    count = 0
    result = []

    FOR (r, c) IN positions:
        IF (r, c) IN parent:
            result.ADD(count)
            CONTINUE

        parent[(r,c)] = (r,c)
        rank[(r,c)] = 0
        count += 1

        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            IF (nr,nc) IN parent:
                IF union((r,c), (nr,nc)):
                    count -= 1

        result.ADD(count)

    RETURN result
```

| Time | Space |
|------|-------|
| O(L·α(mn)) per operation | O(mn) |

---

## Key Takeaway

> Dynamic connectivity = Union-Find. Each land addition creates a new component (+1), then merging with adjacent land reduces the count. This extends the basic Number of Islands problem to an online/streaming setting.
