# 2258. Escape the Spreading Fire

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/escape-the-spreading-fire](https://leetcode.com/problems/escape-the-spreading-fire)
**Companies:** Amazon, Google, Snapchat, Uber

---

## Approach: Binary Search + BFS — O(mn log(mn)) ✅

```
FUNCTION maximumMinutes(grid):
    // Binary search on wait time
    // BFS fire spread, BFS person movement
    // Check if person can reach (m-1,n-1) before fire
    lo, hi = 0, m * n
    IF NOT canEscape(grid, hi): RETURN -1
    IF canEscape(grid, hi): RETURN 10^9
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canEscape(grid, mid): lo = mid
        ELSE: hi = mid - 1
    RETURN lo
```
