# 1490. Clone N-ary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clone-n-ary-tree](https://leetcode.com/problems/clone-n-ary-tree)
**Companies:** Amazon

---

## 1. Problem Description

Given a `root` of an N-ary tree, return a **deep copy** (clone) of the tree.

Each node in the n-ary tree contains a val (`int`) and a list (`List[Node]`) of its children.

```
class Node {
    public int val;
    public List<Node> children;
}
```

*Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).*

**Constraints:**
- The depth of the n-ary tree is less than or equal to `1000`.
- The total number of nodes is between `[0, 10^4]`.

**Follow up:** Can your solution work for the graph problem?

---

## 2. Approach: Recursive DFS — O(n) ✅

```text
FUNCTION cloneTree(root):
    IF root IS null: RETURN null
    copy ← new Node(root.val)
    FOR child IN root.children:
        copy.children.ADD(cloneTree(child))
    RETURN copy
```

---

## 3. Examples

```
Example 1:
  Input: root = [1,null,3,2,4,null,5,6]
  Output: [1,null,3,2,4,null,5,6]
```

```
Example 2:
  Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
  Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
```

---

## 4. Walkthrough

Consider the tree `1` with children `2`, `3`, `4`; node `3` has children `5` and `6`.

1. Call `cloneTree(1)`. Create `copy1`.
2. Iterate children of `1`:
   - Clone `2` → `copy2` (no children) and add to `copy1`.
   - Clone `3` → `copy3`.
     * Inside `cloneTree(3)`, iterate its children `5` and `6`:
       - Clone `5` → `copy5` (leaf) and add to `copy3`.
       - Clone `6` → `copy6` (leaf) and add to `copy3`.
   - Add `copy3` to `copy1`.
   - Clone `4` → `copy4` (leaf) and add to `copy1`.
3. Return `copy1`, which now mirrors the original tree.

---

## 5. Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(n) – recursion stack plus cloned nodes.

---

## Follow-Up Questions

- How would you implement the cloning iteratively using a stack or queue?
- Can you clone the tree in O(1) extra space by modifying the original tree temporarily?

---

## Key Takeaway

> N-ary tree cloning is a straightforward recursive DFS — create a new node, recursively clone each child.
