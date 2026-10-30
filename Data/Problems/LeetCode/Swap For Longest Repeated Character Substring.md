# 1156. Swap For Longest Repeated Character Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swap-for-longest-repeated-character-substring](https://leetcode.com/problems/swap-for-longest-repeated-character-substring)
**Companies:** Google, Nutanix

---

## Problem Description

You are given a string `text`. You can swap two of the characters in the `text`.

Return *the length of the longest substring with repeated characters*.

**Constraints:**
- `1 <= text.length <= 2 * 10^4`
- `text` consist of lowercase English characters only.

## Examples

**Example 1:**
```
Input: text = "ababa"
Output: 3
Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa" with length 3.
```

**Example 2:**
```
Input: text = "aaabaaa"
Output: 6
Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa" with length 6.
```

**Example 3:**
```
Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa" with length is 5.
```

## Approach
1. Count total occurrences of each character.
2. Use a sliding window to find the longest segment of a target character allowing at most one different character inside (the swap candidate).
3. The window length is limited by the total count of that character (cannot exceed it).

```text
FUNCTION longestRepeatedSubstring(s):
    SET totalCount ← map of character → frequency in s
    SET maxLen ← 0
    FOR ch IN totalCount.keys():
        SET left ← 0
        SET mismatches ← 0
        FOR right ← 0 TO LENGTH(s)-1:
            IF s[right] ≠ ch:
                SET mismatches ← mismatches + 1
            WHILE mismatches > 1:
                IF s[left] ≠ ch:
                    SET mismatches ← mismatches - 1
                SET left ← left + 1
            // window size is right-left+1, but cannot exceed totalCount[ch]
            SET windowSize ← MIN(right - left + 1, totalCount[ch])
            SET maxLen ← MAX(maxLen, windowSize)
    RETURN maxLen
```

## Walkthrough
For `s = "ABAB"`:
- Total counts: A=2, B=2.
- Target `A`: sliding window finds max size 2 (cannot exceed total A count).
- Target `B`: similar, but window with one mismatch yields size 3 (window "BAB" with one non‑B). Result = 3.

## Complexity Analysis
- **Time:** O(26 · n) ≈ O(n) – iterate over each character type.
- **Space:** O(1) – only frequency map of fixed size 26.

## Follow-Up Questions
1. How would you extend the solution to allow at most `k` swaps?
2. Can the algorithm be adapted for lowercase letters or Unicode characters?
3. What changes are needed if the string length can be up to 10⁶?

## Key Takeaway
A sliding window that permits a single mismatch, bounded by the total character count, efficiently computes the optimal length after one swap.
