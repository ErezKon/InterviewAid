# 3356. Zero Array Transformation II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-ii](https://leetcode.com/problems/zero-array-transformation-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Approach: Binary Search + Difference Array — O(n log q) ✅

```
FUNCTION minZeroArray(nums, queries):
    FUNCTION canZero(k):
        diff = [0] * (n + 1)
        FOR i ← 0 TO k - 1:
            [l, r, val] = queries[i]
            diff[l] += val
            diff[r + 1] -= val
        curr = 0
        FOR i ← 0 TO n - 1:
            curr += diff[i]
            IF curr < nums[i]: RETURN false
        RETURN true

    lo, hi = 0, len(queries)
    IF NOT canZero(hi): RETURN -1
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canZero(mid): hi = mid
        ELSE: lo = mid + 1
    RETURN lo
```
