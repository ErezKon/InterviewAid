# 2673. Make Costs of Paths Equal in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree](https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree)
**Companies:** Tiktok

---

## 1. Problem Description

Given a perfect binary tree where each node has an associated cost, you may increment the cost of any node by any non‑negative integer. The goal is to make the total cost of every root‑to‑leaf path equal while minimizing the sum of all increments.

---

## 2. Examples

**Example 1:**
```
Input: cost = [0,1,2,3,4,5,6]
Output: 3
Explanation: Increment node 2 by 1 and node 3 by 2 to make all root‑to‑leaf path sums equal to 9.
```

**Example 2:**
```
Input: cost = [5,5,5]
Output: 0
Explanation: All paths already have equal cost; no increments needed.
```

---

## 3. Approach: Bottom‑Up Greedy — O(n) ✅

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

Consider `cost = [0,1,2,3,4,5,6]` (indices 1‑7):
| Step | Node i | left child | right child | Action | increments |
|------|--------|------------|-------------|--------|------------|
| 1 | 3 | 5 | 6 | Increment node 5 by 1 (to match 6) | +1 |
| 2 | 2 | 3 | 4 | Increment node 3 by 1 (to match 4) | +1 |
| 3 | 1 | (cost after children) 5 | (cost after children) 6 | Increment node 5 by 1 (to match 6) | +1 |
Total increments = 3.

---

## 5. Complexity Analysis

- **Time:** O(n) – each internal node is visited once.
- **Space:** O(1) extra – modifications are done in‑place.

---

## 6. Follow‑Up Questions

- How would the solution change if the tree were not perfect?
- Can you extend the algorithm to return the final costs of all nodes?
- What if decrements were also allowed?

---

## 7. Key Takeaway

> Equalizing each pair of sibling sub‑paths greedily from the leaves upward yields the minimal total increment.
