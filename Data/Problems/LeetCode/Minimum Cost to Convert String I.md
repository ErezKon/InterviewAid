# 2976. Minimum Cost to Convert String I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-convert-string-i](https://leetcode.com/problems/minimum-cost-to-convert-string-i)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Problem Description

You are given two **0-indexed** strings `source` and `target`, both of length `n` and consisting of **lowercase** English letters. You are also given two **0-indexed** character arrays `original` and `changed`, and an integer array `cost`, where `cost[i]` represents the cost of changing the character `original[i]` to the character `changed[i]`.

You start with the string `source`. In one operation, you can pick a character `x` from the string and change it to the character `y` at a cost of `z` **if** there exists **any** index `j` such that `cost[j] == z`, `original[j] == x`, and `changed[j] == y`.

Return *the **minimum** cost to convert the string* `source` *to the string* `target` *using **any** number of operations. If it is impossible to convert* `source` *to* `target`, *return* `-1`.

**Note** that there may exist indices `i`, `j` such that `original[j] == original[i]` and `changed[j] == changed[i]`.

**Constraints:**
- `1 ≤ source.length == target.length ≤ 10^5`
- `source`, `target` consist of lowercase English letters.
- `1 ≤ cost.length == original.length == changed.length ≤ 2000`
- `original[i]`, `changed[i]` are lowercase English letters.
- `1 ≤ cost[i] ≤ 10^6`
- `original[i] != changed[i]`

## Examples

```
Example 1:
  Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
  Output: 28
  Explanation: To convert the string "abcd" to string "acbe":
  - Change value at index 1 from 'b' to 'c' at a cost of 5.
  - Change value at index 2 from 'c' to 'e' at a cost of 1.
  - Change value at index 2 from 'e' to 'b' at a cost of 2.
  - Change value at index 3 from 'd' to 'e' at a cost of 20.
  The total cost incurred is 5 + 1 + 2 + 20 = 28.
  It can be shown that this is the minimum possible cost.
```

```
Example 2:
  Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
  Output: 12
  Explanation: To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.
```

```
Example 3:
  Input: source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
  Output: -1
  Explanation: It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.
```

## Approach

**Algorithm:** Floyd-Warshall on 26-letter graph + greedy per position

Create a directed weighted graph of 26 nodes (letters). For each allowed operation add an edge `original[i] → changed[i]` with weight `cost[i]`. Run Floyd-Warshall to compute the cheapest conversion cost between any pair of letters. Then iterate over each index `i`; if `source[i] ≠ target[i]` add the pre-computed shortest distance. If any distance is infinite, return `-1`.

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
    // 2. Floyd-Warshall
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
| Time   | **O(26³ + n)** – Floyd-Warshall on 26 nodes plus linear scan of strings |
| Space  | **O(26²)** – distance matrix |

## Follow-Up Questions

1. How would you handle the case where operations have different costs for forward and reverse conversions?
2. Can the algorithm be extended to support batch conversions where multiple characters change simultaneously?
3. What if the alphabet size is larger (e.g., Unicode); which approach would scale better?

## Key Takeaway

Modeling character conversions as a tiny graph and applying all-pairs shortest paths lets us answer each character’s conversion cost in O(1), yielding an overall linear-time solution.
