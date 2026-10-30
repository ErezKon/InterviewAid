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
Apply backtracking to explore numbers 1‑9, building combinations of length `k` while maintaining the remaining sum.

### Pseudocode
```text
FUNCTION combinationSum3(k, n):
    result ← []
    backtrack(1, k, n, [], result)
    RETURN result

FUNCTION backtrack(start, k, remain, path, result):
    IF LENGTH(path) = k:
        IF remain = 0:
            result.APPEND(COPY(path))
        RETURN
    FOR i ← start TO 9:
        IF i > remain: BREAK
        path.APPEND(i)
        backtrack(i + 1, k, remain - i, path, result)
        path.REMOVE_LAST()
```

## Walkthrough
For `k = 3, n = 9` the recursion explores:
- Choose 1 → need 2 numbers summing to 8 → further choices 2…9, etc., eventually yielding `[1,2,6]`, `[1,3,5]`, `[2,3,4]`.

## Complexity Analysis
- **Time:** O(C(9, k)) – each valid combination is generated once.
- **Space:** O(k) recursion stack plus O(number of answers) for output.

## Follow-Up Questions
1. How would you adapt the algorithm if numbers could repeat?
2. What changes are needed to handle a larger range than 1‑9?
3. Can you compute the count of combinations without enumerating them?

## Key Takeaway
Backtracking efficiently enumerates limited‑size combinations by pruning when the remaining sum becomes unattainable.
