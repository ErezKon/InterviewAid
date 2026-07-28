# 2734. Lexicographically Smallest String After Substring Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation](https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation)
**Companies:** Agoda, Amazon, Goldman Sachs, Ibm

---

## 1. Problem Description

Choose a non‑empty substring of a lowercase string and decrement each character in that substring by one (with `'a'` wrapping to `'z'`). Perform this operation exactly once. Return the lexicographically smallest possible resulting string.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abc"` | `"aac"` | Decrement substring `"b"` to `"a"`. |
| `"aaa"` | `"aaz"` | All characters are `'a'`; the best is to decrement the last `'a'` to `'z'`. |
| `"code"` | `"bode"` | Decrement the first character `'c'` to `'b'`. |

---

## 3. Approach: Greedy — O(n) ✅

Skip leading `'a'` characters because turning them into `'z'` would make the string larger. Then decrement the first contiguous block of non‑`'a'` characters. If the entire string consists of `'a'`, change the last character to `'z'`.

```text
FUNCTION smallestString(s):
    s ← LIST(s)
    i ← 0
    // skip leading 'a's
    WHILE i < LENGTH(s) AND s[i] = 'a':
        i ← i + 1
    IF i = LENGTH(s):
        // all 'a's case
        s[-1] ← 'z'
        RETURN JOIN(s)
    // decrement the first non‑'a' block
    WHILE i < LENGTH(s) AND s[i] != 'a':
        s[i] ← CHAR(ORD(s[i]) - 1)
        i ← i + 1
    RETURN JOIN(s)
```

---

## 4. Walkthrough

**Example:** `s = "cbabc"`

| Step | Index | Char before | Action | Char after |
|------|-------|-------------|--------|------------|
| 1 | 0 | `c` | first non‑`a`, start decrement block | `b` |
| 2 | 1 | `b` | still non‑`a`, continue | `a` |
| 3 | 2 | `a` | block ends (hit `a`) | `a` |
| Remaining | 3‑4 | `b c` | unchanged | `b c` |

Resulting string: `"baabc"`.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass over the string.
- **Space:** O(n) – to store the mutable character list (can be O(1) if modified in place).

---

## 6. Follow‑Up Questions

- How would the solution change if the operation could be applied multiple times?
- What if the decrement step could wrap multiple times (e.g., decrement by 2)?
- Can we extend the approach to handle uppercase letters or Unicode characters?

---

## 7. Key Takeaway

> Skip leading `'a'`s, then decrement the first contiguous non‑`'a'` block; if all `'a'`s, change the last character to `'z'`. This greedy choice yields the smallest possible string.
