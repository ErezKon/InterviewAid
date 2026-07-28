# 641. Design Circular Deque

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-circular-deque](https://leetcode.com/problems/design-circular-deque)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Snowflake

---

## Problem Description

Design a circular double-ended queue with `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, `getFront`, `getRear`, `isEmpty`, `isFull`.

---

## Examples

**Example 1:**

```text
Input:
["MyCircularDeque","insertFront","insertLast","getFront","getRear","isEmpty","deleteLast","deleteFront","isFull"]
[[3],[1],[2],[],[],[],[],[],[]]

Output:
[null,true,true,1,2,false,true,true,false]
```

Explanation:
- Initialize a deque with capacity 3.
- Insert 1 at the front and 2 at the rear.
- Front element is 1, rear element is 2.
- The deque is not empty.
- Deleting the rear and then the front empties the deque, which is not full.

---

## Approach: Circular Array — O(1) ✅

```
CLASS MyCircularDeque:
    CONSTRUCTOR(k):
        arr = [0] * k
        front = 0
        rear = 0
        size = 0
        capacity = k

    FUNCTION insertFront(value):
        IF isFull(): RETURN false
        front = (front - 1 + capacity) % capacity
        arr[front] = value
        size += 1
        RETURN true

    FUNCTION insertLast(value):
        IF isFull(): RETURN false
        arr[rear] = value
        rear = (rear + 1) % capacity
        size += 1
        RETURN true

    FUNCTION deleteFront():
        IF isEmpty(): RETURN false
        front = (front + 1) % capacity
        size -= 1
        RETURN true

    FUNCTION deleteLast():
        IF isEmpty(): RETURN false
        rear = (rear - 1 + capacity) % capacity
        size -= 1
        RETURN true
```

---

## Walkthrough

| Step | Operation | Front Index | Rear Index | Size | Comments |
|------|-----------|-------------|------------|------|----------|
| 1 | `MyCircularDeque(3)` | 0 | 0 | 0 | Empty circular buffer of capacity 3 |
| 2 | `insertFront(1)` | 2 | 0 | 1 | Front moves backward to index 2, stores 1 |
| 3 | `insertLast(2)` | 2 | 1 | 2 | Rear stores 2 at index 0 then moves to 1 |
| 4 | `getFront()` | – | – | – | Returns `arr[front] = arr[2] = 1` |
| 5 | `getRear()` | – | – | – | Returns `arr[(rear-1+cap)%cap] = arr[0] = 2` |
| 6 | `deleteLast()` | 2 | 0 | 1 | Rear moves back to index 0, size decrements |
| 7 | `deleteFront()` | 0 | 0 | 0 | Front moves forward to index 0, deque becomes empty |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) all operations |
| **Space** | O(k) |

---

## Follow-Up Questions

- How would you implement the deque using a doubly linked list to avoid a fixed capacity?
- How can you extend the design to support `getMin`/`getMax` in O(1) time?
- What changes are needed to make the deque thread‑safe for concurrent access?

---

## Key Takeaway

> **Circular array deque: front moves backward with `(front - 1 + cap) % cap`, rear moves forward with `(rear + 1) % cap`. Size counter simplifies empty/full checks.**