# 2836. Maximize Value of Function in a Ball Passing Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-value-of-function-in-a-ball-passing-game](https://leetcode.com/problems/maximize-value-of-function-in-a-ball-passing-game)
**Companies:** Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Lifting — O(n log k)](#approach-binary-lifting--on-log-k-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a functional graph where each node `i` has exactly one outgoing edge to `receiver[i]`, pass the ball `k` times starting from each node. The **value** = sum of all node IDs visited (including start). Find the starting node that maximizes this value.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ 10¹⁰`

---

## Key Insight

> With k up to 10¹⁰, simulating each pass is too slow. Use **binary lifting**: precompute for each node where you end up after 2⁰, 2¹, 2², ... steps, along with the sum of IDs accumulated. Then decompose k into powers of 2 and combine.

---

## Approach: Binary Lifting — O(n log k) ✅

```
FUNCTION maxValue(receiver, k):
    n = len(receiver); LOG = log2(k) + 1
    // jump[j][i] = node reached after 2^j steps from i
    // sumVal[j][i] = sum of IDs accumulated in those 2^j steps
    jump[0][i] = receiver[i]; sumVal[0][i] = receiver[i]
    
    FOR j ← 1 TO LOG:
        FOR i ← 0 TO n - 1:
            jump[j][i] = jump[j-1][jump[j-1][i]]
            sumVal[j][i] = sumVal[j-1][i] + sumVal[j-1][jump[j-1][i]]
    
    result = 0
    FOR start ← 0 TO n - 1:
        curr = start; total = start
        FOR j ← LOG DOWNTO 0:
            IF k has bit j set:
                total += sumVal[j][curr]
                curr = jump[j][curr]
        result = MAX(result, total)
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Lifting | **O(n log k)** | O(n log k) |

---

## Key Takeaway

> **Binary lifting on functional graphs handles "follow k edges and aggregate" in O(n log k).** Precompute jump tables and value sums for powers of 2, then decompose k into binary.
