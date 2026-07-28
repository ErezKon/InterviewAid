# 2960. Count Tested Devices After Test Operations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-tested-devices-after-test-operations](https://leetcode.com/problems/count-tested-devices-after-test-operations)
**Companies:** Accenture

---

## Problem Description

Given an array `batteryPercentages`, process devices left to right. If `batteryPercentages[i] > 0`, the device is tested (count it) and all subsequent devices lose 1 battery. Return total tested devices.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3]` | `3` | Device 0 tested (battery 1). Decrement others → `[2,2]`. Device 1 tested, decrement last → `[1]`. Device 2 tested. Total 3. |
| `[0,0,1]` | `1` | First two have 0 battery, not tested. Device 2 has 1, tested. No further devices. |
| `[2,0,0]` | `1` | Device 0 tested, decrement others → `[-1,-1]` (treated as ≤0). No more tests.

---

## Approach

Iterate once, maintaining a `decrement` counter representing how many times previous tested devices have reduced the current battery. A device is testable if `batteryPercentages[i] - decrement > 0`.

```text
FUNCTION countTestedDevices(batteryPercentages):
    tested ← 0
    FOR i ← 0 TO LENGTH(batteryPercentages) - 1 DO
        IF batteryPercentages[i] - tested > 0 THEN
            tested ← tested + 1
    RETURN tested
```

---

## Walkthrough

Consider `batteryPercentages = [1,2,3]`:

1. `tested = 0`. Index 0: `1 - 0 > 0` → test device, `tested = 1`.
2. Index 1: original `2`, effective `2 - 1 = 1 > 0` → test, `tested = 2`.
3. Index 2: original `3`, effective `3 - 2 = 1 > 0` → test, `tested = 3`.
4. End of array, return `3`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass through the array |
| **Space** | O(1) — only a counter variable |

---

## Follow-Up Questions

* How would you modify the algorithm if each tested device decreased the battery of the next `k` devices instead of all subsequent ones?
* Can you extend this to handle negative battery values initially?

---

## Key Takeaway

> **Lazy decrement: track a cumulative counter instead of updating every subsequent element. Each element’s effective value is `original - counter`.**