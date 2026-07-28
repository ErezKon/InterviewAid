# 77. Combinations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combinations](https://leetcode.com/problems/combinations)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Tiktok
---

## Problem Description
Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`. Each combination should be a list of integers in ascending order.

## Examples
- **Example 1:** `n = 4, k = 2` → `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`.
- **Example 2:** `n = 1, k = 1` → `[[1]]`.

## Approach
Use backtracking (depth‑first search) to build combinations incrementally:
1. Start with an empty path and a starting number `start`.
2. At each step, add a number `i` from `start` to `n` (pruned so enough numbers remain to fill the combination).
3. Recurse with `i+1` as the new start.
4. When the path length reaches `k`, record a copy of the path.

### Pseudocode
```text
FUNCTION combine(n, k):
    result ← []
    backtrack(1, [], result)
    RETURN result

FUNCTION backtrack(start, path, result):
    IF LENGTH(path) = k:
        APPEND COPY(path) TO result
        RETURN
    FOR i ← start TO n - (k - LENGTH(path)) + 1:
        path.ADD(i)
        backtrack(i + 1, path, result)
        path.REMOVE_LAST()
```

## Walkthrough
For `n = 4, k = 2`:
1. Start with `start = 1`, path `[]`.
2. Choose `1` → path `[1]`, recurse with `start = 2`.
3. Choose `2` → path `[1,2]` → record.
4. Backtrack, choose `3` → `[1,3]` → record, etc., generating all six combos.

## Complexity Analysis
Time: O(C(n,k) * k) – each combination of size `k` is generated.
Space: O(k) recursion stack plus O(C(n,k) * k) for output.

## Follow‑Up Questions
- How would you modify the algorithm to return combinations in lexicographic order without sorting?
- Can you generate combinations iteratively using a stack instead of recursion?
- What changes are needed to produce combinations of characters from a string?

---

## Key Takeaway

> Backtracking with careful pruning (`n - (k - path.length) + 1`) efficiently enumerates all `k`‑element subsets of `[1, n]`.
