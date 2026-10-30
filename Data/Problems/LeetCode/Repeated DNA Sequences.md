# 187. Repeated DNA Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/repeated-dna-sequences](https://leetcode.com/problems/repeated-dna-sequences)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Linkedin, Meta, Microsoft

---

## Problem Description

The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.

- For example, `"ACGAATTCCG"` is a **DNA sequence**.

When studying **DNA**, it is useful to identify repeated sequences within the DNA.

Given a string `s` that represents a **DNA sequence**, return all the **`10`-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.

## Examples

**Example 1:**
```
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
```

**Example 2:**
```
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]
```

## Approach
Use a sliding window of fixed length 10 and a hash set to record seen substrings. When a substring is encountered a second time, add it to a result set.

```text
FUNCTION findRepeatedDnaSequences(s):
    IF LENGTH(s) < 10: RETURN []
    SET seen ← EMPTY SET
    SET repeated ← EMPTY SET
    FOR i ← 0 TO LENGTH(s) - 10:
        SET sub ← s[i : i+10]
        IF sub IN seen:
            repeated.ADD(sub)
        ELSE:
            seen.ADD(sub)
    RETURN LIST(repeated)
```

## Walkthrough
Consider `s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`.
| i | sub (s[i:i+10]) | seen | repeated |
|---|----------------|------|----------|
|0|`AAAAACCCCC`|{`AAAAACCCCC`}|{}|
|1|`AAAACCCCCA`|{… ,`AAAACCCCCA`}|{}|
|…|…|…|…|
|10|`AAAAACCCCC`|{…} |{`AAAAACCCCC`}|
|…|…|…|…|
The algorithm captures both repeated substrings.

## Complexity Analysis
- **Time:** O(n) where n is the length of the string, each window processed once.
- **Space:** O(n) for the `seen` set (worst‑case each 10‑letter window is unique).

## Follow-Up Questions
1. How would you modify the solution to handle substrings of length *k* instead of 10?
2. Can you solve the problem using a rolling hash to reduce constant factors?
3. How would you output the substrings in lexicographic order?

## Key Takeaway
A fixed‑size sliding window combined with a hash set efficiently finds repeated substrings in linear time.