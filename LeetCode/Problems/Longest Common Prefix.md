# 14. Longest Common Prefix

**Difficulty:** 🟢 Easy
**Acceptance:** 47.6%
**LeetCode:** [https://leetcode.com/problems/longest-common-prefix](https://leetcode.com/problems/longest-common-prefix)
**Companies:** Accenture, Adobe, Alten, Amazon, American Express, Apple, Barclays, Bloomberg, Capgemini, Caterpillar, Cme Group, Deloitte, Deutsche Bank, Disney, Epam Systems, Ericsson, Fidelity, Fractal Analytics, Google, Hashedin, Hrt, Hsbc, Ibm, Infosys, Jane Street, Kotak Mahindra Bank, Maersk, Meta, Microsoft, Natwest, Nokia, Nvidia, Opentext, Oracle, Oyo, Palo Alto Networks, Persistent Systems, Phonepe, Publicis Sapient, Pubmatic, Pwc, Qualcomm, Quora, Revolut, Roblox, Samsung, Sap, Sigmoid, Target, Tcs, Tiktok, Turing, Uber, Virtusa, Visa, Walmart Labs, Wells Fargo, Wipro, Yahoo, Yelp, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Vertical Scanning — O(S)](#3-approach-1-vertical-scanning--os)
4. [Approach 2: Horizontal Scanning — O(S)](#4-approach-2-horizontal-scanning--os)
5. [Approach 3: Sorting — O(n·k·log n)](#5-approach-3-sorting--onklog-n)
6. [Approach 4: Divide and Conquer — O(S)](#6-approach-4-divide-and-conquer--os)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Write a function to find the **longest common prefix** string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

**Constraints:**
- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of only lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  strs = ["flower", "flow", "flight"]
  Output: "fl"

Example 2:
  Input:  strs = ["dog", "racecar", "car"]
  Output: ""
  Reason: There is no common prefix among the input strings.
```

---

## 3. Approach 1: Vertical Scanning — O(S) ✅

Compare characters column by column across all strings.

```
FUNCTION longestCommonPrefix(strs):

    IF strs is empty:
        RETURN ""

    FOR col ← 0 TO len(strs[0]) - 1:
        char = strs[0][col]

        FOR row ← 1 TO len(strs) - 1:
            IF col >= len(strs[row]) OR strs[row][col] != char:
                RETURN strs[0][0..col]      // prefix up to (not including) col

    RETURN strs[0]                          // entire first string is the prefix

```

| Aspect | Complexity |
|--------|------------|
| **Time** | O(S) where S = sum of all characters |
| **Space** | O(1) |

---

## 4. Approach 2: Horizontal Scanning — O(S)

Take the first string as the prefix, then shrink it against each subsequent string.

```
FUNCTION longestCommonPrefix(strs):

    IF strs is empty:
        RETURN ""

    prefix = strs[0]

    FOR i ← 1 TO len(strs) - 1:
        WHILE strs[i] does not start with prefix:
            prefix = prefix[0..len(prefix)-1]    // remove last character
            IF prefix is empty:
                RETURN ""

    RETURN prefix
```

---

## 5. Approach 3: Sorting — O(n·k·log n)

Sort the array. The common prefix of the entire array is the common prefix of the first and last strings (since sorting groups similar prefixes together).

```
FUNCTION longestCommonPrefix(strs):

    IF strs is empty:
        RETURN ""

    SORT strs lexicographically

    first = strs[0]
    last  = strs[len(strs) - 1]
    i = 0

    WHILE i < len(first) AND i < len(last) AND first[i] == last[i]:
        i += 1

    RETURN first[0..i]
```

---

## 6. Approach 4: Divide and Conquer — O(S)

Split the array in half, find the LCP of each half, then find the LCP of those two results.

```
FUNCTION longestCommonPrefix(strs):
    RETURN divideAndConquer(strs, 0, len(strs) - 1)

FUNCTION divideAndConquer(strs, left, right):
    IF left == right:
        RETURN strs[left]

    mid = (left + right) / 2
    lcpLeft  = divideAndConquer(strs, left, mid)
    lcpRight = divideAndConquer(strs, mid + 1, right)

    RETURN commonPrefix(lcpLeft, lcpRight)

FUNCTION commonPrefix(s1, s2):
    minLen = MIN(len(s1), len(s2))
    FOR i ← 0 TO minLen - 1:
        IF s1[i] != s2[i]:
            RETURN s1[0..i]
    RETURN s1[0..minLen]
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Vertical Scanning | O(S) | O(1) |
| Horizontal Scanning | O(S) | O(1) |
| Sorting | O(n·k·log n) | O(1) extra |
| Divide and Conquer | O(S) | O(m·log n) stack |

Where S = sum of all characters, n = number of strings, k = avg string length, m = prefix length.

---

## 8. Follow-Up Questions

### 8.1 What if the strings are stored in a Trie?

Insert all strings into a **Trie**. The LCP is the path from root until a node has more than one child or is an end-of-word marker.

```
FUNCTION lcpViaTrie(strs):
    trie = new Trie()
    FOR each s IN strs:
        trie.insert(s)

    prefix = ""
    node = trie.root
    WHILE node has exactly 1 child AND node is not end-of-word:
        char = the single child key
        prefix += char
        node = node.children[char]

    RETURN prefix
```

Time: O(S) to build trie + O(m) to traverse. Good when querying LCP many times against a fixed set.

### 8.2 What about binary search on prefix length?

Binary search the answer length in `[0, minLen]`. At each mid, check if all strings share the same prefix of that length. Time: O(S·log m) where m = min string length.

---

## Key Takeaway

> **Vertical scanning** is the simplest and most efficient for general cases. Sorting is elegant for interviews. Trie-based approaches shine when you need repeated prefix queries on a fixed dataset.
