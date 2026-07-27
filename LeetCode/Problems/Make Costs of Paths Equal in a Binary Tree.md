# 2673. Make Costs of Paths Equal in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree](https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree)
**Companies:** Tiktok

---

## 1. Problem Description

Given a perfect binary tree with node costs, increment costs so all root-to-leaf paths have equal total cost. Minimize total increments.

---

## 2. Approach: Bottom-Up Greedy — O(n) ✅

```
FUNCTION minIncrements(n, cost):
    increments = 0
    FOR i ← n/2 DOWN TO 1:    // process from leaves upward
        left = cost[2*i]; right = cost[2*i + 1]
        increments += ABS(left - right)
        cost[i] += MAX(left, right)    // propagate max path cost up
    RETURN increments
```

| Time | Space |
|------|-------|
| O(n) | O(1) extra |

---

## 3. Key Takeaway

> At each internal node, equalize its two children by incrementing the smaller one. Propagate the max upward. Greedy bottom-up works because equalizing locally is optimal.
