# 1273. Delete Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-tree-nodes](https://leetcode.com/problems/delete-tree-nodes)
**Companies:** Microsoft

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A tree rooted at node 0 is given as follows:

- The number of nodes is `nodes`;
- The value of the `i^th` node is `value[i]`;
- The parent of the `i^th` node is `parent[i]`.

Remove every subtree whose sum of values of nodes is zero.

Return *the number of the remaining nodes in the tree*.

**Constraints:**
- `1 <= nodes <= 10^4`
- `parent.length == nodes`
- `0 <= parent[i] <= nodes - 1`
- `parent[0] == -1` which indicates that `0` is the root.
- `value.length == nodes`
- `-10^5 <= value[i] <= 10^5`
- The given input is **guaranteed** to represent a **valid tree**.

---

## Examples

**Example 1:**
```
Input: nodes = 7, parent = [-1,0,0,1,2,2,2], value = [1,-2,4,0,-2,-1,-1]
Output: 2
```

**Example 2:**
```
Input: nodes = 7, parent = [-1,0,0,1,2,2,2], value = [1,-2,4,0,-2,-1,-2]
Output: 6
```

---

## Approach

```text
FUNCTION deleteTreeNodes(nodes, parent, value):
    // Post-order traversal to compute subtree sums and node counts
    sum ← ARRAY of size nodes, initialized with value[i]
    cnt ← ARRAY of size nodes, initialized with 1
    // Process nodes in reverse topological order (children before parents)
    FOR node IN reverse_topological_order(nodes):
        p ← parent[node]
        IF p != -1:
            sum[p] ← sum[p] + sum[node]
            cnt[p] ← cnt[p] + cnt[node]
        IF sum[node] == 0:
            // Delete entire subtree rooted at node
            cnt[node] ← 0
    // Root is node 0 (parent[0] == -1)
    RETURN cnt[0]
```

---

## Walkthrough

**Example 1:** `nodes = 7`, `parent = [-1,0,0,1,2,2,3]`, `value = [1,-2,4,0,-2,-1,3]`

1. Build adjacency and compute reverse topological order: `[6,5,4,3,2,1,0]`.
2. Initialize `sum = [1,-2,4,0,-2,-1,3]`, `cnt = [1,1,1,1,1,1,1]`.
3. Process node 6 (value 3): parent 3 → `sum[3]=0+3=3`, `cnt[3]=1+1=2`. `sum[6]!=0`.
4. Node 5 (value -1): parent 2 → `sum[2]=4+(-1)=3`, `cnt[2]=1+1=2`.
5. Node 4 (value -2): parent 2 → `sum[2]=3+(-2)=1`, `cnt[2]=2+1=3`.
6. Node 3 (sum now 3): parent 1 → `sum[1]= -2 + 3 = 1`, `cnt[1]=1+2=3`.
7. Node 2 (sum 1): parent 0 → `sum[0]=1+1=2`, `cnt[0]=1+3=4`.
8. Node 1 (sum 1): parent 0 → `sum[0]=2+1=3`, `cnt[0]=4+3=7`.
9. Node 0 (sum 3) ≠ 0, so no deletion.
10. Final `cnt[0] = 5` after pruning subtrees with sum 0 (node 3's subtree was removed). Return `5`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n is the number of nodes |
| **Space** | O(n) for the `sum` and `cnt` arrays |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the list of remaining node indices?
2. Can the solution be adapted to handle weighted edges instead of node values?
3. What changes are needed if the tree is given as an adjacency list rather than parent array?

---

## Key Takeaway

> **Post-order aggregation:** compute subtree sums bottom-up; if a subtree sum is zero, its node count becomes zero, effectively deleting it while propagating correct sums upward.
