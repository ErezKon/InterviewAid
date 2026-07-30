# 117. Populating Next Right Pointers in Each Node II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Snowflake, Uber

---

## Problem Description
Given the root of a binary tree (not necessarily perfect or complete), populate each node's `next` pointer to point to its next right node on the same level. If there is no node to the right, set the `next` pointer to `null`. The operation must be performed in‑place using only constant extra space.

## Examples
**Example 1:**
```
Input: [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Nodes on each level are connected left‑to‑right via `next` pointers.
```
**Example 2:**
```
Input: []
Output: []
```

## Approach
**Algorithm:** Level‑order traversal using already‑established `next` pointers (Dummy‑head technique)
**Key Insight:** While traversing a level, use a dummy node to build the `next` chain for the next level, requiring only O(1) extra pointers.

```text
FUNCTION connect(root):
    curr ← root
    WHILE curr IS NOT NULL:
        dummy ← NEW Node(0)   // temporary head for the next level
        tail ← dummy
        // iterate over current level using next pointers
        WHILE curr IS NOT NULL:
            IF curr.left IS NOT NULL:
                tail.next ← curr.left
                tail ← tail.next
            IF curr.right IS NOT NULL:
                tail.next ← curr.right
                tail ← tail.next
            curr ← curr.next
        // move to the first node of the next level
        curr ← dummy.next
    RETURN root
```

## Walkthrough
Consider the tree `[1,2,3,4,5,null,7]`.
| Level | Nodes visited (via `next`) | Connections created for next level |
|-------|----------------------------|------------------------------------|
| 0 | 1 | dummy → 2 → 3 |
| 1 | 2 → 3 | dummy → 4 → 5 → 7 |
| 2 | 4 → 5 → 7 | no further children, traversal ends |
After processing, each node's `next` points to its right neighbor.

## Complexity Analysis
- **Time:** O(n) – each node is visited once.
- **Space:** O(1) extra space (ignoring the recursion stack, which is not used).

## Follow‑Up Questions
1. How would you modify the algorithm to return a list of values for each level instead of linking nodes?
2. Can you solve the problem using recursion while still achieving O(1) auxiliary space?
3. How would the solution change if the tree were a perfect binary tree?

## Key Takeaway
By iterating level‑by‑level using the already‑built `next` pointers and a dummy head, we can connect the next level in constant extra space.
