# 307. Range Sum Query - Mutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-mutable](https://leetcode.com/problems/range-sum-query-mutable)
**Companies:** Adobe, Bloomberg, Google, Microsoft

---

## Approach: Binary Indexed Tree (Fenwick Tree) — O(log n) ✅

```
CLASS NumArray:
    CONSTRUCTOR(nums):
        n = len(nums)
        tree = [0] * (n + 1)
        // Build tree
        FOR i, num IN enumerate(nums):
            update(i, num)

    FUNCTION update(i, val):
        diff = val - nums[i]
        nums[i] = val
        i += 1
        WHILE i <= n:
            tree[i] += diff
            i += i & (-i)

    FUNCTION prefixSum(i):
        sum = 0
        i += 1
        WHILE i > 0:
            sum += tree[i]
            i -= i & (-i)
        RETURN sum

    FUNCTION sumRange(l, r):
        RETURN prefixSum(r) - prefixSum(l - 1)
```

BIT: update O(log n), query O(log n). Segment tree is an alternative.
