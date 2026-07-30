
# 3. Longest Substring Without Repeating Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 39.1%
**LeetCode:** [https://leetcode.com/problems/longest-substring-without-repeating-characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)
**Companies:** Accenture, Accolite, Adobe, Agoda, Airtel, Akamai, Amazon, Amd, American Express, Apple, Arcesium, Arista Networks, Athenahealth, Atlassian, Att, Bitgo, Bloomberg, Bytedance, Capgemini, Capital One, Cisco, Cognizant, Comcast, Coupang, De Shaw, Dell, Deloitte, Dialpad, Docusign, Dp World, Dream11, Ebay, Epam Systems, Expedia, Flipkart, Fractal Analytics, Freecharge, Freshworks, Goldman Sachs, Google, Hashedin, Hcl, Ibm, Infosys, Intel, Jpmorgan, Juspay, Kpmg, Linkedin, Lyft, Makemytrip, Maq Software, Meta, Micro1, Microsoft, Morgan Stanley, Myntra, Nagarro, Netflix, Netskope, Nike, Nutanix, Nvidia, Oracle, Ozon, Palo Alto Networks, Paypal, Paytm, Persistent Systems, Pornhub, Practo, Publicis Sapient, Qualcomm, Rakuten, Rippling, Roblox, Salesforce, Sap, Servicenow, Sigmoid, Snapchat, Splunk, Spotify, Swiggy, Tcs, Tekion, Tesla, Tiktok, Tinkoff, Turing, Uber, Veeva, Virtusa, Visa, Vk, Walmart Labs, Wipro, Yandex, Yelp, Zepto, Zeta, Zoho, Zomato, Zs Associates

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n³)](#3-approach-1-brute-force--on³)
4. [Approach 2: Sliding Window + Set — O(n)](#4-approach-2-sliding-window--set--on)
5. [Approach 3: Sliding Window + Map (Optimized) — O(n) ✅](#5-approach-3-sliding-window--map-optimized--on-)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given a string `s`, find the length of the **longest substring** without repeating characters.

A **substring** is a contiguous sequence of characters within the string.

---

## 2. Examples

```
Example 1:
  Input:  s = "abcabcbb"
  Output: 3
  Reason: "abc" is the longest substring without repeating characters.

Example 2:
  Input:  s = "bbbbb"
  Output: 1
  Reason: "b" — every character is the same.

Example 3:
  Input:  s = "pwwkew"
  Output: 3
  Reason: "wke" — note that "pwke" is a subsequence, not a substring.
```

---

## 3. Approach 1: Brute Force — O(n³)

Check every possible substring for uniqueness.

```
FUNCTION lengthOfLongestSubstringBrute(s):
    maxLen = 0

    FOR i ← 0 TO n - 1:
        FOR j ← i TO n - 1:
            IF allUnique(s, i, j):
                maxLen = MAX(maxLen, j - i + 1)

    RETURN maxLen

FUNCTION allUnique(s, start, end):
    chars = empty set
    FOR k ← start TO end:
        IF s[k] IN chars:
            RETURN FALSE
        chars.ADD(s[k])
    RETURN TRUE
```

**Time:** O(n³) — far too slow.

---

## 4. Approach 2: Sliding Window + Set — O(n)

### Key Insight

Maintain a **window** `[left, right]` that always contains unique characters. Use a **set** to track what's in the window. When a duplicate is found, shrink from the left.

```
FUNCTION lengthOfLongestSubstring(s):
    charSet = empty set
    left    = 0
    maxLen  = 0

    FOR right ← 0 TO n - 1:

        WHILE s[right] IN charSet:
            charSet.REMOVE(s[left])
            left += 1

        charSet.ADD(s[right])
        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

Each character is added and removed from the set **at most once**, so the total work is O(n).

---

## 5. Approach 3: Sliding Window + Map (Optimized) — O(n) ✅

### Why Optimize Further?

In Approach 2, when we find a duplicate, we remove characters one by one from the left. If the duplicate appeared far back, we do unnecessary removals.

**Optimization:** Use a **map** storing the **last index** of each character. When a duplicate is found, **jump** `left` directly past the previous occurrence.

```
FUNCTION lengthOfLongestSubstring(s):
    charIndex = {}           // character → last seen index
    left      = 0
    maxLen    = 0

    FOR right ← 0 TO n - 1:
        ch = s[right]

        IF ch IN charIndex AND charIndex[ch] >= left:
            left = charIndex[ch] + 1       // jump past the duplicate

        charIndex[ch] = right
        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

### Why `charIndex[ch] >= left`?

The character might have appeared before our current window started. We only care if its last occurrence is **within** the current window `[left, right]`.

---

## 6. Walkthrough

```
s = "abcabcbb"

charIndex = {}, left = 0, maxLen = 0

right=0: ch='a'  → not in window → charIndex={'a':0}         → maxLen=1  window="a"
right=1: ch='b'  → not in window → charIndex={'a':0,'b':1}   → maxLen=2  window="ab"
right=2: ch='c'  → not in window → charIndex={.., 'c':2}     → maxLen=3  window="abc"
right=3: ch='a'  → 'a' at index 0 >= left(0)
                    left = 0 + 1 = 1
                    charIndex={'a':3,'b':1,'c':2}             → maxLen=3  window="bca"
right=4: ch='b'  → 'b' at index 1 >= left(1)
                    left = 1 + 1 = 2
                    charIndex={..,'b':4}                      → maxLen=3  window="cab"
right=5: ch='c'  → 'c' at index 2 >= left(2)
                    left = 2 + 1 = 3
                    charIndex={..,'c':5}                      → maxLen=3  window="abc"
right=6: ch='b'  → 'b' at index 4 >= left(3)
                    left = 4 + 1 = 5
                    charIndex={..,'b':6}                      → maxLen=3  window="cb"
right=7: ch='b'  → 'b' at index 6 >= left(5)
                    left = 6 + 1 = 7
                    charIndex={..,'b':7}                      → maxLen=3  window="b"

Result: 3 ✅
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n³) | O(min(n, m)) |
| Sliding Window + Set | O(n) | O(min(n, m)) |
| **Sliding Window + Map** | **O(n)** | **O(min(n, m))** |

Where `m` is the size of the character set (e.g., 26 for lowercase, 128 for ASCII).

---

## 8. Follow-Up Questions

### 8.1 What if we need the actual substring, not just the length?

Track the starting index of the best window:

```
FUNCTION longestUniqueSubstring(s):
    charIndex = {}
    left = 0
    maxLen = 0
    maxStart = 0

    FOR right ← 0 TO n - 1:
        ch = s[right]

        IF ch IN charIndex AND charIndex[ch] >= left:
            left = charIndex[ch] + 1

        charIndex[ch] = right

        IF right - left + 1 > maxLen:
            maxLen = right - left + 1
            maxStart = left

    RETURN s[maxStart .. maxStart + maxLen - 1]
```

---

### 8.2 What about "at most K distinct characters"?

This is **LeetCode #340 — Longest Substring with At Most K Distinct Characters**.

Replace the "no duplicates" condition with "at most K distinct characters" using a frequency map:

```
FUNCTION lengthOfLongestSubstringKDistinct(s, k):
    freq  = {}          // character → frequency count
    left  = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        freq[s[right]] = freq.GET(s[right], 0) + 1

        WHILE SIZE(freq) > k:
            freq[s[left]] -= 1
            IF freq[s[left]] == 0:
                DELETE freq[s[left]]
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

### 8.3 What if the character set is fixed (e.g., only lowercase letters)?

Use an **array of size 26** instead of a hash map for slightly better constant factors:

```
lastSeen = ARRAY of size 26, initialized to -1

// Instead of charIndex[ch], use lastSeen[ch - 'a']
```

---

### 8.4 Can you solve it with at most 2 passes?

Approach 2 (set-based) does at most 2 passes — each character is visited once by `right` and at most once by `left`. Approach 3 (map-based) does exactly 1 pass since `left` never backtracks character by character.

---

## Key Takeaway

> This is the **canonical sliding window problem**. The pattern is:
> 1. Expand the window by moving `right`.
> 2. When a constraint is violated, shrink from `left`.
> 3. Track the best window seen.
>
> Recognizing when a problem fits the sliding window pattern is a critical interview skill. Variations include: fixed-size windows, windows with at most K distinct elements, and windows with specific frequency constraints.
