# 2462. Total Cost to Hire K Workers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-cost-to-hire-k-workers](https://leetcode.com/problems/total-cost-to-hire-k-workers)
**Companies:** Bloomberg, Gsa Capital, Mathworks, Microsoft

---

```
FUNCTION totalCost(costs, k, candidates):
    leftHeap = costs[:candidates]
    rightHeap = costs[MAX(candidates, len(costs)-candidates):]
    heapify both
    left = candidates; right = len(costs) - candidates - 1
    total = 0

    FOR _ ← 0 TO k - 1:
        IF leftHeap[0] <= rightHeap[0] (or right empty):
            total += heappop(leftHeap)
            IF left <= right: heappush(leftHeap, costs[left]); left += 1
        ELSE:
            total += heappop(rightHeap)
            IF left <= right: heappush(rightHeap, costs[right]); right -= 1

    RETURN total
```
