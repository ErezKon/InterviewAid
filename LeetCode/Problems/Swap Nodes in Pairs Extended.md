# Linked List Reversal Patterns

Related: #24, #25, #92, #206, #234, #143

---

## Problem Description
Linked list reversal patterns cover a family of problems where a segment of a singly‑linked list must be reversed in‑place. Typical tasks include swapping every two nodes, reversing a sub‑list between two positions, or reversing nodes in groups of *k*.

## Examples
**Example 1 – Swap Nodes in Pairs (#24)**
```
Input: 1→2→3→4
Output: 2→1→4→3
```
**Example 2 – Reverse Sub‑list (#92)**
```
Input: 1→2→3→4→5, left=2, right=4
Output: 1→4→3→2→5
```

## Approach
The core idea is to keep a pointer to the node *prev* before the segment, then iteratively move the next node to the front of the segment (head‑insertion). This runs in O(n) time and O(1) extra space.

```text
FUNCTION reverseSublist(head, left, right):
    SET dummy ← new Node(0)
    SET dummy.next ← head
    SET prev ← dummy
    // move prev to node before left
    FOR i ← 1 TO left-1:
        SET prev ← prev.next
    SET curr ← prev.next
    // reverse the segment
    FOR i ← 0 TO right-left-1:
        SET nxt ← curr.next
        SET curr.next ← nxt.next
        SET nxt.next ← prev.next
        SET prev.next ← nxt
    RETURN dummy.next
```

## Walkthrough
Consider the list `1→2→3→4→5` with `left=2`, `right=4`.
| Step | prev | curr | nxt | List after operation |
|------|------|------|-----|----------------------|
| 0 | dummy (0) | 2 | 3 | 0→2→3→4→5 |
| 1 | dummy | 2 | 3 | 0→3→2→4→5 |
| 2 | dummy | 2 | 4 | 0→4→3→2→5 |

Final list (skip dummy) is `1→4→3→2→5`.

## Complexity Analysis
- **Time:** O(n) – each node visited at most once.
- **Space:** O(1) – only a few pointers.

## Follow‑Up Questions
1. How would you reverse nodes in groups of *k* without extra memory?
2. Can you perform the operation recursively?
3. How does the algorithm change for a doubly‑linked list?

## Key Takeaway
Reversing a sub‑list can be done by repeatedly extracting the next node and inserting it at the front of the segment, achieving in‑place O(1) space.
