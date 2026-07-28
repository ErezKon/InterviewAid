# 3437. Permutations III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/permutations-iii](https://leetcode.com/problems/permutations-iii)
**Companies:** Goldman Sachs

---

## Problem Description
Given an integer array `nums` (which may contain duplicates), return all **unique** permutations of the array.

## Examples
| nums | Output |
|------|--------|
| [1,1,2] | [[1,1,2],[1,2,1],[2,1,1]] |
| [1,2,3] | [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] |
| [] | [] |

## Approach
Backtrack while sorting the array first; skip over duplicate values unless the previous duplicate has been used in the current recursion level.

```text
FUNCTION UniquePermutations(nums):
    SORT nums
    SET result ← []
    SET used ← ARRAY OF FALSE LENGTH LEN(nums)
    BACKTRACK([], used)
    RETURN result

FUNCTION BACKTRACK(path, used):
    IF LENGTH(path) = LEN(nums):
        APPEND COPY(path) TO result
        RETURN
    FOR i ← 0 TO LEN(nums) - 1:
        IF used[i]: CONTINUE
        IF i > 0 AND nums[i] = nums[i-1] AND NOT used[i-1]:
            CONTINUE  // avoid duplicate permutations
        SET used[i] ← TRUE
        APPEND nums[i] TO path
        BACKTRACK(path, used)
        REMOVE LAST FROM path
        SET used[i] ← FALSE
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1 | Sort `nums = [1,1,2]` | `[1,1,2]` |
| 2 | Start backtrack with empty `path` | `[]` |
| 3 | Choose first `1` (i=0) → path `[1]` | used `[T,F,F]` |
| 4 | Next choose second `1` (i=1) → path `[1,1]` | used `[T,T,F]` |
| 5 | Choose `2` → complete `[1,1,2]` added to result |
| 6 | Backtrack, skip duplicate `1` at i=1 because i>0 && nums[i]=nums[i-1] && !used[i-1] |
| 7 | Choose `2` then remaining `1` → `[1,2,1]` |
| 8 | Finally start with `2` then the two `1`s → `[2,1,1]` |

## Complexity Analysis
Time complexity **O(n · n!)** due to generating each permutation of length *n*. Space complexity **O(n)** for recursion stack and `used` array.

## Follow-Up Questions
1. How would you modify the algorithm to generate permutations in lexicographic order without sorting each time?
2. Can you adapt the solution to return permutations of length *k* (k‑permutations) from `nums`?
3. How to handle very large input where storing all permutations is infeasible?

## Key Takeaway
Sorting and a `used` flag array allow backtracking to efficiently skip duplicate branches, producing only unique permutations.
