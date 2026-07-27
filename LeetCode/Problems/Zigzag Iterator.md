# 281. Zigzag Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zigzag-iterator](https://leetcode.com/problems/zigzag-iterator)
**Companies:** Amazon, C3 Ai, Coinbase, Google, Yandex

---

## Approach: Queue of Iterators — O(1) per call ✅

```
CLASS ZigzagIterator:
    CONSTRUCTOR(v1, v2):
        queue = deque()
        IF v1: queue.APPEND(iter(v1))
        IF v2: queue.APPEND(iter(v2))

    FUNCTION next():
        it = queue.POPLEFT()
        val = next(it)
        IF it has more:
            queue.APPEND(it)
        RETURN val

    FUNCTION hasNext():
        RETURN queue is not empty
```

Generalizes to k lists: add all iterators to the queue.
