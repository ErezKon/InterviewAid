# 481. Magical String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magical-string](https://leetcode.com/problems/magical-string)
**Companies:** Amazon, Google, Microsoft

---

## 1. Problem Description

The magical string `s` is constructed from `{1, 2}` where the group lengths are described by the string itself. Count the number of 1s in the first `n` characters.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 1` | `1` | The string starts with `1`.
| `n = 6` | `3` | The first six characters are `122112`, containing three `1`s.
| `n = 10` | `5` | The first ten characters are `1221121221`, containing five `1`s.

---

## 3. Approach: Simulation — O(n) ✅

```text
FUNCTION magicalString(n):
    // initialize the base of the magical string
    SET s ← [1, 2, 2]
    SET i ← 2               // points to the group length descriptor
    WHILE LENGTH(s) < n:
        SET next_val ← 3 - s[-1]   // toggle between 1 and 2
        REPEAT s[i] TIMES:
            APPEND next_val TO s
        SET i ← i + 1
    RETURN COUNT of 1 in s[0:n]
```

---

## 4. Walkthrough

Consider `n = 10`:

| Step | s (current) | i | Action |
|------|--------------|---|--------|
| 0 | `[1,2,2]` | 2 | start with base |
| 1 | append `1` three times (s[2]=2) → `[1,2,2,1,1,1]` | 3 |
| 2 | append `2` one time (s[3]=1) → `[1,2,2,1,1,1,2]` | 4 |
| 3 | append `2` two times (s[4]=1) → `[1,2,2,1,1,1,2,2,2]` | 5 |
| 4 | append `1` two times (s[5]=1) → `[1,2,2,1,1,1,2,2,2,1,1]` | 6 |

After reaching length ≥ 10, the first ten characters are `1221121221`, which contain five `1`s.

---

## 5. Complexity Analysis

- **Time:** O(n) – each iteration appends at most the current group length, and total length grows to `n`.
- **Space:** O(n) – the constructed string up to `n` characters is stored.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the entire magical string up to `n` without counting `1`s?
- Can the space usage be reduced to O(1) by tracking counts instead of storing the full string?

---

## 7. Key Takeaway

> Build the string iteratively: a pointer `i` tells the group length, toggle the value with `3 - last`. The string is self‑describing, enabling an O(n) simulation.
