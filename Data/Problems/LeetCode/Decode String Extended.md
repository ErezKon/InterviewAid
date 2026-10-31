# 394. Decode String — Nested Stack Pattern

See also: [Decode String.md](Decode%20String.md)

**Companies:** Activision, Adobe, Agoda, Amazon, Apple, Arista Networks, Bloomberg, Bytedance, Cisco, Compass, Coupang, Cyntexa, Ebay, Flexport, Geico, Goldman Sachs, Google, Hashedin, Huawei, Meta, Microsoft, Moloco, Nutanix, Nvidia, Oracle, Ozon, Palo Alto Networks, Phonepe, Razorpay, Roku, Salesforce, Tencent, Tiktok, Tinkoff, Walmart Labs, Wix, Yahoo, Yelp, Zoho, Zopsmart
---

## Problem Description
> *Note: companion file of #394 Decode String (no LeetCode URL by design) — the official statement, examples and constraints are in [Decode String.md](Decode%20String.md).*

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there will not be input like `3a` or `2[4]`.

The test cases are generated so that the length of the output will never exceed `10^5`.

Nested brackets are allowed, requiring a stack to keep track of previous contexts.

**Constraints:**

- `1 <= s.length <= 30`
- `s` consists of lowercase English letters, digits, and square brackets `'[]'`.
- `s` is guaranteed to be **a valid** input.
- All the integers in `s` are in the range `[1, 300]`.

## Examples

```
Example 1:
  Input: s = "3[a]2[bc]"
  Output: "aaabcbc"
```

```
Example 2:
  Input: s = "3[a2[c]]"
  Output: "accaccacc"
  Explanation: "a2[c]" becomes "acc"; repeated 3 times.
```

```
Example 3:
  Input: s = "2[abc]3[cd]ef"
  Output: "abcabccdcdcdef"
```

## Approach
Use a monotonic stack that stores pairs of `(previousString, repeatCount)`. Iterate characters:
- If a digit, build the repeat count.
- If `'['`, push current string and count onto the stack, then reset them.
- If a letter, append to current string.
- If `']'`, pop a pair, repeat the current string `count` times, and concatenate to the popped string.

## Pseudocode
```text
FUNCTION decodeString(s):
    SET stack ← empty stack of (string, int)
    SET current ← ""
    SET k ← 0
    FOR ch IN s:
        IF ch IS DIGIT:
            SET k ← k * 10 + INT(ch)
        ELSE IF ch == '[':
            stack.PUSH((current, k))
            SET current ← ""
            SET k ← 0
        ELSE IF ch == ']':
            SET (prevString, repeat) ← stack.POP()
            SET current ← prevString + REPEAT(current, repeat)
        ELSE:
            SET current ← current + ch
    RETURN current
```

## Walkthrough
| Step | char | stack | current | action |
|------|------|-------|---------|--------|
| 1 | '3' | [] | "" | k = 3 |
| 2 | '[' | [("",3)] | "" | push, reset |
| 3 | 'a' | [("",3)] | "a" | append |
| 4 | '2' | [("",3)] | "a" | k = 2 |
| 5 | '[' | [("",3), ("a",2)] | "" | push |
| 6 | 'c' | [("",3), ("a",2)] | "c" | append |
| 7 | ']' | [("",3)] | "a" + REPEAT("c",2) = "acc" |
| 8 | ']' | [] | "" + REPEAT("acc",3) = "accaccacc" |

## Complexity Analysis
- **Time:** O(n) where n is length of `s` – each character processed once.
- **Space:** O(m) for the stack, where m is the maximum nesting depth.

## Follow-Up Questions
- How would you modify the algorithm to support multi-digit repeat counts?
- Can you decode the string without using an explicit stack (e.g., recursion)?
- How would you handle very large output sizes that exceed memory limits?

## Key Takeaway
A stack of previous strings and repeat counts cleanly manages nested expansions, turning a complex recursive decoding problem into an iterative linear-time solution.
