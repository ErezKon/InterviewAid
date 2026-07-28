# 2307. Check for Contradictions in Equations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-for-contradictions-in-equations](https://leetcode.com/problems/check-for-contradictions-in-equations)
**Companies:** Amazon, Uber

---

## 1. Problem Description

Given equations like `a / b = 2.0` and `b / c = 3.0`, check if any contradiction exists (e.g., `a / c = 7.0` when it should be 6.0).

---

## 2. Examples

| Equations | Values | Output | Explanation |
|-----------|--------|--------|-------------|
| `[["a","b"],["b","c"]]` | `[2.0,3.0]` | `false` | No contradictions; implied `a/c = 6.0` matches any query. |
| `[["a","b"],["b","c"],["a","c"]]` | `[2.0,3.0,7.0]` | `true` | Direct contradiction: `a/c` should be `6.0` but given `7.0`. |

---

## 3. Approach: Weighted Graph Consistency — O(V+E) ✅

```text
FUNCTION checkContradictions(equations, values):
    // Build bidirectional weighted graph
    graph ← MAP of LIST
    FOR (a,b), val IN ZIP(equations, values):
        APPEND (b, val) TO graph[a]
        APPEND (a, 1.0 / val) TO graph[b]
    
    ratios ← MAP   // variable → value relative to component root
    FOR node IN graph KEYS():
        IF node IN ratios: CONTINUE
        SET ratios[node] ← 1.0
        queue ← [node]
        WHILE queue NOT EMPTY:
            SET cur ← POP(queue)
            FOR (nbr, weight) IN graph[cur]:
                SET expected ← ratios[cur] / weight
                IF nbr IN ratios:
                    IF ABS(ratios[nbr] - expected) > 1e-5:
                        RETURN true   // contradiction found
                ELSE:
                    SET ratios[nbr] ← expected
                    APPEND nbr TO queue
    RETURN false   // all components consistent
```

---

## 4. Walkthrough

Take equations `a/b = 2.0`, `b/c = 3.0`, `a/c = 7.0`.

1. Build graph:
   - a → b (2.0), b → a (0.5)
   - b → c (3.0), c → b (1/3)
   - a → c (7.0), c → a (1/7)
2. Start BFS at `a`, set `ratios[a] = 1.0`.
3. Visit `b` via edge a→b: `ratios[b] = 1.0 / 2.0 = 0.5`.
4. Visit `c` via b→c: `ratios[c] = 0.5 / 3.0 ≈ 0.1667`.
5. Edge a→c expects `ratios[c] = 1.0 / 7.0 ≈ 0.1429`.
6. Difference > 1e-5 → contradiction → return `true`.

---

## 5. Complexity Analysis

- **Time:** O(V + E) – each variable and equation visited once during BFS/DFS.
- **Space:** O(V + E) – adjacency list and ratio map.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm for integer ratios with exact arithmetic?
- Can you detect contradictions incrementally as equations are added one by one?
- What changes are needed if equations involve multiplication instead of division?

---

## Key Takeaway

> Weighted graph consistency check: assign values via BFS/DFS, and if a revisited node gets a different value (beyond epsilon), it's a contradiction. Same pattern as Evaluate Division but for validation.
