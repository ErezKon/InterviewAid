# 1627. Graph Connectivity With Threshold

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/graph-connectivity-with-threshold](https://leetcode.com/problems/graph-connectivity-with-threshold)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with Factor Enumeration — O(n log n) ✅](#3-approach-union-find-with-factor-enumeration)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

We have `n` cities labeled from `1` to `n`. Two different cities with labels `x` and `y` are directly connected by a bidirectional road if and only if `x` and `y` share a common divisor **strictly greater** than some `threshold`. More formally, cities with labels `x` and `y` have a road between them if there exists an integer `z` such that all of the following are true:

- `x % z == 0`,
- `y % z == 0`, and
- `z > threshold`.

Given the two integers, `n` and `threshold`, and an array of `queries`, you must determine for each `queries[i] = [a_i, b_i]` if cities `a_i` and `b_i` are connected directly or indirectly. (i.e. there is some path between them).

Return *an array* `answer`*, where* `answer.length == queries.length` *and* `answer[i]` *is* `true` *if for the* `i`th *query, there is a path between* `a_i` *and* `b_i`*, or* `answer[i]` *is* `false` *if there is no path.*

**Constraints:**
- `2 <= n <= 10^4`
- `0 <= threshold <= n`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 2`
- `1 <= a_i, b_i <= cities`
- `a_i != b_i`

---

## 2. Key Insight

> Instead of checking all pairs `O(n²)`, iterate over each factor `f > threshold` and union all multiples of `f`. This is analogous to a sieve and runs in `O(n log n)`.

---

## 3. Approach: Union-Find with Factor Enumeration — O(n log n) ✅

```text
FUNCTION areConnected(n, threshold, queries):
    uf ← UNION_FIND of size n + 1
    FOR f ← threshold + 1 TO n:
        FOR multiple ← 2 * f TO n STEP f:
            uf.UNION(f, multiple)
    results ← []
    FOR (a, b) IN queries:
        IF uf.FIND(a) = uf.FIND(b):
            APPEND results WITH true
        ELSE:
            APPEND results WITH false
    RETURN results
```

---

## 4. Examples

```
Example 1:
  Input: n = 6, threshold = 2, queries = [[1,4],[2,5],[3,6]]
  Output: [false,false,true]
  Explanation: The divisors for each number:
  1:   1
  2:   1, 2
  3:   1, 3
  4:   1, 2, 4
  5:   1, 5
  6:   1, 2, 3, 6
  Using the divisors above the threshold, only cities 3 and 6 share a common divisor, so they are the
  only ones directly connected. The result of each query:
  [1,4]   1 is not connected to 4
  [2,5]   2 is not connected to 5
  [3,6]   3 is connected to 6 through path 3--6
```
```
Example 2:
  Input: n = 6, threshold = 0, queries = [[4,5],[3,4],[3,2],[2,6],[1,3]]
  Output: [true,true,true,true,true]
  Explanation: The divisors for each number are the same as the previous example. However, since the threshold is 0,
  all divisors can be used. Since all numbers share 1 as a divisor, all cities are connected.
```
```
Example 3:
  Input: n = 5, threshold = 1, queries = [[4,5],[4,5],[3,2],[2,3],[3,4]]
  Output: [false,false,false,false,false]
  Explanation: Only cities 2 and 4 share a common divisor 2 which is strictly greater than the threshold 1, so they are the only ones directly connected.
  Please notice that there can be multiple queries for the same pair of nodes [x, y], and that the query [x, y] is equivalent to the query [y, x].
```

---

## 5. Walkthrough

Consider `n = 6`, `threshold = 2`.

1. Initialize Union-Find for `1..6`.
2. Enumerate factors `f = 3,4,5,6` (since >2).
   - `f = 3`: multiples `6` → union(3,6).
   - `f = 4`: no multiple ≤6.
   - `f = 5`: no multiple ≤6.
   - `f = 6`: no multiple.
3. After unions, sets are `{1}`, `{2}`, `{3,6}`, `{4}`, `{5}`.
4. Query `(3,6)`: both in same set → `true`.
5. Query `(1,4)`: different sets → `false`.

---

## 6. Complexity Analysis

- **Time:** `O(n log n + q α(n))` where `q` is number of queries and `α` is inverse Ackermann (practically constant).
- **Space:** `O(n)` for the Union-Find parent and rank arrays.

---

## 7. Follow-Up Questions

- How would the solution change if the connectivity condition were based on greatest common divisor ≥ `threshold` instead of a common factor > `threshold`?
- Can you adapt the algorithm to handle dynamic updates where new cities or edges are added after preprocessing?
- What if the graph is directed and connectivity requires a directed path respecting the factor rule?

---

## Key Takeaway

> Use a sieve-style enumeration of factors greater than the threshold and Union-Find to merge all cities sharing each factor. This avoids quadratic pair checks and yields near-linear preprocessing.
