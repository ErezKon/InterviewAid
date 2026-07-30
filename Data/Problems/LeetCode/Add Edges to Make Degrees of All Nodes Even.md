# 2508. Add Edges to Make Degrees of All Nodes Even

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even](https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even)
**Companies:** Hrt, Uber

---

## 1. Problem Description

Given an undirected graph with `n` nodes and a list of `edges`, determine whether you can add **at most two** edges (no duplicate edges or self‑loops) so that every node ends up with an even degree.

**Constraints:**
- `3 ≤ n ≤ 10⁵`
- `2 ≤ edges.length ≤ 10⁵`

---

## 2. Examples

| n | edges | Can add ≤2 edges? |
|---|---|---|
| 4 | [(1,2),(2,3)] | **Yes** – add edges (3,4) and (4,1) to make all degrees even |
| 3 | [(1,2),(2,3),(3,1)] | **Yes** – already all degrees even |
| 5 | [(1,2),(2,3),(3,4)] | **No** – there are 3 odd‑degree nodes, impossible with ≤2 edges |

---

## 3. Approach: Case Analysis — O(n + E) ✅

```text
FUNCTION isPossible(n, edges):
    // Build adjacency sets and degree counts
    adj ← array of empty sets size n+1
    degree ← array of zeros size n+1
    FOR each (u, v) IN edges:
        ADD v TO adj[u]
        ADD u TO adj[v]
        INCREMENT degree[u]
        INCREMENT degree[v]

    odds ← [i FOR i FROM 1 TO n IF degree[i] MOD 2 = 1]
    cnt ← LENGTH(odds)

    IF cnt = 0: RETURN true               // already even
    IF cnt = 2:
        a, b ← odds[0], odds[1]
        IF b NOT IN adj[a]: RETURN true   // add edge (a,b)
        // try a helper node c not adjacent to a nor b
        FOR c ← 1 TO n:
            IF c ≠ a AND c ≠ b AND c NOT IN adj[a] AND c NOT IN adj[b]:
                RETURN true                // add (a,c) and (b,c)
        RETURN false
    IF cnt = 4:
        a, b, c, d ← odds[0], odds[1], odds[2], odds[3]
        // try the three possible pairings
        RETURN canPair(a,b,c,d,adj) OR canPair(a,c,b,d,adj) OR canPair(a,d,b,c,adj)
    RETURN false                           // any other count impossible

FUNCTION canPair(x, y, p, q, adj):
    // Can we add edges (x,y) and (p,q) without duplicates?
    RETURN (y NOT IN adj[x]) AND (q NOT IN adj[p])
```

---

## 4. Walkthrough

1. **Build adjacency** – store neighbours for O(1) edge existence checks.
2. **Identify odd‑degree nodes** – only 0, 2, or 4 odd nodes can be fixed with ≤2 edges.
3. **Zero odd nodes:** return `true`.
4. **Two odd nodes (a,b):**
   - If edge (a,b) missing, add it → all even.
   - Otherwise look for a third node `c` that is not connected to either `a` or `b`; adding (a,c) and (b,c) fixes parity.
5. **Four odd nodes:** try the three possible pairings of the four nodes; if any pairing consists of two non‑existing edges, the graph can be fixed.
6. **Any other count:** impossible because each added edge flips parity of exactly two nodes.

---

## 5. Complexity Analysis

- **Time:** O(n + E) – building adjacency and scanning odd nodes are linear; the helper‑node search in the 2‑odd case is O(n) in the worst case.
- **Space:** O(n + E) for adjacency lists and degree array.

---

## 6. Follow‑Up Questions

- How would the solution change if you could add **any number** of edges?
- Can you extend the algorithm to output the actual edges to add?
- What if the graph is directed and you need all out‑degrees to be even?

---

## Key Takeaway

> The handshake lemma limits the number of odd‑degree nodes. With at most two added edges, only 0, 2, or 4 odd nodes are solvable, allowing a simple case‑analysis solution.
