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

A generic microwave supports cooking times for:
- at least `1` second.
- at most `99` minutes and `99` seconds.

To set the cooking time, you push **at most four digits**. The microwave normalizes what you push as four digits by **prepending zeroes**. It interprets the **first** two digits as the minutes and the **last** two digits as the seconds. It then **adds** them up as the cooking time. For example,
- You push `9` `5` `4` (three digits). It is normalized as `0954` and interpreted as `9` minutes and `54` seconds.
- You push `0` `0` `0` `8` (four digits). It is interpreted as `0` minutes and `8` seconds.
- You push `8` `0` `9` `0`. It is interpreted as `80` minutes and `90` seconds.
- You push `8` `1` `3` `0`. It is interpreted as `81` minutes and `30` seconds.

You are given integers `startAt`, `moveCost`, `pushCost`, and `targetSeconds`. **Initially**, your finger is on the digit `startAt`. Moving the finger above **any specific digit** costs `moveCost` units of fatigue. Pushing the digit below the finger **once** costs `pushCost` units of fatigue.

There can be multiple ways to set the microwave to cook for `targetSeconds` seconds but you are interested in the way with the minimum cost.

Return *the **minimum cost** to set* `targetSeconds` *seconds of cooking time*.

Remember that one minute consists of `60` seconds.

**Constraints:**
- `0 ≤ startAt ≤ 9`
- `1 ≤ moveCost, pushCost ≤ 10⁵`
- `1 ≤ targetSeconds ≤ 6039`

---

## Examples

```
Example 1:
  Input: startAt = 1, moveCost = 2, pushCost = 1, targetSeconds = 600
  Output: 6
  Explanation: The following are the possible ways to set the cooking time.
  - 1 0 0 0, interpreted as 10 minutes and 0 seconds.
    The finger is already on digit 1, pushes 1 (with cost 1), moves to 0 (with cost 2), pushes 0 (with cost 1), pushes 0 (with cost 1), and pushes 0 (with cost 1).
    The cost is: 1 + 2 + 1 + 1 + 1 = 6. This is the minimum cost.
  - 0 9 6 0, interpreted as 9 minutes and 60 seconds. That is also 600 seconds.
    The finger moves to 0 (with cost 2), pushes 0 (with cost 1), moves to 9 (with cost 2), pushes 9 (with cost 1), moves to 6 (with cost 2), pushes 6 (with cost 1), moves to 0 (with cost 2), and pushes 0 (with cost 1).
    The cost is: 2 + 1 + 2 + 1 + 2 + 1 + 2 + 1 = 12.
  - 9 6 0, normalized as 0960 and interpreted as 9 minutes and 60 seconds.
    The finger moves to 9 (with cost 2), pushes 9 (with cost 1), moves to 6 (with cost 2), pushes 6 (with cost 1), moves to 0 (with cost 2), and pushes 0 (with cost 1).
    The cost is: 2 + 1 + 2 + 1 + 2 + 1 = 9.
```

```
Example 2:
  Input: startAt = 0, moveCost = 1, pushCost = 2, targetSeconds = 76
  Output: 6
  Explanation: The optimal way is to push two digits: 7 6, interpreted as 76 seconds.
  The finger moves to 7 (with cost 1), pushes 7 (with cost 2), moves to 6 (with cost 1), and pushes 6 (with cost 2). The total cost is: 1 + 2 + 1 + 2 = 6
  Note other possible ways are 0076, 076, 0116, and 116, but none of them produces the minimum cost.
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
