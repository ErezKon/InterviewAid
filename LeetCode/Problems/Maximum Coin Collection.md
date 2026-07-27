# 3466. Maximum Coin Collection

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-coin-collection](https://leetcode.com/problems/maximum-coin-collection)
**Companies:** Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP with Lane Switching — O(n)](#approach-dp-with-lane-switching--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Collect maximum coins while traveling along lanes (similar to a 2-lane road). At each step you can stay in your lane or switch lanes. Each lane position has a coin value (possibly negative).

---

## Key Insight

> Track DP states for each lane at each position. At each step, either continue in the same lane or switch with a potential cost/benefit. Classic lane-switching DP.

---

## Approach: DP with Lane Switching — O(n) ✅

```
FUNCTION maxCoinCollection(lane1, lane2):
    n = len(lane1)
    // dp1[i] = max coins ending at position i in lane 1
    // dp2[i] = max coins ending at position i in lane 2
    dp1 = dp2 = 0
    result = -infinity

    FOR i ← 0 TO n - 1:
        newDp1 = MAX(dp1 + lane1[i], dp2 + lane1[i])    // stay or switch
        newDp2 = MAX(dp2 + lane2[i], dp1 + lane2[i])
        dp1 = MAX(newDp1, lane1[i])    // or start fresh
        dp2 = MAX(newDp2, lane2[i])
        result = MAX(result, dp1, dp2)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(1) |

---

## Key Takeaway

> **Multi-lane collection problems use DP per lane with transitions between lanes.** At each step: stay, switch, or restart.
