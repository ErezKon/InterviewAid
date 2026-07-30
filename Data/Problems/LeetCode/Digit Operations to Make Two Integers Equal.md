# 3377. Digit Operations to Make Two Integers Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/digit-operations-to-make-two-integers-equal](https://leetcode.com/problems/digit-operations-to-make-two-integers-equal)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS / Dijkstra on Number Graph](#approach-bfs--dijkstra-on-number-graph)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two integers `n` and `m`, transform `n` into `m` by repeatedly incrementing or decrementing any single digit of `n` by 1. The cost of each operation is the **value of `n` after the operation**. You **cannot** pass through any number that is **prime** during the transformation (but `n` and `m` themselves can be prime).

Return the **minimum total cost** to transform `n` into `m`, or `-1` if impossible.

**Constraints:**
- `1 <= n, m <= 10^4`
- Both `n` and `m` have the same number of digits.

---

## Examples

**Example 1:**
```
Input: n = 10, m = 12
Output: 85
Explanation: 10 → 11 (cost 11) → 12 (cost 12)... but must avoid primes.
  Path finding to minimize sum of intermediate values.
```

**Example 2:**
```
Input: n = 4, m = 8
Output: -1
Explanation: All single-digit numbers between 4 and 8 that differ by one digit change pass through primes.
```

---

## Key Insight

> Model each number as a node in a graph. Edges connect numbers that differ by ±1 in exactly one digit. Edge weight = the destination number. Use **Dijkstra's algorithm** to find the minimum-cost path from `n` to `m`, skipping prime nodes (except `n` and `m`).

---

## Approach: BFS / Dijkstra on Number Graph ✅

```
FUNCTION minOperations(n, m):
    // Precompute primes up to 10000 using Sieve of Eratosthenes
    isPrime ← sieve(10000)
    
    // Dijkstra's algorithm
    dist ← array of ∞, size 10001
    dist[n] ← n
    pq ← min-heap with (n, n)    // (cost, number)
    
    WHILE pq is not empty DO
        (cost, curr) ← pq.POP()
        IF curr = m THEN RETURN cost
        IF cost > dist[curr] THEN CONTINUE
        
        // Try changing each digit by ±1
        FOR each digit position p of curr DO
            FOR delta IN {-1, +1} DO
                next ← curr with digit at position p changed by delta
                IF digit goes below 0 or above 9 THEN CONTINUE
                IF leading digit becomes 0 THEN CONTINUE
                IF isPrime[next] AND next ≠ m THEN CONTINUE
                
                newCost ← cost + next
                IF newCost < dist[next] THEN
                    dist[next] ← newCost
                    pq.PUSH((newCost, next))
    
    RETURN -1
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(N × D × log N) | N = number range (≤10^4), D = digits (≤4), Dijkstra with heap |
| **Space** | O(N) | Distance array + sieve |

---

## Follow-Up Questions

**Q1: Why Dijkstra instead of BFS?**
> Edge weights are not uniform — the cost is the destination value, which varies. Dijkstra handles weighted shortest paths correctly.

**Q2: Why precompute primes?**
> We need O(1) prime checks during graph traversal. The sieve is O(N log log N) preprocessing.

**Q3: What if the numbers had different digit counts?**
> The problem guarantees same digit count, so no leading-zero issues from digit count changes.

---

## Key Takeaway

> **When transforming numbers via digit-level operations with variable costs and forbidden states, model it as a weighted graph and use Dijkstra — precompute forbidden states (primes) with a sieve for O(1) lookups.**
