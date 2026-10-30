# 1540. Can Convert String in K Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-convert-string-in-k-moves](https://leetcode.com/problems/can-convert-string-in-k-moves)
**Companies:** Infosys

---

## 1. Problem Description

Given two strings `s` and `t`, your goal is to convert `s` into `t` in `k` moves or less.

During the `i`-th (`1 <= i <= k`) move you can:

- Choose any index `j` (1-indexed) from `s`, such that `1 <= j <= s.length` and `j` has not been chosen in any previous move, and shift the character at that index `i` times.
- Do nothing.

Shifting a character means replacing it by the next letter in the alphabet (wrapping around so that `'z'` becomes `'a'`). Shifting a character by `i` means applying the shift operations `i` times.

Remember that any index `j` can be picked at most once.

Return `true` if it's possible to convert `s` into `t` in no more than `k` moves, otherwise return `false`.

**Constraints:**
- `1 <= s.length, t.length <= 10^5`
- `0 <= k <= 10^9`
- `s`, `t` contain only lowercase English letters.

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

```
Example 1:
  Input: s = "input", t = "ouput", k = 9
  Output: true
  Explanation: In the 6th move, we shift 'i' 6 times to get 'o'. And in the 7th move we shift 'n' to get 'u'.
```

```
Example 2:
  Input: s = "abc", t = "bcd", k = 10
  Output: false
  Explanation: We need to shift each character in s one time to convert it into t. We can shift 'a' to 'b' during the 1st move. However, there is no way to shift the other characters in the remaining moves to obtain t from s.
```

```
Example 3:
  Input: s = "aab", t = "bbb", k = 27
  Output: true
  Explanation: In the 1st move, we shift the first 'a' 1 time to get 'b'. In the 27th move, we shift the second 'a' 27 times to get 'b'.
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
