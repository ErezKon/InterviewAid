# 1474. Delete N Nodes After M Nodes of a Linked List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list](https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list)
**Companies:** Microsoft

---

## Problem Description

Keep `m` nodes, then delete the next `n` nodes, and repeat through the linked list.

## Examples

| Input List | m | n | Output List |
|------------|---|---|-------------|
| `1→2→3→4→5→6→7→8` | 2 | 2 | `1→2→5→6→` |
| `1→2→3→4→5` | 1 | 1 | `1→3→5` |

*Explanation:* Starting at the head, retain `m` nodes, then skip `n` nodes by linking the `m`‑th node to the node after the `n` deletions. Continue until the end.

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