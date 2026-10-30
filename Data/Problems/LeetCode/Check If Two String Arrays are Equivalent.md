# 1662. Check If Two String Arrays are Equivalent

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent](https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given two string arrays `word1` and `word2`, return `true` *if the two arrays **represent** the same string, and* `false` *otherwise.*

A string is **represented** by an array if the array elements concatenated **in order** forms the string.

**Constraints:**
- `1 <= word1.length, word2.length <= 10³`
- `1 <= word1[i].length, word2[i].length <= 10³`
- `1 <= sum(word1[i].length), sum(word2[i].length) <= 10³`
- `word1[i]` and `word2[i]` consist of lowercase letters.

## Examples
```
Example 1:
  Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
  Output: true
  Explanation:
  word1 represents string "ab" + "c" -> "abc"
  word2 represents string "a" + "bc" -> "abc"
  The strings are the same, so return true.
```

```
Example 2:
  Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
  Output: false
```

```
Example 3:
  Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
  Output: true
```

## Approach
The problem reduces to checking equality of two concatenated strings. The simplest method is to concatenate each array into a single string and compare them directly.

```text
FUNCTION arrayStringsAreEqual(word1, word2):
    SET s1 ← ""
    FOR w IN word1:
        SET s1 ← s1 + w
    SET s2 ← ""
    FOR w IN word2:
        SET s2 ← s2 + w
    RETURN s1 == s2
```

## Walkthrough
| Step | word1 element | s1 after step | word2 element | s2 after step |
|------|---------------|--------------|---------------|--------------|
| 1    | "ab"         | "ab"        | "a"          | "a"         |
| 2    | "c"          | "abc"       | "bc"         | "abc"       |
| End  | –             | "abc"       | –             | "abc"       |
The final strings match, so the function returns `true`.

## Complexity Analysis
- **Time:** O(N) where N is the total number of characters in both arrays.
- **Space:** O(N) for the two concatenated strings.

## Follow-Up Questions
1. How would you solve the problem without constructing the full strings, using only O(1) extra space?
2. How can you compare the arrays if they are provided as iterators or streams?
3. What changes are needed if the comparison should be case‑insensitive?

## Key Takeaway
Concatenating the two string arrays and performing a direct equality check yields a simple O(N) solution.
