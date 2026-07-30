# 2074. Reverse Nodes in Even Length Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-nodes-in-even-length-groups](https://leetcode.com/problems/reverse-nodes-in-even-length-groups)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Nutanix, Zopsmart

---

## Problem Description

Given a singly linked list, group the nodes into consecutive groups of increasing size (1, 2, 3, 4, ...). The last group may contain fewer nodes than its intended size. Reverse the nodes in each group that has an **even** length. Return the head of the modified list.

**Constraints:**
- `1 <= n <= 10^5` (number of nodes)
- Node values are in `[0, 10^5]`

---

## Examples

| Input List | Grouping (size) | Reversed Groups | Output List |
|------------|----------------|----------------|-------------|
| `1→2→3→4→5→6→7→8→9` | `[1] [2,3] [4,5,6] [7,8,9]` | Reverse group `[2,3]` (size 2) → `3→2`; group `[4,5,6]` (size 3) stays; group `[7,8,9]` (size 3) stays | `1→3→2→4→5→6→7→8→9` |
| `1→2→3→4→5` | `[1] [2,3] [4,5]` (last group size 2, even) | Reverse `[2,3]` → `3→2`; reverse `[4,5]` → `5→4` | `1→3→2→5→4` |

---

## Approach

```text
FUNCTION reverseEvenLengthGroups(head)
    dummy ← Node(0)
    dummy.next ← head
    prevGroupTail ← dummy
    groupSize ← 1

    WHILE prevGroupTail.next IS NOT NULL DO
        // Determine actual size of the current group
        count ← 0
        node ← prevGroupTail.next
        WHILE node IS NOT NULL AND count < groupSize DO
            node ← node.next
            count ← count + 1
        END WHILE

        IF count MOD 2 == 0 THEN
            // Reverse the group of 'count' nodes
            prev ← NULL
            cur ← prevGroupTail.next
            FOR i ← 1 TO count DO
                nxt ← cur.next
                cur.next ← prev
                prev ← cur
                cur ← nxt
            END FOR
            // Connect reversed group back to list
            tail ← prevGroupTail.next
            tail.next ← cur
            prevGroupTail.next ← prev
            prevGroupTail ← tail
        ELSE
            // Skip this group unchanged
            FOR i ← 1 TO count DO
                prevGroupTail ← prevGroupTail.next
            END FOR
        END IF

        groupSize ← groupSize + 1
    END WHILE

    RETURN dummy.next
END FUNCTION
```

---

## Walkthrough

Consider the list `1→2→3→4→5`.

1. **Group size 1** – nodes `[1]` (odd) → unchanged. `prevGroupTail` moves to node `1`.
2. **Group size 2** – nodes `[2,3]` (even) → reversed to `3→2`.
   - After reversal, connections become `1→3→2→4→5`.
   - `prevGroupTail` now points to node `2` (the tail of the reversed group).
3. **Group size 3** – remaining nodes `[4,5]` (only 2 nodes left, actual size = 2, even) → reversed to `5→4`.
   - Final list: `1→3→2→5→4`.

The algorithm correctly handles the truncated final group by counting the actual number of nodes before deciding to reverse.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — each node is visited a constant number of times |
| Space  | O(1) — in‑place reversal uses only a few pointers |

---

## Follow‑Up Questions

- How would you modify the algorithm to reverse groups of **odd** length instead?
- Can the solution be adapted to work with a doubly linked list more efficiently?

---

## Key Takeaway

> Always count the **actual** size of the current group before deciding to reverse; the last group may be shorter than its intended size, and reversing only even‑sized groups yields the correct transformed list.
