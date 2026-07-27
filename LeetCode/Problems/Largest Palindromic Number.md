# 2384. Largest Palindromic Number

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Geico, Microsoft

---

## 1. Problem Description

Given a string of digits, return the largest palindromic number (as a string) using a subset of the digits. No leading zeros (except "0" itself).

---

## 2. Approach: Greedy + Counter — O(n) ✅

```
FUNCTION largestPalindromic(num):
    count = Counter(num)
    half = []; mid = ''
    FOR d ← 9 DOWN TO 0:
        half.EXTEND([str(d)] * (count[str(d)] // 2))
        IF count[str(d)] % 2 AND (not mid or str(d) > mid): mid = str(d)
    halfStr = JOIN(half).lstrip('0') or ''
    IF NOT halfStr AND NOT mid: RETURN '0'
    RETURN halfStr + mid + halfStr[::-1]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Build the left half greedily from 9 down using pairs. The largest odd-count digit goes in the middle. Strip leading zeros from the half to avoid invalid output.
