# 331. Verify Preorder Serialization of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree)
**Companies:** Google

---

## Problem Description

One way to serialize a binary tree is to use **preorder traversal**. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as `'#'`.

For example, the above binary tree can be serialized to the string `"9,3,4,#,#,1,#,#,2,#,6,#,#"`, where `'#'` represents a null node.

Given a string of comma-separated values `preorder`, return `true` if it is a correct preorder traversal serialization of a binary tree.

It is **guaranteed** that each comma-separated value in the string must be either an integer or a character `'#'` representing null pointer.

You may assume that the input format is always valid.

- For example, it could never contain two consecutive commas, such as `"1,,3"`.

**Note:** You are not allowed to reconstruct the tree.

**Constraints:**
- `1 <= preorder.length <= 10^4`
- `preorder` consist of integers in the range `[0, 100]` and `'#'` separated by commas `','`.

## Examples

**Example 1:**
```
Input: preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"
Output: true
```

**Example 2:**
```
Input: preorder = "1,#"
Output: false
```

**Example 3:**
```
Input: preorder = "9,#,#,1"
Output: false
```

## Approach
Slot Counting (Greedy) — each node consumes a slot; non-null nodes generate two new slots.

```text
FUNCTION isValidSerialization(preorder):
    SET slots ← 1
    FOR token IN preorder.SPLIT(','):
        SET slots ← slots - 1    // consume a slot for current node
        IF slots < 0:
            RETURN false
        IF token != '#':
            SET slots ← slots + 2    // non-null node adds two child slots
    RETURN slots == 0
```

## Walkthrough
| Step | Token | Slots before | Slots after |
|------|-------|--------------|-------------|
| 1 | 9 | 1 | 2 (consume 1, add 2) |
| 2 | 3 | 2 | 3 |
| 3 | 4 | 3 | 4 |
| 4 | # | 4 | 3 |
| 5 | # | 3 | 2 |
| 6 | 1 | 2 | 3 |
| 7 | # | 3 | 2 |
| 8 | # | 2 | 1 |
| 9 | 2 | 1 | 2 |
|10 | # | 2 | 1 |
|11 | 6 | 1 | 2 |
|12 | # | 2 | 1 |
|13 | # | 1 | 0 |
Result: slots = 0 → valid.

## Complexity Analysis
- Time: O(n), where n is the number of tokens.
- Space: O(1), only a counter is used.

## Follow-Up Questions
1. How would you validate inorder or postorder serializations?
2. Can you solve the problem using a stack instead of slot counting?
3. How would you extend this to handle trees with more than two children?

## Key Takeaway
A preorder serialization is valid if, while processing tokens left-to-right, the number of available slots never becomes negative and ends exactly at zero.
