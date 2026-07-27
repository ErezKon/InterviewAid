# 1970. Last Day Where You Can Still Cross

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/last-day-where-you-can-still-cross](https://leetcode.com/problems/last-day-where-you-can-still-cross)
**Companies:** Amazon, Atlassian, Google, Meta

---

## 1. Problem Description

Cells flood one per day. Find the last day you can still walk from top row to bottom row on land cells (4-directionally).

---

## 2. Approach: Binary Search + BFS — O(mn log(mn)) ✅

Binary search on day. For each candidate, check if a land path exists from top to bottom.

```
FUNCTION latestDayToCross(row, col, cells):
    lo, hi = 1, len(cells)
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canCross(row, col, cells[:mid]): lo = mid
        ELSE: hi = mid - 1
    RETURN lo

FUNCTION canCross(row, col, waterCells):
    // Mark water cells, BFS from top row to bottom row on land
```

| Time | Space |
|------|-------|
| O(m·n · log(m·n)) | O(m·n) |

---

## 3. Key Takeaway

> Binary search on the answer (day). Monotonic property: if you can cross on day d, you can cross on any day < d. Alternative: reverse Union-Find (add land cells in reverse, connect until top-bottom joined).
