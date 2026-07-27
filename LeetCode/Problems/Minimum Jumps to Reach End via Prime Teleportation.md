# 3629. Minimum Jumps to Reach End via Prime Teleportation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation](https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation)
**Companies:** Amazon, Google, Meta, Uber

---

## Problem Description

Given array `nums`, you can jump between indices that share a **prime factor**. Return the **minimum jumps** from index 0 to index n-1, or -1 if impossible.

## Key Insight

> Group indices by their prime factors. Two indices sharing any prime factor are connected. BFS through prime factor groups — visiting a prime factor group visits all its indices.

## Approach: BFS on Prime Factor Groups — O(n√M) ✅

```
FUNCTION minJumps(nums):
    // Group indices by prime factors
    primeToIndices ← map from prime → list of indices
    FOR i, num IN enumerate(nums):
        FOR each prime factor p of num:
            primeToIndices[p].APPEND(i)

    // BFS from index 0 to index n-1
    visited ← set(); visitedPrimes ← set()
    queue ← [(0, 0)]   // (index, jumps)
    visited.ADD(0)

    WHILE queue:
        (idx, jumps) ← queue.DEQUEUE()
        IF idx == n-1: RETURN jumps
        FOR each prime factor p of nums[idx]:
            IF p IN visitedPrimes: CONTINUE
            visitedPrimes.ADD(p)
            FOR neighbor IN primeToIndices[p]:
                IF neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    queue.ENQUEUE((neighbor, jumps + 1))

    RETURN -1
```

| Time | Space |
|------|-------|
| O(n · √M) — factorization | O(n) |

## Key Takeaway

> When connectivity is defined by shared prime factors, **group by primes** and BFS through groups — mark visited primes to avoid re-expanding large groups.
