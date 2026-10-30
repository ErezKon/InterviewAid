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

You are given an integer array `nums` and a **non-negative** integer `k`. A sequence of integers `seq` is called **good** if there are **at most** `k` indices `i` in the range `[0, seq.length - 2]` such that `seq[i] != seq[i + 1]`.

Return the **maximum** possible length of a **good** subsequence of `nums`.

**Constraints:**
- `1 <= nums.length <= 5 × 10³`
- `1 <= nums[i] <= 10⁹`
- `0 <= k <= min(50, nums.length)`

---

## 2. Key Insight

> Instead of O(n²) pairwise comparison, use a hash map: for each value `v` and transition count `t`, store the best subsequence length ending with value `v` having used `t` transitions. Also maintain `globalMax[t]` = max DP value across all values for `t` transitions.

---

## 3. Approach: Optimized DP with HashMap — O(n · k) ✅

```text
FUNCTION maximumLength(nums, k):
    // bestByVal[v][t] = max length ending with value v, using t transitions
    // globalMax[t] = max over all values of bestByVal[v][t]
    bestByVal ← DEFAULTDICT(lambda: ARRAY(k+1, 0))
    globalMax ← ARRAY(k+1, 0)

    FOR num IN nums DO
        FOR t ← k DOWNTO 0 DO
            // Extend same value (no extra transition)
            bestByVal[num][t] ← MAX(bestByVal[num][t], bestByVal[num][t] + 1)
            // Extend from a different value (cost 1 transition)
            IF t > 0 THEN
                bestByVal[num][t] ← MAX(bestByVal[num][t], globalMax[t-1] + 1)
        // Update global maxima for each transition count
        FOR t ← 0 TO k DO
            globalMax[t] ← MAX(globalMax[t], bestByVal[num][t])

    RETURN globalMax[k]
```

---

## 4. Examples

```
Example 1:
  Input: nums = [1,2,1,1,3], k = 2
  Output: 4
  Explanation: The maximum length subsequence is [1,2,1,1] (taken from [1,2,1,1,3]).

Example 2:
  Input: nums = [1,2,3,4,5,1], k = 0
  Output: 2
  Explanation: The maximum length subsequence is [1,1] (the first and last elements of [1,2,3,4,5,1]).
```

---

## 5. Walkthrough

Consider Example 1 (`nums = [1,2,1,2,1]`, `k = 2`).

| Index | num | bestByVal[1][0] | bestByVal[1][1] | bestByVal[1][2] | bestByVal[2][0] | bestByVal[2][1] | bestByVal[2][2] |
|-------|-----|----------------|----------------|----------------|----------------|----------------|----------------|
| 0     | 1   | 1              | 1              | 1              | 0              | 0              | 0              |
| 1     | 2   | 0              | 2 (from globalMax[0]+1) | 2 | 1 (extend same) | 2 | 2 |
| 2     | 1   | 2 (extend same) | 3 (from globalMax[1]+1) | 3 | ... | ... | ... |
| 3     | 2   | ... | ... | ... | 3 (extend same) | 4 (from globalMax[1]+1) | 4 |
| 4     | 1   | 4 (extend same) | 5 (from globalMax[2]+1) | 5 | ... | ... | ... |

The DP builds up lengths while respecting the transition budget, culminating in a maximum length of 5.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) |
| **Space** | O(distinctValues · k) — hash map storage |

---

## 7. Follow-Up Questions

- How would the algorithm adapt if the cost of a transition depended on the absolute difference between values?
- Can we further reduce space by compressing transition states?
- What changes are needed if the subsequence must be contiguous (subarray) instead of arbitrary?

---

## 5. Key Takeaway

> The **global maximum trick** avoids O(n²) pairwise checks. Track the best DP value across all values for each transition count, and use it to extend with a different value in O(1).
