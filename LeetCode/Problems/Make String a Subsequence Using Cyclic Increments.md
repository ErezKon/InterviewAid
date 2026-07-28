# 2825. Make String a Subsequence Using Cyclic Increments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments](https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments)
**Companies:** Amazon

---

## 1. Problem Description

You can increment each character of `str1` by at most 1 (cyclically, z→a). Check if `str2` can become a subsequence of the modified `str1`.

---

## 2. Approach: Two Pointers — O(n + m) ✅

```text
FUNCTION canMakeSubsequence(str1, str2):
    j ← 0
    FOR c IN str1:
        IF j < LEN(str2) AND (c == str2[j] OR ( (ORD(c) - ORD('a') + 1) % 26 + ORD('a') ) == str2[j]):
            j ← j + 1
    RETURN j == LEN(str2)
```

| Time | Space |
|------|-------|
| O(n + m) | O(1) |

---

## 3. Examples

**Example 1:**
```
str1 = "abc", str2 = "bcd"
```
- Increment `a` → `b`, `b` → `c`, `c` → `d`. The modified `str1` becomes "bcd", which contains `str2` as a subsequence. **Output:** `true`.

**Example 2:**
```
str1 = "xyz", str2 = "aba"
```
- After cyclic increment, `x`→`y`, `y`→`z`, `z`→`a`. The best we can obtain is "yza", which does not contain "aba". **Output:** `false`.

---

## 4. Walkthrough

| Step | `str1` character | `j` (index in `str2`) | Action |
|------|------------------|----------------------|--------|
| 1 | `a` | 0 (`b`) | `a` does not match `b` and `b` (a+1) ≠ `b`; `j` stays 0 |
| 2 | `b` | 0 (`b`) | Direct match, `j` → 1 |
| 3 | `c` | 1 (`c`) | Direct match, `j` → 2 |
| End | – | 2 (`d`) | `j` != len(`str2`)=3 → return `false` |

---

## 5. Complexity Analysis

- **Time:** Each character of `str1` is visited once → O(n) where n = len(str1). Checking `str2` pointer adds O(m) but overall O(n + m).
- **Space:** Only constant extra variables (`j`) → O(1).

---

## 6. Follow-Up Questions

- How would the solution change if each character could be incremented by up to **k** positions cyclically?
- Can you adapt the algorithm to also allow decrement operations?

---

## 7. Key Takeaway

> Standard subsequence check with a twist: each character in str1 can match str2[j] directly or after +1 cyclic increment.
