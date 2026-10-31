# 647. Palindromic Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/palindromic-substrings](https://leetcode.com/problems/palindromic-substrings)
**Companies:** Akamai, Amazon, Anduril, Apple, Arista Networks, Bloomberg, Bny Mellon, Capital One, Cisco, Citadel, Epic Systems, Goldman Sachs, Google, Hcl, Ibm, Intuit, Linkedin, Meta, Microsoft, Netskope, Oracle, Paypal, Pure Storage, Salesforce, Walmart Labs

---

## 1. Problem Description

Given a string `s`, return *the number of **palindromic substrings** in it*.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

**Constraints:**

- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: s = "abc"
  Output: 3
  Explanation: Three palindromic strings: "a", "b", "c".
```

```
Example 2:
  Input: s = "aaa"
  Output: 6
  Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
```

---

## 3. Approach: Expand Around Center — O(n²) ✅

```text
FUNCTION countSubstrings(s):
    SET n ← LENGTH(s)
    SET count ← 0

    FUNCTION expand(left, right):
        WHILE left ≥ 0 AND right < n AND s[left] = s[right]:
            SET count ← count + 1
            SET left ← left - 1
            SET right ← right + 1

    FOR i ← 0 TO n - 1:
        // odd length palindromes
        CALL expand(i, i)
        // even length palindromes
        CALL expand(i, i + 1)

    RETURN count
```

---

## 4. Walkthrough

Consider `s = "aaa"` (n = 3).

1. **i = 0**:
   - expand(0,0): counts "a" → count=1.
   - expand(0,1): counts "aa" → count=2.
2. **i = 1**:
   - expand(1,1): counts "a" → count=3, then expands to "aaa" → count=4.
   - expand(1,2): counts "aa" → count=5.
3. **i = 2**:
   - expand(2,2): counts "a" → count=6.
   - expand(2,3): out of bounds.
Total count = 6.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) – each center expands up to n steps | O(1) – only constant extra variables |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return all distinct palindromic substrings?
- Can you achieve better than O(n²) time?
- How does Manacher's algorithm improve the runtime?

---

## Key Takeaway

> Same technique as Longest Palindromic Substring (#5) but count instead of track max. 2n-1 centers, expand each.
