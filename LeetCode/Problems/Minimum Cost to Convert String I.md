# 2976. Minimum Cost to Convert String I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-convert-string-i](https://leetcode.com/problems/minimum-cost-to-convert-string-i)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Problem Description

You are given two strings `source` and `target` of equal length consisting of lowercase letters. You can convert a character `c1` to `c2` at a cost defined by a list of operations: each operation `i` allows converting `original[i]` to `changed[i]` with cost `cost[i]`. Operations can be applied repeatedly and in any order. Return the minimum total cost to transform `source` into `target`, or `-1` if impossible.

Constraints:
- `1 ≤ source.length = target.length ≤ 10^5`
- `1 ≤ original.length = changed.length = cost.length ≤ 100`
- All strings contain only lowercase English letters.

## Examples

**Example 1**
```
Input: source = "abc", target = "bcd", original = ["a","b","c"], changed = ["b","c","d"], cost = [1,2,3]
Output: 6
Explanation: Convert a→b (1), b→c (2), c→d (3).
```

**Example 2**
```
Input: source = "aaa", target = "bbb", original = ["a"], changed = ["c"], cost = [5]
Output: -1
Explanation: No sequence of allowed conversions can turn `a` into `b`.
```

## Approach

**Algorithm:** Floyd‑Warshall on 26‑letter graph + greedy per position

Create a directed weighted graph of 26 nodes (letters). For each allowed operation add an edge `original[i] → changed[i]` with weight `cost[i]`. Run Floyd‑Warshall to compute the cheapest conversion cost between any pair of letters. Then iterate over each index `i`; if `source[i] ≠ target[i]` add the pre‑computed shortest distance. If any distance is infinite, return `-1`.

```text
FUNCTION minimumCost(source, target, original, changed, cost):
    // 1. Build distance matrix
    dist ← ARRAY(26, ARRAY(26, INFINITY))
    FOR i ← 0 TO 25 DO dist[i][i] ← 0
    FOR i ← 0 TO LEN(original) - 1 DO
        u ← ORD(original[i]) - ORD('a')
        v ← ORD(changed[i]) - ORD('a')
        dist[u][v] ← MIN(dist[u][v], cost[i])
    END FOR
    // 2. Floyd‑Warshall
    FOR k ← 0 TO 25 DO
        FOR i ← 0 TO 25 DO
            FOR j ← 0 TO 25 DO
                IF dist[i][k] + dist[k][j] < dist[i][j] THEN
                    dist[i][j] ← dist[i][k] + dist[k][j]
                END IF
            END FOR
        END FOR
    END FOR
    // 3. Compute total cost
    total ← 0
    FOR i ← 0 TO LEN(source) - 1 DO
        IF source[i] ≠ target[i] THEN
            u ← ORD(source[i]) - ORD('a')
            v ← ORD(target[i]) - ORD('a')
            IF dist[u][v] = INFINITY THEN RETURN -1
            total ← total + dist[u][v]
        END IF
    END FOR
    RETURN total
```

## Walkthrough

| Index | `source[i]` | `target[i]` | Shortest cost `dist` | Cumulative total |
|-------|-------------|-------------|----------------------|------------------|
| 0 | a | b | 1 (a→b) | 1 |
| 1 | b | c | 2 (b→c) | 3 |
| 2 | c | d | 3 (c→d) | 6 |

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(26³ + n)** – Floyd‑Warshall on 26 nodes plus linear scan of strings |
| Space  | **O(26²)** – distance matrix |

## Follow‑Up Questions

1. How would you handle the case where operations have different costs for forward and reverse conversions?
2. Can the algorithm be extended to support batch conversions where multiple characters change simultaneously?
3. What if the alphabet size is larger (e.g., Unicode); which approach would scale better?

## Key Takeaway

Modeling character conversions as a tiny graph and applying all‑pairs shortest paths lets us answer each character’s conversion cost in O(1), yielding an overall linear‑time solution.
