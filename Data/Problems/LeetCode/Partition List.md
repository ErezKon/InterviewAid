# 86. Partition List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-list](https://leetcode.com/problems/partition-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given the head of a singly‑linked list and an integer `x`, reorder the list so that all nodes with values less than `x` appear before nodes with values greater than or equal to `x`. The original relative order of the nodes in each partition must be preserved.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `head = [1,4,3,2,5,2]`, `x = 3` | `[1,2,2,4,3,5]` | Nodes `< 3` (`1,2,2`) come first, followed by nodes `≥ 3` (`4,3,5`). |
| `head = [2,1]`, `x = 2` | `[1,2]` | Single node `1` moves before `2` while preserving order. |

## Approach
Use two dummy heads to build two separate lists: one for nodes `< x` and one for nodes `≥ x`. Iterate through the original list, appending each node to the appropriate list. Finally, concatenate the two lists.

```text
FUNCTION partitionList(head, x):
    // dummy heads for two partitions
    SET beforeHead ← ListNode(0)
    SET afterHead ← ListNode(0)
    SET before ← beforeHead
    SET after ← afterHead

    WHILE head IS NOT null:
        IF head.val < x:
            before.next ← head
            before ← before.next
        ELSE:
            after.next ← head
            after ← after.next
        head ← head.next

    // terminate the after list
    after.next ← null
    // connect before list with after list
    before.next ← afterHead.next
    RETURN beforeHead.next
```

## Walkthrough
Consider `head = [1,4,3,2,5,2]`, `x = 3`.

| Step | Current node | before list | after list |
|------|--------------|-------------|------------|
| 1 | 1 (<3) | 0→1 | 0 |
| 2 | 4 (≥3) | 0→1 | 0→4 |
| 3 | 3 (≥3) | 0→1 | 0→4→3 |
| 4 | 2 (<3) | 0→1→2 | 0→4→3 |
| 5 | 5 (≥3) | 0→1→2 | 0→4→3→5 |
| 6 | 2 (<3) | 0→1→2→2 | 0→4→3→5 |
| End | – | beforeHead.next = 1→2→2 | afterHead.next = 4→3→5 |
| Concatenate | – | Result = 1→2→2→4→3→5 |

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(1) – only a few pointers are used; the list is rearranged in‑place.

## Follow‑Up Questions
1. How would you solve the problem if the list were doubly linked?
2. Can you perform the partition without using dummy nodes?
3. How would you extend this to partition around multiple pivot values?

## Key Takeaway
Separate the list into two partitions using dummy heads, then stitch them together while preserving original relative order.
