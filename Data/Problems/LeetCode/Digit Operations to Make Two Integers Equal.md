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

You are given two integers `n` and `m` that consist of the **same** number of digits.

You can perform the following operations **any** number of times:

- Choose **any** digit from `n` that is not 9 and **increase** it by 1.
- Choose **any** digit from `n` that is not 0 and **decrease** it by 1.

The integer `n` must not be a prime number at any point, including its original value and after each operation.

The cost of a transformation is the sum of **all** values that `n` takes throughout the operations performed.

Return the **minimum** cost to transform `n` into `m`. If it is impossible, return -1.

**Constraints:**
- `1 <= n, m < 10^4`
- `n` and `m` consist of the same number of digits.

---

## Examples

**Example 1:**
```
Input: n = 10, m = 12
Output: 85
Explanation: We perform the following operations:
- Increase the first digit, now n = 20.
- Increase the second digit, now n = 21.
- Increase the second digit, now n = 22.
- Decrease the first digit, now n = 12.
```

**Example 2:**
```
Input: n = 4, m = 8
Output: -1
Explanation: It is impossible to make n equal to m.
```

**Example 3:**
```
Input: n = 6, m = 2
Output: -1
Explanation: Since 2 is already a prime, we can't make n equal to m.
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
