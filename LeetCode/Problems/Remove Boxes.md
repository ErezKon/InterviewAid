# 546. Remove Boxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-boxes](https://leetcode.com/problems/remove-boxes)
**Companies:** Amazon, Capital One, Google, Meta, Microsoft, Phonepe, Sprinklr, Tencent, Teradata, Zeta

---

## Approach: 3D DP — O(n⁴) ✅

```
FUNCTION removeBoxes(boxes):
    n = len(boxes)
    memo = n×n×n array of zeros

    FUNCTION dp(l, r, k):
        // k = count of boxes same as boxes[l] attached to the left
        IF l > r: RETURN 0
        IF memo[l][r][k] != 0: RETURN memo[l][r][k]

        // Merge consecutive same-color boxes at the left
        WHILE l + 1 <= r AND boxes[l+1] == boxes[l]:
            l += 1; k += 1

        // Option 1: Remove boxes[l] with k attached boxes
        result = (k + 1)² + dp(l + 1, r, 0)

        // Option 2: Find same-color box later, merge with current group
        FOR m ← l + 1 TO r:
            IF boxes[m] == boxes[l]:
                result = MAX(result, dp(l + 1, m - 1, 0) + dp(m, r, k + 1))

        memo[l][r][k] = result
        RETURN result

    RETURN dp(0, n - 1, 0)
```

The key insight: sometimes it's better to remove middle boxes first to merge same-color boxes for a higher score.
