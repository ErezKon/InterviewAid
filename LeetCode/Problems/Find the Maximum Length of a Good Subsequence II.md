# 3177. Find the Maximum Length of a Good Subsequence II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii)
**Companies:** Snowflake

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Optimized DP with HashMap — O(n · k) ✅](#3-approach-optimized-dp-with-hashmap--on--k-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Same as Part I but with larger constraints: `n` up to 5 × 10⁴ and `k` up to min(50, n-1). Requires a more efficient DP approach.

**Constraints:**
- `1 <= n <= 5 × 10⁴`
- `1 <= k <= min(50, n-1)`

---

## 2. Key Insight

> Instead of O(n²) pairwise comparison, use a hash map: for each value `v` and transition count `t`, store the best subsequence length ending with value `v` having used `t` transitions. Also maintain `globalMax[t]` = max DP value across all values for `t` transitions.

---

## 3. Approach: Optimized DP with HashMap — O(n · k) ✅

```
FUNCTION maximumLength(nums, k):
    // bestByVal[v][t] = max length ending with value v, using t transitions
    // globalMax[t] = max over all values of bestByVal[v][t]
    bestByVal ← defaultdict(lambda: [0] * (k+1))
    globalMax ← [0] * (k+1)

    FOR num IN nums DO
        FOR t ← k DOWNTO 0 DO
            // Extend same value: free
            bestByVal[num][t] ← MAX(bestByVal[num][t], bestByVal[num][t] + 1... )
            // Extend different value: cost 1 transition
            IF t > 0 THEN
                bestByVal[num][t] ← MAX(bestByVal[num][t], globalMax[t-1] + 1)
        // Update globalMax
        FOR t ← 0 TO k DO
            globalMax[t] ← MAX(globalMax[t], bestByVal[num][t])

    RETURN globalMax[k]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) |
| **Space** | O(n · k) — hash map entries |

---

## 5. Key Takeaway

> The **global maximum trick** avoids O(n²) pairwise checks. Track the best DP value across all values for each transition count, and use it to extend with a different value in O(1).
