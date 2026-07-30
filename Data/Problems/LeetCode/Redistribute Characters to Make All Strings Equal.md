# 1897. Redistribute Characters to Make All Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal](https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal)
**Companies:** Moengage
---

## Problem Description
Given an array of strings `words`, you may reorder the characters of any string arbitrarily. Determine whether it is possible to make all strings identical after such redistributions. Return `true` if possible, otherwise `false`.

## Examples
- **Example 1:** `words = ["abc","aabc","bc"]` → `true`. The total character counts are `{a:2, b:2, c:2}`; each string can be rearranged to "abc".
- **Example 2:** `words = ["ab","a"]` → `false`. Total counts `{a:2, b:1}` cannot be evenly divided among 2 strings.

## Approach
The characters across all strings must be divisible by the number of strings. Count frequencies of each character using a hash map, then verify each count modulo `len(words)` equals zero.

```text
FUNCTION CanMakeEqual(words):
    SET n ← LENGTH(words)
    CREATE map freq ← empty
    FOR each word IN words:
        FOR each ch IN word:
            INCREMENT freq[ch]
    FOR each count IN freq.values():
        IF count MOD n ≠ 0:
            RETURN false
    RETURN true
```

## Walkthrough
| Word | Updated freq |
|------|--------------|
| "abc" | {a:1,b:1,c:1} |
| "aabc" | {a:3,b:2,c:2} |
| "bc" | {a:3,b:3,c:3} |
All frequencies (3) are divisible by `n=3` → return `true`.

## Complexity Analysis
- **Time:** `O(total_chars)` – scanning every character once.
- **Space:** `O(Σ)` where Σ is the size of the character set (at most 26 for lowercase letters).

## Follow-Up Questions
1. How would the solution change if uppercase letters were also allowed?
2. Can you extend the algorithm to output one possible common string?
3. What is the impact on complexity if the input strings are extremely long (streaming scenario)?

## Key Takeaway
A global character frequency check ensures each character can be evenly distributed across all strings, enabling them to become identical.
