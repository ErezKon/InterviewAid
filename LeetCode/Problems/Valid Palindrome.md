# 125. Valid Palindrome

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/valid-palindrome](https://leetcode.com/problems/valid-palindrome)
**Companies:** Accenture, Adobe, Amazon, American Express, Apple, Arista Networks, Axon, Bcg, Bloomberg, Cadence, Cisco, Clevertap, Cognizant, Comcast, Deloitte, Fidelity, Goldman Sachs, Google, Hashedin, Hcl, Infosys, Intel, Intuit, Lti, Meta, Microsoft, Oracle, Salesforce, Sap, Shopee, Spotify, Tcs, Tiktok, Tinkoff, Toast, Uber, Ukg, Visa, Vk, Walmart Labs, Wayfair, Yandex, Zenefits, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Clean and Compare — O(n)](#3-approach-1-clean-and-compare--on)
4. [Approach 2: Two Pointers — O(n) ✅](#4-approach-2-two-pointers--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

**Constraints:**
- `1 <= s.length <= 2 × 10⁵`
- `s` consists only of printable ASCII characters.

---

## 2. Examples

```
Example 1:
  Input:  s = "A man, a plan, a canal: Panama"
  Output: true
  Reason: "amanaplanacanalpanama" is a palindrome.

Example 2:
  Input:  s = "race a car"
  Output: false

Example 3:
  Input:  s = " "
  Output: true
  Reason: After removing non-alphanumeric characters, s is "".
```

---

## 3. Approach 1: Clean and Compare — O(n)

Filter out non-alphanumeric characters, convert to lowercase, then check if the string equals its reverse.

```
FUNCTION isPalindrome(s):
    cleaned = ""
    FOR char IN s:
        IF char is alphanumeric:
            cleaned += LOWERCASE(char)
    RETURN cleaned == REVERSE(cleaned)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 4. Approach 2: Two Pointers — O(n) ✅

Use two pointers moving inward, skipping non-alphanumeric characters.

```
FUNCTION isPalindrome(s):

    left  = 0
    right = len(s) - 1

    WHILE left < right:
        // Skip non-alphanumeric from left
        WHILE left < right AND NOT isAlphanumeric(s[left]):
            left += 1

        // Skip non-alphanumeric from right
        WHILE left < right AND NOT isAlphanumeric(s[right]):
            right -= 1

        IF LOWERCASE(s[left]) != LOWERCASE(s[right]):
            RETURN false

        left  += 1
        right -= 1

    RETURN true
```

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Walkthrough

```
s = "A man, a plan, a canal: Panama"

left=0 ('A'), right=29 ('a')  → 'a' == 'a' ✓
left=1 (' '), skip → left=2 ('m')
right=28 ('m')                → 'm' == 'm' ✓
left=3 ('a'), right=27 ('a') → 'a' == 'a' ✓
... (continues matching all the way)

Return true ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Clean and Compare | O(n) | O(n) |
| **Two Pointers** | **O(n)** | **O(1)** |

---

## 7. Follow-Up Questions

### 7.1 Valid Palindrome II (LeetCode #680)

Given a string, determine if it can become a palindrome by deleting **at most one** character.

```
FUNCTION validPalindrome(s):
    left = 0, right = len(s) - 1

    WHILE left < right:
        IF s[left] != s[right]:
            // Try deleting either left or right character
            RETURN isPalin(s, left+1, right) OR isPalin(s, left, right-1)
        left += 1
        right -= 1

    RETURN true

FUNCTION isPalin(s, lo, hi):
    WHILE lo < hi:
        IF s[lo] != s[hi]: RETURN false
        lo += 1; hi -= 1
    RETURN true
```

Time: O(n). At most one branching point.

### 7.2 Longest Palindromic Substring (LeetCode #5)?

Expand around center for each position (and each gap). O(n²) time. Manacher's algorithm does it in O(n).

### 7.3 Palindrome Number (LeetCode #9)?

Check if an integer reads the same backward. Reverse the second half of the number and compare with the first half. No string conversion needed.

---

## Key Takeaway

> The **two-pointer** technique on palindromes avoids allocating a cleaned copy. Always handle edge cases: empty strings, single characters, strings with only non-alphanumeric characters.
