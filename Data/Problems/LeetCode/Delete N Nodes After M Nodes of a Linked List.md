# 1474. Delete N Nodes After M Nodes of a Linked List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list](https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list)
**Companies:** Microsoft

---

## Problem Description

You are given the `head` of a linked list and two integers `m` and `n`.

Traverse the linked list and remove some nodes in the following way:

- Start with the head as the current node.
- Keep the first `m` nodes starting with the current node.
- Remove the next `n` nodes
- Keep repeating steps 2 and 3 until you reach the end of the list.

Return *the head of the modified list after removing the mentioned nodes*.

**Constraints:**

- The number of nodes in the list is in the range `[1, 10^4]`.
- `1 <= Node.val <= 10^6`
- `1 <= m, n <= 1000`

**Follow up:** Could you solve this problem by modifying the list in-place?

## Examples

```
Example 1:
  Input: head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3
  Output: [1,2,6,7,11,12]
  Explanation: Keep the first (m = 2) nodes starting from the head of the linked List (1 -> 2).
  Delete the next (n = 3) nodes (3 -> 4 -> 5).
  Continue with the same procedure until reaching the tail of the Linked List.
  Head of the linked list after removing nodes is returned.
```

```
Example 2:
  Input: head = [1,2,3,4,5,6,7,8,9,10,11], m = 1, n = 3
  Output: [1,5,9]
  Explanation: Head of linked list after removing nodes is returned.
```

## Approach

```
FUNCTION deleteNodes(head, m, n):
    curr = head
    WHILE curr:
        // Keep m nodes
        FOR i ← 1 TO m-1:
            IF NOT curr: RETURN head
            curr = curr.next
        // Delete n nodes
        temp = curr
        FOR i ← 0 TO n-1:
            IF NOT temp.next: BREAK
            temp.next = temp.next.next
        curr = curr.next if curr else null
    RETURN head
```

## Walkthrough

Consider list `1→2→3→4→5→6→7→8`, `m=2`, `n=2`.
1. Keep nodes `1` and `2` (`curr` at `2`).
2. Delete next two nodes: `temp` at `2`, remove `3` and `4` by linking `2.next` to `5`.
3. Move `curr` to `5`, keep `5` and `6`.
4. Delete `7` and `8` similarly. Resulting list: `1→2→5→6`.

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(L) where L is list length |
| **Space** | O(1) |

## Follow-Up Questions

- How would you modify the algorithm to handle a circular linked list?
- Can you solve it using recursion instead of iteration?
- What changes are needed if the list nodes contain additional random pointers?

---

## Key Takeaway

> **Alternating keep/delete pattern on a linked list: advance `m` nodes to find the cut point, then skip `n` nodes by relinking pointers. Repeat until end.**