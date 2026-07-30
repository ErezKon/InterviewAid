# 508. Most Frequent Subtree Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-frequent-subtree-sum](https://leetcode.com/problems/most-frequent-subtree-sum)
**Companies:** Amazon, Bloomberg, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS + Counter — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

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

```text
FUNCTION findFrequentTreeSum(root):
    // map sum -> frequency
    SET count ← empty map
    FUNCTION dfs(node):
        IF node IS NULL:
            RETURN 0
        SET leftSum ← dfs(node.left)
        SET rightSum ← dfs(node.right)
        SET total ← node.val + leftSum + rightSum
        INCREMENT count[total] BY 1
        RETURN total
    CALL dfs(root)
    // determine max frequency
    SET maxFreq ← 0
    FOR each (sum, freq) IN count:
        IF freq > maxFreq:
            SET maxFreq ← freq
    // collect all sums with max frequency
    SET result ← []
    FOR each (sum, freq) IN count:
        IF freq == maxFreq:
            APPEND sum TO result
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: root = [5,2,-3]
Output: [2,-3,5]
Explanation: Subtree sums are {5,2,-3}. All appear once, so all are most frequent.
```

**Example 2:**
```
Input: root = [5,2,-5]
Output: [2]
Explanation: Subtree sums are {5,2,-5,2}. The sum 2 appears twice, more than others.
```

---

## 5. Walkthrough

Consider Example 2 with tree `[5,2,-5]`:

| Node | Left Subtree Sum | Right Subtree Sum | Node Value | Total Subtree Sum |
|------|------------------|-------------------|------------|-------------------|
| 2    | 0                | 0                 | 2          | 2                 |
| -5   | 0                | 0                 | -5         | -5                |
| 5    | 2                | -5                | 5          | 2 (5 + 2 + -5)    |

The frequency map becomes `{2:2, -5:1}`. Max frequency is 2, so result `[2]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — one DFS pass |
| **Space** | O(n) — counter + recursion stack |

---

## 7. Key Takeaway

> **Post-order DFS + frequency counting.** Compute subtree sums recursively, count them in a hash map, filter by max frequency.
