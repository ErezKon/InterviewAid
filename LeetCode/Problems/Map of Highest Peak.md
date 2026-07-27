# 1765. Map of Highest Peak

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/map-of-highest-peak](https://leetcode.com/problems/map-of-highest-peak)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Assign heights to a grid: water cells = 0, adjacent cells differ by at most 1. Maximize the minimum height.

---

## 2. Approach: Multi-Source BFS — O(m·n) ✅

```
FUNCTION highestPeak(isWater):
    m, n = dimensions
    height = [[-1]*n for _ in range(m)]
    queue = []
    FOR r, c where isWater[r][c] == 1:
        height[r][c] = 0; queue.ADD((r, c))

    // Multi-source BFS
    WHILE queue:
        r, c = queue.POPLEFT()
        FOR (nr, nc) IN neighbors:
            IF valid AND height[nr][nc] == -1:
                height[nr][nc] = height[r][c] + 1
                queue.ADD((nr, nc))
    RETURN height
```

| Time | Space |
|------|-------|
| O(m · n) | O(m · n) |

---

## 3. Key Takeaway

> Multi-source BFS from all water cells simultaneously. Each cell gets assigned distance to nearest water. Same as 01 Matrix problem.
