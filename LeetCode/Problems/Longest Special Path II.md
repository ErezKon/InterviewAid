# 3486. Longest Special Path II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-special-path-ii](https://leetcode.com/problems/longest-special-path-ii)
**Companies:** Google

---

## 1. Problem Description

Find the longest path in a weighted tree where all node values are distinct along the path. Variant with additional constraints.

---

## 2. Approach: DFS + Sliding Window on Path ✅

```
// DFS from root, maintain current path
// Track last occurrence of each node value
// Sliding window on the path to ensure all values are distinct
// Track max weighted path length
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: tree = [[0,1,3],[1,2,4],[2,3,5]], values = [1,2,3,4]
Output: 12
Explanation: The longest path with distinct values is 0→1→2→3 with total weight 3+4+5 = 12.
```

**Example 2:**
```
Input: tree = [[0,1,2],[1,2,2],[2,3,2]], values = [1,1,2,3]
Output: 4
Explanation: The longest distinct‑value path is 2→3 with weight 2, or 0→1 with weight 2, both give length 2. The maximum weighted sum is 4.
```

---

## 4. Walkthrough

| Step | Node | Current Path (values) | Window Start | Max Length |
|------|------|-----------------------|--------------|------------|
| 1 | 0 | [1] | 0 | 0 |
| 2 | 1 | [1,2] | 0 | 3 |
| 3 | 2 | [1,2,3] | 0 | 7 |
| 4 | 3 | [1,2,3,4] | 0 | 12 |

The DFS explores each child, expanding the sliding window while values remain unique. When a duplicate appears, the window start moves forward, removing earlier values until uniqueness is restored.

---

## 5. Complexity Analysis

**Time:** `O(N)` – each node is visited once and window adjustments are constant‑time.
**Space:** `O(N)` – recursion stack and hash map storing last occurrence of each value.

---

## 6. Follow‑Up Questions

* How would you modify the solution if the tree were directed?
* Can you extend the approach to handle the case where up to `k` duplicate values are allowed?
* What if edge weights can be negative?

---

## Key Takeaway

> Combine tree DFS with a sliding window constraint on the root‑to‑current path. Backtrack window state when returning from DFS.
