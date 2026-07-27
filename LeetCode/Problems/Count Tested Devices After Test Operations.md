# 2960. Count Tested Devices After Test Operations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-tested-devices-after-test-operations](https://leetcode.com/problems/count-tested-devices-after-test-operations)
**Companies:** Accenture

---

## Problem Description

Given an array `batteryPercentages`, process devices left to right. If `batteryPercentages[i] > 0`, the device is tested (count it) and all subsequent devices lose 1 battery. Return total tested devices.

---

## Key Insight

Instead of actually decrementing all subsequent elements (O(n²)), track a `decrement` counter. Device `i` is tested if `batteryPercentages[i] - decrement > 0`.

---

## Approach

```
FUNCTION countTestedDevices(batteryPercentages):
    tested = 0
    FOR i ← 0 TO n - 1 DO
        IF batteryPercentages[i] - tested > 0:
            tested += 1
    RETURN tested
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Lazy decrement: instead of updating all subsequent elements, track the cumulative decrement as a single counter. Each element's effective value is `original - counter`.**
