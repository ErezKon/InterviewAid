# 2440. Create Components With Same Value

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/create-components-with-same-value](https://leetcode.com/problems/create-components-with-same-value)
**Companies:** Sprinklr

---

## Problem Description

There is an undirected tree with `n` nodes labeled from `0` to `n - 1`.

You are given a **0-indexed** integer array `nums` of length `n` where `nums[i]` represents the value of the `i`-th node. You are also given a 2D integer array `edges` of length `n - 1` where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

You are allowed to **delete** some edges, splitting the tree into multiple connected components. Let the **value** of a component be the sum of **all** `nums[i]` for which node `i` is in the component.

Return *the **maximum** number of edges you can delete, such that every connected component in the tree has the same value.*

**Constraints:**
- `1 <= n <= 2 * 10^4`
- `nums.length == n`
- `1 <= nums[i] <= 50`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= edges[i][0], edges[i][1] <= n - 1`
- `edges` represents a valid tree.

## Examples

```
Example 1:
  Input: nums = [6,2,2,2,6], edges = [[0,1],[1,2],[1,3],[3,4]]
  Output: 2
  Explanation: Delete the edges [0,1] and [3,4]. The created components are nodes [0], [1,2,3] and [4].
  The sum of the values in each component equals 6. It can be proven that no better deletion exists, so the answer is 2.
```

```
Example 2:
  Input: nums = [2], edges = []
  Output: 0
  Explanation: There are no edges to be deleted.
```

---

## Key Insight

The target component sum must divide the total sum. Try each divisor `d` of total sum from largest number of components down. For each candidate, DFS to check if the tree can be partitioned into components of sum `total/k`. A subtree "completes" when its sum reaches the target → cut that edge.

---

## Approach

```
FUNCTION componentValue(nums, edges):
    totalSum = SUM(nums)
    adj = build adjacency list

    FOR k ← n DOWN TO 1:
        IF totalSum % k != 0: CONTINUE
        target = totalSum / k

        FUNCTION dfs(u, parent):
            subtreeSum = nums[u]
            FOR v IN adj[u] WHERE v != parent:
                subtreeSum += dfs(v, u)
            IF subtreeSum == target: RETURN 0  // cut here
            RETURN subtreeSum

        IF dfs(0, -1) == 0: RETURN k - 1  // k components = k-1 cuts

    RETURN 0
```

## Walkthrough

Consider the first example:

1. Total sum = 6+2+2+2+6 = 18. Trying `k = 3` components gives target = 6.
2. DFS from node 0 (value 6) returns 0 → cut edge (0,1).
3. Subtree rooted at 1 accumulates 2+2+2 = 6, returns 0 → cut edge (1,2).
4. Remaining subtree rooted at 3 has value 2+6 = 8, but after cutting (3,4) the leaf 4 (value 6) forms a component of sum 6, and node 3 (value 2) joins with node 0 component to reach 6.
5. All components now sum to 6, achieving 2 cuts.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × d(total)) where d = number of divisors |
| **Space** | O(n) |

---

## Key Takeaway

> **Equal-sum tree partitioning: try each divisor of total sum. DFS greedily cuts when a subtree reaches the target sum. Maximum edges removed = components - 1.**