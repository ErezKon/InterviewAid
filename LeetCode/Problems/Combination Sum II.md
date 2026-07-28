# 40. Combination Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-ii](https://leetcode.com/problems/combination-sum-ii)
**Companies:** Adobe, Amazon, Bloomberg, Bytedance, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Rakuten, Snapchat, Tiktok, Walmart Labs, Zoho
---

## Problem Description
Given an array of candidate numbers `candidates` (may contain duplicates) and a target integer `target`, find all unique combinations where the candidate numbers sum to `target`. Each number may be used **at most once**. The solution set must not contain duplicate combinations.

## Examples
- **Example 1:** `candidates = [10,1,2,7,6,1,5]`, `target = 8` → `[[1,1,6],[1,2,5],[1,7],[2,6]]`.
- **Example 2:** `candidates = [2,5,2,1,2]`, `target = 5` → `[[1,2,2],[5]]`.

## Approach
1. Sort `candidates` to bring duplicates together.
2. Use backtracking, advancing the start index after each pick to enforce “use once”.
3. Skip a candidate if it is the same as the previous one **and** the previous was not chosen at this recursion level (duplicate‑skipping rule).

### Pseudocode
```text
FUNCTION combinationSum2(candidates, target):
    SORT candidates
    result ← []
    backtrack(0, target, [], result)
    RETURN result

FUNCTION backtrack(start, remain, path, result):
    IF remain = 0:
        APPEND COPY(path) TO result
        RETURN
    FOR i ← start TO LENGTH(candidates) - 1:
        IF candidates[i] > remain: BREAK
        IF i > start AND candidates[i] = candidates[i-1]: CONTINUE   // skip duplicates
        path.ADD(candidates[i])
        backtrack(i + 1, remain - candidates[i], path, result)
        path.REMOVE_LAST()
```

## Walkthrough
For `candidates = [10,1,2,7,6,1,5]` (sorted → `[1,1,2,5,6,7,10]`):
1. Start with first `1`, recurse with `remain = 7`.
2. Next choose second `1` → `remain = 6`.
3. Choose `6` → `remain = 0` → record `[1,1,6]`.
4. Backtrack, skip duplicate `1` at same level, try `2` etc., eventually generating all four unique combos.

## Complexity Analysis
Time: O(2^n) in the worst case (exploring subsets), but pruning via sorting and early break reduces practical work.
Space: O(n) recursion stack plus space for results.

## Follow-Up Questions
- How would you adapt the algorithm to allow each candidate to be used unlimited times (Combination Sum I)?
- Can you solve the problem iteratively using DP to count combinations?
- What changes are needed to output combinations in lexicographic order?

---

## Key Takeaway

> Sorting plus a careful duplicate‑skipping condition lets backtracking generate each unique combination exactly once.
