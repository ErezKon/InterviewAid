# 851. Loud and Rich

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/loud-and-rich](https://leetcode.com/problems/loud-and-rich)
**Companies:** Amazon, De Shaw, Meta, Microsoft, Paypal, Phonepe

---

## 1. Problem Description

For each person, find the quietest person among all people who are at least as rich.

---

## 2. Approach: DFS/Topological Sort — O(V+E) ✅

```text
FUNCTION loudAndRich(richer, quiet):
    n ← LEN(quiet)
    graph ← ARRAY of n empty lists
    FOR [a, b] IN richer:
        // a is richer than b
        graph[b].APPEND(a)

    answer ← ARRAY of n values INITIALIZED TO -1

    FUNCTION dfs(person):
        IF answer[person] != -1: RETURN
        answer[person] ← person
        FOR richerPerson IN graph[person]:
            dfs(richerPerson)
            IF quiet[answer[richerPerson]] < quiet[answer[person]]:
                answer[person] ← answer[richerPerson]

    FOR i FROM 0 TO n-1:
        dfs(i)
    RETURN answer
```

---

## 3. Examples

| richer | quiet | Output |
|--------|-------|--------|
| [[1,0],[2,1],[3,1],[3,2]] | [3,2,5,4] | [2,2,5,4] |
| [] | [0] | [0] |

*Explanation:* Person 2 is the quietest among {2,1,0} who are at least as rich as 2, etc.

---

## 4. Walkthrough

Consider `richer = [[1,0],[2,1],[3,1],[3,2]]` and `quiet = [3,2,5,4]`.
1. Build graph: 0 → [1]; 1 → [2,3]; 2 → [3].
2. Start DFS at person 0: answer[0]=0, recurse to 1.
3. DFS at 1: answer[1]=1, recurse to 2.
4. DFS at 2: answer[2]=2, recurse to 3.
5. DFS at 3: answer[3]=3 (quiet[3]=4). Return.
6. Backtrack: compare quiet values, propagate the quietest index up the chain. Final answers: [2,2,5,4].

---

## 5. Complexity Analysis

- **Time:** Each person visited once, each edge traversed once → `O(V + E)`.
- **Space:** Graph adjacency list and recursion stack → `O(V + E)`.

---

## 6. Follow-Up Questions

- How would you modify the solution if the richer relationships could form cycles?
- Can you solve the problem iteratively using topological ordering instead of recursion?

---

## 7. Key Takeaway

> Build a graph from richer relationships and use DFS with memoization to propagate the quietest person from richer ancestors to each individual.
