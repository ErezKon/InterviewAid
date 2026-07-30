# 61. Rotate List

**Difficulty:** 🟡 Medium
**Acceptance:** 38.0%
**LeetCode:** [https://leetcode.com/problems/rotate-list](https://leetcode.com/problems/rotate-list)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Linkedin, Meta, Microsoft, Nvidia, Oracle

---

## 1. Problem Description

Given the head of a linked list, rotate the list to the right by `k` places.

---

## 2. Approach: Make Circular, Break — O(n) ✅

```text
FUNCTION rotateRight(head, k):
    IF head == null OR k == 0: RETURN head

    // Find length and tail
    length = 1
    tail = head
    WHILE tail.next:
        tail = tail.next
        length += 1

    k = k % length
    IF k == 0: RETURN head

    // Make circular
    tail.next = head

    // Find new tail: (length - k - 1) steps from head
    newTail = head
    FOR i ← 0 TO length - k - 2:
        newTail = newTail.next

    newHead = newTail.next
    newTail.next = null

    RETURN newHead
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

| Input List | k | Output List |
|------------|---|-------------|
| 1→2→3→4→5 | 2 | 4→5→1→2→3 |
| 0→1→2 | 4 | 2→0→1 |

---

## 4. Walkthrough

**Example:** List = 1→2→3→4→5, k = 2

1. Compute length = 5, tail = 5.
2. k = 2 % 5 = 2.
3. Connect tail.next to head → circular list.
4. New tail is at position `length - k - 1 = 2` (0‑based), node with value 3.
5. New head = newTail.next → node 4.
6. Break circle: set newTail.next = null.
7. Resulting list: 4→5→1→2→3.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass to find length and another to locate new tail.
- **Space:** O(1) – only a few pointers are used.

---

## 6. Follow-Up Questions

- How would you rotate the list to the left?
- Can you perform the rotation in a single pass without computing the length first?
- How would you handle a doubly linked list?

---

## Key Takeaway

> Connect tail to head (circular), then break at position `n - k`. Don't forget `k = k % n` to handle k > length.
