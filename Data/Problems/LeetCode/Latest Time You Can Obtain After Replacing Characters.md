# 3114. Latest Time You Can Obtain After Replacing Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/latest-time-you-can-obtain-after-replacing-characters](https://leetcode.com/problems/latest-time-you-can-obtain-after-replacing-characters)
**Companies:** Google

---

## Problem Description

Given a 12‑hour time string `"HH:MM"` where some characters are `'?'`, replace each `'?'` with a digit to produce the latest valid time. The hour must be between `01` and `12`, and minutes between `00` and `59`.

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"?4:5?"` | `"12:59"` | Set hour tens to `1`, hour units to `2` (max ≤12), minutes to `59`. |
| `"??:??"` | `"12:59"` | All positions can be maximized respecting constraints. |

## Approach

**Greedy** – Fill each `'?'` with the highest digit allowed by its position and the already‑filled preceding digits.

```text
FUNCTION findLatestTime(s):
    t ← LIST(s)
    IF t[0] == '?':
        t[0] ← '1' IF t[1] IN ['?', '0', '1', '2'] ELSE '0'
    IF t[1] == '?':
        t[1] ← '2' IF t[0] == '1' ELSE '9'
    IF t[3] == '?': t[3] ← '5'
    IF t[4] == '?': t[4] ← '9'
    RETURN JOIN(t)
```

## Walkthrough

For `"?4:5?"`:
1. `t[0]` is `'?'` and `t[1]` is `'4'` (≤ `'2'`), so set `t[0]` to `'1'` (max hour tens for 12‑hour clock).
2. `t[1]` is already `'4'` (valid hour units).
3. `t[3]` is `'5'` (already max minute tens).
4. `t[4]` is `'?'` → set to `'9'`.
Result: `"14:59"` is invalid hour, so step 1 actually should set `t[0]` to `'0'`? Correction: hour must be `01‑12`; with `t[1]='4'`, the only valid hour is `04`. Thus `t[0]='0'`. Final time `"04:59"`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(1) | O(1) |

## Follow-Up Questions

* How would the solution change for a 24‑hour clock?
* Can you extend the algorithm to handle multiple `'?'` in the hour tens place for 24‑hour format?

## Key Takeaway

> Greedy per‑position replacement works because each digit’s valid range depends only on previously fixed digits, allowing independent maximization.
