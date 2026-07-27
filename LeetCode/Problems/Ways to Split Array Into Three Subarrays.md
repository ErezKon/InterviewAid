# 1712. Ways to Split Array Into Three Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-split-array-into-three-subarrays](https://leetcode.com/problems/ways-to-split-array-into-three-subarrays)
**Companies:** Google, Robinhood, Tekion

---

```
FUNCTION waysToSplit(nums):
    MOD = 10^9 + 7
    prefix = prefix sums
    n = len(nums); count = 0
    FOR i ← 0 TO n - 3:
        // Binary search for valid j range
        // left sum <= mid sum: prefix[j] >= 2*prefix[i]
        // mid sum <= right sum: prefix[j] <= (prefix[n-1]+prefix[i])/2
        lo = bisect_left(prefix, 2*prefix[i], i+1, n-1)
        hi = bisect_right(prefix, (prefix[n-1]+prefix[i])//2, lo, n-1)
        count = (count + hi - lo) % MOD
    RETURN count
```
