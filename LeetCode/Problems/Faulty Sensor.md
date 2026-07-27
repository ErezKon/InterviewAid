# 1826. Faulty Sensor

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/faulty-sensor](https://leetcode.com/problems/faulty-sensor)
**Companies:** Meta

---

## Problem Description

Two sensors recorded `n` readings each. One sensor dropped a single reading and appended a random value at the end. The other is correct. Given `sensor1` and `sensor2`, determine which sensor is faulty (return 1 or 2), or `-1` if indeterminable.

---

## Approach: Find First Mismatch — O(n) ✅

```
FUNCTION badSensor(sensor1, sensor2):
    i = 0
    WHILE i < n AND sensor1[i] == sensor2[i]:
        i += 1
    IF i >= n - 1: RETURN -1  // can't determine
    // Check if sensor1 dropped a value (sensor2 shifted)
    // or sensor2 dropped a value (sensor1 shifted)
    can1 = sensor1[i+1:] matches sensor2[i:n-1]
    can2 = sensor2[i+1:] matches sensor1[i:n-1]
    IF can1 AND can2: RETURN -1
    IF can1: RETURN 1
    IF can2: RETURN 2
    RETURN -1
```

---

## Key Takeaway

> **Find first mismatch, then check which array is "shifted" relative to the other from that point. If both could be faulty, return -1.**
