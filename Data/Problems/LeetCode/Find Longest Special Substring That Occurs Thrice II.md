# 2982. Find Longest Special Substring That Occurs Thrice II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-ii](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-ii)
**Companies:** Google, Rubrik

---

## Problem Description
Given a string `s` consisting of lowercase English letters, a *special* substring is defined as a contiguous segment where each distinct character appears exactly three times. Return the length of the longest special substring. If none exists, return `0`.

## Examples
**Example 1**
```
Input: s = "aaabbbccc"
Output: 9
Explanation: The whole string is special because each of 'a','b','c' appears exactly three times.
```
**Example 2**
```
Input: s = "aabbbccc"
Output: 6
Explanation: Substring "bbbccc" is special (both 'b' and 'c' appear three times).
```

## Approach
Use a sliding window with two pointers. Maintain a frequency map of characters inside the window and a counter of how many characters have frequency exactly three. Expand the right pointer, and when any character exceeds three, shrink from the left until all frequencies are ≤ 3. Whenever the counter equals the number of distinct characters in the window, the window is special; update the answer.

### Pseudocode
```text
FUNCTION longestSpecialSubstring(s):
    SET left ← 0
    SET freq ← empty map
    SET exactThree ← 0   // number of chars with freq == 3
    SET answer ← 0
    FOR right ← 0 TO LENGTH(s)-1:
        SET ch ← s[right]
        INCREMENT freq[ch]
        IF freq[ch] == 3:
            INCREMENT exactThree
        WHILE freq[ch] > 3:
            SET leftCh ← s[left]
            IF freq[leftCh] == 3:
                DECREMENT exactThree
            DECREMENT freq[leftCh]
            INCREMENT left
        IF exactThree == SIZE(freq):
            SET answer ← MAX(answer, right - left + 1)
    RETURN answer
```

## Walkthrough
Consider `s = "aabbbccc"`.
| step | right | char | freq map | exactThree | left | window | answer |
|------|-------|------|----------|------------|------|--------|--------|
| 1 | 0 | a | {a:1} | 0 | 0 | a | 0 |
| 2 | 1 | a | {a:2} | 0 | 0 | aa | 0 |
| 3 | 2 | b | {a:2,b:1} | 0 | 0 | aab | 0 |
| 4 | 3 | b | {a:2,b:2} | 0 | 0 | aabb | 0 |
| 5 | 4 | b | {a:2,b:3} | 1 | 0 | aabbb | 5 (exactThree==size) |
| 6 | 5 | c | {a:2,b:3,c:1} | 1 | 0 | aabbbc | 5 |
| 7 | 6 | c | {a:2,b:3,c:2} | 1 | 0 | aabbbcc | 5 |
| 8 | 7 | c | {a:2,b:3,c:3} | 2 | 0 | aabbbccc | 8 (window length) |
Result = 8 (the longest special substring is "abbbccc").

## Complexity Analysis
- **Time:** O(n) – each character enters and leaves the window at most once.
- **Space:** O(k) where *k* is the number of distinct characters in the current window (≤ 26).

## Follow‑Up Questions
1. How would you adapt the algorithm for the requirement “each character appears exactly *k* times” for arbitrary *k*?
2. Can the problem be solved using a prefix‑frequency hash without a sliding window?
3. What changes are needed if the string may contain uppercase letters as well?

## Key Takeaway
A sliding‑window that enforces an upper bound on character frequencies lets you efficiently track when all characters meet the exact‑three condition.
