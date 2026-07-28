# 996. Number of Squareful Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/number-of-squareful-arrays
**Companies:** Apple, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count permutations of `nums` where every pair of adjacent elements sums to a perfect square. Return the total number of such permutations modulo 10⁹+7.

---

## 2. Examples

| nums | Output | Explanation |
|------|--------|-------------|
| `[1,17,8]` | `2` | Valid permutations: `[1,8,17]` and `[17,8,1]` (1+8=9, 8+17=25). |
| `[2,2,2]` | `1` | All elements are identical; only one unique permutation satisfies the condition. |
| `[5,6,25]` | `0` | No ordering yields adjacent perfect‑square sums.

---

## 3. Approach

Backtrack over the array, building permutations while pruning invalid partial sequences. Sort the array first to handle duplicates: skip an element if it is the same as the previous one **and** the previous has not been used in the current path. Before adding a new element, check whether the sum with the last element of the current path is a perfect square.

```text
FUNCTION countSquarefulPerms(nums):
    SORT nums
    SET total ← 0
    SET n ← LENGTH(nums)
    SET used ← ARRAY of false of size n
    FUNCTION backtrack(path):
        IF LENGTH(path) == n:
            SET total ← total + 1
            RETURN
        FOR i ← 0 TO n-1:
            IF used[i]: CONTINUE
            IF i > 0 AND nums[i] == nums[i-1] AND NOT used[i-1]: CONTINUE
            IF path IS NOT EMPTY AND NOT isPerfectSquare(path[-1] + nums[i]): CONTINUE
            SET used[i] ← true
            APPEND nums[i] TO path
            backtrack(path)
            POP path
            SET used[i] ← false
    backtrack([])
    RETURN total MOD 1_000_000_007
```

---

## 4. Walkthrough

For `nums = [1,17,8]` (sorted `[1,8,17]`):

1. Start with `1` → path `[1]`.
2. Try `8`: `1+8=9` (perfect square) → path `[1,8]`.
3. Remaining `17`: `8+17=25` (perfect square) → full permutation `[1,8,17]` counted.
4. Backtrack, try `17` after `1`: `1+17=18` not square → prune.
5. Start with `17` → path `[17]`.
6. Next `8`: `17+8=25` → path `[17,8]`.
7. Remaining `1`: `8+1=9` → permutation `[17,8,1]` counted.

Total count = 2.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n!) worst‑case, heavily pruned by square‑sum check and duplicate skipping |
| **Space** | O(n) recursion stack and auxiliary arrays |

---

## 6. Follow-Up Questions

1. How would you adapt the solution to return the actual permutations instead of just the count?
2. Can the algorithm be optimized using graph matching (treat numbers as nodes, edges when sum is a square)?
3. What changes are needed if the modulo constraint is removed and the answer may be very large?

---

## 7. Key Takeaway

> **Backtracking with duplicate handling and perfect‑square pruning** efficiently enumerates valid permutations despite the factorial search space.
