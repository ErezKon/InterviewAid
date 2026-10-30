# 1261. Find Elements in a Contaminated Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree](https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree)
**Companies:** Amazon, Google

---

## Problem Description

Given a binary tree with the following rules:

- `root.val == 0`
- For any `treeNode`:

- If `treeNode.val` has a value `x` and `treeNode.left != null`, then `treeNode.left.val == 2 * x + 1`
- If `treeNode.val` has a value `x` and `treeNode.right != null`, then `treeNode.right.val == 2 * x + 2`

Now the binary tree is contaminated, which means all `treeNode.val` have been changed to `-1`.

Implement the `FindElements` class:

- `FindElements(TreeNode* root)` Initializes the object with a contaminated binary tree and recovers it.
- `bool find(int target)` Returns `true` if the `target` value exists in the recovered binary tree.

**Constraints:**
- `TreeNode.val == -1`
- The height of the binary tree is less than or equal to `20`
- The total number of nodes is between `[1, 10^4]`
- Total calls of `find()` is between `[1, 10^4]`
- `0 <= target <= 10^6`

---

## Examples

**Example 1:**
```
Input
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]
Output:
[null,false,true]
Explanation:
FindElements findElements = new FindElements([-1,null,-1]);
findElements.find(1); // return False
findElements.find(2); // return True
```

**Example 2:**
```
Input
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]
Output:
[null,true,true,false]
Explanation:
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // return True
findElements.find(3); // return True
findElements.find(5); // return False
```

**Example 3:**
```
Input
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]
Output:
[null,true,false,false,true]
Explanation:
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // return True
findElements.find(3); // return False
findElements.find(4); // return False
findElements.find(5); // return True
```

---

## Approach: DFS Recovery + HashSet — O(n) init, O(1) find ✅

```text
CLASS FindElements:
    INIT(root):
        self.values ← SET()
        FUNCTION dfs(node, val):
            IF node IS null: RETURN
            self.values.ADD(val)
            dfs(node.left, 2 * val + 1)
            dfs(node.right, 2 * val + 2)
        dfs(root, 0)

    FUNCTION find(target):
        RETURN target IN self.values
```

---

## Walkthrough

1. Start at root with value 0 and add to set.
2. Recursively assign left child `2*0+1 = 1` and right child `2*0+2 = 2`.
3. Continue DFS, populating all node values.
4. `find(3)` checks if 3 is in the set → true; `find(5)` → false.

---

## Complexity Analysis

- **Time:** O(n) to traverse the tree once during initialization; O(1) per `find` query.
- **Space:** O(n) for the hash set storing all node values.

---

## Follow-Up Questions

1. How would you modify the solution to support dynamic insertion of new nodes?
2. Can you achieve `find` in O(log n)` without extra space?
3. What if the tree is extremely deep—how would you avoid recursion stack overflow?

---

## Key Takeaway

> **DFS to recover all values using the parent-child formula. Store in a set for O(1) lookup.**