# 2542. Maximum Subsequence Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subsequence-score](https://leetcode.com/problems/maximum-subsequence-score)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Microsoft

---

## Approach: Sort + Min-Heap — O(n log n) ✅

Score = sum of selected nums1 elements × min of selected nums2 elements. Pick k elements.

```
FUNCTION maxScore(nums1, nums2, k):
    // Sort by nums2 descending (so min decreases as we go)
    pairs = sorted by nums2 descending
    heap = MinHeap()
    sum1 = 0
    maxScore = 0

    FOR (n1, n2) IN pairs:
        heap.PUSH(n1)
        sum1 += n1

        IF heap.SIZE() > k:
            sum1 -= heap.POP()

        IF heap.SIZE() == k:
            maxScore = MAX(maxScore, sum1 * n2)

    RETURN maxScore
```

Process in decreasing nums2 order. Current n2 is the minimum. Maintain top-k largest nums1 values with a min-heap.
