# 187. Repeated DNA Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/repeated-dna-sequences](https://leetcode.com/problems/repeated-dna-sequences)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Linkedin, Meta, Microsoft

---

## Problem Description
Given a DNA string `s` consisting of characters `'A'`, `'C'`, `'G'`, and `'T'`, return all the 10-letter-long substrings that occur more than once in the string. The substrings can be returned in any order.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"` | `["AAAAACCCCC","CCCCCAAAAA"]` | Both 10‑letter sequences appear at least twice. |
| `"AAAAAAAAAAA"` | `["AAAAAAAAAA"]` | The 10‑letter sequence `"AAAAAAAAAA"` repeats. |

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