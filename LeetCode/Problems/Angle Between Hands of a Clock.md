# 1344. Angle Between Hands of a Clock

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/angle-between-hands-of-a-clock](https://leetcode.com/problems/angle-between-hands-of-a-clock)
**Companies:** Amazon, Apple, Bloomberg, Epic Systems, Meta, Microsoft, Siemens

---

```
FUNCTION angleClock(hour, minutes):
    minuteAngle = minutes * 6.0
    hourAngle = (hour % 12) * 30.0 + minutes * 0.5
    diff = ABS(hourAngle - minuteAngle)
    RETURN MIN(diff, 360 - diff)
```

Minute hand: 6° per minute. Hour hand: 30° per hour + 0.5° per minute.
