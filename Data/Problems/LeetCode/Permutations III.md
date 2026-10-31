# 3437. Permutations III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/permutations-iii](https://leetcode.com/problems/permutations-iii)
**Companies:** Goldman Sachs

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer `n`, an **alternating permutation** is a permutation of the first `n` positive integers such that no **two** adjacent elements are **both** odd or **both** even.

Return *all such* **alternating permutations** sorted in lexicographical order.

**Constraints:**
- `1 <= n <= 10`

## Examples

**Example 1:**
```
Input: n = 4
Output: [[1,2,3,4],[1,4,3,2],[2,1,4,3],[2,3,4,1],[3,2,1,4],[3,4,1,2],[4,1,2,3],[4,3,2,1]]
```

**Example 2:**
```
Input: n = 2
Output: [[1,2],[2,1]]
```

**Example 3:**
```
Input: n = 3
Output: [[1,2,3],[3,2,1]]
```

## Approach
Backtrack over the values `1..n`, trying them in increasing order at each position. A value `j` may be placed only if it is unused and its parity differs from the last element of the current path. Because candidates are tried in increasing order, completed permutations are emitted in lexicographic order automatically - no sorting needed.

```text
FUNCTION AlternatingPermutations(n):
    SET result ← []
    SET used ← ARRAY OF FALSE LENGTH n + 1
    BACKTRACK([], used)
    RETURN result

FUNCTION BACKTRACK(path, used):
    IF LENGTH(path) = n:
        APPEND COPY(path) TO result
        RETURN
    FOR j ← 1 TO n:
        IF used[j]: CONTINUE
        IF path NOT EMPTY AND LAST(path) MOD 2 = j MOD 2:
            CONTINUE  // same parity as previous element
        SET used[j] ← TRUE
        APPEND j TO path
        BACKTRACK(path, used)
        REMOVE LAST FROM path
        SET used[j] ← FALSE
```

## Walkthrough
Example 3: `n = 3`.

| Step | Action | Result |
|------|--------|--------|
| 1 | Start with empty `path` | `[]` |
| 2 | Choose `1` | path `[1]` |
| 3 | Next must be even: only `2` | path `[1,2]` |
| 4 | Next must be odd: `3` unused | `[1,2,3]` added |
| 5 | Backtrack to `[]`, choose `2` | path `[2]` |
| 6 | Next must be odd: `1` → path `[2,1]`; next must be even but `2` is used | dead end |
| 7 | Try `3` → path `[2,3]`; next must be even, none left | dead end |
| 8 | Backtrack to `[]`, choose `3` → `[3]` → `[3,2]` → `[3,2,1]` | `[3,2,1]` added |
| 9 | Done | `[[1,2,3],[3,2,1]]` |

## Complexity Analysis
Time complexity **O(n · n!)** in the worst case (the pruning makes the real count much smaller, about 2·((n/2)!)^2 results, each copied in O(n)). Space complexity **O(n)** for the recursion stack and `used` array, excluding the output.

## Follow-Up Questions
1. How would you count the alternating permutations without generating them (hint: when n is even, odd/even counts are equal, so the answer is 2·((n/2)!)^2)?
2. How would you return only the k-th alternating permutation in lexicographic order without enumerating all of them?
3. How would you generalize the rule to "no two adjacent elements with the same remainder mod m"?

## Key Takeaway
Trying candidates in increasing order during backtracking yields lexicographic output for free, and a simple parity check on the last element prunes invalid branches early.
