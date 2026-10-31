# 1409. Queries on a Permutation With Key

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queries-on-a-permutation-with-key](https://leetcode.com/problems/queries-on-a-permutation-with-key)
**Companies:** Amazon

---

## Problem Description

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
Brute-force simulation is enough for `m ≤ 1000` (O(n·m)), but a Fenwick tree gives O((n + m) log(n + m)).

Reserve `n + m` slots. The first `n` slots are empty "front" positions used for future moves; numbers `1..m` start in slots `n+1..n+m`. Each occupied slot holds a 1 in a Fenwick tree. The index of value `q` in `P` equals the number of occupied slots before its slot, i.e. `prefixSum(pos[q]) - 1`. To move `q` to the front, clear its slot and place it in the next free front slot (`front`, which decreases by one after each query).

```text
FUNCTION processQueries(queries, m):
    n ← length(queries)
    BIT ← Fenwick tree of size n + m (all zeros)
    FOR v ← 1 TO m:
        pos[v] ← n + v
        BIT.add(pos[v], +1)
    front ← n
    answer ← []
    FOR each q IN queries:
        APPEND BIT.prefixSum(pos[q]) - 1 TO answer   // elements before q
        BIT.add(pos[q], -1)                           // remove q
        pos[q] ← front                                // move q to the front
        BIT.add(front, +1)
        front ← front - 1
    RETURN answer
```

## Walkthrough
Example 1: `queries = [3,1,2,1]`, `m = 5`, so `n = 4`. Initially values 1..5 sit in slots 5..9; `front = 4`.

| q | pos[q] | prefixSum(pos[q]) - 1 | Move q to slot | P afterwards |
|---|--------|-----------------------|----------------|--------------|
| 3 | 7 | 3 - 1 = **2** | 4 | [3,1,2,4,5] |
| 1 | 5 | 2 - 1 = **1** (slots 4,5) | 3 | [1,3,2,4,5] |
| 2 | 6 | 3 - 1 = **2** (slots 3,4,6) | 2 | [2,1,3,4,5] |
| 1 | 3 | 2 - 1 = **1** (slots 2,3) | 1 | [1,2,3,4,5] |

Result: `[2,1,2,1]` — matches the expected output.

## Complexity Analysis
- **Time:** O((n + m) log(n + m)) — each initial insertion and each query does O(1) Fenwick operations. (The plain list simulation is O(n·m), also acceptable here.)
- **Space:** O(n + m) for the Fenwick tree and the position map.

## Follow-Up Questions
1. How would you also support "move to the back" operations? (Reserve free slots on both ends.)
2. What if `m` were up to 10^9 but only the queried values mattered? (Coordinate-compress the queried values; unqueried ones keep their relative order.)
3. Could you answer the queries offline without a Fenwick tree? (Yes, with a balanced BST / order-statistic tree, or sqrt-decomposition.)

## Key Takeaway
"Move to front + ask for the index" becomes a prefix-count problem once you pre-allocate empty slots in front of the array; a Fenwick tree then answers each query in logarithmic time.
