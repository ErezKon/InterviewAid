# 1830. Minimum Number of Operations to Make String Sorted

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted](https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted)
**Companies:** Samsung

---

## Problem Description

You are given a string `s` consisting of lowercase English letters. In one operation you may choose any index `i` and replace `s[i]` with any **greater** character (i.e., a character with a higher alphabetical order). The goal is to transform `s` into a non‑decreasing (sorted) string. Return the minimum number of operations required.

---

## Examples

**Example 1:**
```
Input: s = "abc"
Output: 0
Explanation: The string is already sorted.
```

**Example 2:**
```
Input: s = "cba"
Output: 2
Explanation: Change 'c' → 'd' and 'b' → 'c' to obtain "dca", then change 'a' → 'a' (no change). Minimum two operations achieve a sorted string such as "ddd".
```

---

## Approach

**Greedy – Count Decreases (O(n))**

Traverse the string from left to right, keeping the maximum character seen so far (`maxChar`). Whenever the current character `c` is smaller than `maxChar`, it must be increased to at least `maxChar`. Each such occurrence counts as one operation.

```text
FUNCTION minOperations(s):
    ops ← 0
    maxChar ← 'a' // smallest possible
    FOR ch IN s DO
        IF ch < maxChar THEN
            ops ← ops + 1
        ELSE
            maxChar ← ch
    RETURN ops
```

---

## Walkthrough

For `s = "cba"`:
| Index | ch | maxChar before | Condition | ops | maxChar after |
|-------|----|----------------|-----------|-----|---------------|
|0|c|a|c ≥ a → no op|0|c|
|1|b|c|b < c → op|1|c|
|2|a|c|a < c → op|2|c|
Result = 2 operations.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the solution change if you could only replace characters with **any** character (not necessarily greater)?
2. Can you output the final sorted string after the minimal operations?
3. What if the alphabet includes uppercase letters and digits?

---

## Key Takeaway

Count how many characters are smaller than the maximum seen so far; each such decrease requires one operation to raise it to the current maximum.
