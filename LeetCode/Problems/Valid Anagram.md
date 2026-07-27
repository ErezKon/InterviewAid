# 242. Valid Anagram

**Difficulty:** 🟢 Easy
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/valid-anagram](https://leetcode.com/problems/valid-anagram)
**Companies:** Accenture, Affirm, Amadeus, Amazon, American Express, Apple, Bloomberg, Capgemini, Cognizant, Deloitte, Dialpad, Epam Systems, Fidelity, Goldman Sachs, Google, Ibm, Infosys, Lg Electronics, Mastercard, Meta, Microsoft, Nagarro, Netflix, Nokia, Nvidia, Oracle, Ozon, Paypal, Siemens, Tcs, Tesla, Uber, Visa, Wipro, Yandex, Yelp, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Sorting — O(n log n)](#3-approach-1-sorting--on-log-n)
4. [Approach 2: Frequency Count — O(n) ✅](#4-approach-2-frequency-count--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`, and `false` otherwise.

An anagram uses all the original letters exactly once.

**Constraints:**
- `1 <= s.length, t.length <= 5 × 10⁴`
- `s` and `t` consist of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  s = "anagram", t = "nagaram"
  Output: true

Example 2:
  Input:  s = "rat", t = "car"
  Output: false
```

---

## 3. Approach 1: Sorting — O(n log n)

```
FUNCTION isAnagram(s, t):
    RETURN SORT(s) == SORT(t)
```

---

## 4. Approach 2: Frequency Count — O(n) ✅

Count character frequencies. If both strings have identical counts, they're anagrams.

```
FUNCTION isAnagram(s, t):
    IF len(s) != len(t):
        RETURN false

    count = array of 26 zeros

    FOR i ← 0 TO len(s) - 1:
        count[s[i] - 'a'] += 1
        count[t[i] - 'a'] -= 1

    FOR c IN count:
        IF c != 0:
            RETURN false

    RETURN true
```

---

## 5. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sorting | O(n log n) | O(n) or O(1) |
| **Frequency Count** | **O(n)** | **O(1)** (26 chars) |

---

## 6. Follow-Up Questions

### 6.1 What if the inputs contain Unicode characters?

Use a hash map instead of a fixed-size array to count arbitrary character frequencies.

### 6.2 Group Anagrams (LeetCode #49)?

Group strings that are anagrams of each other. Use sorted string (or frequency tuple) as a hash key.

```
FUNCTION groupAnagrams(strs):
    groups = {}
    FOR s IN strs:
        key = SORT(s)
        groups[key].ADD(s)
    RETURN groups.values()
```

### 6.3 Find All Anagrams in a String (LeetCode #438)?

Use a **sliding window** of size `len(p)` over `s`. Maintain a frequency map; slide right, add new char, remove leftmost char. When counts match, record the window start.

### 6.4 Minimum Number of Steps to Make Two Strings Anagram (LeetCode #1347)?

Count frequency differences. The answer is the total excess characters in `t` that aren't in `s`.

---

## Key Takeaway

> Anagram = same character frequencies. A fixed-size count array gives O(n) time and O(1) space for lowercase English. This frequency counting technique is the basis for sliding window anagram detection.
