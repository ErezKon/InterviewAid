
# 5. Longest Palindromic Substring

**Difficulty:** 🟡 Medium
**Acceptance:** 37.8%
**LeetCode:** [https://leetcode.com/problems/longest-palindromic-substring](https://leetcode.com/problems/longest-palindromic-substring)
**Companies:** Accenture, Accolite, Adobe, Amazon, Apple, Arista Networks, Athenahealth, Autodesk, Bending Spoons, Bitgo, Blackrock, Bloomberg, Bytedance, Cisco, Citadel, Cognizant, Commvault, Deloitte, Doordash, Dp World, Earnin, Ebay, Epam Systems, Epic Systems, Flipkart, Fractal Analytics, Goldman Sachs, Google, Hashedin, Hcl, Hpe, Hsbc, Huawei, Ibm, Info Edge, Infosys, Jpmorgan, Linkedin, Makemytrip, Maq Software, Mastercard, Meta, Microsoft, Morgan Stanley, Mphasis, Nielsen, Nvidia, Opentext, Oracle, Palantir, Palo Alto Networks, Paypal, Paytm, Persistent Systems, Phonepe, Pornhub, Pure Storage, Salesforce, Samsung, Sap, Servicenow, Shopee, Siemens, Softwire, Swiggy, Tcs, Thoughtworks, Tiktok, Tinkoff, Turing, Uber, Uipath, Visa, Walmart Labs, Wix, Yandex, Zemoso, Zoho, Zopsmart, Zs Associates

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n³)](#3-approach-1-brute-force--on³)
4. [Approach 2: Expand Around Center — O(n²) ✅](#4-approach-2-expand-around-center--on²-)
5. [Approach 3: Dynamic Programming — O(n²)](#5-approach-3-dynamic-programming--on²)
6. [Approach 4: Manacher's Algorithm — O(n)](#6-approach-4-manachers-algorithm--on)
7. [Walkthrough (Expand Around Center)](#7-walkthrough-expand-around-center)
8. [Complexity Comparison](#8-complexity-comparison)
9. [Follow-Up Questions](#9-follow-up-questions)

---

## 1. Problem Description

Given a string `s`, return the **longest palindromic substring** in `s`.

---

## 2. Examples

```
Example 1:
  Input:  "babad"
  Output: "bab" (or "aba" — both are valid)

Example 2:
  Input:  "cbbd"
  Output: "bb"
```

---

## 3. Approach 1: Brute Force — O(n³)

Check every substring, verify if it's a palindrome.

```
FUNCTION longestPalindromeBrute(s):
    best = ""
    FOR i ← 0 TO n - 1:
        FOR j ← i TO n - 1:
            IF isPalindrome(s, i, j) AND j - i + 1 > LENGTH(best):
                best = s[i..j]
    RETURN best
```

**Time:** O(n³) — too slow.

---

## 4. Approach 2: Expand Around Center — O(n²) ✅

### Key Insight

A palindrome mirrors around its center. There are `2n - 1` possible centers:
- **n** single-character centers (odd-length palindromes)
- **n - 1** gap centers between characters (even-length palindromes)

For each center, expand outward while characters match.

```
FUNCTION longestPalindrome(s):
    start = 0
    maxLen = 0

    FOR i ← 0 TO n - 1:
        // Odd-length palindrome centered at i
        len1 = expand(s, i, i)
        // Even-length palindrome centered between i and i+1
        len2 = expand(s, i, i + 1)

        len = MAX(len1, len2)

        IF len > maxLen:
            maxLen = len
            start = i - (len - 1) / 2

    RETURN s[start .. start + maxLen - 1]


FUNCTION expand(s, left, right):
    WHILE left >= 0 AND right < n AND s[left] == s[right]:
        left  -= 1
        right += 1

    RETURN right - left - 1        // length of the palindrome
```

---

## 5. Approach 3: Dynamic Programming — O(n²)

`dp[i][j] = true` if `s[i..j]` is a palindrome.

```
FUNCTION longestPalindromeDP(s):
    n = LENGTH(s)
    dp = 2D ARRAY of n × n, all FALSE
    start = 0, maxLen = 1

    // Base: single characters
    FOR i ← 0 TO n - 1:
        dp[i][i] = TRUE

    // Base: two characters
    FOR i ← 0 TO n - 2:
        IF s[i] == s[i+1]:
            dp[i][i+1] = TRUE
            start = i
            maxLen = 2

    // Fill for lengths 3 to n
    FOR len ← 3 TO n:
        FOR i ← 0 TO n - len:
            j = i + len - 1
            IF s[i] == s[j] AND dp[i+1][j-1]:
                dp[i][j] = TRUE
                IF len > maxLen:
                    maxLen = len
                    start = i

    RETURN s[start .. start + maxLen - 1]
```

**Time:** O(n²), **Space:** O(n²)

---

## 6. Approach 4: Manacher's Algorithm — O(n)

The optimal algorithm, but complex. Key idea: reuse previously computed palindrome information to skip redundant expansions.

```
FUNCTION manacher(s):
    // Transform: "abc" → "^#a#b#c#$"
    t = "^#" + JOIN(s, "#") + "#$"
    n = LENGTH(t)
    p = ARRAY of n zeros         // p[i] = radius of palindrome at i in t
    center = 0, right = 0

    FOR i ← 1 TO n - 2:
        mirror = 2 * center - i

        IF i < right:
            p[i] = MIN(right - i, p[mirror])

        // Expand
        WHILE t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1

        // Update center and right boundary
        IF i + p[i] > right:
            center = i
            right = i + p[i]

    // Find max
    maxLen = MAX(p)
    centerIdx = INDEX_OF(maxLen, p)
    start = (centerIdx - maxLen) / 2

    RETURN s[start .. start + maxLen - 1]
```

**Time:** O(n), **Space:** O(n)

Generally not expected in interviews — Expand Around Center is the standard answer.

---

## 7. Walkthrough (Expand Around Center)

```
s = "babad"

Center at 0 ('b'):  odd: expand(0,0) → "b" (len 1)
                    even: expand(0,1) → 'b'≠'a' (len 0)

Center at 1 ('a'):  odd: expand(1,1) → "a" → "bab" (len 3)  ★
                    even: expand(1,2) → 'a'≠'b' (len 0)

Center at 2 ('b'):  odd: expand(2,2) → "b" → "aba" (len 3)
                    even: expand(2,3) → 'b'≠'a' (len 0)

Center at 3 ('a'):  odd: expand(3,3) → "a" (len 1)
                    even: expand(3,4) → 'a'≠'d' (len 0)

Center at 4 ('d'):  odd: expand(4,4) → "d" (len 1)

Best: "bab" (len 3, start at index 0) ✅
```

---

## 8. Complexity Comparison

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n³) | O(1) |
| **Expand Around Center** | **O(n²)** | **O(1)** |
| Dynamic Programming | O(n²) | O(n²) |
| Manacher's | O(n) | O(n) |

---

## 9. Follow-Up Questions

### 9.1 Longest Palindromic Subsequence (LeetCode #516)

Different from substring — subsequence allows non-contiguous characters. Uses 2D DP:

```
dp[i][j] = length of longest palindromic subsequence in s[i..j]

IF s[i] == s[j]:
    dp[i][j] = dp[i+1][j-1] + 2
ELSE:
    dp[i][j] = MAX(dp[i+1][j], dp[i][j-1])
```

**Time:** O(n²), **Space:** O(n²) or O(n) with optimization.

### 9.2 Palindromic Substrings (LeetCode #647)

Count the total number of palindromic substrings. Same Expand Around Center approach, just count instead of tracking the longest:

```
FUNCTION countSubstrings(s):
    count = 0
    FOR i ← 0 TO n - 1:
        count += countExpand(s, i, i)      // odd
        count += countExpand(s, i, i + 1)  // even
    RETURN count
```

### 9.3 Valid Palindrome (LeetCode #125)

Check if a string is a palindrome, considering only alphanumeric characters and ignoring case. Two-pointer approach.

### 9.4 Shortest Palindrome (LeetCode #214)

Add characters to the front of `s` to make it a palindrome. Find the longest palindromic prefix using KMP failure function.

---

## Key Takeaway

> **Expand Around Center** is the interview-standard approach — O(n²) time, O(1) space, easy to implement. The insight is that palindromes are defined by their centers, and there are only 2n-1 possible centers. Know Manacher's exists for O(n) but don't expect to code it in an interview.
