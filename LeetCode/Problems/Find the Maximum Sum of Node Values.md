# 3068. Find the Maximum Sum of Node Values

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-sum-of-node-values](https://leetcode.com/problems/find-the-maximum-sum-of-node-values)
**Companies:** Blackrock, Deutsche Bank, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Pair Gains — O(n log n) ✅](#3-approach-greedy-pair-gains--on-log-n-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a tree with `n` nodes, each having a value, you can select any edge and XOR both endpoint values with `k`. Maximize the sum of all node values.

**Constraints:**
- `1 <= n <= 2 × 10⁴`
- `1 <= k <= 10⁹`

---

## 2. Key Insight

> Any operation XORs an **even** number of nodes (pairs along a path). So the problem reduces to: choose any even-sized subset of nodes to XOR with k. Greedily pick pairs with the highest combined gain.

---

## 3. Approach: Greedy Pair Gains — O(n log n) ✅

```
FUNCTION maximumValueSum(nums, k, edges):
    // XOR with k can be applied to any even number of nodes (pairs on path)
    total = SUM(nums)
    gains = sorted([(n ^ k) - n for n in nums], reverse=True)
    FOR i ← 0 TO len(gains) - 1 STEP 2:
        IF i + 1 < len(gains) AND gains[i] + gains[i+1] > 0:
            total += gains[i] + gains[i+1]
        ELSE: BREAK
    RETURN total
```

---

## 4. Walkthrough

```
nums = [1, 2, 1], k = 3, edges = [[0,1],[1,2]]

gains = [(1^3)-1, (2^3)-2, (1^3)-1] = [1, -1, 1] → sorted desc: [1, 1, -1]

Pair (1, 1): sum = 2 > 0 → add to total
No more valid pairs.

total = (1+2+1) + 2 = 6 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorting gains |
| **Space** | O(n) |

---

## 6. Key Takeaway

> The tree structure is irrelevant — any even-sized subset can be XORed. **Sort gains descending, greedily pair up positive-sum pairs.** This works because XOR on a path can be decomposed into independent edge operations.
