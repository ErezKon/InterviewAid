# 1736. Latest Time by Replacing Hidden Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/latest-time-by-replacing-hidden-digits](https://leetcode.com/problems/latest-time-by-replacing-hidden-digits)
**Companies:** Google

---

## 1. Problem Description

Given time string `"HH:MM"` with some `?` digits, replace `?`s to maximize the time (24-hour format).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"?4:5?"` | `"14:59"` | First `?` can be `1` (since hour tens cannot exceed `2`). Second `?` becomes `9` for max minutes.
| `"2?:?0"` | `"23:50"` | Hour tens is `2`, so hour units max `3`. Minute tens can be `5`, minute units already `0`.

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
- **Space:** O(1) – only a few variables and a mutable copy of the 5‑character string.

---

## 6. Follow-Up Questions

- How would you modify the algorithm for a 12‑hour clock with AM/PM?
- What if the input allowed any number of `?` and you needed the *smallest* valid time?
- Can you extend this to validate and fill a full date‑time string (e.g., `"YYYY-MM-DD HH:MM"`)?

---

## Key Takeaway

> Greedily maximize each digit while respecting hour and minute bounds, processing left‑to‑right with simple case analysis.
