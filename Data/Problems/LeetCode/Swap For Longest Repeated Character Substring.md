# 1156. Swap For Longest Repeated Character Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swap-for-longest-repeated-character-substring](https://leetcode.com/problems/swap-for-longest-repeated-character-substring)
**Companies:** Google, Nutanix

---

## Problem Description
Given a string `s` consisting of uppercase English letters, you may choose any two characters in the string and swap them (at most once). Return the length of the longest substring consisting of a single repeated character that can be obtained after at most one swap.

## Examples
**Example 1:**
```
Input: s = "ABAB"
Output: 3
Explanation: Swap the last 'B' with the first 'A' to get "BABA"; the longest repeated character substring is "BBB" of length 3.
```

**Example 2:**
```
Input: s = "AAAA"
Output: 4
Explanation: No swap needed; the whole string is already a repeated character substring.
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
