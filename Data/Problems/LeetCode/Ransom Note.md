# 383. Ransom Note

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ransom-note](https://leetcode.com/problems/ransom-note)
**Companies:** Amazon, Apple, Bloomberg, Criteo, Disney, Google, Karat, Meta, Microsoft, Sap, Spotify, Tripadvisor
---

## Problem Description
Given two strings `ransomNote` and `magazine`, determine if you can construct the `ransomNote` by cutting letters from `magazine`. Each letter in `magazine` can be used at most once.

## Examples
- Input: `ransomNote = "aab"`, `magazine = "baa"` → Output: `true` (use two `a`s and one `b`).
- Input: `ransomNote = "aa"`, `magazine = "ab"` → Output: `false` (only one `a` available).

## Approach
Count the frequency of each character in `magazine`. Then iterate over `ransomNote`, decrement the corresponding count. If any count becomes negative, construction is impossible.

```text
FUNCTION canConstruct(ransomNote, magazine):
    // Build frequency map for magazine
    SET freq ← DICTIONARY with default 0
    FOR ch IN magazine:
        SET freq[ch] ← freq[ch] + 1
    END FOR
    // Verify each character in ransomNote
    FOR ch IN ransomNote:
        SET freq[ch] ← freq[ch] - 1
        IF freq[ch] < 0:
            RETURN false
        END IF
    END FOR
    RETURN true
END FUNCTION
```

## Walkthrough
| Step | Action | freq map update |
|------|--------|-----------------|
|1|Count `magazine = "baa"`|`{b:1, a:2}`|
|2|Process `ransomNote = "aab"`|decrement `a` → `{b:1, a:1}`|
|3|decrement `a` again → `{b:1, a:0}`|
|4|decrement `b` → `{b:0, a:0}`|no negative → return `true`|

## Complexity Analysis
- Time: O(m + n) where m = length of `magazine`, n = length of `ransomNote`.
- Space: O(1) additional space (fixed alphabet size).

## Follow‑Up Questions
1. How would the solution change if characters could be Unicode with a large alphabet?
2. Can you solve the problem using sorting instead of a frequency map?
3. What if you need to construct multiple ransom notes from the same magazine?

## Key Takeaway
A simple frequency counter lets you verify whether the required characters are available, providing an O(m + n) solution with constant extra space.
