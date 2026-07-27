# 2558. Take Gifts From the Richest Pile

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/take-gifts-from-the-richest-pile](https://leetcode.com/problems/take-gifts-from-the-richest-pile)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta

---

```
FUNCTION pickGifts(gifts, k):
    heap = MaxHeap(gifts)
    FOR _ ← 0 TO k - 1:
        val = heap.POP()
        heap.PUSH(floor(sqrt(val)))
    RETURN SUM(heap)
```
