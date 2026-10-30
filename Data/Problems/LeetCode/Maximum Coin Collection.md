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

> *Note: the Approach below allows unlimited lane switches and starting in either lane. Officially Mario enters in lane 1 and may switch **at most 2** times. Correct idea: DP over miles with state `s ∈ {0,1,2}` = switches used (lane 1 for `s = 0, 2`, lane 2 for `s = 1`). `f[i][s] = lane_s[i] + max(f[i-1][s], f[i-1][s-1], 0 if Mario can enter here in state s)`, where entering is allowed for `s = 0`, and for `s = 1` via an immediate switch on entry. The answer is the maximum over all `i, s`.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Mario drives on a two-lane freeway with coins every mile. You are given two integer arrays, `lane1` and `lane2`, where the value at the `i^th` index represents the number of coins he *gains or loses* in the `i^th` mile in that lane.

- If Mario is in lane 1 at mile `i` and `lane1[i] > 0`, Mario gains `lane1[i]` coins.
- If Mario is in lane 1 at mile `i` and `lane1[i] < 0`, Mario pays a toll and loses `abs(lane1[i])` coins.
- The same rules apply for `lane2`.

Mario can enter the freeway anywhere and exit anytime after traveling **at least** one mile. Mario always enters the freeway on lane 1 but can switch lanes **at most** 2 times.

A **lane switch** is when Mario goes from lane 1 to lane 2 or vice versa.

Return the **maximum** number of coins Mario can earn after performing **at most 2 lane switches**.

**Note:** Mario can switch lanes immediately upon entering or just before exiting the freeway.

**Constraints:**
- `1 <= lane1.length == lane2.length <= 10^5`
- `-10^9 <= lane1[i], lane2[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: lane1 = [1,-2,-10,3], lane2 = [-5,10,0,1]
Output: 14
Explanation: - Mario drives the first mile on lane 1.
- He then changes to lane 2 and drives for two miles.
- He changes back to lane 1 for the last mile.
Mario collects 1 + 10 + 0 + 3 = 14 coins.
```

**Example 2:**
```
Input: lane1 = [1,-1,-1,-1], lane2 = [0,3,4,-5]
Output: 8
Explanation: - Mario starts at mile 0 in lane 1 and drives one mile.
- He then changes to lane 2 and drives for two more miles. He exits the freeway before mile 3.
He collects 1 + 3 + 4 = 8 coins.
```

**Example 3:**
```
Input: lane1 = [-5,-4,-3], lane2 = [-1,2,3]
Output: 5
Explanation: - Mario enters at mile 1 and immediately switches to lane 2. He stays here the entire way.
He collects a total of 2 + 3 = 5 coins.
```

**Example 4:**
```
Input: lane1 = [-3,-3,-3], lane2 = [9,-2,4]
Output: 11
Explanation: - Mario starts at the beginning of the freeway and immediately switches to lane 2. He stays here the whole way.
He collects a total of 9 + (-2) + 4 = 11 coins.
```

**Example 5:**
```
Input: lane1 = [-10], lane2 = [-2]
Output: -2
Explanation: - Since Mario must ride on the freeway for at least one mile, he rides just one mile in lane 2.
He collects a total of -2 coins.
```

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
