# 331. Verify Preorder Serialization of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree)
**Companies:** Google

---

## Problem Description
Given a string representing the preorder traversal of a binary tree where null nodes are denoted by "#" and values are separated by commas, determine if it is a valid serialization of a binary tree.

## Examples
- Input: `"9,3,4,#,#,1,#,#,2,#,6,#,#"`
  Output: `true`
  Explanation: The string corresponds to a proper binary tree.
- Input: `"1,#"`
  Output: `false`
  Explanation: A single non‑null node must have two children.
- Input: `"9,#,#,1"`
  Output: `false`
  Explanation: Extra nodes after a complete tree invalidate the serialization.

## Approach
Slot Counting (Greedy) — each node consumes a slot; non‑null nodes generate two new slots.

```text
FUNCTION isValidSerialization(preorder):
    SET slots ← 1
    FOR token IN preorder.SPLIT(','):
        SET slots ← slots - 1    // consume a slot for current node
        IF slots < 0:
            RETURN false
        IF token != '#':
            SET slots ← slots + 2    // non‑null node adds two child slots
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
A preorder serialization is valid if, while processing tokens left‑to‑right, the number of available slots never becomes negative and ends exactly at zero.
