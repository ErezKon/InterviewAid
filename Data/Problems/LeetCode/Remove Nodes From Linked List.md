# 2487. Remove Nodes From Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-nodes-from-linked-list](https://leetcode.com/problems/remove-nodes-from-linked-list)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

You are given the `head` of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return *the* `head` *of the modified linked list.*

**Constraints:**
- The number of the nodes in the given list is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^5`

## Examples

**Example 1:**
```
Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
```

**Example 2:**
```
Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.
```

## Approach
Traverse the list from right to left using a monotonic decreasing stack (store nodes). While iterating, pop nodes from the stack that have smaller values than the current node, because they will be removed. Push the current node onto the stack. After processing all nodes, reconstruct the list by linking the nodes in stack order (which is from left to right after reversal).

```text
FUNCTION removeNodes(head):
    SET stack ← []                     // will hold nodes in decreasing order
    SET curr ← head
    WHILE curr IS NOT NULL:
        WHILE stack NOT EMPTY AND stack[-1].val < curr.val:
            POP stack                 // smaller nodes to the left are removed
        PUSH curr ONTO stack
        SET curr ← curr.next
    // Rebuild list from stack (which is in reverse order of original list)
    FOR i ← 0 TO LENGTH(stack) - 2:
        SET stack[i].next ← stack[i+1]
    SET stack[-1].next ← NULL
    RETURN stack[0]
```

## Walkthrough
| Step | Current node value | Stack values (top→bottom) | Action |
|------|-------------------|--------------------------|--------|
| 1 | 5 | [] | push 5 |
| 2 | 2 | [5] | 2 < 5 → push 2 |
| 3 | 13 | [5,2] | pop 2 (2<13), pop 5 (5<13), push 13 |
| 4 | 3 | [13] | 3 < 13 → push 3 |
| 5 | 8 | [13,3] | pop 3 (3<8), push 8 |
| Rebuild | | | link 13 → 8 → NULL |

## Complexity Analysis
- **Time:** O(N) where N is the number of nodes, each node is pushed and popped at most once.
- **Space:** O(N) for the stack storing nodes.

## Follow-Up Questions
1. How would you solve the problem in-place without using extra stack space?
2. Can the algorithm be adapted to remove nodes that have a greater or equal value to the right?
3. How would you handle a doubly linked list version of this problem?

## Key Takeaway
A monotonic decreasing stack lets you efficiently discard nodes that are dominated by a larger value later in the list.
