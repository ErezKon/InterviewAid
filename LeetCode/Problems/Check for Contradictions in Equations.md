# 2307. Check for Contradictions in Equations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-for-contradictions-in-equations](https://leetcode.com/problems/check-for-contradictions-in-equations)
**Companies:** Amazon, Uber

---

## 1. Problem Description

Given equations like `a / b = 2.0` and `b / c = 3.0`, check if any contradiction exists (e.g., `a / c = 7.0` when it should be 6.0).

---

## 2. Key Insight

> Build a weighted graph where edge `a → b` has weight `a/b`. DFS/BFS to find if any variable has two different computed values (contradiction). Same structure as Evaluate Division (#399), but checking consistency instead of answering queries.

---

## 3. Approach: Weighted Union-Find or DFS — O(n × α) ✅

```
FUNCTION checkContradictions(equations, values):
    graph = defaultdict(list)
    FOR (a, b), val IN zip(equations, values):
        graph[a].ADD((b, val))
        graph[b].ADD((a, 1.0 / val))
    
    ratios = {}    // variable → computed value relative to component root
    FOR node IN graph:
        IF node IN ratios: CONTINUE
        // BFS/DFS to assign consistent ratios
        ratios[node] = 1.0
        queue = [node]
        WHILE queue:
            curr = queue.POP()
            FOR next, weight IN graph[curr]:
                expected = ratios[curr] / weight
                IF next IN ratios:
                    IF ABS(ratios[next] - expected) > 1e-5:
                        RETURN true    // contradiction!
                ELSE:
                    ratios[next] = expected
                    queue.ADD(next)
    RETURN false
```

| Time | Space |
|------|-------|
| O(V + E) | O(V + E) |

---

## Key Takeaway

> Weighted graph consistency check: assign values via BFS/DFS, and if a revisited node gets a different value (beyond epsilon), it's a contradiction. Same pattern as Evaluate Division but for validation.
