# 536. Construct Binary Tree from String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-string](https://leetcode.com/problems/construct-binary-tree-from-string)
**Companies:** Amazon, Bloomberg, Meta

---

## Problem Description
You need to construct a binary tree from a string consisting of parenthesis and integers.

The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs of parenthesis. The integer represents the root's value and a pair of parenthesis contains a child binary tree with the same structure.

You always start to construct the **left** child node of the parent first if it exists.

**Constraints:**
- `0 <= s.length <= 3 * 10^4`
- `s` consists of digits, `'('`, `')'`, and `'-'` only.
- All numbers in the tree have value **at most** than `2^30`.

## Examples
```
Example 1:
  Input: s = "4(2(3)(1))(6(5))"
  Output: [4,2,6,3,1,5]

        4
      /   \
     2     6
    / \   /
   3   1 5
```
```
Example 2:
  Input: s = "4(2(3)(1))(6(5)(7))"
  Output: [4,2,6,3,1,5,7]
```
```
Example 3:
  Input: s = "-4(2(3)(1))(6(5)(7))"
  Output: [-4,2,6,3,1,5,7]
```

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