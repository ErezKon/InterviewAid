# 2689. Extract Kth Character From The Rope Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/extract-kth-character-from-the-rope-tree](https://leetcode.com/problems/extract-kth-character-from-the-rope-tree)
**Companies:** Google

---

## Problem Description
Given the root of a **rope tree** where each leaf stores a string fragment and internal nodes store the total length of characters in their subtree, return the character at the 1‑based index `k`. It is guaranteed that `1 ≤ k ≤ total length`.

## Examples
**Example 1:**
```
Input: root = ["ab", "cde", "f"], k = 4
Output: 'c'
Explanation: The concatenated string is "abcdef"; the 4th character is 'c'.
```
**Example 2:**
```
Input: root = ["hello", "world"], k = 8
Output: 'o'
Explanation: Concatenated string "helloworld"; 8th character is 'o'.
```

## Approach
Traverse the rope tree using the stored subtree lengths. At each internal node, decide whether `k` lies in the left or right subtree. When reaching a leaf, index into its string fragment.

```text
FUNCTION kthCharacter(node, k):
    IF node IS leaf:
        RETURN node.string[k-1]
    // leftLength is total characters in left subtree
    leftLength ← node.left.totalLength
    IF k ≤ leftLength:
        RETURN kthCharacter(node.left, k)
    ELSE:
        RETURN kthCharacter(node.right, k - leftLength)
```
The root's `totalLength` is pre‑computed, so each step reduces the search space by half on average.

## Walkthrough
For the tree representing "ab" (left) and "cde" (right) with `k = 3`:
| Node | leftLength | Decision | New k |
|------|------------|----------|------|
| root | 2 | k > 2 → go right | 1 |
| right leaf "cde" | - | return "cde"[0] → 'c' |
The algorithm directly lands on the correct leaf.

## Complexity Analysis
- **Time:** O(h) where h is the height of the rope tree (≈ O(log n) for a balanced rope).
- **Space:** O(h) recursion stack.

## Follow-Up Questions
1. How would you modify the algorithm to support updating a character at position `k`?
2. How can you build a rope tree from a long string in O(n) time?
3. What changes are needed to support range queries (e.g., substring extraction)?

## Key Takeaway
Using the stored subtree lengths, a rope tree enables logarithmic‑time random access to any character.
