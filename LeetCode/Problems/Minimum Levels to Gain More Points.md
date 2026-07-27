# 3096. Minimum Levels to Gain More Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-levels-to-gain-more-points](https://leetcode.com/problems/minimum-levels-to-gain-more-points)
**Companies:** Ibm

---

## Problem Description

Two players play levels in order. Player 1 plays first `i` levels, Player 2 plays the rest. Each level gives +1 (if possible[j]=1) or -1 (if possible[j]=0). Return the **minimum** levels Player 1 must play to have **strictly more** points than Player 2, or -1 if impossible.

## Approach: Prefix Sum — O(n) ✅

```
FUNCTION minimumLevels(possible):
    // Convert: score[i] = 1 if possible[i]==1, else -1
    total ← SUM(1 if p else -1 for p in possible)
    prefix ← 0
    FOR i ← 0 TO n-2:     // Player 1 must play at least 1, Player 2 at least 1
        prefix += (1 if possible[i] else -1)
        IF prefix > total - prefix:
            RETURN i + 1
    RETURN -1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Convert to +1/-1 scores, use prefix sum. Player 1 needs `prefix > total - prefix` → `2 * prefix > total`. Find the earliest split satisfying this.
