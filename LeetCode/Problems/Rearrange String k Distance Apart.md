# 358. Rearrange String k Distance Apart

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rearrange-string-k-distance-apart](https://leetcode.com/problems/rearrange-string-k-distance-apart)
**Companies:** Amazon, Google, Tiktok, Zomato

---

```
FUNCTION rearrangeString(s, k):
    IF k <= 1: RETURN s
    count = Counter(s)
    heap = MaxHeap([(-c, ch) for ch, c in count.items()])
    result = []; waitQueue = deque()

    WHILE heap:
        (negC, ch) = heap.POP()
        result.ADD(ch)
        waitQueue.APPEND((negC + 1, ch))
        IF len(waitQueue) >= k:
            (nc, wch) = waitQueue.POPLEFT()
            IF nc < 0: heap.PUSH((nc, wch))

    RETURN JOIN(result) IF len(result) == len(s) ELSE ""
```
