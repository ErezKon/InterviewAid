# 1962. Remove Stones to Minimize the Total

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-stones-to-minimize-the-total](https://leetcode.com/problems/remove-stones-to-minimize-the-total)
**Companies:** Amazon, Bill Com, Expedia, Nvidia

---

```
FUNCTION minStoneSum(piles, k):
    heap = MaxHeap(piles)
    FOR _ ← 0 TO k - 1:
        val = heap.POP()
        heap.PUSH(val - val // 2)
    RETURN SUM(heap)
```
