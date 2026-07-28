# 90. Subsets II

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/subsets-ii](https://leetcode.com/problems/subsets-ii)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Tcs, Walmart Labs

---

## 1. Problem Description

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

---

## 2. Approach: Backtracking with Skip — O(n·2ⁿ) ✅

```text
FUNCTION subsetsWithDup(nums):
    // Sort to bring duplicates together
    SORT nums
    result ← []
    backtrack(0, [], result)
    RETURN result

FUNCTION backtrack(start, path, result):
    // Record current subset
    APPEND copy(path) TO result
    FOR i ← start TO LENGTH(nums) - 1:
        // Skip duplicate elements at the same recursion level
        IF i > start AND nums[i] == nums[i-1]:
            CONTINUE
        APPEND nums[i] TO path
        backtrack(i + 1, path, result)
        REMOVE LAST FROM path
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `[1,2,2]` | `[[],[1],[2],[1,2],[2,2],[1,2,2]]` |
| `[0]` | `[[],[0]]` |

---

## 4. Walkthrough

For `[1,2,2]`:

1. Start with empty path `[]` → add to result.
2. Choose `1` → path `[1]` → add.
3. Recurse, choose first `2` → `[1,2]` → add.
4. Choose second `2` (skip duplicate at same level) → `[1,2,2]` → add.
5. Backtrack to `[]`, skip `1`, choose first `2` → `[2]` → add.
6. From `[2]`, skip second `2` at same level, then include it → `[2,2]` → add.

All unique subsets are collected.

---

## 5. Complexity Analysis

- **Time:** O(n·2ⁿ) – each element leads to two branches, with duplicate‑skipping reducing redundant work.
- **Space:** O(n) – recursion stack and current path.

---

## Key Takeaway

> `if i > start and nums[i] == nums[i-1]: continue` is the universal duplicate‑skipping line for sorted backtracking. Works for Subsets II, Combination Sum II, Permutations II.
