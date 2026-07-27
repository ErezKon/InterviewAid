# 3161. Block Placement Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/block-placement-queries](https://leetcode.com/problems/block-placement-queries)
**Companies:** Autodesk, Capital One, Meta, Paypay, Roblox, Sig, Uber, Visa

---

## Approach: Segment Tree + Sorted Set — O(n log n) ✅

```
// Type 1: Place obstacle at x
// Type 2: Query if block of size sz fits in [0, x]

CLASS Solution:
    FUNCTION getResults(queries):
        obstacles = SortedList([0])    // track obstacle positions
        // Need max gap in range [0, x] of size >= sz

        // Segment tree on obstacle gaps
        // When adding obstacle at x:
        //   Find left and right neighbors
        //   Split gap into two

        // Query [0, x]: max gap in all segments up to x

        results = []
        FOR [type, ...] IN queries:
            IF type == 1:
                insert obstacle, update segment tree
            ELSE:
                check if max gap in [0, x] >= sz
                results.ADD(answer)

        RETURN results
```

Maintain gaps between obstacles in a segment tree supporting range-max queries.
