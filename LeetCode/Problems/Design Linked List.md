# 707. Design Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 29.0%
**LeetCode:** [https://leetcode.com/problems/design-linked-list](https://leetcode.com/problems/design-linked-list)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Design a singly or doubly linked list with: `get(index)`, `addAtHead(val)`, `addAtTail(val)`, `addAtIndex(index, val)`, `deleteAtIndex(index)`.

---

## 2. Approach: Doubly Linked List with Sentinel Nodes ✅

```text
CLASS MyLinkedList:
    CONSTRUCTOR:
        head = sentinel node
        tail = sentinel node
        head.next = tail
        tail.prev = head
        size = 0

    FUNCTION get(index):
        IF index < 0 OR index >= size: RETURN -1
        node = getNode(index)
        RETURN node.val

    FUNCTION addAtIndex(index, val):
        IF index < 0 OR index > size: RETURN
        pred = getNode(index - 1)  // or use sentinel
        newNode = Node(val)
        newNode.next = pred.next
        newNode.prev = pred
        pred.next.prev = newNode
        pred.next = newNode
        size += 1

    FUNCTION deleteAtIndex(index):
        IF index < 0 OR index >= size: RETURN
        node = getNode(index)
        node.prev.next = node.next
        node.next.prev = node.prev
        size += 1
```

Sentinel nodes eliminate null checks for head/tail operations.

---

## 3. Examples

| Operation | Result |
|-----------|--------|
| `addAtHead(1)` | List: 1 |
| `addAtTail(2)` | List: 1 → 2 |
| `addAtIndex(1,3)` | List: 1 → 3 → 2 |
| `get(1)` | Returns **3** |
| `deleteAtIndex(1)` | List: 1 → 2 |
| `get(1)` | Returns **2** |

---

## 4. Walkthrough

**Step 1:** Initialize with sentinel head and tail.

**Step 2:** `addAtHead(1)` creates a node between head and tail.

**Step 3:** `addAtTail(2)` inserts after the existing node.

**Step 4:** `addAtIndex(1,3)` finds predecessor at index 0 and inserts node 3.

**Step 5:** `get(1)` traverses to the second node (value 3) and returns it.

**Step 6:** `deleteAtIndex(1)` removes node 3, linking node 1 directly to node 2.

**Step 7:** `get(1)` now returns value **2**.

---

## 5. Complexity Analysis

- **Time Complexity:** `O(n)` for `get`, `addAtIndex`, and `deleteAtIndex` due to traversal; `O(1)` for `addAtHead` and `addAtTail`.
- **Space Complexity:** `O(1)` auxiliary space (excluding the nodes stored in the list).

---

## 6. Follow-Up Questions

- How would you modify the design to support a circular doubly linked list?
- Can you implement the list with a balanced binary tree to achieve `O(log n)` operations?
- How would you add a `reverse()` operation efficiently?

---

## Key Takeaway

> Sentinel (dummy) head and tail nodes greatly simplify linked list operations by eliminating edge cases for empty lists and boundary operations.
