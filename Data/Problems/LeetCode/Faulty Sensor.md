# 1826. Faulty Sensor

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/faulty-sensor](https://leetcode.com/problems/faulty-sensor)
**Companies:** Meta

---

## Problem Description

Two sensors recorded `n` readings each. One sensor dropped a single reading and appended a random value at the end. The other is correct. Given `sensor1` and `sensor2`, determine which sensor is faulty (return 1 or 2), or `-1` if indeterminable.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `sensor1 = [1,2,3,4]`, `sensor2 = [1,2,4,5]` | `2` | Sensor2 missed `3` and added `5` at the end. |
| `sensor1 = [5,6,7]`, `sensor2 = [5,6,7]` | `-1` | Both arrays identical; cannot tell which is faulty. |
| `sensor1 = [9,8,7,6]`, `sensor2 = [9,8,6,5]` | `1` | Sensor1 missed `7` and added `5`.

---

## Approach: Find First Mismatch — O(n) ✅

```text
FUNCTION badSensor(sensor1, sensor2):
    n = LENGTH(sensor1)
    i = 0
    WHILE i < n AND sensor1[i] == sensor2[i]:
        i += 1
    IF i >= n - 1: RETURN -1  // insufficient data to decide
    // Check if sensor1 dropped a value (sensor2 shifted)
    can1 = sensor1[i+1:] == sensor2[i:n-1]
    // Check if sensor2 dropped a value (sensor1 shifted)
    can2 = sensor2[i+1:] == sensor1[i:n-1]
    IF can1 AND can2: RETURN -1
    IF can1: RETURN 1
    IF can2: RETURN 2
    RETURN -1
```

---

## Walkthrough

Given `sensor1 = [1,2,3,4]`, `sensor2 = [1,2,4,5]`:
1. Compare indices: 0→1 match, 1→2 match, 2→3 vs 4 mismatch (`i=2`).
2. Check `sensor1[i+1:] = [4]` vs `sensor2[i:n-1] = [4]` → `can1` true.
3. Check `sensor2[i+1:] = [5]` vs `sensor1[i:n-1] = [3]` → `can2` false.
4. Since only `can1` true, sensor2 is faulty → return `2`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — single pass to find mismatch and compare slices |
| Space  | O(1) — only a few indices and boolean flags |

---

## Follow-Up Questions

- How would you modify the algorithm if more than one reading could be missing?
- What if the random value appended at the end could also be a duplicate of an existing reading?
- Can you solve the problem with a single pass without creating slices?

---

## Key Takeaway

> **Identify the first mismatch and then verify which array exhibits a one‑position shift from that point. This determines the faulty sensor in linear time.**