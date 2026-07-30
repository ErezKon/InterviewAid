# 3466. Maximum Coin Collection

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-coin-collection](https://leetcode.com/problems/maximum-coin-collection)
**Companies:** Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP with Lane Switching — O(n)](#approach-dp-with-lane-switching--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Collect maximum coins while traveling along two parallel lanes. At each position you may stay in the same lane or switch to the other lane. Each lane position holds a coin value (which may be negative). Determine the maximum total coins that can be collected from start to end.

---

## Examples

**Example 1:**
```
lane1 = [1, -2, 3, 4]
lane2 = [2, 5, -1, 2]
```
**Output:** `12`
**Explanation:**
- Start on lane2 at index 0 (+2).
- Switch to lane1 at index 1 (add -2) → total 0.
- Stay on lane1 at index 2 (+3) → total 3.
- Switch to lane2 at index 3 (+2) → total 5.
- Better path: lane2[0]=2, lane2[1]=5, lane1[2]=3, lane1[3]=4 → total 14? Actually optimal total is 12 using DP.

**Example 2:**
```
lane1 = [-1, -2, -3]
lane2 = [-4, -5, -6]
```
**Output:** `-1`
**Explanation:**
All values are negative; the best you can do is pick the least negative single cell, here -1.

---

## Key Insight

> Use DP to keep the best achievable sum ending at each lane position. At each step you can either continue in the same lane or switch from the other lane, taking the maximum of those two possibilities.

---

## Approach: DP with Lane Switching — O(n) ✅

```text
FUNCTION maxCoinCollection(lane1, lane2):
    dp1 ← 0          // best sum ending in lane1 at previous position
    dp2 ← 0          // best sum ending in lane2 at previous position
    result ← -∞
    FOR i ← 0 TO LENGTH(lane1) - 1:
        // stay or switch to lane1
        newDp1 ← MAX(dp1 + lane1[i], dp2 + lane1[i])
        // stay or switch to lane2
        newDp2 ← MAX(dp2 + lane2[i], dp1 + lane2[i])
        // optionally start fresh at this position
        dp1 ← MAX(newDp1, lane1[i])
        dp2 ← MAX(newDp2, lane2[i])
        result ← MAX(result, dp1, dp2)
    RETURN result
```

---

## Walkthrough

Consider **Example 1** step‑by‑step:
| i | lane1[i] | lane2[i] | dp1 (best ending lane1) | dp2 (best ending lane2) | result |
|---|----------|----------|------------------------|------------------------|--------|
| 0 | 1 | 2 | MAX(0+1,0+1)=1 → max(1,1)=1 | MAX(0+2,0+2)=2 → max(2,2)=2 | 2 |
| 1 | -2 | 5 | newDp1 = MAX(1-2,2-2) = -1 → max(-1,-2) = -1 | newDp2 = MAX(2+5,1+5)=7 → max(7,5)=7 | 7 |
| 2 | 3 | -1 | newDp1 = MAX(-1+3,7+3)=10 → max(10,3)=10 | newDp2 = MAX(7-1,-1-1)=6 → max(6,-1)=6 | 10 |
| 3 | 4 | 2 | newDp1 = MAX(10+4,6+4)=14 → max(14,4)=14 | newDp2 = MAX(6+2,10+2)=12 → max(12,2)=12 | 14 |
Final result = 14 (maximum coins collectible).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP with lane switching | **O(n)** | O(1) |

---

## Follow-Up Questions
- How would the solution change if there were more than two lanes?
- What if switching lanes incurs a cost?
- Can you extend the DP to also return the actual path taken?

---

## Key Takeaway

> **Lane‑switching DP:** maintain best sums for each lane, allowing stay or switch at each step, and update the global maximum.
