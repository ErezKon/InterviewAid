# 1540. Can Convert String in K Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-convert-string-in-k-moves](https://leetcode.com/problems/can-convert-string-in-k-moves)
**Companies:** Infosys

---

## 1. Problem Description

Given strings `s` and `t` of equal length and integer `k`, determine if you can convert `s` to `t` using at most `k` moves. In move `i`, you can shift one character by `i` positions in the alphabet. Each move index can be used at most once.

---

## 2. Key Insight

> For each position where `s[i] != t[i]`, compute the shift needed `d = (t[i] - s[i] + 26) % 26`. We need a unique move number for each shift: first occurrence uses move `d`, second uses `d + 26`, third uses `d + 52`, etc. All must be ≤ k.

---

## 3. Approach: Count Shifts — O(n) ✅

```
FUNCTION canConvertString(s, t, k):
    IF len(s) != len(t): RETURN false
    shiftCount = [0] * 26
    FOR i ← 0 TO len(s)-1:
        d = (ord(t[i]) - ord(s[i]) + 26) % 26
        IF d == 0: CONTINUE
        moveNeeded = d + 26 * shiftCount[d]
        IF moveNeeded > k: RETURN false
        shiftCount[d] += 1
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(26) = O(1) |

---

## Key Takeaway

> Count how many times each shift value is needed. The kth occurrence of shift `d` requires move number `d + 26*(k-1)`. If any exceeds k, return false.
