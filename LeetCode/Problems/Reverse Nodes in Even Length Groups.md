# 2074. Reverse Nodes in Even Length Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-nodes-in-even-length-groups](https://leetcode.com/problems/reverse-nodes-in-even-length-groups)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Nutanix, Zopsmart

---

## Problem Description

Given a linked list, group nodes into consecutive groups of increasing size (1, 2, 3, 4, ...). The last group may be smaller. **Reverse the nodes** in each group that has an **even** length. Return the modified list.

**Constraints:**
- `1 <= n <= 10^5`
- Node values are in `[0, 10^5]`

---

## Key Insight

> The group sizes are 1, 2, 3, 4, ... but the last group may be shorter. Reverse a group only if its **actual** length is even — so even a "group of 3" at the end might only have 2 nodes left, making it even and requiring reversal.

---

## Approach

```
FUNCTION reverseEvenLengthGroups(head):
    prev = head
    groupLen = 2

    WHILE prev.next:
        // Count actual group size (may be less than groupLen at the end)
        node = prev
        actualLen = 0
        FOR _ ← 0 TO groupLen - 1:
            IF node.next == null: BREAK
            node = node.next
            actualLen += 1

        IF actualLen % 2 == 0:
            // Reverse this group
            reverse actualLen nodes after prev

        // Move prev to end of group
        prev = advance groupLen or actualLen steps

        groupLen += 1

    RETURN head
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — each node visited once for counting and once for reversal |
| Space  | O(1) — in-place reversal |

---

## Key Takeaway

> When reversing groups conditionally, always count the **actual** group size first (the last group may be truncated), then decide whether to reverse based on the actual size.
