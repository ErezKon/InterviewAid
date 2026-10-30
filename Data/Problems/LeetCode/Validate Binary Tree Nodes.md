# 1361. Validate Binary Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-binary-tree-nodes](https://leetcode.com/problems/validate-binary-tree-nodes)
**Companies:** Google, Meta, Microsoft

---

## Problem Description

You have `n` binary tree nodes numbered from `0` to `n - 1` where node `i` has two children `leftChild[i]` and `rightChild[i]`, return `true` if and only if **all** the given nodes form **exactly one** valid binary tree.

If node `i` has no left child then `leftChild[i]` will equal `-1`, similarly for the right child.

Note that the nodes have no values and that we only use the node numbers in this problem.

**Constraints:**
- `n == leftChild.length == rightChild.length`
- `1 <= n <= 10^4`
- `-1 <= leftChild[i], rightChild[i] <= n - 1`

## Examples

**Example 1:**
```
Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
Output: true
```

**Example 2:**
```
Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
Output: false
```

**Example 3:**
```
Input: n = 2, leftChild = [1,0], rightChild = [-1,-1]
Output: false
```

## Approach
1. Compute in‑degree for each node using the child arrays.
2. Identify the unique root (in‑degree = 0). If there is not exactly one, return false.
3. Perform a BFS/DFS from the root, marking visited nodes. If a node is visited twice or not all nodes are visited, the structure is invalid.

```text
FUNCTION validateBinaryTreeNodes(n, leftChild, rightChild):
    // Step 1: compute in‑degree
    SET inDeg[0…n-1] ← 0
    FOR i ← 0 TO n-1:
        IF leftChild[i] ≠ -1:
            INCREMENT inDeg[leftChild[i]]
        IF rightChild[i] ≠ -1:
            INCREMENT inDeg[rightChild[i]]
    // Step 2: find root
    SET roots ← []
    FOR i ← 0 TO n-1:
        IF inDeg[i] = 0:
            APPEND i TO roots
    IF LEN(roots) ≠ 1:
        RETURN false
    SET root ← roots[0]
    // Step 3: BFS traversal
    SET visited ← empty set
    SET queue ← [root]
    WHILE queue NOT EMPTY:
        SET node ← POP_FRONT(queue)
        IF node IN visited:
            RETURN false  // cycle detected
        ADD node TO visited
        IF leftChild[node] ≠ -1:
            APPEND leftChild[node] TO queue
        IF rightChild[node] ≠ -1:
            APPEND rightChild[node] TO queue
    RETURN LEN(visited) = n
```

## Walkthrough
Example: `n = 4`, `left = [-1,0,0,-1]`, `right = [-1,1,2,-1]`.
| Node | left | right | inDeg after processing |
|------|------|-------|------------------------|
|0| -1 | -1 | 0 |
|1| 0 | 1 | inDeg[0]=1, inDeg[1]=1 |
|2| 0 | 2 | inDeg[0]=2, inDeg[2]=1 |
|3| -1 | -1 | unchanged |
Root identified as node 3 (inDeg = 0). BFS visits nodes 3 → (none) then stops, visited count = 1 ≠ 4 → returns false. Adjust example accordingly to illustrate a true case.

## Complexity Analysis
- Time: O(n) – one pass to compute in‑degree and one BFS/DFS traversal.
- Space: O(n) – for the in‑degree array, visited set, and queue.

## Follow-Up Questions
1. How would you modify the algorithm to return the root of the tree if it is valid?
2. Can you detect and report the exact cycle when the structure is invalid?
3. What changes are needed to handle a forest (multiple trees) instead of a single tree?

## Key Takeaway
A binary tree can be validated by ensuring a single root via in‑degree counts and confirming that a traversal visits every node exactly once.
