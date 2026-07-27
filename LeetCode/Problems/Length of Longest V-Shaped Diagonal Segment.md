# 3459. Length of Longest V-Shaped Diagonal Segment

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment](https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment)
**Companies:** Amazon, Google, Microsoft, Roblox, Visa

---

## 1. Problem Description

In a grid, find the longest V-shaped path along diagonals: go in one diagonal direction, then turn to another diagonal direction. Values must alternate 1→2→0→1→2→0…

---

## 2. Approach: DFS/DP on Diagonals ✅

```
FUNCTION longestVDiagonal(grid):
    // For each cell and each of 4 diagonal directions:
    //   DFS: extend in current direction with value pattern
    //   At most one turn allowed → try turning at each point
    // Track longest segment with at most one direction change
```

| Time | Space |
|------|-------|
| O(m·n · max(m,n)) | O(m·n) |

---

## 3. Key Takeaway

> DFS from each cell along diagonals with at most one direction change. The V-shape constraint limits branching to exactly one turn point.
