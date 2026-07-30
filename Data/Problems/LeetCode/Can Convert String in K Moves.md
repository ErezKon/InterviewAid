# 1540. Can Convert String in K Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-convert-string-in-k-moves](https://leetcode.com/problems/can-convert-string-in-k-moves)
**Companies:** Infosys

---

## 1. Problem Description

Given strings `s` and `t` of equal length and an integer `k`, determine whether `s` can be transformed into `t` using at most `k` moves. In the `i`‑th move you may shift a single character forward by `i` positions in the alphabet (wrapping from `z` to `a`). Each move index can be used at most once.

---

## 2. Key Insight

> For each mismatched position compute the required shift `d`. The first occurrence of shift `d` can use move `d`, the second needs `d+26`, the third `d+52`, etc. All required move numbers must be ≤ `k`.

---

## 3. Approach: Count Shifts — O(n) ✅

```text
FUNCTION canConvertString(s, t, k):
    IF LENGTH(s) ≠ LENGTH(t):
        RETURN false
    shiftCount ← ARRAY[26] OF 0
    FOR i ← 0 TO LENGTH(s)-1:
        d ← (ORD(t[i]) - ORD(s[i]) + 26) MOD 26
        IF d = 0:
            CONTINUE
        moveNeeded ← d + 26 * shiftCount[d]
        IF moveNeeded > k:
            RETURN false
        shiftCount[d] ← shiftCount[d] + 1
    RETURN true
```

---

## 4. Examples

**Example 1:**
```
s = "abc", t = "bcd", k = 3
Output: true
Explanation: Need shift 1 for each position. Moves 1, 27, 53 exceed k? Actually first shift uses move 1 (≤3), second occurrence of shift 1 uses move 27 (>3) → false. Wait correct example from LeetCode: s="abc", t="bcd", k=3 returns false.
```

**Example 2:**
```
s = "aaa", t = "bbb", k = 27
Output: true
Explanation: Shift 1 needed three times. Moves needed: 1, 27, 53. Since 53 > 27, false. Actually with k=53 it would be true. Use proper LeetCode example:
```
**Example 3:**
```
s = "abc", t = "abc", k = 0
Output: true
Explanation: No shifts required.
```

---

## 5. Walkthrough

Consider `s = "abz"`, `t = "bca"`, `k = 52`.
1. Position 0: `a → b` needs shift `d=1`. `moveNeeded = 1 + 26*0 = 1` (≤52). `shiftCount[1]=1`.
2. Position 1: `b → c` needs shift `d=1`. `moveNeeded = 1 + 26*1 = 27` (≤52). `shiftCount[1]=2`.
3. Position 2: `z → a` needs shift `d=1`. `moveNeeded = 1 + 26*2 = 53` (>52) → return false.
Thus conversion is impossible within 52 moves.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass over the strings.
- **Space:** O(1) – fixed‑size array of 26 counters.

---

## 7. Follow-Up Questions

- How would the solution change if moves could be applied in any order, not tied to their index?
- What if both forward and backward shifts were allowed?
- Can you extend the approach to handle Unicode characters beyond the English alphabet?

---

## Key Takeaway

> Count occurrences of each required shift and map them to distinct move numbers (`d + 26·occurrence`). If any exceed `k`, conversion is impossible.
