# 92. Reverse Linked List II

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/reverse-linked-list-ii](https://leetcode.com/problems/reverse-linked-list-ii)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Bytedance, Google, Infosys, Meta, Microsoft, Nutanix, Nvidia, Oracle, Palo Alto Networks, Revolut, Tiktok, Walmart Labs

---

## 1. Problem Description

Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes from position `left` to position `right`, and return the reversed list.

---

## 2. Examples

```
Example 1:
  Input:  head = [1,2,3,4,5], left = 2, right = 4
  Output: [1,4,3,2,5]
```

---

## 3. Approach: One-Pass Reversal — O(n) ✅

Navigate to position `left-1`, then reverse `right-left+1` nodes, reconnect.

```
FUNCTION reverseBetween(head, left, right):
    dummy = new ListNode(0, head)
    prev = dummy

    // Move to node before 'left'
    FOR i ← 1 TO left - 1:
        prev = prev.next

    // Reverse from left to right
    curr = prev.next
    FOR i ← 0 TO right - left - 1:
        next = curr.next
        curr.next = next.next
        next.next = prev.next
        prev.next = next

    RETURN dummy.next
```

### How the "Pull Forward" Works

Instead of standard reversal, we repeatedly move the next node to the front of the reversed section:
- `curr` stays at the original `left` position (becomes the tail of reversed section)
- Each iteration pulls `curr.next` to `prev.next` (front of section)

---

## 4. Walkthrough

```
[1, 2, 3, 4, 5], left=2, right=4
prev = node(1), curr = node(2)

i=0: pull 3 to front → [1, 3, 2, 4, 5]
i=1: pull 4 to front → [1, 4, 3, 2, 5]

Result: [1, 4, 3, 2, 5] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Reverse entire list (LeetCode #206)?

Special case: left=1, right=n.

### 6.2 Reverse in k-groups (LeetCode #25)?

Apply this reversal repeatedly for each group of k nodes.

---

## Key Takeaway

> The "pull forward" technique reverses a sublist in one pass without extracting/reinserting. A dummy node handles the edge case when `left = 1`.
