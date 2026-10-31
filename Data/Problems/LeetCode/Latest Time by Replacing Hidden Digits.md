# 1736. Latest Time by Replacing Hidden Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/latest-time-by-replacing-hidden-digits](https://leetcode.com/problems/latest-time-by-replacing-hidden-digits)
**Companies:** Google

---

## 1. Problem Description

You are given a string `time` in the form of `hh:mm`, where some of the digits in the string are hidden (represented by `?`).

The valid times are those inclusively between `00:00` and `23:59`.

Return *the latest valid time you can get from* `time` *by replacing the hidden digits*.

**Constraints:**
- `time` is in the format `hh:mm`.
- It is guaranteed that you can produce a valid time from the given string.

---

## 2. Examples

```
Example 1:
  Input: time = "2?:?0"
  Output: "23:50"
  Explanation: The latest hour beginning with the digit '2' is 23 and the latest minute ending with the digit '0' is 50.
```

```
Example 2:
  Input: time = "0?:3?"
  Output: "09:39"
```

```
Example 3:
  Input: time = "1?:22"
  Output: "19:22"
```

---

## 3. Approach: Greedy Per Digit — O(1) ✅

```text
FUNCTION maximumTime(time):
    // Convert string to mutable list
    SET t ← LIST(time)
    // Resolve hour tens
    IF t[0] == '?':
        SET t[0] ← '2' IF t[1] IN ['?', '0', '1', '2', '3'] ELSE '1'
    // Resolve hour units
    IF t[1] == '?':
        SET t[1] ← '3' IF t[0] == '2' ELSE '9'
    // Resolve minute tens
    IF t[3] == '?':
        SET t[3] ← '5'
    // Resolve minute units
    IF t[4] == '?':
        SET t[4] ← '9'
    RETURN JOIN(t)
```

---

## 4. Walkthrough

**Example:** `"?4:5?"`

| Step | t (list) | Action |
|------|----------|--------|
| 1 | `[?, '4', ':', '5', '?']` | `t[0]` is `?`; `t[1]` is `'4'` (≤ `3`? No) → set `t[0]` to `'1'`.
| 2 | `['1', '4', ':', '5', '?']` | `t[1]` is not `?` (keep `'4'`).
| 3 | `['1', '4', ':', '5', '?']` | `t[3]` is not `?` (keep `'5'`).
| 4 | `['1', '4', ':', '5', '?']` | `t[4]` is `?`; set to `'9'` for max minutes.
| 5 | `['1', '4', ':', '5', '9']` | Join → `"14:59"`.

---

## 5. Complexity Analysis

- **Time:** O(1) – constant number of operations regardless of input size.
- **Space:** O(1) – only a few variables and a mutable copy of the 5-character string.

---

## 6. Follow-Up Questions

- How would you modify the algorithm for a 12-hour clock with AM/PM?
- What if the input allowed any number of `?` and you needed the *smallest* valid time?
- Can you extend this to validate and fill a full date-time string (e.g., `"YYYY-MM-DD HH:MM"`)?

---

## Key Takeaway

> Greedily maximize each digit while respecting hour and minute bounds, processing left-to-right with simple case analysis.
