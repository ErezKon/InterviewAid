# 3068. Find the Maximum Sum of Node Values

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-sum-of-node-values](https://leetcode.com/problems/find-the-maximum-sum-of-node-values)
**Companies:** Blackrock, Deutsche Bank, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Pair Gains — O(n log n) ✅](#4-approach-greedy-pair-gains--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There exists an **undirected** tree with `n` nodes numbered `0` to `n - 1`. You are given a **0-indexed** 2D integer array `edges` of length `n - 1`, where `edges[i] = [ui, vi]` indicates that there is an edge between nodes `ui` and `vi` in the tree. You are also given a **positive** integer `k`, and a **0-indexed** array of **non-negative** integers `nums` of length `n`, where `nums[i]` represents the **value** of the node numbered `i`.

Alice wants the sum of values of tree nodes to be **maximum**, for which Alice can perform the following operation **any** number of times (**including zero**) on the tree:

- Choose any edge `[u, v]` connecting the nodes `u` and `v`, and update their values as follows:
  - `nums[u] = nums[u] XOR k`
  - `nums[v] = nums[v] XOR k`

Return *the **maximum** possible **sum** of the **values** Alice can achieve by performing the operation **any** number of times*.

**Constraints:**
- `2 <= n == nums.length <= 2 × 10⁴`
- `1 <= k <= 10⁹`
- `0 <= nums[i] <= 10⁹`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= edges[i][0], edges[i][1] <= n - 1`
- The input is generated such that `edges` represent a valid tree.

---

## 2. Examples

```
Example 1:
  Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
  Output: 6
  Explanation: Alice can achieve the maximum sum of 6 using a single operation:
  - Choose the edge [0,2]. nums[0] and nums[2] become: 1 XOR 3 = 2, and the array nums becomes:
    [1,2,1] -> [2,2,2].
  The total sum of values is 2 + 2 + 2 = 6.
  It can be shown that 6 is the maximum achievable sum of values.

Example 2:
  Input: nums = [2,3], k = 7, edges = [[0,1]]
  Output: 9
  Explanation: Alice can achieve the maximum sum of 9 using a single operation:
  - Choose the edge [0,1]. nums[0] becomes: 2 XOR 7 = 5 and nums[1] become: 3 XOR 7 = 4, and the
    array nums becomes: [2,3] -> [5,4].
  The total sum of values is 5 + 4 = 9.
  It can be shown that 9 is the maximum achievable sum of values.

Example 3:
  Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
  Output: 42
  Explanation: The maximum achievable sum is 42 which can be achieved by Alice performing no operations.
```

---

## 3. Key Insight

> Any operation XORs an **even** number of nodes (pairs along a path). So the problem reduces to: choose any even-sized subset of nodes to XOR with k. Greedily pick pairs with the highest combined gain.

---

## 4. Approach: Greedy Pair Gains — O(n log n) ✅

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

## 5. Walkthrough

```
nums = [1, 2, 1], k = 3, edges = [[0,1],[1,2]]

gains = [(1^3)-1, (2^3)-2, (1^3)-1] = [1, -1, 1] → sorted desc: [1, 1, -1]

Pair (1, 1): sum = 2 > 0 → add to total
No more valid pairs.

total = (1+2+1) + 2 = 6 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorting gains |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

1. How would the solution change if XOR could be applied to any subset (not necessarily even-sized)?
2. Can the approach be extended to weighted edges where each XOR operation incurs a cost?
3. What if the tree is dynamic, with nodes being added or removed?

---

## 8. Key Takeaway

> The tree structure is irrelevant — any even-sized subset can be XORed. **Sort gains descending, greedily pair up positive-sum pairs.** This works because XOR on a path can be decomposed into independent edge operations.
