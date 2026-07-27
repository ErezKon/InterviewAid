# 265. Paint House II

**Difficulty:** 🔴 Hard

**Companies:** Linkedin, Meta
---

```
FUNCTION minCostII(costs):
    // Track min and second min for each row
    // O(nk) instead of O(nk²)
    prev = costs[0]
    FOR i ← 1 TO n - 1:
        min1, min2, idx1 = top two mins of prev
        curr = [0] * k
        FOR j: curr[j] = costs[i][j] + (min1 IF j != idx1 ELSE min2)
        prev = curr
    RETURN MIN(prev)
```
