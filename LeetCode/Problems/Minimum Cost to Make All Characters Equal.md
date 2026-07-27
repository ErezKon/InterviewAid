# 2712. Minimum Cost to Make All Characters Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-all-characters-equal](https://leetcode.com/problems/minimum-cost-to-make-all-characters-equal)
**Companies:** Nutanix

---

## Key Insight

> At each adjacent pair `(s[i-1], s[i])` where they differ, we must flip either the left prefix (cost `i`) or the right suffix (cost `n-i`). Greedily pick the cheaper option at each boundary.

---

## Approach: Greedy — O(n) ✅

```
FUNCTION minimumCost(s):
    n ← LEN(s)
    cost ← 0
    FOR i ← 1 TO n - 1 DO
        IF s[i] ≠ s[i-1] THEN
            cost ← cost + MIN(i, n - i)
    RETURN cost
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Flip at boundaries** — each character transition requires a flip. Choose the cheaper side (prefix or suffix) at each transition point.

---
