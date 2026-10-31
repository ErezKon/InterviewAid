# 1145. Binary Tree Coloring Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-coloring-game](https://leetcode.com/problems/binary-tree-coloring-game)
**Companies:** Amazon, Google

---

## 1. Problem Description

Two players play a turn based game on a binary tree. We are given the `root` of this binary tree, and the number of nodes `n` in the tree. `n` is odd, and each node has a distinct value from `1` to `n`.

Initially, the first player names a value `x` with `1 ≤ x ≤ n`, and the second player names a value `y` with `1 ≤ y ≤ n` and `y != x`. The first player colors the node with value `x` red, and the second player colors the node with value `y` blue.

Then, the players take turns starting with the first player. In each turn, that player chooses a node of their color (red if player 1, blue if player 2) and colors an **uncolored** neighbor of the chosen node (either the left child, right child, or parent of the chosen node.)

If (and only if) a player cannot choose such a node in this way, they must pass their turn. If both players pass their turn, the game ends, and the winner is the player that colored more nodes.

You are the second player. If it is possible to choose such a `y` to ensure you win the game, return `true`. If it is not possible, return `false`.

**Constraints:**
- The number of nodes in the tree is `n`.
- `1 ≤ x ≤ n ≤ 100`
- `n` is odd.
- `1 ≤ Node.val ≤ n`
- All the values of the tree are **unique**.

---

## 2. Examples

```
Example 1:
  Input: root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
  Output: true
  Explanation: The second player can choose the node with value 2.

Example 2:
  Input: root = [1,2,3], n = 3, x = 1
  Output: false
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
| 2 | Compare each region size to `n/2` | If any > `n/2`, Player 2 can choose that region and win |

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
