# 2283. Check if Number Has Equal Digit Count and Digit Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value](https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value)
**Companies:** Google, Jpmorgan

---

## 1. Problem Description

Given a string `num` of length `n`, check if for every index `i`, the digit `num[i]` equals the count of times digit `i` appears in `num`.

---

## 2. Approach: Frequency Count — O(n) ✅

```
FUNCTION digitCount(num):
    freq = Counter(num)
    FOR i FROM 0 TO len(num) - 1:
        IF int(num[i]) != freq.get(str(i), 0):
            RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) — at most 10 digits |

---

## Key Takeaway

> Count digit frequencies, then verify each position's value matches the frequency of that position's index as a digit.
