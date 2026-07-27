# 1344. Angle Between Hands of a Clock

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/angle-between-hands-of-a-clock](https://leetcode.com/problems/angle-between-hands-of-a-clock)
**Companies:** Amazon, Apple, Bloomberg, Epic Systems, Meta, Microsoft, Siemens

---

## Problem Description
Given an integer `hour` (0 ≤ hour ≤ 23) and an integer `minutes` (0 ≤ minutes < 60), return the smaller angle (in degrees) formed between the hour and minute hands on an analog clock.

## Examples
- **Input:** `hour = 12, minutes = 30` **Output:** `165`
  *Explanation:* Minute hand at 180°, hour hand at 15°, difference 165°.
- **Input:** `hour = 3, minutes = 15` **Output:** `7.5`
  *Explanation:* Minute hand at 90°, hour hand at 97.5°, difference 7.5°.

## Approach
The problem is solved with simple geometry. Compute the absolute positions of both hands and take the minimum of the direct difference and its complement to 360°.

```text
FUNCTION angleClock(hour, minutes):
    // Convert hour to 12‑hour format
    SET hour12 ← hour MOD 12
    // Minute hand moves 6° per minute
    SET minuteAngle ← minutes * 6.0
    // Hour hand moves 30° per hour + 0.5° per minute
    SET hourAngle ← hour12 * 30.0 + minutes * 0.5
    SET diff ← ABS(hourAngle - minuteAngle)
    RETURN MIN(diff, 360 - diff)
```

## Walkthrough
| hour | minutes | hourAngle | minuteAngle | diff | answer |
|------|---------|-----------|-------------|------|--------|
| 12   | 30      | 15        | 180         | 165  | 165 |
| 3    | 15      | 97.5      | 90          | 7.5  | 7.5 |

## Complexity Analysis
- **Time:** O(1) – constant arithmetic operations.
- **Space:** O(1) – only a few variables.

## Follow‑Up Questions
1. How would you handle a clock with a second hand?
2. Extend to compute the angle at any given time including fractional minutes.
3. What if the clock runs in reverse direction?

## Key Takeaway
The smallest angle between clock hands can be found by converting each hand’s position to degrees and taking the minimum of the direct difference and its complement to 360°.
