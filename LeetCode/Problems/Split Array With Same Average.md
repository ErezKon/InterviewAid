# 805. Split Array With Same Average

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-with-same-average](https://leetcode.com/problems/split-array-with-same-average)
**Companies:** Amazon, Deutsche Bank, Google, Meesho, Microsoft, Tcs

---

## Approach: Meet in the Middle — O(2^(n/2)) ✅

```
FUNCTION splitArraySameAverage(nums):
    n = len(nums)
    total = SUM(nums)

    // Average of subset of size k must equal total/n
    // k*total/n must be integer → k*total % n == 0

    // Enumerate subsets of first half and second half
    // For each, store (sum - k*total/n) by subset size

    // Check if complementary sums exist in the other half
```

Meet in the middle on n/2 elements. Check if any subset has average = total/n.
