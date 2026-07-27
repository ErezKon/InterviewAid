# 1916. Count Ways to Build Rooms in an Ant Colony

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony](https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony)
**Companies:** Adobe

---

## Problem Description

Given a tree rooted at 0, count valid build orderings where each room is built after its parent. Return count modulo `10^9 + 7`.

---

## Key Insight

This is counting **topological orderings** of a tree. For a subtree rooted at `u` with children subtrees of sizes `s1, s2, ...`, the orderings = `multinomial(s1+s2+..., s1, s2, ...) × product(child_orderings)`. The multinomial coefficient interleaves the child subtree sequences.

---

## Approach

```
FUNCTION waysToBuildRooms(prevRoom):
    MOD = 10^9 + 7
    // Build tree, compute subtree sizes
    // DFS: for each node, result = product of child results × multinomial

    FUNCTION dfs(u):
        size[u] = 1; ways = 1
        FOR child IN children[u]:
            dfs(child)
            ways = ways * modInverse(factorial(size[child])) % MOD
            size[u] += size[child]
        ways = ways * factorial(size[u] - 1) % MOD
        RETURN ways

    RETURN dfs(0)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with precomputed factorials |
| **Space** | O(n) |

---

## Key Takeaway

> **Counting topological orderings of a tree: for each node, compute the multinomial coefficient to interleave children's build sequences. Uses `factorial(total) / product(factorial(child_size))`.**
