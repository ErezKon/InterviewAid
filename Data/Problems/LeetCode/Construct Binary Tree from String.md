# 536. Construct Binary Tree from String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-string](https://leetcode.com/problems/construct-binary-tree-from-string)
**Companies:** Amazon, Bloomberg, Meta

---

## Problem Description
Given a string `s` representing a binary tree in a parenthesized format, construct the binary tree and return its root. Each node value may be negative and is followed by its left and right subtrees enclosed in parentheses. Empty parentheses denote a null child.

## Examples
- Input: `s = "4(2(3)(1))(6(5))"` → Output: Tree with root 4, left child 2 (with children 3 and 1), right child 6 (with left child 5).
- Input: `s = "-4(2)(3)"` → Output: Root -4 with left child 2 and right child 3.

## Approach
**Algorithm:** Recursive parsing using index tracking (O(n))
Parse the integer value, then recursively parse the left subtree inside the first pair of parentheses, followed by the right subtree if present.

```text
FUNCTION str2tree(s):
    IF s IS EMPTY:
        RETURN null
    SET i ← 0
    // Parse node value (may be negative)
    WHILE i < LENGTH(s) AND (s[i] IS DIGIT OR s[i] = '-'): 
        SET i ← i + 1
    SET value ← INTEGER(s[0 TO i-1])
    SET node ← NEW TreeNode(value)
    IF i < LENGTH(s) AND s[i] = '(':
        // Parse left subtree
        SET start ← i + 1
        SET count ← 1
        SET i ← i + 1
        WHILE count > 0:
            IF s[i] = '(':
                SET count ← count + 1
            ELSE IF s[i] = ')':
                SET count ← count - 1
            SET i ← i + 1
        SET leftSub ← s[start TO i-2]
        SET node.left ← str2tree(leftSub)
    IF i < LENGTH(s) AND s[i] = '(':
        // Parse right subtree
        SET start ← i + 1
        SET count ← 1
        SET i ← i + 1
        WHILE count > 0:
            IF s[i] = '(':
                SET count ← count + 1
            ELSE IF s[i] = ')':
                SET count ← count - 1
            SET i ← i + 1
        SET rightSub ← s[start TO i-2]
        SET node.right ← str2tree(rightSub)
    RETURN node
```

## Walkthrough
Consider `s = "4(2(3)(1))(6(5))"`:
1. Parse root value `4`.
2. Left subtree string `2(3)(1)`: root `2`, left `3`, right `1`.
3. Right subtree string `6(5)`: root `6`, left `5`, right `null`.
The recursion builds the exact tree structure.

## Complexity Analysis
- **Time:** O(n) – each character is processed once.
- **Space:** O(h) – recursion stack depth equals tree height `h`.

## Follow-Up Questions
- How would you modify the parser to handle a preorder traversal string without parentheses?
- Can you construct the tree iteratively using a stack?
- How would you serialize the tree back to the same string format?

## Key Takeaway
Recursive parsing with index tracking efficiently converts a parenthesized string into its binary tree representation in linear time.