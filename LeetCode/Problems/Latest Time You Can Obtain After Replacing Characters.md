# 3114. Latest Time You Can Obtain After Replacing Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/latest-time-you-can-obtain-after-replacing-characters](https://leetcode.com/problems/latest-time-you-can-obtain-after-replacing-characters)
**Companies:** Google

---

## 1. Problem Description

Given 12-hour time `"HH:MM"` with `?` wildcards, replace to maximize time (max = 11:59).

---

## 2. Approach: Greedy — O(1) ✅

```
FUNCTION findLatestTime(s):
    t = list(s)
    IF t[0] == '?': t[0] = '1' IF t[1] IN '?012' ELSE '0'
    IF t[1] == '?': t[1] = '1' IF t[0] == '1' ELSE '9'
    IF t[3] == '?': t[3] = '5'
    IF t[4] == '?': t[4] = '9'
    RETURN JOIN(t)
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## 3. Key Takeaway

> Same pattern as 24-hour version but hours max at 11. Greedily set each `?` to its maximum valid digit.
