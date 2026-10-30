# 481. Magical String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magical-string](https://leetcode.com/problems/magical-string)
**Companies:** Amazon, Google, Microsoft

---

## 1. Problem Description

A magical string `s` consists of only `'1'` and `'2'` and obeys the following rule:

- Concatenating the sequence of lengths of its consecutive groups of identical characters `'1'` and `'2'` generates the string `s` itself.

The first few elements of `s` is `s = "1221121221221121122……"`. If we group the consecutive `1`'s and `2`'s in `s`, it will be `"1 22 11 2 1 22 1 22 11 2 11 22 ......"` and counting the occurrences of `1`'s or `2`'s in each group yields the sequence `"1 2 2 1 1 2 1 2 2 1 2 2 ......"`.

You can see that concatenating the occurrence sequence gives us `s` itself.

Given an integer `n`, return the number of `1`'s in the first `n` number in the magical string `s`.

**Constraints:**

- `1 <= n <= 10^5`

---

## 2. Examples

```
Example 1:
  Input: n = 6
  Output: 3
  Explanation: The first 6 elements of magical string s is "122112" and it contains three 1's, so return 3.
```

```
Example 2:
  Input: n = 1
  Output: 1
```

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
