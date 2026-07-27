# 1145. Binary Tree Coloring Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-coloring-game](https://leetcode.com/problems/binary-tree-coloring-game)
**Companies:** Amazon, Google

---

## 1. Problem Description

Two players color nodes in a binary tree of `n` nodes. Player 1 picks node `x` first. Player 2 picks any uncolored node. Each player then colors adjacent uncolored nodes on their turns. Player 2 wins if they can guarantee coloring more than `n/2` nodes. Determine if player 2 has a winning strategy.

---

## 2. Key Insight

> Node `x` splits the tree into 3 regions: left subtree, right subtree, and parent subtree (the rest). Player 2 should pick the neighbor of `x` that leads to the largest region. Player 2 wins if any region has size > `n/2`.

---

## 3. Approach: Count Subtree Sizes — O(n) ✅

```
FUNCTION btreeGameWinningMove(root, n, x):
    leftCount = rightCount = 0
    
    FUNCTION countNodes(node):
        IF node IS null: RETURN 0
        l = countNodes(node.left)
        r = countNodes(node.right)
        IF node.val == x:
            leftCount = l
            rightCount = r
        RETURN l + r + 1
    
    countNodes(root)
    parentCount = n - leftCount - rightCount - 1
    
    RETURN MAX(leftCount, rightCount, parentCount) > n / 2
```

| Time | Space |
|------|-------|
| O(n) | O(h) recursion depth |

---

## Key Takeaway

> Removing a node from a tree creates connected components. The winning strategy is to claim the largest component. Check if any of the 3 regions exceeds half the total.
