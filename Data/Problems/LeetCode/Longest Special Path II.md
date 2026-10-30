# 3486. Longest Special Path II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-special-path-ii](https://leetcode.com/problems/longest-special-path-ii)
**Companies:** Google

---

## 1. Problem Description

> *Note: the Approach sketch below keeps all values distinct (that is #3425 Longest Special Path I). #3486 allows **one** value to appear twice and returns `[maxLength, minNodes]`. Extend the DFS sliding window with two lower bounds: the usual "last duplicate" bound and a second bound for the one permitted repeated value (when a second duplicate appears, the window start moves to the smaller of the two duplicate positions); track path-length prefix sums and depth to report the minimum node count among longest paths.*

You are given an undirected tree rooted at node `0`, with `n` nodes numbered from `0` to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i, length_i]` indicates an edge between nodes `u_i` and `v_i` with length `length_i`. You are also given an integer array `nums`, where `nums[i]` represents the value at node `i`.

A **special path** is defined as a **downward** path from an ancestor node to a descendant node in which all node values are **distinct**, except for **at most** one value that may appear twice.

Return an array result` of size 2, where `result[0]` is the **length** of the **longest** special path, and `result[1]` is the **minimum** number of nodes in all possible* **longest** special paths.

**Constraints:**
- `2 <= n <= 5 * 10^4`
- `edges.length == n - 1`
- `edges[i].length == 3`
- `0 <= u_i, v_i < n`
- `1 <= length_i <= 10^3`
- `nums.length == n`
- `0 <= nums[i] <= 5 * 10^4`
- The input is generated such that `edges` represents a valid tree.

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
Input: edges = [[0,1,1],[1,2,3],[1,3,1],[2,4,6],[4,7,2],[3,5,2],[3,6,5],[6,8,3]], nums = [1,1,0,3,1,2,1,1,0]
Output: [9,3]
Explanation: In the image below, nodes are colored by their corresponding values in nums.
The longest special paths are 1 -> 2 -> 4 and 1 -> 3 -> 6 -> 8, both having a length of 9. The minimum number of nodes across all longest special paths is 3.
```

**Example 2:**
```
Input: edges = [[1,0,3],[0,2,4],[0,3,5]], nums = [1,1,0,2]
Output: [5,2]
Explanation: The longest path is 0 -> 3 consisting of 2 nodes with a length of 5.
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
