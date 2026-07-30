
# 49. Group Anagrams

**Difficulty:** 🟡 Medium
**Acceptance:** 72.6%
**LeetCode:** [https://leetcode.com/problems/group-anagrams](https://leetcode.com/problems/group-anagrams)
**Companies:** Accolite, Adobe, Affirm, Amazon, Anduril, Apple, Athenahealth, Atlassian, Autodesk, Avito, Bcg, Blackrock, Blinkit, Bloomberg, Bny Mellon, Bp, Capgemini, Cisco, Citadel, Cognizant, Compass, Coupang, Dell, Deloitte, Disney, Docusign, Doordash, Dp World, Ebay, Epam Systems, Expedia, Factset, Freshworks, Goldman Sachs, Google, Hashedin, Ibm, Infosys, Instacart, Intuit, Jio, Josh Technology, Jpmorgan, Makemytrip, Meta, Microsoft, Millennium, Morgan Stanley, Motive, Msci, Myntra, Netapp, Nielsen, Nutanix, Nvidia, Okta, Oracle, Palo Alto Networks, Park, Paypal, Persistent Systems, Phonepe, Publicis Sapient, Salesforce, Sap, Servicenow, Siemens, Sigmoid, Snapchat, Squarepoint Capital, Tcs, Tiktok, Turing, Twilio, Uber, Ubs, Upstart, Verily, Visa, Walmart Labs, Wayfair, Whatnot, Wipro, Workday, Yandex, Yelp, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Sort Each Word — O(n · k log k)](#3-approach-1-sort-each-word--on--k-log-k)
4. [Approach 2: Character Count Key — O(n · k) ✅](#4-approach-2-character-count-key--on--k-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array of strings `strs`, group the **anagrams** together. You can return the answer in any order.

An **anagram** is a word formed by rearranging the letters of a different word, using all the original letters exactly once.

---

## 2. Examples

```
Example 1:
  Input:  ["eat", "tea", "tan", "ate", "nat", "bat"]
  Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]

Example 2:
  Input:  [""]
  Output: [[""]]

Example 3:
  Input:  ["a"]
  Output: [["a"]]
```

---

## 3. Approach 1: Sort Each Word — O(n · k log k)

Two words are anagrams if and only if their **sorted** versions are identical.

```
FUNCTION groupAnagrams(strs):
    groups = {}                    // sorted_string → list of originals

    FOR each word IN strs:
        key = SORT(word)           // "eat" → "aet", "tea" → "aet"

        IF key NOT IN groups:
            groups[key] = []
        groups[key].ADD(word)

    RETURN VALUES(groups)
```

---

## 4. Approach 2: Character Count Key — O(n · k) ✅

Instead of sorting, count character frequencies. Use the count as a hash key.

```
FUNCTION groupAnagrams(strs):
    groups = {}

    FOR each word IN strs:
        count = ARRAY of 26 zeros

        FOR each char IN word:
            count[char - 'a'] += 1

        key = TUPLE(count)          // e.g., (1,0,0,...,1,0,...,1,0,...)

        IF key NOT IN groups:
            groups[key] = []
        groups[key].ADD(word)

    RETURN VALUES(groups)
```

### Why a Tuple?

Arrays/lists aren't hashable in most languages. Convert to a tuple or a string like `"1#0#0#...#1#0#...#1"` to use as a dictionary key.

---

## 5. Walkthrough

```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

"eat" → count: a=1, e=1, t=1 → key = (1,0,0,0,1,...,1,...)
"tea" → count: a=1, e=1, t=1 → key = (1,0,0,0,1,...,1,...)  ← SAME
"tan" → count: a=1, n=1, t=1 → key = (1,0,0,...,1,...,1,...)
"ate" → count: a=1, e=1, t=1 → key = (1,0,0,0,1,...,1,...)  ← SAME as "eat"
"nat" → count: a=1, n=1, t=1 → key = (1,0,0,...,1,...,1,...) ← SAME as "tan"
"bat" → count: a=1, b=1, t=1 → key = (1,1,0,...,0,...,1,...)

groups:
  key1 → ["eat", "tea", "ate"]
  key2 → ["tan", "nat"]
  key3 → ["bat"]

Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort each word | O(n · k log k) | O(n · k) |
| **Character count** | **O(n · k)** | **O(n · k)** |

Where `n` = number of strings, `k` = maximum length of a string.

---

## 7. Follow-Up Questions

### 7.1 Valid Anagram (LeetCode #242)

Check if two strings are anagrams of each other.

```
FUNCTION isAnagram(s, t):
    IF LENGTH(s) != LENGTH(t):
        RETURN FALSE

    count = ARRAY of 26 zeros

    FOR i ← 0 TO LENGTH(s) - 1:
        count[s[i] - 'a'] += 1
        count[t[i] - 'a'] -= 1

    FOR each c IN count:
        IF c != 0: RETURN FALSE

    RETURN TRUE
```

**Time:** O(n), **Space:** O(1) (fixed 26-char alphabet)

### 7.2 Find All Anagrams in a String (LeetCode #438)

Find all start indices where an anagram of `p` occurs in `s`. Use a **sliding window** of size `len(p)`:

```
FUNCTION findAnagrams(s, p):
    IF LENGTH(s) < LENGTH(p): RETURN []

    pCount = frequency count of p
    sCount = frequency count of s[0..len(p)-1]
    result = []

    IF sCount == pCount:
        result.ADD(0)

    FOR i ← LENGTH(p) TO LENGTH(s) - 1:
        sCount[s[i]] += 1                    // add new char entering window
        sCount[s[i - LENGTH(p)]] -= 1        // remove char leaving window

        IF sCount == pCount:
            result.ADD(i - LENGTH(p) + 1)

    RETURN result
```

### 7.3 What about Unicode or extended character sets?

Replace the fixed-size array with a hash map for arbitrary character sets. The character count approach still works — it's just O(k) for each string regardless of alphabet size.

### 7.4 Can you group anagrams in a streaming fashion?

Yes. Maintain the hash map persistently. As each new word arrives, compute its key and add it to the appropriate group. Each insertion is O(k).

---

## Key Takeaway

> The core insight is: **anagrams share the same canonical form** — either sorted or as a character frequency vector. Converting each word to its canonical form and using it as a hash key is a clean O(n·k) solution. This "canonicalization" pattern appears in many grouping problems.
