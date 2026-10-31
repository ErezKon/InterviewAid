# 2074. Reverse Nodes in Even Length Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-nodes-in-even-length-groups](https://leetcode.com/problems/reverse-nodes-in-even-length-groups)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Nutanix, Zopsmart

---

## Problem Description

You are given the `head` of a linked list.

The nodes in the linked list are **sequentially** assigned to **non-empty** groups whose lengths form the sequence of the natural numbers (`1, 2, 3, 4, ...`). The **length** of a group is the number of nodes assigned to it. In other words,

- The `1^st` node is assigned to the first group.
- The `2^nd` and the `3^rd` nodes are assigned to the second group.
- The `4^th`, `5^th`, and `6^th` nodes are assigned to the third group, and so on.

Note that the length of the last group may be less than or equal to `1 + the length of the second to last group`.

**Reverse** the nodes in each group with an **even** length, and return *the* `head` *of the modified linked list*.

**Constraints:**
- The number of nodes in the list is in the range `[1, 10^5]`.
- `0 <= Node.val <= 10^5`

---

## Examples

**Example 1:**
```
Input: head = [5,2,6,3,9,1,7,3,8,4]
Output: [5,6,2,3,9,1,4,8,3,7]
Explanation: - The length of the first group is 1, which is odd, hence no reversal occurs.
- The length of the second group is 2, which is even, hence the nodes are reversed.
- The length of the third group is 3, which is odd, hence no reversal occurs.
- The length of the last group is 4, which is even, hence the nodes are reversed.
```

**Example 2:**
```
Input: head = [1,1,0,6]
Output: [1,0,1,6]
Explanation: - The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 1. No reversal occurs.
```

**Example 3:**
```
Input: head = [1,1,0,6,5]
Output: [1,0,1,5,6]
Explanation: - The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 2. The nodes are reversed.
```

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
| Space  | O(1) — in-place reversal uses only a few pointers |

---

## Follow-Up Questions

- How would you modify the algorithm to reverse groups of **odd** length instead?
- Can the solution be adapted to work with a doubly linked list more efficiently?

---

## Key Takeaway

> Always count the **actual** size of the current group before deciding to reverse; the last group may be shorter than its intended size, and reversing only even-sized groups yields the correct transformed list.
