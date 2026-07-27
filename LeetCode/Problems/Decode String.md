# 394. Decode String

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/decode-string](https://leetcode.com/problems/decode-string)
**Companies:** Activision, Adobe, Agoda, Amazon, Apple, Arista Networks, Bloomberg, Bytedance, Cisco, Compass, Coupang, Cyntexa, Ebay, Flexport, Geico, Goldman Sachs, Google, Hashedin, Huawei, Meta, Microsoft, Moloco, Nutanix, Nvidia, Oracle, Ozon, Palo Alto Networks, Phonepe, Razorpay, Roku, Salesforce, Tencent, Tiktok, Tinkoff, Walmart Labs, Wix, Yahoo, Yelp, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Stack — O(n) ✅](#3-approach-1-stack--on-)
4. [Approach 2: Recursion — O(n)](#4-approach-2-recursion--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. You may assume the input is always valid.

**Constraints:**
- `1 <= s.length <= 30`
- `s` consists of lowercase English letters, digits, and square brackets `[]`.
- `1 <= k <= 300`
- Nested encodings are possible, e.g., `2[a3[b]]`.

---

## 2. Examples

```
Example 1:
  Input:  s = "3[a]2[bc]"
  Output: "aaabcbc"

Example 2:
  Input:  s = "3[a2[c]]"
  Output: "accaccacc"

Example 3:
  Input:  s = "2[abc]3[cd]ef"
  Output: "abcabccdcdcdef"
```

---

## 3. Approach 1: Stack — O(n) ✅

### Key Insight

Use two stacks (or one stack of pairs): one for **counts** and one for **strings**. When we hit `[`, push the current string and count. When we hit `]`, pop and repeat.

### Pseudocode

```
FUNCTION decodeString(s):

    countStack = []
    stringStack = []
    currentString = ""
    currentNum = 0

    FOR char IN s:
        IF char is a digit:
            currentNum = currentNum * 10 + int(char)

        ELSE IF char == '[':
            countStack.PUSH(currentNum)
            stringStack.PUSH(currentString)
            currentString = ""
            currentNum = 0

        ELSE IF char == ']':
            count = countStack.POP()
            prevString = stringStack.POP()
            currentString = prevString + currentString × count

        ELSE:
            currentString += char

    RETURN currentString
```

---

## 4. Approach 2: Recursion — O(n)

Treat the string as a recursive grammar. Each recursive call processes one level of `k[...]`.

```
FUNCTION decodeString(s):
    index = 0

    FUNCTION decode():
        result = ""

        WHILE index < len(s) AND s[index] != ']':
            IF s[index] is a digit:
                num = 0
                WHILE s[index] is a digit:
                    num = num * 10 + int(s[index])
                    index += 1
                index += 1          // skip '['
                decoded = decode()
                index += 1          // skip ']'
                result += decoded × num
            ELSE:
                result += s[index]
                index += 1

        RETURN result

    RETURN decode()
```

---

## 5. Walkthrough

```
s = "3[a2[c]]"

Stack approach:
  '3': currentNum = 3
  '[': push (3, ""), currentString = "", currentNum = 0
  'a': currentString = "a"
  '2': currentNum = 2
  '[': push (2, "a"), currentString = "", currentNum = 0
  'c': currentString = "c"
  ']': pop (2, "a") → currentString = "a" + "c"×2 = "acc"
  ']': pop (3, "") → currentString = "" + "acc"×3 = "accaccacc"

Result: "accaccacc" ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · maxK) where n = output length, maxK = max repeat count |
| **Space** | O(n) for stacks and output string |

---

## 7. Follow-Up Questions

### 7.1 What if the encoding can also use variables (like `a=3[b], c=2[a]`)?

Build a dependency graph, topologically sort variables, then decode in order. This becomes a compiler/interpreter problem.

### 7.2 Encode String with Shortest Length (LeetCode #471)?

DP problem: `dp[i][j]` = shortest encoding of `s[i..j]`. Check if substring has a repeating pattern. If `s[i..j]` = `p` repeated `k` times, consider encoding as `k[dp for p]`.

### 7.3 Number of Atoms (LeetCode #726)?

Similar stack-based approach but for chemical formulas like `"K4(ON(SO3)2)2"`. Parse element names, counts, handle nested parentheses with multipliers.

### 7.4 What if we need to decode in a streaming fashion?

Process character by character with the stack approach. Emit output as soon as a complete segment is decoded. The stack naturally handles this.

---

## Key Takeaway

> Decode String is the canonical **nested structure** problem solved with a stack. The pattern — push context on `[`, pop and combine on `]` — applies to any problem with nested/recursive delimiters (HTML parsing, expression evaluation, etc.).
