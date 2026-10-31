# 216. Combination Sum III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-iii](https://leetcode.com/problems/combination-sum-iii)
**Companies:** Amazon, Bloomberg, Google, Microsoft
---

## Problem Description
Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:

- Only numbers `1` through `9` are used.
- Each number is used **at most once**.

Return *a list of all possible valid combinations*. The list must not contain the same combination twice, and the combinations may be returned in any order.

**Constraints:**
- `2 <= k <= 9`
- `1 <= n <= 60`

## Examples
```
Example 1:
  Input: k = 3, n = 7
  Output: [[1,2,4]]
  Explanation:
    1 + 2 + 4 = 7
    There are no other valid combinations.
```
```
Example 2:
  Input: k = 3, n = 9
  Output: [[1,2,6],[1,3,5],[2,3,4]]
  Explanation:
    1 + 2 + 6 = 9
    1 + 3 + 5 = 9
    2 + 3 + 4 = 9
    There are no other valid combinations.
```
```
Example 3:
  Input: k = 4, n = 1
  Output: []
  Explanation: There are no valid combinations.
    Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
```

## Approach
Use backtracking to explore numbers from `start` to `9`:
1. If the current combination length equals `k` and the remaining sum is `0`, record it.
2. If length reaches `k` or remaining sum becomes non-positive, backtrack.
3. Recurse with the next number (`i+1`) and reduced remaining sum.

### Pseudocode
```text
FUNCTION combinationSum3(k, n):
    result ← []
    backtrack(1, k, n, [], result)
    RETURN result

FUNCTION backtrack(start, k, remain, path, result):
    IF LENGTH(path) = k AND remain = 0:
        APPEND COPY(path) TO result
        RETURN
    IF LENGTH(path) = k OR remain <= 0:
        RETURN
    FOR i ← start TO 9:
        IF i > remain: BREAK
        path.ADD(i)
        backtrack(i + 1, k, remain - i, path, result)
        path.REMOVE_LAST()
```

## Walkthrough
For `k = 3, n = 7`:
1. Start with `1` → remain `6`.
2. Next choose `2` → remain `4`.
3. Next choose `4` → remain `0` and length `3` → record `[1,2,4]`.
4. Backtrack and explore other branches; none satisfy both constraints.

## Complexity Analysis
Time: O(C(9, k)) – at most all combinations of 9 numbers taken `k` at a time.
Space: O(k) recursion depth plus space for results.

## Follow-Up Questions
- How would you modify the algorithm to allow numbers beyond `9`?
- Can you generate combinations in lexicographic order without sorting?
- What if each number could be used multiple times?

---

## Key Takeaway

> A simple depth-first search with early pruning efficiently enumerates the limited search space of numbers 1-9.
