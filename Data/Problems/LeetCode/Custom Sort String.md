# 791. Custom Sort String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/custom-sort-string](https://leetcode.com/problems/custom-sort-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

You are given two strings `order` and `s`. All the characters of `order` are **unique** and were sorted in some custom order previously.

Permute the characters of `s` so that they match the order that `order` was sorted. More specifically, if a character `x` occurs before a character `y` in `order`, then `x` should occur before `y` in the permuted string.

Return *any permutation of* `s` *that satisfies this property*.

**Constraints:**
- `1 <= order.length <= 26`
- `1 <= s.length <= 200`
- `order` and `s` consist of lowercase English letters.
- All the characters of `order` are **unique**.

---

## Approach

```text
FUNCTION customSortString(order, s):
    count ← empty map
    FOR ch IN s:
        INCREMENT count[ch]
    result ← empty string
    FOR ch IN order:
        IF ch IN count:
            result ← result + REPEAT(ch, count[ch])
            REMOVE ch FROM count
    FOR ch, cnt IN count:
        result ← result + REPEAT(ch, cnt)
    RETURN result
```

---

## Examples

```
Example 1:
  Input: order = "cba", s = "abcd"
  Output: "cbad"
  Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c" should be "c", "b", and "a".
  Since "d" does not appear in order, it can be at any position in the returned string. "dcba", "cdba", "cbda" are also valid outputs.
```

```
Example 2:
  Input: order = "bcafg", s = "abcd"
  Output: "bcad"
  Explanation: The characters "b", "c", and "a" from order dictate the order for the characters in s. The character "d" in s does not appear in order, so its position is flexible.
  Following the order of appearance in order, "b", "c", and "a" from s should be arranged as "b", "c", "a". "d" can be placed at any position since it's not in order. The output "bcad" correctly follows this rule. Other arrangements like "dbca" or "bcda" would also be valid, as long as "b", "c", "a" maintain their order.
```

---

## Walkthrough

**Example 1** – `order = "cba"`, `s = "abcd"`

1. Count frequencies: `{a:1, b:1, c:1, d:1}`.
2. Iterate `order`:
   - `c` present → append `c`, remove from map.
   - `b` present → append `b`, remove.
   - `a` present → append `a`, remove.
3. Remaining map `{d:1}` → append `d`.
4. Result string: `"cbad"`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = len(s) |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle Unicode characters beyond the basic ASCII set?
2. Can you solve the problem in a single pass without using extra space for counting frequencies?
3. How would you adapt the solution if `order` could contain duplicate characters?

---

## Key Takeaway

> **Custom ordering via counting sort: count character frequencies, output in `order` sequence first, then append remaining characters.**