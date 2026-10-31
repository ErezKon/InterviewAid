# 641. Design Circular Deque

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-circular-deque](https://leetcode.com/problems/design-circular-deque)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Snowflake

---

## Problem Description

Design your implementation of the circular double-ended queue (deque).

Implement the `MyCircularDeque` class:

- `MyCircularDeque(int k)` Initializes the deque with a maximum size of `k`.
- `boolean insertFront()` Adds an item at the front of Deque. Returns `true` if the operation is successful, or `false` otherwise.
- `boolean insertLast()` Adds an item at the rear of Deque. Returns `true` if the operation is successful, or `false` otherwise.
- `boolean deleteFront()` Deletes an item from the front of Deque. Returns `true` if the operation is successful, or `false` otherwise.
- `boolean deleteLast()` Deletes an item from the rear of Deque. Returns `true` if the operation is successful, or `false` otherwise.
- `int getFront()` Returns the front item from the Deque. Returns `-1` if the deque is empty.
- `int getRear()` Returns the last item from Deque. Returns `-1` if the deque is empty.
- `boolean isEmpty()` Returns `true` if the deque is empty, or `false` otherwise.
- `boolean isFull()` Returns `true` if the deque is full, or `false` otherwise.

**Constraints:**

- `1 <= k <= 1000`
- `0 <= value <= 1000`
- At most `2000` calls will be made to `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, `getFront`, `getRear`, `isEmpty`, `isFull`.

---

## Examples

```
Example 1:
  Input:
  ["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
  [[3], [1], [2], [3], [4], [], [], [], [4], []]
  Output:
  [null, true, true, true, false, 2, true, true, true, 4]
  Explanation:
  MyCircularDeque myCircularDeque = new MyCircularDeque(3);
  myCircularDeque.insertLast(1);  // return True
  myCircularDeque.insertLast(2);  // return True
  myCircularDeque.insertFront(3); // return True
  myCircularDeque.insertFront(4); // return False, the queue is full.
  myCircularDeque.getRear();      // return 2
  myCircularDeque.isFull();       // return True
  myCircularDeque.deleteLast();   // return True
  myCircularDeque.insertFront(4); // return True
  myCircularDeque.getFront();     // return 4
```

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
- What changes are needed to make the deque thread-safe for concurrent access?

---

## Key Takeaway

> **Circular array deque: front moves backward with `(front - 1 + cap) % cap`, rear moves forward with `(rear + 1) % cap`. Size counter simplifies empty/full checks.**