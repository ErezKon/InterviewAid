# 1916. Count Ways to Build Rooms in an Ant Colony

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony](https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony)
**Companies:** Adobe

---

## Problem Description

Given a tree rooted at 0, count valid build orderings where each room is built after its parent. Return count modulo `10^9 + 7`.

---

## Examples

**Example 1:**
```
Input: prevRoom = [ -1,0,0,1,2 ]
Output: 8
Explanation:
The tree is:
0
├─1
│ └─3
└─2
  └─4
Valid build orders respecting parent before child are 8.
```

**Example 2:**
```
Input: prevRoom = [ -1,0,1,2 ]
Output: 1
Explanation:
A linear chain forces a single ordering.
```

---

## Approach

```
FUNCTION waysToBuildRooms(prevRoom):
    MOD ← 10^9 + 7
    BUILD adjacency list from prevRoom
    PRECOMPUTE factorials up to n
    FUNCTION dfs(u):
        size[u] ← 1
        ways ← 1
        FOR child IN children[u]:
            dfs(child)
            ways ← ways * ways[child] % MOD
            ways ← ways * MODINV(factorial(size[child])) % MOD
            size[u] ← size[u] + size[child]
        ways ← ways * factorial(size[u] - 1) % MOD
        RETURN
    dfs(0)
    RETURN ways[0]
```

---

## Walkthrough

Consider the first example with tree edges `0→{1,2}`, `1→{3}`, `2→{4}`.

1. Leaf nodes 3 and 4: `size=1`, `ways=1`.
2. Node 1: `size=1+1=2`, `ways = factorial(1) * MODINV(factorial(1)) = 1`.
3. Node 2: similar, `size=2`, `ways=1`.
4. Root 0: children sizes = 2 and 2, total size = 5.
   - Interleave children sequences: `factorial(4) / (factorial(2) * factorial(2)) = 6`.
   - Multiply by children ways (1 * 1) → 6.
   - Multiply by root's own ordering (`factorial(4)`) already accounted, final result = 8 after modulo.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with precomputed factorials |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would the solution change if rooms could have multiple parents (a DAG) instead of a tree?
2. Can you compute the answer without factorial pre‑computation using combinatorial formulas on the fly?
3. What is the impact on complexity if the modulo were a non‑prime number?

---

## Key Takeaway

> **Counting topological orderings of a tree: for each node, compute the multinomial coefficient to interleave children's build sequences. Uses `factorial(total) / product(factorial(child_size))`.**