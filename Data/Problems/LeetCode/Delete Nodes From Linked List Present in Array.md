# 3217. Delete Nodes From Linked List Present in Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array](https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Remove all linked list nodes whose values appear in the given array.

---

## Examples

| Input | Output |
|-------|--------|
| `head = [1,2,3,4,5]`, `nums = [2,4]` | `[1,3,5]` |
| `head = [1,2,3]`, `nums = [1,2,3]` | `[]` |

---

## Approach

```text
FUNCTION modifiedList(nums, head):
    // Build a set of values to delete for O(1) lookups
    toRemove ← SET(nums)
    // Dummy node simplifies edge deletions
    dummy ← ListNode(0, head)
    curr ← dummy
    WHILE curr.next IS NOT NULL:
        IF curr.next.val IN toRemove:
            // Skip the node to delete it
            curr.next ← curr.next.next
        ELSE:
            curr ← curr.next
    RETURN dummy.next
```

---

## Walkthrough

**Example 1:** `head = [1,2,3,4,5]`, `nums = [2,4]`

1. `toRemove = {2,4}`; `dummy -> 1 -> 2 -> 3 -> 4 -> 5`.
2. `curr` at dummy, `curr.next.val = 1` (not in set) → move `curr` to node 1.
3. `curr.next.val = 2` (in set) → `curr.next` skips node 2, list becomes `dummy -> 1 -> 3 -> 4 -> 5`.
4. `curr` still at node 1, `curr.next.val = 3` (not in set) → move `curr` to node 3.
5. `curr.next.val = 4` (in set) → skip node 4, list becomes `dummy -> 1 -> 3 -> 5`.
6. Continue, no more deletions. Return list starting at node 1 → `[1,3,5]`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m) where n is list length, m is array length |
| **Space** | O(m) for the hash set |

---

## Follow-Up Questions

1. How would you solve the problem without using extra space for a set?
2. Can you delete nodes in a single pass if the array is sorted?
3. How would you handle duplicate values in the array?

---

## Key Takeaway

> **Dummy node + hash‑set lookup:** iterate with a pointer to the previous node, skipping any `next` node whose value is in the removal set. This yields O(1) deletion checks and clean edge‑case handling.
