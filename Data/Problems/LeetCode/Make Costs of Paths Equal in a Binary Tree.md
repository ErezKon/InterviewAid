# 2673. Make Costs of Paths Equal in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree](https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree)
**Companies:** Tiktok

---

## 1. Problem Description

You are given an integer `n` representing the number of nodes in a **perfect binary tree** consisting of nodes numbered from `1` to `n`. The root of the tree is node `1` and each node `i` in the tree has two children where the left child is the node `2 * i` and the right child is `2 * i + 1`.

Each node in the tree also has a **cost** represented by a given **0-indexed** integer array `cost` of size `n` where `cost[i]` is the cost of node `i + 1`. You are allowed to **increment** the cost of **any** node by `1` **any** number of times.

Return *the **minimum** number of increments you need to make the cost of paths from the root to each **leaf** node equal*.

**Note**:

- A **perfect binary tree** is a tree where each node, except the leaf nodes, has exactly 2 children.
- The **cost of a path** is the sum of costs of nodes in the path.

**Constraints:**

- `3 <= n <= 10^5`
- `n + 1` is a power of `2`
- `cost.length == n`
- `1 <= cost[i] <= 10^4`

---

## 2. Examples

```
Example 1:
  Input: n = 7, cost = [1,5,2,2,3,3,1]
  Output: 6
  Explanation: (tree: node 1 = 1; nodes 2,3 = 5,2; leaves 4..7 = 2,3,3,1)
  We can do the following increments:
  - Increase the cost of node 4 one time.
  - Increase the cost of node 3 three times.
  - Increase the cost of node 7 two times.
  Each path from the root to a leaf will have a total cost of 9.
  The total increments we did is 1 + 3 + 2 = 6.
  It can be shown that this is the minimum answer we can achieve.
```

```
Example 2:
  Input: n = 3, cost = [5,3,3]
  Output: 0
  Explanation: The two paths already have equal total costs, so no increments are needed.
```

---

## 3. Approach: Bottom-Up Greedy — O(n) ✅

```
FUNCTION minIncrements(n, cost):
    // n = number of nodes, cost indexed from 1 (root) to n
    SET increments ← 0
    FOR i ← n/2 DOWN TO 1: // process internal nodes from leaves upward
        SET left ← cost[2 * i]
        SET right ← cost[2 * i + 1]
        // Make the smaller child catch up to the larger one
        SET increments ← increments + ABS(left - right)
        // Propagate the larger path cost upward
        SET cost[i] ← cost[i] + MAX(left, right)
    RETURN increments
```

| Time | Space |
|------|-------|
| O(n) | O(1) extra |

---

## 4. Walkthrough

Consider `cost = [0,1,2,3,4,5,6]` (indices 1-7):
| Step | Node i | left child | right child | Action | increments |
|------|--------|------------|-------------|--------|------------|
| 1 | 3 | 5 | 6 | Increment node 5 by 1 (to match 6) | +1 |
| 2 | 2 | 3 | 4 | Increment node 3 by 1 (to match 4) | +1 |
| 3 | 1 | (cost after children) 5 | (cost after children) 6 | Increment node 5 by 1 (to match 6) | +1 |
Total increments = 3.

---

## 5. Complexity Analysis

- **Time:** O(n) – each internal node is visited once.
- **Space:** O(1) extra – modifications are done in-place.

---

## 6. Follow-Up Questions

- How would the solution change if the tree were not perfect?
- Can you extend the algorithm to return the final costs of all nodes?
- What if decrements were also allowed?

---

## 7. Key Takeaway

> Equalizing each pair of sibling sub-paths greedily from the leaves upward yields the minimal total increment.
