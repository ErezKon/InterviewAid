# 19. Remove Nth Node From End of List

**Difficulty:** 🟡 Medium
**Acceptance:** 46.0%
**LeetCode:** [https://leetcode.com/problems/remove-nth-node-from-end-of-list](https://leetcode.com/problems/remove-nth-node-from-end-of-list)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Broadcom, Google, Josh Technology, Meta, Microsoft, Morgan Stanley, Oracle, Qualcomm, Symantec, Tcs, Tiktok, Tinkoff, Walmart Labs, Yandex

---

## 1. Problem Description

Given the head of a linked list, remove the `n`th node from the **end** of the list and return its head.

---

## 2. Approach: Two Pointers — O(L) ✅

Advance `fast` by n nodes. Then advance both `slow` and `fast` until `fast` reaches the end. `slow` is now at the node before the target.

```text
FUNCTION removeNthFromEnd(head, n):
    dummy ← new ListNode(0, head)
    fast ← dummy
    slow ← dummy
    FOR i ← 0 TO n:
        fast ← fast.next
    WHILE fast != null:
        fast ← fast.next
        slow ← slow.next
    slow.next ← slow.next.next
    RETURN dummy.next
```

---

## 3. Examples

| Input List | n | Output List | Explanation |
|------------|---|-------------|-------------|
| `1→2→3→4→5`, `2` | 2 | `1→2→3→5` | Remove the 2nd node from the end (`4`). |
| `1→2`, `1` | 1 | `1` | Remove the last node. |
| `1`, `1` | 1 | `null` | Removing the only node results in an empty list. |

---

## 4. Walkthrough

**Example:** List `1→2→3→4→5`, `n = 2`

| Step | fast pointer | slow pointer | Action |
|------|--------------|--------------|--------|
| Init | dummy (0) → 1 → 2 → 3 → 4 → 5 | dummy (0) | Set both to dummy |
| Advance fast `n+1` times | points to node `3` | still dummy | Move fast ahead |
| Move both until fast hits null | moves through 4,5,null | moves through 1,2,3 | After loop, slow at node `3` |
| Delete | slow.next (node `4`) removed | | Set `slow.next ← slow.next.next` |
| Return | dummy.next → `1→2→3→5` | | |

---

## 5. Complexity Analysis

- **Time:** O(L) – single pass through the list.
- **Space:** O(1) – only constant extra pointers.

---

## Key Takeaway

> The **two-pointer gap** technique: maintain a fixed gap of n between two pointers. When the ahead pointer reaches the end, the behind pointer is at the right position. Dummy node handles edge case of removing the head.
