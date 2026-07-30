# BFS Level-Order Patterns

Related: #102, #103, #107, #199, #515, #637, #993

---

## Problem Description
Given the root of a binary tree, return an array `largestValues` where `largestValues[i]` is the maximum node value among all nodes at depth `i` (0‑indexed). The tree may be empty.

## Examples
**Example 1**
```
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Explanation: Level 0 → [1] max = 1; Level 1 → [3,2] max = 3; Level 2 → [5,3,9] max = 9.
```
**Example 2**
```
Input: root = [1,2,3]
Output: [1,3]
```

## Approach
Perform a breadth‑first search (BFS) level‑order traversal. For each level, track the maximum value seen.

### Pseudocode
```text
FUNCTION largestValues(root):
    IF root IS NULL: RETURN []
    SET queue ← [root]
    SET result ← []
    WHILE queue IS NOT EMPTY:
        SET levelSize ← LENGTH(queue)
        SET maxVal ← -∞
        FOR i ← 0 TO levelSize - 1:
            SET node ← DEQUEUE(queue)
            SET maxVal ← MAX(maxVal, node.val)
            IF node.left: ENQUEUE(queue, node.left)
            IF node.right: ENQUEUE(queue, node.right)
        APPEND maxVal TO result
    RETURN result
```

## Walkthrough
Consider the tree `[1,3,2,5,3,null,9]`.
| Step | Queue (values) | maxVal | result |
|------|----------------|--------|--------|
| Start | [1] | -∞ | [] |
| Process level 0 (size=1) | dequeue 1 → maxVal=1, enqueue 3,2 | 1 | [1] |
| Process level 1 (size=2) | dequeue 3 → maxVal=3, enqueue 5,3; dequeue 2 → maxVal stays 3 | 3 | [1,3] |
| Process level 2 (size=3) | dequeue 5 → maxVal=5; dequeue 3 → maxVal stays 5; dequeue 9 → maxVal=9 | 9 | [1,3,9] |

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(w) – queue holds at most the width `w` of the tree.

## Follow‑Up Questions
1. How would you modify the algorithm to return the minimum value per level?
2. Can you solve the problem using depth‑first search without extra space for a queue?
3. What if the tree is extremely large and stored on disk – how would you stream the levels?

## Key Takeaway
A simple BFS traversal lets you aggregate information (here, the maximum) for each depth in a single pass.
