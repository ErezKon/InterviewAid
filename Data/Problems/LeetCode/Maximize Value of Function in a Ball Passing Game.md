# 2836. Maximize Value of Function in a Ball Passing Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-value-of-function-in-a-ball-passing-game](https://leetcode.com/problems/maximize-value-of-function-in-a-ball-passing-game)
**Companies:** Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Lifting — O(n log k)](#approach-binary-lifting--on-log-k-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a functional graph where each node `i` has exactly one outgoing edge to `receiver[i]`, pass the ball `k` times starting from each node. The **value** = sum of all node IDs visited (including start). Find the starting node that maximizes this value.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ 10¹⁰`

---

## Examples

**Example 1:**
```
Input: receiver = [1,2,0], k = 4
Output: 6
Explanation:
- Starting at node 0: path 0→1→2→0→1, sum = 0+1+2+0+1 = 4
- Starting at node 1: 1→2→0→1→2, sum = 1+2+0+1+2 = 6 (maximum)
- Starting at node 2: 2→0→1→2→0, sum = 2+0+1+2+0 = 5
```

**Example 2:**
```
Input: receiver = [2,2,2], k = 3
Output: 6
Explanation: Starting at any node reaches node 2 three times, sum = start + 2 + 2 + 2. Starting at node 2 gives 2+2+2+2 = 8, which is maximum.
```

---

## Key Insight

> With k up to 10¹⁰, simulating each pass is too slow. Use **binary lifting**: precompute for each node where you end up after 2⁰, 2¹, 2², ... steps, along with the sum of IDs accumulated. Then decompose k into powers of 2 and combine.

---

## Approach: Binary Lifting — O(n log k) ✅

```text
FUNCTION maxValue(receiver, k):
    n = len(receiver); LOG = floor(log2(k)) + 1
    // jump[j][i] = node reached after 2^j steps from i
    // sumVal[j][i] = sum of IDs accumulated in those 2^j steps
    FOR i ← 0 TO n - 1:
        jump[0][i] = receiver[i]
        sumVal[0][i] = receiver[i]
    
    FOR j ← 1 TO LOG:
        FOR i ← 0 TO n - 1:
            jump[j][i] = jump[j-1][jump[j-1][i]]
            sumVal[j][i] = sumVal[j-1][i] + sumVal[j-1][jump[j-1][i]]
    
    result = 0
    FOR start ← 0 TO n - 1:
        curr = start; total = start
        FOR j ← LOG DOWNTO 0:
            IF (k >> j) & 1 == 1:
                total += sumVal[j][curr]
                curr = jump[j][curr]
        result = MAX(result, total)
    
    RETURN result
```

---

## Walkthrough

Consider `receiver = [1,2,0]` and `k = 4`.
1. Precompute LOG = 3 (since 2³ = 8 > 4).
2. Build tables:
   - `jump[0] = [1,2,0]`, `sumVal[0] = [1,2,0]`.
   - `jump[1][i] = jump[0][jump[0][i]]` → `[2,0,1]`, `sumVal[1][i] = sumVal[0][i] + sumVal[0][jump[0][i]]` → `[1+2, 2+0, 0+1] = [3,2,1]`.
   - `jump[2][i] = jump[1][jump[1][i]]` → `[0,1,2]`, `sumVal[2][i] = sumVal[1][i] + sumVal[1][jump[1][i]]` → `[3+1, 2+3, 1+2] = [4,5,3]`.
3. For each start node, decompose `k=4` = `2²`.
   - Start 0: total = 0 + sumVal[2][0] = 0 + 4 = 4, end at jump[2][0] = 0.
   - Start 1: total = 1 + sumVal[2][1] = 1 + 5 = 6, end at 1.
   - Start 2: total = 2 + sumVal[2][2] = 2 + 3 = 5, end at 2.
   Maximum total = 6.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Lifting | **O(n log k)** | O(n log k) |

---

## Key Takeaway

> **Binary lifting on functional graphs handles "follow k edges and aggregate" in O(n log k).** Precompute jump tables and value sums for powers of 2, then decompose k into binary.
