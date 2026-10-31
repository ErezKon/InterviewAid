# 2451. Odd String Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/odd-string-difference](https://leetcode.com/problems/odd-string-difference)
**Companies:** Ibm, Salesforce, Visa, Wise

---

## Problem Description

You are given an array of equal-length strings `words`. Assume that the length of each string is `n`.

Each string `words[i]` can be converted into a **difference integer array** `difference[i]` of length `n - 1` where `difference[i][j] = words[i][j+1] - words[i][j]` where `0 <= j <= n - 2`. Note that the difference between two letters is the difference between their **positions** in the alphabet i.e. the position of `'a'` is `0`, `'b'` is `1`, and `'z'` is `25`.

- For example, for the string `"acb"`, the difference integer array is `[2 - 0, 1 - 2] = [2, -1]`.

All the strings in words have the same difference integer array, **except one**. You should find that string.

Return* the string in *`words`* that has different **difference integer array**.*

**Constraints:**
- `3 <= words.length <= 100`
- `n == words[i].length`
- `2 <= n <= 20`
- `words[i]` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: words = ["adc","wzy","abc"]
Output: "abc"
Explanation: - The difference integer array of "adc" is [3 - 0, 2 - 3] = [3, -1].
- The difference integer array of "wzy" is [25 - 22, 24 - 25]= [3, -1].
- The difference integer array of "abc" is [1 - 0, 2 - 1] = [1, 1].
The odd array out is [1, 1], so we return the corresponding string, "abc".
```

**Example 2:**
```
Input: words = ["aaa","bob","ccc","ddd"]
Output: "bob"
Explanation: All the integer arrays are [0, 0] except for "bob", which corresponds to [13, -13].
```

## Approach
**Algorithm:** Map difference tuples to groups.
1. For each word, build a tuple of `ord(word[i+1]) - ord(word[i])` for all adjacent pairs.
2. Use a hash map to collect words by their difference tuple.
3. The tuple with a single word corresponds to the odd string; return it.

### Pseudocode
```text
FUNCTION oddString(words):
    CREATE diffMap ← empty map
    FOR each word IN words:
        SET diffs ← []
        FOR i ← 0 TO LENGTH(word) - 2:
            APPEND (ORD(word[i+1]) - ORD(word[i])) TO diffs
        SET key ← TUPLE(diffs)
        APPEND word TO diffMap[key]
    FOR each key, group IN diffMap:
        IF LENGTH(group) == 1:
            RETURN group[0]
    RETURN ""  // no unique string
```

## Walkthrough
For `words = ["adc","wzy","abc"]`:
| word | diffs |
|------|-------|
| "adc" | (3, -1) |
| "wzy" | (3, -1) |
| "abc" | (1, 1) |
The map groups two words under (3,-1) and one under (1,1); the unique group yields "abc".

## Complexity Analysis
- Time: O(k·L) where *k* is number of words and *L* is word length.
- Space: O(k·L) for storing the difference tuples.

## Follow-Up Questions
1. How would you handle strings of varying lengths?
2. Can you solve the problem in O(k) time without storing full tuples?
3. What if you need to return all strings whose difference pattern appears exactly `t` times?

## Key Takeaway
Representing a string by its consecutive character differences creates a canonical signature; a hash map then isolates the uniquely-patterned string in linear time.