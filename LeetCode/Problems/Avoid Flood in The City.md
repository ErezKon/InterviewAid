# 1488. Avoid Flood in The City

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/avoid-flood-in-the-city](https://leetcode.com/problems/avoid-flood-in-the-city)
**Companies:** Amazon, Bloomberg, Google, Meta, Oracle, Trend Micro

---

## Approach: Greedy + SortedList — O(n log n) ✅

```
FUNCTION avoidFlood(rains):
    full = {}         // lake → day it was filled
    dryDays = SortedList()
    result = [-1] * n

    FOR i, lake IN enumerate(rains):
        IF lake == 0:
            dryDays.ADD(i)
            result[i] = 1    // placeholder
        ELSE:
            IF lake IN full:
                // Need a dry day after it was last filled
                idx = dryDays.bisect_left(full[lake])
                IF idx == len(dryDays): RETURN []
                dryDay = dryDays[idx]
                dryDays.REMOVE(dryDay)
                result[dryDay] = lake
            full[lake] = i

    RETURN result
```
