# 1506. Find Root of N-Ary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-root-of-n-ary-tree](https://leetcode.com/problems/find-root-of-n-ary-tree)
**Companies:** Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: XOR Trick — O(n) ✅](#4-approach-xor-trick--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given all the nodes of an **N-ary tree** as an array of `Node` objects, where each node has a **unique value**.

Return *the **root** of the N-ary tree*.

**Custom testing:**

An N-ary tree can be serialized as represented in its level order traversal where each group of children is separated by the `null` value (see examples).

![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1500-1599/1506.Find%20Root%20of%20N-Ary%20Tree/images/sample_4_964.png)

For example, the above tree is serialized as `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

The testing will be done in the following way:

- The **input data** should be provided as a serialization of the tree.
- The driver code will construct the tree from the serialized input data and put each `Node` object into an array **in an arbitrary order**.
- The driver code will pass the array to `findRoot`, and your function should find and return the root `Node` object in the array.
- The driver code will take the returned `Node` object and serialize it. If the serialized value and the input data are the **same**, the test **passes**.

**Follow up:**

- Could you solve this problem in constant space complexity with a linear time algorithm?

**Constraints:**
- The total number of nodes is between `[1, 5 * 10^4]`.
- Each node has a **unique** value.

---

## 2. Examples

**Example 1:**
```
Input: tree = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
Explanation: The tree from the input data is shown above.
The driver code creates the tree and gives findRoot the Node objects in an arbitrary order.
For example, the passed array could be [Node(5),Node(4),Node(3),Node(6),Node(2),Node(1)] or [Node(2),Node(6),Node(1),Node(3),Node(5),Node(4)].
The findRoot function should return the root Node(1), and the driver code will serialize it and compare with the input data.
The input data and serialized Node(1) are the same, so the test passes.
```

**Example 2:**
```
Input: tree = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
```

---

## 3. Key Insight

> Every node except the root appears exactly once as a child. XOR all node values and all child values together — every non-root value cancels out (appears twice: once as a node, once as a child). The remaining value is the root.

---

## 4. Approach: XOR Trick — O(n) ✅

```
FUNCTION findRoot(tree):
    // XOR all node values, then XOR all child values
    // Root is the one not a child of anyone
    valXor = 0
    FOR node IN tree:
        valXor ^= node.val
        FOR child IN node.children: valXor ^= child.val
    FOR node IN tree:
        IF node.val == valXor: RETURN node
```

---

## 5. Walkthrough

```
Tree: 1 → [3,2,4], 3 → [5,6], 2 → [], 4 → [], 5 → [], 6 → []

XOR all node values: 1 ^ 3 ^ 2 ^ 4 ^ 5 ^ 6
XOR all child values: 3 ^ 2 ^ 4 ^ 5 ^ 6

Combined: 1 ^ 3 ^ 2 ^ 4 ^ 5 ^ 6 ^ 3 ^ 2 ^ 4 ^ 5 ^ 6
        = 1 (everything else cancels)

Find node with val=1 → root ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit each node and child once |
| **Space** | O(1) — single XOR variable |

---

## 7. Follow-Up Questions

### 7.1 Could you use a set instead?

Yes — add all node values to a set, remove all child values. The remaining value is the root. But this uses O(n) space.

### 7.2 What if node values are not unique?

The XOR trick fails. You'd need the set approach using node references (identity) instead of values.

### 7.3 Why does XOR work here?

`a ^ a = 0` for any value. Each non-root node is XORed twice (as a node and as someone's child), so it cancels. The root is XORed only once.

---

## 8. Key Takeaway

> **XOR cancellation** identifies the unique element: every non-root appears twice (as node + child), so XOR eliminates them. This is the same trick used in "find the single number" (LC 136).
