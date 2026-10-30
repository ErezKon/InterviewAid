# 1409. Queries on a Permutation With Key

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queries-on-a-permutation-with-key](https://leetcode.com/problems/queries-on-a-permutation-with-key)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented swap/lookup problem. Correct idea: simulate with a list (`m ≤ 1000`): find `queries[i]` in `P`, record its index, remove it and insert it at the front — O(n·m); or use a Fenwick tree over `m + n` slots for O((n + m) log(n + m)).*

Given the array `queries` of positive integers between `1` and `m`, you have to process all `queries[i]` (from `i=0` to `i=queries.length-1`) according to the following rules:

- In the beginning, you have the permutation `P=[1,2,3,...,m]`.
- For the current `i`, find the position of `queries[i]` in the permutation `P` (**indexing from 0**) and then move this at the beginning of the permutation `P`. Notice that the position of `queries[i]` in `P` is the result for `queries[i]`.

Return an array containing the result for the given `queries`.

**Constraints:**
- `1 <= m <= 10^3`
- `1 <= queries.length <= m`
- `1 <= queries[i] <= m`

## Examples

**Example 1:**
```
Input: queries = [3,1,2,1], m = 5
Output: [2,1,2,1]
Explanation: The queries are processed as follow:
For i=0: queries[i]=3, P=[1,2,3,4,5], position of 3 in P is 2, then we move 3 to the beginning of P resulting in P=[3,1,2,4,5].
For i=1: queries[i]=1, P=[3,1,2,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,3,2,4,5].
For i=2: queries[i]=2, P=[1,3,2,4,5], position of 2 in P is 2, then we move 2 to the beginning of P resulting in P=[2,1,3,4,5].
For i=3: queries[i]=1, P=[2,1,3,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,2,3,4,5].
Therefore, the array containing the result is [2,1,2,1].
```

**Example 2:**
```
Input: queries = [4,1,2,2], m = 4
Output: [3,1,2,0]
```

**Example 3:**
```
Input: queries = [7,5,5,8,3], m = 8
Output: [6,5,0,7,5]
```

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
