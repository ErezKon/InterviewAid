# 2583. Kth Largest Sum in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## 1. Problem Description

You are given the `root` of a binary tree and a positive integer `k`.

The **level sum** in the tree is the sum of the values of the nodes that are on the **same** level.

Return* the *`k^th`* **largest** level sum in the tree (not necessarily distinct)*. If there are fewer than `k` levels in the tree, return `-1`.

**Note** that two nodes are on the same level if they have the same distance from the root.

**Constraints:**
- The number of nodes in the tree is `n`.
- `2 <= n <= 10^5`
- `1 <= Node.val <= 10^6`
- `1 <= k <= n`

---

## 2. Approach: BFS + Sort — O(n log n) ✅

```text
FUNCTION kthLargestLevelSum(root, k):
    IF root IS NULL: RETURN -1
    levelSums ← []
    queue ← [root]
    WHILE queue IS NOT EMPTY:
        levelSum ← 0
        nextQueue ← []
        FOR node IN queue:
            levelSum ← levelSum + node.val
            IF node.left IS NOT NULL: APPEND node.left TO nextQueue
            IF node.right IS NOT NULL: APPEND node.right TO nextQueue
        APPEND levelSum TO levelSums
        queue ← nextQueue
    IF k > LENGTH(levelSums): RETURN -1
    SORT levelSums IN DESCENDING ORDER
    RETURN levelSums[k - 1]
```

---

## 3. Examples

**Example 1:**
```
Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2^nd largest level sum is 13.
```

**Example 2:**
```
Input: root = [1,2,null,3], k = 1
Output: 3
Explanation: The largest level sum is 3.
```

---

## 4. Walkthrough

Consider the tree `[5,2,9,null,3]` and `k = 2`.

1. **Initialize:** `queue = [root(5)]`.
2. **Level 0:** Sum = 5 → `levelSums = [5]`. Children → `[2,9]`.
3. **Level 1:** Process nodes 2 and 9. Sum = 2+9 = 11 → `levelSums = [5,11]`. Children → `[3]` (only node 2 has right child 3).
4. **Level 2:** Process node 3. Sum = 3 → `levelSums = [5,11,3]`. No more children, BFS ends.
5. **Sort descending:** `[11,5,3]`.
6. **k-th largest:** `k=2` → second element = `5`.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time   | O(n + L log L) – BFS visits each node once (`O(n)`), then sorting `L` level sums (`O(L log L)`). |
| Space  | O(n) – queue for BFS and list of level sums. |

---

## 6. Follow-Up Questions

- How would you find the k-th largest level sum without sorting all sums (e.g., using a min-heap of size `k`)?
- Can you adapt the algorithm to return the k-th smallest level sum?
- What changes are needed if the tree is extremely large and cannot fit entirely in memory?

---

## Key Takeaway

> Perform a level-order traversal to collect each level’s sum, then select the k-th largest sum—sorting or a heap makes the selection efficient.
