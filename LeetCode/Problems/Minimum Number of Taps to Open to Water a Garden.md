# 1326. Minimum Number of Taps to Open to Water a Garden

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden)
**Companies:** Adobe, Akuna Capital, Amazon, De Shaw, Google, Meesho, Meta, Microsoft, Morgan Stanley, Rippling, Salesforce, Squarepoint Capital, Uber

---

## Approach: Jump Game II Reduction — O(n) ✅

Convert taps to intervals, then solve as minimum jumps.

```
FUNCTION minTaps(n, ranges):
    // Convert to max reach from each start position
    maxReach = [0] * (n + 1)
    FOR i, r IN enumerate(ranges):
        left = MAX(0, i - r)
        right = MIN(n, i + r)
        maxReach[left] = MAX(maxReach[left], right)

    // Jump Game II
    taps = 0
    curEnd = 0
    farthest = 0

    FOR i ← 0 TO n - 1:
        farthest = MAX(farthest, maxReach[i])
        IF i == curEnd:
            IF farthest <= i: RETURN -1
            taps += 1
            curEnd = farthest

    RETURN taps
```

Same as Jump Game II (#45) / Video Stitching (#1024).
