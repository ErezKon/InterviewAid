# 996. Number of Squareful Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-squareful-arrays](https://leetcode.com/problems/number-of-squareful-arrays)
**Companies:** Apple, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking — O(n!)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count permutations of `nums` where every pair of adjacent elements sums to a perfect square.

---

## 2. Key Insight

> Backtracking with pruning: skip duplicates (sort + check previous), and prune when adjacent sum isn't a perfect square. Early termination keeps it fast.

---

## 3. Approach: Backtracking — O(n!) ✅

```
FUNCTION numSquarefulPerms(nums):
    SORT nums; count = [0]
    FUNCTION backtrack(path, used):
        IF len(path) == len(nums): count[0] += 1; RETURN
        FOR i ← 0 TO len(nums) - 1:
            IF used[i]: CONTINUE
            IF i > 0 AND nums[i] == nums[i-1] AND NOT used[i-1]: CONTINUE
            IF path AND NOT isSquare(path[-1] + nums[i]): CONTINUE
            used[i] = true; path.ADD(nums[i])
            backtrack(path, used)
            path.POP(); used[i] = false
    backtrack([], [false]*len(nums))
    RETURN count[0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n!) worst case, heavily pruned |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Backtracking with square-sum pruning.** Sort to handle duplicates. Check perfect square condition early for aggressive pruning. n ≤ 12 makes this practical.
