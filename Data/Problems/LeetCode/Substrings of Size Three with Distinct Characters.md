# 1876. Substrings of Size Three with Distinct Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters](https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters)
**Companies:** Amazon, Bloomberg, Microsoft, Quora, Visa

---

## Problem Description
Given a string `s`, count the number of substrings of length three where all three characters are distinct. Overlapping substrings are counted separately.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"xyzzaz"` | `1` | Only substring `"xyz"` (indices 0‑2) has three distinct characters. |
| `"aababcabc"` | `4` | Substrings `"aba"`, `"bab"`, `"abc"`, `"bca"` each have three distinct characters.

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
