# 3066. Minimum Operations to Exceed Threshold Value II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii](https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii)
**Companies:** Amazon, Google, Meta, Tcs

---

```
FUNCTION minOperations(nums, k):
    heap = MinHeap(nums)
    ops = 0
    WHILE heap[0] < k:
        a = heappop(heap); b = heappop(heap)
        heappush(heap, min(a,b) * 2 + max(a,b))
        ops += 1
    RETURN ops
```
