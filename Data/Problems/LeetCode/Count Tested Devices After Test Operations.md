# 2960. Count Tested Devices After Test Operations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-tested-devices-after-test-operations](https://leetcode.com/problems/count-tested-devices-after-test-operations)
**Companies:** Accenture

---

## Problem Description

You are given a **0-indexed** integer array `batteryPercentages` having length `n`, denoting the battery percentages of `n` **0-indexed** devices.

Your task is to test each device `i` **in order** from `0` to `n - 1`, by performing the following test operations:

- If `batteryPercentages[i]` is **greater** than `0`:
  - **Increment** the count of tested devices.
  - **Decrease** the battery percentage of all devices with indices `j` in the range `[i + 1, n - 1]` by `1`, ensuring their battery percentage **never goes below** `0`, i.e, `batteryPercentages[j] = max(0, batteryPercentages[j] - 1)`.
  - Move to the next device.
- Otherwise, move to the next device without performing any test.

Return *an integer denoting the number of devices that will be tested after performing the test operations in order.*

**Constraints:**
- `1 <= n == batteryPercentages.length <= 100`
- `0 <= batteryPercentages[i] <= 100`

---

## Examples

```
Example 1:
  Input: batteryPercentages = [1,1,2,1,3]
  Output: 3
  Explanation: Performing the test operations in order starting from device 0:
  At device 0, batteryPercentages[0] > 0, so there is now 1 tested device, and batteryPercentages becomes [1,0,1,0,2].
  At device 1, batteryPercentages[1] == 0, so we move to the next device without testing.
  At device 2, batteryPercentages[2] > 0, so there are now 2 tested devices, and batteryPercentages becomes [1,0,1,0,1].
  At device 3, batteryPercentages[3] == 0, so we move to the next device without testing.
  At device 4, batteryPercentages[4] > 0, so there are now 3 tested devices, and batteryPercentages stays the same.
  So, the answer is 3.
```

```
Example 2:
  Input: batteryPercentages = [0,1,2]
  Output: 2
  Explanation: Performing the test operations in order starting from device 0:
  At device 0, batteryPercentages[0] == 0, so we move to the next device without testing.
  At device 1, batteryPercentages[1] > 0, so there is now 1 tested device, and batteryPercentages becomes [0,1,1].
  At device 2, batteryPercentages[2] > 0, so there are now 2 tested devices, and batteryPercentages stays the same.
  So, the answer is 2.
```

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