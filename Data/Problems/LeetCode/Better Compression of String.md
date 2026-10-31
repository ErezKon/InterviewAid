# 3167. Better Compression of String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/better-compression-of-string](https://leetcode.com/problems/better-compression-of-string)
**Companies:** Goldman Sachs, Riot Games

---

## Problem Description

You are given a string `compressed` representing a compressed version of a string. The format is a character followed by its frequency. For example, `"a3b1a1c2"` is a compressed version of the string `"aaabacc"`.

We seek a **better compression** with the following conditions:

- Each character should appear **only once** in the compressed version.
- The characters should be in **alphabetical order**.

Return the *better compression* of `compressed`.

**Note:** In the better version of compression, the order of letters may change, which is acceptable.

**Constraints:**
- `1 ≤ compressed.length ≤ 6 * 10⁴`
- `compressed` consists only of lowercase English letters and digits.
- `compressed` is a valid compression, i.e., each character is followed by its frequency.
- Frequencies are in the range `[1, 10⁴]` and have no leading zeroes.

---

## Approach

Parse character-count pairs, aggregate in a map, sort by character, reconstruct. Standard string parsing pattern.

```text
FUNCTION betterCompression(compressed):
    // Map character → total count
    SET countMap ← empty map
    SET i ← 0
    WHILE i < LENGTH(compressed):
        SET ch ← compressed[i]
        SET i ← i + 1
        SET num ← 0
        WHILE i < LENGTH(compressed) AND IS_DIGIT(compressed[i]):
            SET num ← num * 10 + TO_INT(compressed[i])
            SET i ← i + 1
        SET countMap[ch] ← countMap.get(ch, 0) + num
    // Build sorted result
    SET result ← ""
    FOR each ch IN SORTED_KEYS(countMap):
        SET result ← result + ch + TO_STRING(countMap[ch])
    RETURN result
```

---

## Examples

```
Example 1:
  Input: compressed = "a3c9b2c1"
  Output: "a3b2c10"
  Explanation: Characters "a" and "b" appear only once in the input, but "c" appears twice, once with a size of 9 and once with a size of 1.
  Hence, in the resulting string, it should have a size of 10.

Example 2:
  Input: compressed = "c2b3a1"
  Output: "a1b3c2"

Example 3:
  Input: compressed = "a2b4c1"
  Output: "a2b4c1"
```

---

## Walkthrough

Take `"a3b2c1a2"`.

1. Parse `a3` → countMap[`a`] = 3
2. Parse `b2` → countMap[`b`] = 2
3. Parse `c1` → countMap[`c`] = 1
4. Parse `a2` → countMap[`a`] = 3 + 2 = 5
5. Sort keys → `a`, `b`, `c`
6. Concatenate → `"a5b2c1"`

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n + k log k) where n is input length, k ≤ 26 distinct chars | O(k) |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle uppercase and lowercase as distinct characters?
2. Can you output the result without sorting, preserving original order of first appearance?
3. What if the counts can be very large (beyond 32-bit)?

---

## Key Takeaway

> Parse character-count pairs, aggregate in a map, sort by character, and rebuild the compressed string.
