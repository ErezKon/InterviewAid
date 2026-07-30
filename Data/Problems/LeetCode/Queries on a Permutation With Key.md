# 1409. Queries on a Permutation With Key

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queries-on-a-permutation-with-key](https://leetcode.com/problems/queries-on-a-permutation-with-key)
**Companies:** Amazon

---

## Problem Description
You are given an integer `n` and a list of queries `queries`, where each query is a pair `[type, val]`.
- If `type == 1`, swap the element at index `val` with the element at index `val + 1` in the current permutation.
- If `type == 2`, return the element at index `val` in the current permutation.
Initially the permutation is `[0, 1, 2, ..., n‑1]`. Process the queries in order and output the results of all type‑2 queries.

## Examples
**Example 1:**
```
 n = 5
 queries = [[1,1],[2,1],[1,2],[2,2]]
```
Start: `[0,1,2,3,4]`
- Swap indices 1 and 2 → `[0,2,1,3,4]`
- Query index 1 → `2`
- Swap indices 2 and 3 → `[0,2,3,1,4]`
- Query index 2 → `3`
Output: `[2,3]`

**Example 2:**
```
 n = 3
 queries = [[2,0],[1,0],[2,0]]
```
Start: `[0,1,2]`
- Query index 0 → `0`
- Swap indices 0 and 1 → `[1,0,2]`
- Query index 0 → `1`
Output: `[0,1]`

## Approach
Maintain the permutation in an array `perm`. For a type‑1 query, swap `perm[val]` and `perm[val+1]`. For a type‑2 query, read `perm[val]` and append to the answer list. All operations are O(1).

```text
FUNCTION processQueries(n, queries):
    // initialise permutation
    SET perm ← [0, 1, 2, ..., n-1]
    SET answer ← []
    FOR each q IN queries:
        SET type ← q[0]
        SET val ← q[1]
        IF type == 1:
            // swap adjacent elements
            SET temp ← perm[val]
            SET perm[val] ← perm[val+1]
            SET perm[val+1] ← temp
        ELSE IF type == 2:
            APPEND perm[val] TO answer
    RETURN answer
```

## Walkthrough
| Query | Permutation before | Action | Permutation after | Output |
|-------|-------------------|--------|-------------------|--------|
| [1,1] | [0,1,2,3,4] | swap indices 1&2 | [0,2,1,3,4] | — |
| [2,1] | [0,2,1,3,4] | read index 1 | — | 2 |
| [1,2] | [0,2,1,3,4] | swap 2&3 | [0,2,3,1,4] | — |
| [2,2] | [0,2,3,1,4] | read index 2 | — | 3 |

## Complexity Analysis
- **Time:** Each query is processed in O(1) → O(Q) where Q = number of queries.
- **Space:** O(n) for the permutation array plus O(k) for the answers (k = number of type‑2 queries).

## Follow-Up Questions
1. How would you support swaps of non‑adjacent elements efficiently?
2. Can you answer queries in a streaming fashion with limited memory (e.g., when `n` is huge)?
3. How would you modify the solution to handle a batch of swaps applied simultaneously?

## Key Takeaway
Keeping the permutation in a mutable array lets you handle adjacent swaps and direct lookups in constant time, giving a linear‑time overall solution.
