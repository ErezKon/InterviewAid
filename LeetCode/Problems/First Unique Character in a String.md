# 387. First Unique Character in a String

**Difficulty:** 🟢 Easy
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/first-unique-character-in-a-string](https://leetcode.com/problems/first-unique-character-in-a-string)
**Companies:** Accenture, Adobe, Akamai, Amazon, Apple, Bloomberg, Deloitte, Epam Systems, Fidelity, Goldman Sachs, Google, Ibm, Jpmorgan, Linkedin, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Paypal, Razorpay, Tcs, Visa, Walmart Labs, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Frequency Count — O(n) ✅](#3-approach-frequency-count--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Follow-Up Questions](#5-follow-up-questions)

---

## 1. Problem Description

Given a string `s`, find the **first non-repeating character** in it and return its index. If it does not exist, return `-1`.

**Constraints:**
- `1 <= s.length <= 10⁵`
- `s` consists of only lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  s = "leetcode"
  Output: 0 ('l' is first unique)

Example 2:
  Input:  s = "loveleetcode"
  Output: 2 ('v' is first unique)

Example 3:
  Input:  s = "aabb"
  Output: -1
```

---

## 3. Approach: Frequency Count — O(n) ✅

Two passes: count frequencies, then find the first character with count 1.

```
FUNCTION firstUniqChar(s):
    count = array of 26 zeros

    // First pass: count frequencies
    FOR char IN s:
        count[char - 'a'] += 1

    // Second pass: find first unique
    FOR i ← 0 TO len(s) - 1:
        IF count[s[i] - 'a'] == 1:
            RETURN i

    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) — 26 characters |

---

## 5. Follow-Up Questions

### 5.1 What if the string is a stream?

Use a queue of characters + a hash map of counts. Dequeue from the front while the front character has count > 1. The front of the queue is the first unique.

### 5.2 First Unique Number in a Stream (LeetCode #1429)?

Same idea with integers instead of characters. Use a linked hash map or queue + hash map.

### 5.3 What about Unicode characters?

Use a hash map instead of a fixed-size array.

---

## Key Takeaway

> Two-pass frequency counting is the standard approach: count in pass 1, query in pass 2. The 26-character alphabet makes space O(1).
