# Linked List Rearrangement Patterns

**Difficulty:** 🟡 Medium
**LeetCode:** 
**Companies:** 

---

## Problem Description
Given the head of a singly‑linked list, rearrange the nodes such that all nodes at odd positions come first followed by all nodes at even positions, preserving their original relative order. The transformation must be done in‑place with O(1) extra space.

## Examples
| Input List | Output List |
|------------|-------------|
| 1→2→3→4→5 | 1→3→5→2→4 |
| 2→1→3→5→6→4→7 | 2→3→6→7→1→5→4 |
| 1→2 | 1→2 |

## Approach
**Algorithm:** Two‑pointer (odd/even) traversal.
1. Initialise `odd` to `head` and `even` to `head.next`; keep `evenHead` to later connect.
2. While both pointers are non‑null, link `odd.next` to `even.next` (next odd node) and advance `odd`.
3. Link `even.next` to `odd.next` (next even node) and advance `even`.
4. After the loop, connect the end of the odd list to `evenHead`.

### Pseudocode
```text
FUNCTION oddEvenList(head):
    IF head == NULL: RETURN NULL
    SET odd ← head
    SET even ← head.next
    SET evenHead ← even
    WHILE even != NULL AND even.next != NULL:
        // Link next odd node
        SET odd.next ← even.next
        SET odd ← odd.next
        // Link next even node
        SET even.next ← odd.next
        SET even ← even.next
    // Append even list after odd list
    SET odd.next ← evenHead
    RETURN head
```

## Walkthrough
For list `1→2→3→4→5`:
| step | odd | even | list state |
|------|-----|------|-----------|
| init | 1 | 2 | 1→2→3→4→5 |
| 1 | odd.next=3, even.next=4 | odd=3, even=4 | 1→3→2→4→5 |
| 2 | odd.next=5, even.next=NULL | odd=5, even=NULL | 1→3→5→2→4 |
| connect | odd.next=evenHead (2) | – | 1→3→5→2→4 |

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(1) – only a few pointers.

## Follow‑Up Questions
1. How would you modify the algorithm to group nodes by value parity instead of position?
2. Can you perform the rearrangement recursively?
3. What changes are needed if the list is doubly linked?

## Key Takeaway
Using separate odd and even pointers lets you reorder a linked list in a single pass while preserving original order within each group.