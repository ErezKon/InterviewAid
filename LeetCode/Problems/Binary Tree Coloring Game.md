# 1145. Binary Tree Coloring Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-coloring-game](https://leetcode.com/problems/binary-tree-coloring-game)
**Companies:** Amazon, Google

---

## 1. Problem Description

Two players color nodes in a binary tree of `n` nodes. Player 1 picks node `x` first. Player 2 picks any uncolored node. Each player then colors adjacent uncolored nodes on their turns. Player 2 wins if they can guarantee coloring more than `n/2` nodes. Determine if player 2 has a winning strategy.

---

## 2. Examples

**Example 1:**
```
Input: n = 11, x = 3, root = [1,2,3,4,5,6,7,null,null,8,9,10,11]
Output: true
Explanation: Player 2 can choose node 2 (left child of 3) and control a region of size 6 > 11/2.
```

**Example 2:**
```
Input: n = 3, x = 1, root = [1,2,3]
Output: false
Explanation: No matter where Player 2 starts, Player 1 can control at least 2 nodes.
```

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

---

## 4. Walkthrough

| Step | Action | Left Subtree | Right Subtree | Parent Region |
|------|--------|--------------|---------------|---------------|
| 1 | Compute subtree sizes for node `x` | `leftCount` | `rightCount` | `parentCount = n - leftCount - rightCount - 1` |
| 2 | Compare each region size to `n/2` | If any > `n/2`, Player 2 can choose that region and win |

For the first example, `leftCount = 6`, `rightCount = 2`, `parentCount = 2`. Since `6 > 11/2`, return `true`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each node visited once | O(h) – recursion stack, h = tree height |

---

## 6. Follow-Up Questions

* How would the solution change if the tree were not binary?
* Can the game be extended to more than two players?
* What is the optimal strategy if nodes have weights?

---

## Key Takeaway

> Removing a node from a tree creates connected components. The winning strategy is to claim the largest component. Check if any of the 3 regions exceeds half the total.
