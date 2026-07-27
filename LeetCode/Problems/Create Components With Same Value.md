# 2440. Create Components With Same Value

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/create-components-with-same-value](https://leetcode.com/problems/create-components-with-same-value)
**Companies:** Sprinklr

---

## Problem Description

Given a tree with node values, find the maximum number of edges you can remove so that every remaining component has the same sum.

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

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × d(total)) where d = number of divisors |
| **Space** | O(n) |

---

## Key Takeaway

> **Equal-sum tree partitioning: try each divisor of total sum. DFS greedily cuts when a subtree reaches the target sum. Maximum edges removed = components - 1.**
