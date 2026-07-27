# 1188. Design Bounded Blocking Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-bounded-blocking-queue](https://leetcode.com/problems/design-bounded-blocking-queue)
**Companies:** Bloomberg, Linkedin, Microsoft

---

## Problem Description

Design a thread-safe bounded blocking queue: `enqueue` blocks when full, `dequeue` blocks when empty.

---

## Approach

```
CLASS BoundedBlockingQueue:
    CONSTRUCTOR(capacity):
        self.queue = deque()
        self.lock = Lock()
        self.notFull = Condition(lock)
        self.notEmpty = Condition(lock)
        self.capacity = capacity

    FUNCTION enqueue(element):
        WITH notFull: WHILE len(queue) == capacity: notFull.wait()
        queue.ADD(element); notEmpty.notify()

    FUNCTION dequeue():
        WITH notEmpty: WHILE len(queue) == 0: notEmpty.wait()
        val = queue.POPLEFT(); notFull.notify()
        RETURN val

    FUNCTION size(): RETURN len(queue)
```

---

## Key Takeaway

> **Classic producer-consumer pattern: two condition variables (notFull, notEmpty) on a shared lock. Use `while` loops (not `if`) for spurious wakeup safety.**
