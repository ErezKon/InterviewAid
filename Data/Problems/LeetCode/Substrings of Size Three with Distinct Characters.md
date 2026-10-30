# 1876. Substrings of Size Three with Distinct Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters](https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters)
**Companies:** Amazon, Bloomberg, Microsoft, Quora, Visa

---

## Problem Description

A string is **good** if there are no repeated characters.

Given a string `s`, return *the number of **good substrings** of length **three** in* `s`.

Note that if there are multiple occurrences of the same substring, every occurrence should be counted.

A **substring** is a contiguous sequence of characters in a string.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "xyzzaz"
Output: 1
Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and "zaz".
The only good substring of length 3 is "xyz".
```

**Example 2:**
```
Input: s = "aababcabc"
Output: 4
Explanation: There are 7 substrings of size 3: "aab", "aba", "bab", "abc", "bca", "cab", and "abc".
The good substrings are "abc", "bca", "cab", and "abc".
```

## Approach
Iterate through the string with a sliding window of size three and check if the three characters are all different using a set.

```text
FUNCTION countGoodSubstrings(s):
    count ← 0
    FOR i ← 0 TO LENGTH(s) - 3:
        window ← SUBSTRING(s, i, i + 3)
        IF LENGTH(SET(window)) == 3:
            count ← count + 1
    RETURN count
```

## Walkthrough
For `s = "xyzzaz"`:
1. Window `"xyz"` → distinct → count = 1.
2. Window `"yzz"` → duplicate `z` → no increment.
3. Window `"zza"` → duplicate `z` → no increment.
4. Window `"zaz"` → duplicate `z` → no increment.
Result = 1.

## Complexity Analysis
*Time*: O(|s|) – one pass through the string.
*Space*: O(1) – only a few variables and a constant‑size set.

## Follow‑Up Questions
* How would you modify the solution for substrings of length *k* with all distinct characters?
* Can you solve it in a single pass without constructing a set each time?
* What if the alphabet size is limited (e.g., only lowercase letters)?

## Key Takeaway
A fixed‑size sliding window combined with a set check efficiently counts length‑three substrings with all distinct characters.
