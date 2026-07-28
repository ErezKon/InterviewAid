# 1188. Design Bounded Blocking Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-bounded-blocking-queue](https://leetcode.com/problems/design-bounded-blocking-queue)
**Companies:** Bloomberg, Linkedin, Microsoft

---

## Problem Description

Design a thread-safe bounded blocking queue: `enqueue` blocks when full, `dequeue` blocks when empty.

---

## Examples

**Example 1:**
```
Input: operations = ["BoundedBlockingQueue","enqueue","enqueue","dequeue","size"],
       arguments = [[3],[1],[2],[],[]]
Output: [null,null,null,1,2]
Explanation:
- BoundedBlockingQueue(3) creates a queue with capacity 3.
- enqueue(1) and enqueue(2) add elements.
- dequeue() returns 1 (the oldest element).
- size() returns 2 (elements 2 remains).
```

**Example 2:**
```
Input: operations = ["BoundedBlockingQueue","enqueue","enqueue","enqueue","enqueue","dequeue"],
       arguments = [[2],[1],[2],[3],[],[]]
Output: [null,null,null,null,null,1]
Explanation:
- After three enqueues, the queue is full (capacity 2). The third enqueue blocks until a dequeue occurs.
- dequeue() returns 1, unblocking the pending enqueue(3).
```

---

## Approach

```
CLASS BoundedBlockingQueue:
    CONSTRUCTOR(capacity):
        SET queue ← empty deque
        SET lock ← new Lock()
        SET notFull ← new Condition(lock)
        SET notEmpty ← new Condition(lock)
        SET capacity ← capacity

    FUNCTION enqueue(element):
        WITH notFull:
            WHILE LENGTH(queue) == capacity:
                CALL notFull.wait()
            CALL queue.append(element)
            CALL notEmpty.notify()

    FUNCTION dequeue():
        WITH notEmpty:
            WHILE LENGTH(queue) == 0:
                CALL notEmpty.wait()
            SET value ← queue.popleft()
            CALL notFull.notify()
            RETURN value

    FUNCTION size():
        WITH lock:
            RETURN LENGTH(queue)
```

---

## Walkthrough

| Step | Operation | Queue State | Notes |
|------|-----------|------------|-------|
| 1 | `BoundedBlockingQueue(3)` | [] | Initialize empty queue with capacity 3 |
| 2 | `enqueue(1)` | [1] | Queue not full, element added |
| 3 | `enqueue(2)` | [1,2] | Queue not full, element added |
| 4 | `dequeue()` | [2] | Returns 1, notEmpty notifies waiting enqueues |
| 5 | `size()` | [2] | Returns 2 (one element in queue) |

---

## Complexity Analysis

- **Time Complexity:** Each operation (`enqueue`, `dequeue`, `size`) runs in **O(1)** amortized time; waiting on conditions does not add computational cost.
- **Space Complexity:** **O(capacity)** for storing up to `capacity` elements in the internal deque.

---

## Follow-Up Questions

1. How would you extend this design to support a priority queue?
2. What changes are needed to make the queue lock‑free?
3. How would you handle shutdown semantics where pending enqueues should fail gracefully?

---

## Key Takeaway

> **Classic producer‑consumer pattern: two condition variables (`notFull`, `notEmpty`) on a shared lock. Use `while` loops (not `if`) for spurious wakeup safety.**