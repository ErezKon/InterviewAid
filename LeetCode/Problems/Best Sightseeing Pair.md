# 1014. Best Sightseeing Pair

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-sightseeing-pair](https://leetcode.com/problems/best-sightseeing-pair)
**Companies:** Amazon, Bloomberg, Google, Meta, Nutanix, Wayfair

---

```
FUNCTION maxScoreSightseeingPair(values):
    maxI = values[0]    // best values[i] + i seen so far
    maxScore = 0

    FOR j ← 1 TO n - 1:
        maxScore = MAX(maxScore, maxI + values[j] - j)
        maxI = MAX(maxI, values[j] + j)

    RETURN maxScore
```

Score = values[i] + i + values[j] - j. Track max (values[i] + i) as we scan.
