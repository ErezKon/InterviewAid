# 1916. Count Ways to Build Rooms in an Ant Colony

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony](https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony)
**Companies:** Adobe

---

## Problem Description

You are an ant tasked with adding `n` new rooms numbered `0` to `n-1` to your colony. You are given the expansion plan as a **0-indexed** integer array of length `n`, `prevRoom`, where `prevRoom[i]` indicates that you must build room `prevRoom[i]` before building room `i`, and these two rooms must be connected **directly**. Room `0` is already built, so `prevRoom[0] = -1`. The expansion plan is given such that once all the rooms are built, every room will be reachable from room `0`.

You can only build **one room** at a time, and you can travel freely between rooms you have **already built** only if they are **connected**. You can choose to build **any room** as long as its **previous room** is already built.

Return *the **number of different orders** you can build all the rooms in*. Since the answer may be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `n == prevRoom.length`
- `2 <= n <= 10^5`
- `prevRoom[0] == -1`
- `0 <= prevRoom[i] < n` for all `1 <= i < n`
- Every room is reachable from room `0` once all the rooms are built.

---

## Examples

```
Example 1:
  Input: prevRoom = [-1,0,1]
  Output: 1
  Explanation: There is only one way to build the additional rooms: 0 → 1 → 2
```

```
Example 2:
  Input: prevRoom = [-1,0,0,1,2]
  Output: 6
  Explanation: The 6 ways are:
  0 → 1 → 3 → 2 → 4
  0 → 2 → 4 → 1 → 3
  0 → 1 → 2 → 3 → 4
  0 → 1 → 2 → 4 → 3
  0 → 2 → 1 → 3 → 4
  0 → 2 → 1 → 4 → 3
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
2. Can you compute the answer without factorial pre-computation using combinatorial formulas on the fly?
3. What is the impact on complexity if the modulo were a non-prime number?

---

## Key Takeaway

> **Counting topological orderings of a tree: for each node, compute the multinomial coefficient to interleave children's build sequences. Uses `factorial(total) / product(factorial(child_size))`.**