# 2734. Lexicographically Smallest String After Substring Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation](https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation)
**Companies:** Agoda, Amazon, Goldman Sachs, Ibm

---

## 1. Problem Description

Given a string `s` consisting of lowercase English letters. Perform the following operation:

- Select any non-empty substring then replace every letter of the substring with the preceding letter of the English alphabet. For example, 'b' is converted to 'a', and 'a' is converted to 'z'.

Return the **lexicographically smallest** string **after performing the operation**.

**Constraints:**
- `1 <= s.length <= 3 * 10^5`
- `s` consists of lowercase English letters

---

## 2. Examples

**Example 1:**
```
Input: s = "cbabc"
Output: "baabc"
Explanation: Perform the operation on the substring starting at index 0, and ending at index 1 inclusive.
```

**Example 2:**
```
Input: s = "aa"
Output: "az"
Explanation: Perform the operation on the last letter.
```

**Example 3:**
```
Input: s = "acbbc"
Output: "abaab"
Explanation: Perform the operation on the substring starting at index 1, and ending at index 4 inclusive.
```

**Example 4:**
```
Input: s = "leetcode"
Output: "kddsbncd"
Explanation: Perform the operation on the entire string.
```

---

## 3. Approach: Greedy — O(n) ✅

Skip leading `'a'` characters because turning them into `'z'` would make the string larger. Then decrement the first contiguous block of non-`'a'` characters. If the entire string consists of `'a'`, change the last character to `'z'`.

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
    // decrement the first non-'a' block
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
| 1 | 0 | `c` | first non-`a`, start decrement block | `b` |
| 2 | 1 | `b` | still non-`a`, continue | `a` |
| 3 | 2 | `a` | block ends (hit `a`) | `a` |
| Remaining | 3-4 | `b c` | unchanged | `b c` |

Resulting string: `"baabc"`.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass over the string.
- **Space:** O(n) – to store the mutable character list (can be O(1) if modified in place).

---

## 6. Follow-Up Questions

- How would the solution change if the operation could be applied multiple times?
- What if the decrement step could wrap multiple times (e.g., decrement by 2)?
- Can we extend the approach to handle uppercase letters or Unicode characters?

---

## 7. Key Takeaway

> Skip leading `'a'`s, then decrement the first contiguous non-`'a'` block; if all `'a'`s, change the last character to `'z'`. This greedy choice yields the smallest possible string.
