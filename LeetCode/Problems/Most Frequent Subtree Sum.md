# 508. Most Frequent Subtree Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-frequent-subtree-sum](https://leetcode.com/problems/most-frequent-subtree-sum)
**Companies:** Amazon, Bloomberg, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS + Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary tree, return the **most frequent** subtree sum(s). The subtree sum of a node = sum of all values in its subtree.

**Constraints:**
- `1 <= n <= 10⁴`

---

## 2. Key Insight

> DFS computes each subtree sum bottom-up. Count all sums, return those with max frequency.

---

## 3. Approach: DFS + Counter — O(n) ✅

```
FUNCTION findFrequentTreeSum(root):
    count = Counter()
    FUNCTION dfs(node):
        IF NOT node: RETURN 0
        s = node.val + dfs(node.left) + dfs(node.right)
        count[s] += 1
        RETURN s
    dfs(root)
    maxFreq = MAX(count.values())
    RETURN [s for s, c in count.items() if c == maxFreq]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — one DFS pass |
| **Space** | O(n) — counter + recursion stack |

---

## 5. Key Takeaway

> **Post-order DFS + frequency counting.** Compute subtree sums recursively, count them in a hash map, filter by max frequency.
