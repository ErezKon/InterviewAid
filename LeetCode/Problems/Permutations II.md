# 47. Permutations II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/permutations-ii](https://leetcode.com/problems/permutations-ii)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Tiktok

---

## Problem Description
Given an integer array `nums` that may contain duplicate elements, return *all* the unique permutations of the array. The order of the permutations does not matter.

## Examples
**Example 1:**
```
Input: nums = [1,1,2]
Output: [[1,1,2],[1,2,1],[2,1,1]]
```
**Example 2:**
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

## Approach
**Algorithm:** Backtracking with duplicate‑skip (DFS)
**Key Insight:** Sort the array first; when exploring the next element, skip it if it is the same as the previous one *and* the previous one has not been used in the current path. This guarantees each unique permutation is generated exactly once.

```text
FUNCTION permuteUnique(nums):
    SORT nums
    result ← []
    used ← [false] * LENGTH(nums)
    backtrack([], used, result)
    RETURN result

FUNCTION backtrack(path, used, result):
    IF LENGTH(path) == LENGTH(nums):
        APPEND COPY(path) TO result
        RETURN
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF used[i]:
            CONTINUE
        IF i > 0 AND nums[i] == nums[i-1] AND NOT used[i-1]:
            CONTINUE  // skip duplicates
        used[i] ← true
        APPEND nums[i] TO path
        backtrack(path, used, result)
        REMOVE LAST FROM path
        used[i] ← false
```

## Walkthrough
Consider `nums = [1,1,2]` (sorted).
| Step | path | used flags | Action |
|------|------|------------|--------|
| 1 | [] | [F,F,F] | Choose index 0 (value 1) → path=[1], used=[T,F,F] |
| 2 | [1] | [T,F,F] | Choose index 1 (value 1) → path=[1,1], used=[T,T,F] |
| 3 | [1,1] | [T,T,F] | Choose index 2 (value 2) → path=[1,1,2] → add to result |
| 4 | backtrack | used reset index 2 → [T,T,F] |
| 5 | backtrack | remove last → path=[1], used=[T,F,F] |
| 6 | [1] | [T,F,F] | Skip index 1 because nums[1]==nums[0] and used[0] is true, then choose index 2 → path=[1,2] |
| … | … | … | Continue similarly to generate `[2,1,1]`.

## Complexity Analysis
- **Time:** O(n × n!) in the worst case because each of the n! permutations is built in O(n) time.
- **Space:** O(n) for the recursion stack and the `used` array, plus O(n × n!) for the output list.

## Follow‑Up Questions
1. How would you modify the algorithm to generate permutations in lexicographic order without sorting first?
2. Can you adapt this approach to generate unique *subsets* of a list with duplicates?
3. What is the time‑space trade‑off if you generate permutations iteratively using the next‑permutation technique?

## Key Takeaway
Sorting the input and skipping a duplicate element when its previous identical sibling hasn't been used ensures each unique permutation is produced exactly once.
