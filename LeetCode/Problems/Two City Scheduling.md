# 1029. Two City Scheduling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-city-scheduling](https://leetcode.com/problems/two-city-scheduling)
**Companies:** Amazon, Bloomberg, Google, Meta, Oracle, Swiggy

---

```
FUNCTION twoCitySchedCost(costs):
    SORT costs by (cost_a - cost_b)
    n = len(costs) / 2
    total = 0
    FOR i ← 0 TO n - 1: total += costs[i][0]     // first half → city A
    FOR i ← n TO 2*n - 1: total += costs[i][1]    // second half → city B
    RETURN total
```

Sort by savings of choosing A over B. Send first half to A, rest to B.
