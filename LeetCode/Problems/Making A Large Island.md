# 827. Making A Large Island

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/making-a-large-island](https://leetcode.com/problems/making-a-large-island)
**Companies:** Airbnb, Amazon, Anduril, Bloomberg, Doordash, Google, Linkedin, Medianet, Meta, Microsoft, Moloco, Snapchat, Snowflake, Tiktok, Uber, Uipath

---

## Approach: Component Labeling + Check Each Zero — O(n²) ✅

1. Label all islands and compute their areas.
2. For each `0`, check adjacent island labels and sum their areas + 1.

```
FUNCTION largestIsland(grid):
    n = len(grid)
    // Step 1: Label islands and compute areas
    label = 2
    area = {}
    FOR r, c where grid[r][c] == 1 and not labeled:
        area[label] = dfs(r, c, label)    // flood fill with label
        label += 1

    // Step 2: Try flipping each 0
    maxArea = MAX(area.values()) IF area ELSE 0
    FOR r, c where grid[r][c] == 0:
        neighbors = SET of adjacent labels
        totalArea = 1 + SUM(area[lbl] for lbl in neighbors)
        maxArea = MAX(maxArea, totalArea)

    RETURN maxArea
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## Key Takeaway

> Two-pass: (1) label islands with unique IDs and compute areas, (2) for each 0-cell, union adjacent island areas. Using a set of labels avoids double-counting the same island from multiple adjacent cells.
