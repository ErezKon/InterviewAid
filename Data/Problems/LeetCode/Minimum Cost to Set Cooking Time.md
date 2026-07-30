# 2162. Minimum Cost to Set Cooking Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-set-cooking-time](https://leetcode.com/problems/minimum-cost-to-set-cooking-time)
**Companies:** Ge Digital, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Enumerate Representations — O(1)](#approach-enumerate-representations--o1)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A microwave has a display showing minutes and seconds (MM:SS format, up to 99:99). You need to set a target number of seconds. Moving your finger from one digit to another costs `moveCost`, pressing a digit costs `pushCost`. You start with your finger over `startAt` digit. Find the **minimum cost** to input the cooking time.

The time can be represented as different minute:second combinations (e.g., 90 seconds = "1:30" or "0:90").

**Constraints:**
- `1 ≤ targetSeconds ≤ 6039`
- `0 ≤ startAt ≤ 9`
- `1 ≤ moveCost, pushCost ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: startAt = 1, moveCost = 2, pushCost = 1, targetSeconds = 600
Output: 6
Explanation: Enter "10:00" → digits [1,0,0,0]. Start at 1: push 1 (cost 1), move to 0 (cost 2), push 0 three times (cost 3). Total = 6.
```

**Example 2:**
```
Input: startAt = 0, moveCost = 1, pushCost = 2, targetSeconds = 76
Output: 6
Explanation: "1:16" = [1,1,6]. Move to 1 (cost 1), push 1 (cost 2), push 1 (cost 2), move to 6 (cost 1), push 6 (cost 2) = 8.
Or "0:76" = [7,6]. Move to 7 (cost 1), push 7 (cost 2), move to 6 (cost 1), push 6 (cost 2) = 6. Min = 6.
```

---

## Key Insight

> There are at most **two valid representations** of the target time: `(minutes, seconds)` and `(minutes-1, seconds+60)`. Compute the button-press cost for each and take the minimum.

Leading zeros are not typed — e.g., 76 seconds can be "76" (2 digits) rather than "0076" (4 digits).

---

## Approach: Enumerate Representations — O(1) ✅

```
FUNCTION minCostSetTime(startAt, moveCost, pushCost, targetSeconds):
    FUNCTION costOfDigits(minutes, seconds):
        IF minutes < 0 OR minutes > 99 OR seconds < 0 OR seconds > 99:
            RETURN infinity
        // Build digit string, strip leading zeros
        digits ← string of (minutes * 100 + seconds), no leading zeros
        IF len(digits) == 0: digits ← "0"
        cost ← 0
        current ← startAt
        FOR d IN digits:
            IF d != current:
                cost ← cost + moveCost
                current ← d
            cost ← cost + pushCost
        RETURN cost

    mins ← targetSeconds / 60
    secs ← targetSeconds % 60
    RETURN MIN(costOfDigits(mins, secs), costOfDigits(mins - 1, secs + 60))
```

---

## Walkthrough

```
targetSeconds = 76, startAt = 0, moveCost = 1, pushCost = 2
```

**Representation 1:** mins=1, secs=16 → digits "116"
| Digit | Current | Move? | Cost |
|-------|---------|-------|------|
| 1 | 0 | Yes (+1) | 1+2=3 |
| 1 | 1 | No | 2 |
| 6 | 1 | Yes (+1) | 1+2=3 |
| **Total** | | | **8** |

**Representation 2:** mins=0, secs=76 → digits "76"
| Digit | Current | Move? | Cost |
|-------|---------|-------|------|
| 7 | 0 | Yes (+1) | 1+2=3 |
| 6 | 7 | Yes (+1) | 1+2=3 |
| **Total** | | | **6** |

**Result:** min(8, 6) = **6** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) — at most 2 representations, each ≤ 4 digits |
| **Space** | O(1) |

---

## Follow-Up Questions

1. **Why only two representations?** Moving 1 minute to seconds adds 60. If seconds > 99, it's invalid; if minutes < 0, also invalid.
2. **Why strip leading zeros?** The display doesn't require you to type leading zeros — you only enter significant digits.
3. **What if the display supported hours?** You'd enumerate more representations but the approach stays the same.

---

## Key Takeaway

> When a value can be represented in multiple equivalent forms (like minutes+seconds), **enumerate all valid representations** and pick the one with minimum cost — often there are only a constant number to check.
