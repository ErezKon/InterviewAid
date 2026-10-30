# 1897. Redistribute Characters to Make All Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal](https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal)
**Companies:** Moengage
---

## Problem Description
You are given an array of strings `words` (**0-indexed**).

In one operation, pick two **distinct** indices `i` and `j`, where `words[i]` is a non-empty string, and move **any** character from `words[i]` to **any** position in `words[j]`.

Return `true` *if you can make **every** string in* `words` ***equal** using **any** number of operations, and* `false` *otherwise*.

**Constraints:**

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters.

## Examples

```
Example 1:
  Input: words = ["abc","aabc","bc"]
  Output: true
  Explanation: Move the first 'a' in words[1] to the front of words[2],
    to make words[1] = "abc" and words[2] = "abc".
    All the strings are now equal to "abc", so return true.
```

```
Example 2:
  Input: words = ["ab","a"]
  Output: false
  Explanation: It is impossible to make all the strings equal using the operation.
```

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
