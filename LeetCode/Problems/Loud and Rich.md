# 851. Loud and Rich

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/loud-and-rich](https://leetcode.com/problems/loud-and-rich)
**Companies:** Amazon, De Shaw, Meta, Microsoft, Paypal, Phonepe

---

## 1. Problem Description

For each person, find the quietest person among all people who are at least as rich.

---

## 2. Approach: DFS/Topological Sort — O(V+E) ✅

```
FUNCTION loudAndRich(richer, quiet):
    n = len(quiet)
    graph = [[] for _ in range(n)]
    FOR [a, b] IN richer:
        graph[b].ADD(a)    // a is richer than b

    answer = [-1] * n

    FUNCTION dfs(node):
        IF answer[node] != -1: RETURN
        answer[node] = node
        FOR richerPerson IN graph[node]:
            dfs(richerPerson)
            IF quiet[answer[richerPerson]] < quiet[answer[node]]:
                answer[node] = answer[richerPerson]

    FOR i ← 0 TO n - 1: dfs(i)
    RETURN answer
```

| Time | Space |
|------|-------|
| O(V + E) | O(V + E) |

---

## 3. Key Takeaway

> Build graph of richer relationships. DFS with memoization: for each person, propagate the quietest person from all richer ancestors. Each node computed once.
