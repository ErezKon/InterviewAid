# 399. Evaluate Division

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/evaluate-division](https://leetcode.com/problems/evaluate-division)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Dp World, Flipkart, Ge Healthcare, Goldman Sachs, Google, Makemytrip, Meta, Microsoft, Nuro, Phonepe, Rippling, Snapchat, Stripe, Tesla, Tiktok, Tower Research, Uber, Urban Company, Yahoo

---

## 1. Problem Description

You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [A_i, B_i]` and `values[i]` represent the equation `A_i / B_i = values[i]`. Each `A_i` or `B_i` is a string that represents a single variable.

You are also given some `queries`, where `queries[j] = [C_j, D_j]` represents the `j`-th query where you must find the answer for `C_j / D_j = ?`.

Return *the answers to all queries*. If a single answer cannot be determined, return `-1.0`.

**Note:** The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

**Note:** The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.

**Constraints:**
- `1 <= equations.length <= 20`
- `equations[i].length == 2`
- `1 <= A_i.length, B_i.length <= 5`
- `values.length == equations.length`
- `0.0 < values[i] <= 20.0`
- `1 <= queries.length <= 20`
- `queries[i].length == 2`
- `1 <= C_j.length, D_j.length <= 5`
- `A_i, B_i, C_j, D_j` consist of lower case English letters and digits.

---

## 2. Approach: Graph BFS/DFS — O(Q·(V+E)) ✅

Build a weighted directed graph where each variable is a node. For an equation `a / b = v`, add edge `a → b` with weight `v` and edge `b → a` with weight `1/v`. To answer a query `x / y`, perform a BFS/DFS from `x` to `y`, multiplying edge weights along the path. If `y` is unreachable, the answer is `-1.0`.

```text
FUNCTION calcEquation(equations, values, queries):
    graph ← {}
    FOR i FROM 0 TO LENGTH(equations)-1:
        a, b ← equations[i]
        v ← values[i]
        graph[a].ADD((b, v))
        graph[b].ADD((a, 1.0 / v))
    result ← []
    FOR each (src, dst) IN queries:
        IF src NOT IN graph OR dst NOT IN graph:
            result.APPEND(-1.0)
        ELSE IF src == dst:
            result.APPEND(1.0)
        ELSE:
            result.APPEND(bfs(graph, src, dst))
    RETURN result

FUNCTION bfs(graph, src, dst):
    visited ← {src}
    queue ← [(src, 1.0)]
    WHILE queue NOT EMPTY:
        node, prod ← queue.DEQUEUE()
        IF node == dst:
            RETURN prod
        FOR each (neighbor, weight) IN graph[node]:
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                queue.ENQUEUE((neighbor, prod * weight))
    RETURN -1.0
```

---

## Examples

```
Example 1:
  Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
  Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
  Explanation:
  Given: a / b = 2.0, b / c = 3.0
  queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
  return: [6.0, 0.5, -1.0, 1.0, -1.0]
  note: x is undefined => -1.0
```

```
Example 2:
  Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
  Output: [3.75000,0.40000,5.00000,0.20000]
```

```
Example 3:
  Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
  Output: [0.50000,2.00000,-1.00000,-1.00000]
```

---

## Walkthrough

Take the first example query `a / c`:

1. Start BFS at node `a` with product `1.0`.
2. Visit neighbor `b` via edge weight `2.0`; enqueue `(b, 2.0)`.
3. Dequeue `(b, 2.0)`. From `b`, visit neighbor `c` via weight `3.0`; enqueue `(c, 2.0*3.0 = 6.0)`.
4. Dequeue `(c, 6.0)`. Destination reached, return `6.0`.

If the queue empties without reaching the destination, the division is undefined and `-1.0` is returned.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(Q·(V+E)) – each query performs a BFS/DFS over the graph |
| **Space** | O(V+E) – adjacency list plus visited set/queue |

---

## Follow-Up Questions

- How would you modify the solution to use Union-Find with weight tracking for near-O(1) query time?
- Can the algorithm be extended to support equations with more than two variables (e.g., `a / b / c = v`)?
- What changes are needed to handle floating-point precision issues in large graphs?

---

## Key Takeaway

> Model division equations as a weighted graph. The value of a query is the product of edge weights along any path between the two variables. BFS/DFS provides a simple and effective way to compute these products.
