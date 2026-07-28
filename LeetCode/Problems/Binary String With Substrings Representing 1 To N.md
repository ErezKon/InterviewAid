# 1016. Binary String With Substrings Representing 1 To N

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n](https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n)
**Companies:** Gartner, Google

---

## 1. Problem Description

Given a binary string `s` and an integer `n`, return `true` if the binary representation of every integer from `1` to `n` appears as a substring of `s`.

---

## 2. Key Insight

> A string of length `L` has at most `L × (L+1) / 2` substrings. If `n` is large relative to `|s|`, the answer is `false`. For small `n`, simply check each number's binary representation.

---

## 3. Approach: Direct Check — O(n × |s|) ✅

```text
FUNCTION queryString(s, n):
    FOR i FROM 1 TO n:
        binStr ← BINARY_REPRESENTATION(i)  // without leading zeros
        IF binStr NOT IN s:
            RETURN false
    RETURN true
```

---

## 4. Examples

**Example 1:**
```
Input: s = "0110", n = 3
Output: true
Explanation: Binary representations are "1", "10", "11". All appear as substrings.
```

**Example 2:**
```
Input: s = "0110", n = 4
Output: false
Explanation: "100" (binary of 4) is not a substring.
```

---

## 5. Walkthrough

| i | Binary(i) | Present in s? |
|---|-----------|---------------|
| 1 | 1         | yes |
| 2 | 10        | yes |
| 3 | 11        | yes |
| 4 | 100       | no → return false |

The algorithm stops early when a missing substring is found.

---

## 6. Complexity Analysis

- **Time:** O(n × |s|) in the worst case, but early termination often reduces work.
- **Space:** O(1) extra space aside from loop variables.

---

## 7. Follow-Up Questions

- How would you improve the time complexity using a rolling hash to check substrings in O(1) per query?
- Can you handle very large `n` (e.g., up to 10^9) efficiently?
- What if the string `s` is streamed and cannot be stored entirely?

---

## Key Takeaway

> For substring containment of binary representations, the constraint on `|s|` limits how large `n` can be. A direct check with early termination is sufficient, but hashing can optimize large inputs.
