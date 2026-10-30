# 1941. Check if All Characters Have Equal Number of Occurrences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences](https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences)
**Companies:** Amazon, Bloomberg, Bolt, Google

---

## Problem Description
Given a string `s`, return `true` *if* `s` *is a **good** string, or* `false` *otherwise*.

A string `s` is **good** if **all** the characters that appear in `s` have the **same** number of occurrences (i.e., the same frequency).

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

## Examples
```
Example 1:
  Input: s = "abacbc"
  Output: true
  Explanation: The characters that appear in s are 'a', 'b', and 'c'. All characters occur 2 times in s.
```

```
Example 2:
  Input: s = "aaabb"
  Output: false
  Explanation: The characters that appear in s are 'a' and 'b'.
  'a' occurs 3 times while 'b' occurs 2 times, which is not the same number of times.
```

## Approach
Count the occurrences of each character using a hash map, then verify that all counts are identical.

```text
FUNCTION areOccurrencesEqual(s):
    SET freq ← EMPTY MAP
    FOR ch IN s:
        IF ch IN freq:
            SET freq[ch] ← freq[ch] + 1
        ELSE:
            SET freq[ch] ← 1
    SET values ← LIST of freq values
    SET first ← values[0]
    FOR v IN values:
        IF v != first:
            RETURN false
    RETURN true
```

## Walkthrough
| Index | char | freq after processing |
|-------|------|-----------------------|
|0|a|{'a':1}
|1|b|{'a':1,'b':1}
|2|a|{'a':2,'b':1}
|3|c|{'a':2,'b':1,'c':1}
|4|b|{'a':2,'b':2,'c':1}
|5|c|{'a':2,'b':2,'c':2}
All frequencies equal → return `true`.

## Complexity Analysis
- **Time:** O(N) where N is the length of `s`.
- **Space:** O(Σ) where Σ ≤ 26 for lowercase letters (hash map of character counts).

## Follow-Up Questions
1. How would the solution change if the string could contain Unicode characters?
2. Can you solve the problem using only O(1) extra space without a hash map?
3. How would you extend the check to ensure the frequencies are a specific target value?

## Key Takeaway
Counting character frequencies and comparing them yields a simple O(N) solution for verifying equal occurrence counts.
