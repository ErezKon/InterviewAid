# 707. Design Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 29.0%
**LeetCode:** [https://leetcode.com/problems/design-linked-list](https://leetcode.com/problems/design-linked-list)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Design your implementation of the linked list. You can choose to use a singly or doubly linked list.

A node in a singly linked list should have two attributes: `val` and `next`. `val` is the value of the current node, and `next` is a pointer/reference to the next node. If you want to use the doubly linked list, you will need one more attribute `prev` to indicate the previous node in the linked list. Assume all nodes in the linked list are **0-indexed**.

Implement the `MyLinkedList` class:

- `MyLinkedList()` Initializes the `MyLinkedList` object.
- `int get(int index)` Get the value of the `index`-th node in the linked list. If the index is invalid, return `-1`.
- `void addAtHead(int val)` Add a node of value `val` before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
- `void addAtTail(int val)` Append a node of value `val` as the last element of the linked list.
- `void addAtIndex(int index, int val)` Add a node of value `val` before the `index`-th node in the linked list. If `index` equals the length of the linked list, the node will be appended to the end of the linked list. If `index` is greater than the length, the node **will not be inserted**.
- `void deleteAtIndex(int index)` Delete the `index`-th node in the linked list, if the index is valid.

**Constraints:**
- `0 <= index, val <= 1000`
- Please do not use the built-in LinkedList library.
- At most `2000` calls will be made to `get`, `addAtHead`, `addAtTail`, `addAtIndex` and `deleteAtIndex`.

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

```
Example 1:
  Input:
  ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
  [[], [1], [3], [1, 2], [1], [1], [1]]
  Output:
  [null, null, null, null, 2, null, 3]
  Explanation:
  MyLinkedList myLinkedList = new MyLinkedList();
  myLinkedList.addAtHead(1);
  myLinkedList.addAtTail(3);
  myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
  myLinkedList.get(1);              // return 2
  myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
  myLinkedList.get(1);              // return 3
```

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
