# 271. Encode and Decode Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/encode-and-decode-strings](https://leetcode.com/problems/encode-and-decode-strings)
**Companies:** Amazon, Crowdstrike, Google, Meta, Microsoft, Openai, Oracle, Snowflake, Square, Tiktok, Udemy

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Length-Prefixed Encoding](#approach-length-prefixed-encoding--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Design an algorithm to encode **a list of strings** to **a string**. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:

```
string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
```

Machine 2 (receiver) has the function:

```
vector<string> decode(string s) {
  //... your code
  return strs;
}
```

So Machine 1 does:

```
string encoded_string = encode(strs);
```

and Machine 2 does:

```
vector<string> strs2 = decode(encoded_string);
```

`strs2` in Machine 2 should be the same as `strs` in Machine 1.

Implement the `encode` and `decode` methods.

You are not allowed to solve the problem using any serialize methods (such as `eval`).

**Follow up: **Could you write a generalized algorithm to work on any possible set of characters?

**Constraints:**
- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` contains any possible characters out of `256` valid ASCII characters.

---

## Examples

**Example 1:**
```
Input: dummy_input = ["Hello","World"]
Output: ["Hello","World"]
Explanation: Machine 1:
Codec encoder = new Codec();
String msg = encoder.encode(strs);
Machine 1 ---msg---> Machine 2
Machine 2:
Codec decoder = new Codec();
String[] strs = decoder.decode(msg);
```

**Example 2:**
```
Input: dummy_input = [""]
Output: [""]
```

---

## Key Insight

> No delimiter is safe since strings can contain any character. **Length-prefixing** solves this: prepend each string with its length + a separator (`#`). The decoder reads the length first, then extracts exactly that many characters — ignoring any special characters within the string.

---

## Approach: Length-Prefixed Encoding — O(n) ✅

```
FUNCTION encode(strs):
    result = ""
    FOR s IN strs:
        result += str(len(s)) + "#" + s
    RETURN result

FUNCTION decode(s):
    result = []
    i = 0
    WHILE i < len(s):
        j = s.INDEX('#', i)
        length = int(s[i:j])
        result.ADD(s[j+1 : j+1+length])
        i = j + 1 + length
    RETURN result
```

---

## Walkthrough

```
encode(["we", "say", "#", "yes"]):
  "we"  → "2#we"
  "say" → "3#say"
  "#"   → "1##"
  "yes" → "3#yes"
  Result: "2#we3#say1##3#yes"

decode("2#we3#say1##3#yes"):
  i=0: find '#' at j=1, length=2, extract s[2:4]="we", i=4
  i=4: find '#' at j=5, length=3, extract s[6:9]="say", i=9
  i=9: find '#' at j=10, length=1, extract s[11:12]="#", i=12
  i=12: find '#' at j=13, length=3, extract s[14:17]="yes", i=17
  Result: ["we","say","#","yes"] ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) — n = total characters across all strings |
| **Space** | O(n) — encoded string |

---

## Follow-Up Questions

**Q1: Why not use a delimiter like `,`?**
> Strings themselves can contain `,`. Escaping leads to complexity. Length-prefix is unambiguous.

**Q2: What about chunked transfer encoding in HTTP?**
> Same idea! HTTP chunked encoding uses hex length + CRLF + data. This is the same pattern.

**Q3: Could you use a fixed-width length prefix?**
> Yes — e.g., 4 bytes for length (big-endian). This avoids needing the `#` separator but requires binary encoding.

---

## Key Takeaway

> **Length-prefixed encoding is the universal solution for serializing variable-length data when any character is valid. Read length first, then extract exactly that many chars. NeetCode/Blind 75 classic.**
