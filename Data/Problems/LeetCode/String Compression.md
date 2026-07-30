# 443. String Compression

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/string-compression](https://leetcode.com/problems/string-compression)
**Companies:** Affirm, Amazon, Anduril, Apple, Bloomberg, Cognizant, Crowdstrike, Epam Systems, Expedia, Godaddy, Goldman Sachs, Google, Ibm, Lg Electronics, Lyft, Meta, Microsoft, Mongodb, Nvidia, Olx, Oracle, Palantir, Palo Alto Networks, Paytm, Pinterest, Rakuten, Ripple, Rivian, Salesforce, Sap, Servicenow, Snapchat, The Trade Desk, Tiktok, Yandex, Yelp, Zoho, Zoox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Two Pointers — O(n) ✅](#3-approach-two-pointers--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an array of characters `chars`, compress it using the following algorithm:

Begin with an empty string `s`. For each group of consecutive repeating characters:
- If the group length is 1, append the character to `s`.
- Otherwise, append the character followed by the group's length.

The compressed string should be stored **in the input array** `chars`. The length after compression must always be ≤ the original length.

Return the new length of the array.

**Constraints:**
- `1 <= chars.length <= 2000`
- `chars[i]` is a lowercase letter, uppercase letter, digit, or symbol.

---

## 2. Examples

```
Example 1:
  Input:  chars = ["a","a","b","b","c","c","c"]
  Output: Return 6, chars = ["a","2","b","2","c","3"]

Example 2:
  Input:  chars = ["a"]
  Output: Return 1, chars = ["a"]

Example 3:
  Input:  chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
  Output: Return 4, chars = ["a","b","1","2"]
```

---

## 3. Approach: Two Pointers — O(n) ✅

Use a read pointer to scan groups and a write pointer to write the compressed output in-place.

```
FUNCTION compress(chars):
    write = 0
    read = 0
    n = len(chars)

    WHILE read < n:
        char = chars[read]
        count = 0

        // Count consecutive occurrences
        WHILE read < n AND chars[read] == char:
            read += 1
            count += 1

        // Write the character
        chars[write] = char
        write += 1

        // Write the count (if > 1)
        IF count > 1:
            countStr = STRING(count)
            FOR digit IN countStr:
                chars[write] = digit
                write += 1

    RETURN write
```

---

## 4. Walkthrough

```
chars = ["a","a","b","b","c","c","c"]

read=0: char='a', count=2 (read→2), write 'a','2' → write=2
read=2: char='b', count=2 (read→4), write 'b','2' → write=4
read=4: char='c', count=3 (read→7), write 'c','3' → write=6

chars = ["a","2","b","2","c","3"], return 6 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) — in-place |

---

## 6. Follow-Up Questions

### 6.1 What if the count can exceed 9 (multi-digit)?

Already handled — convert count to string and write each digit separately. E.g., count=12 writes '1','2'.

### 6.2 Run-Length Encoding / Decoding?

Encoding is this problem. Decoding: parse character + count pairs and repeat. E.g., `"a3b2"` → `"aaabb"`.

### 6.3 String Compression with different rules?

Some variants compress only if it saves space (e.g., `"a"` stays `"a"` instead of `"a1"`). Adjust the condition: only write count if `count > 1` (which this solution already does).

### 6.4 Count and Say (LeetCode #38)?

Related but different: generate the next term by "reading off" the previous term. `"1"` → `"11"` → `"21"` → `"1211"` → `"111221"` → ...

---

## Key Takeaway

> **In-place compression** with two pointers: read groups with one pointer, write compressed output with another. The write pointer always stays behind or at the read pointer, so we never overwrite unread data.
