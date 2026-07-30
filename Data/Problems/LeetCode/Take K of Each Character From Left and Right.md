# 2516. Take K of Each Character From Left and Right

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/take-k-of-each-character-from-left-and-right](https://leetcode.com/problems/take-k-of-each-character-from-left-and-right)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given a string `s` consisting only of the characters `'a'`, `'b'`, and `'c'`, and an integer `k`, you may delete characters from the **prefix** and/or **suffix** of `s`. After deletions, the remaining substring must contain at least `k` occurrences of each character. Return the minimum total number of deletions required, or `-1` if it is impossible.

## Examples
**Example 1:**
```
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation: Delete the first 5 characters and the last 3 characters, leaving "aaac" which has at least 2 'a's, 2 'b's, and 2 'c's after further deletions.
```

**Example 2:**
```
Input: s = "abc", k = 1
Output: 0
Explanation: The original string already satisfies the requirement.
```

## Approach
The task is equivalent to finding the **longest contiguous substring** we can keep such that removing the rest (prefix + suffix) still leaves at least `k` of each character. Compute the total count of each character; if any total < k, answer is `-1`. Then use a sliding window to maintain a candidate middle segment. While the window violates the requirement (i.e., `total[c] - window[c] < k` for any `c`), shrink it from the left. Track the maximum window length that satisfies the condition; answer = `len(s) - maxWindow`.

```text
FUNCTION takeCharacters(s, k):
    total ← COUNTER(s)               // total occurrences of 'a','b','c'
    IF any total[c] < k FOR c IN {'a','b','c'}:
        RETURN -1

    left ← 0
    window ← COUNTER()               // occurrences inside current window
    maxWindow ← 0

    FOR right FROM 0 TO LENGTH(s) - 1:
        window[s[right]] ← window[s[right]] + 1
        // Ensure we can still keep at least k of each char outside the window
        WHILE any total[c] - window[c] < k FOR c IN {'a','b','c'}:
            window[s[left]] ← window[s[left]] - 1
            left ← left + 1
        maxWindow ← MAX(maxWindow, right - left + 1)

    RETURN LENGTH(s) - maxWindow
```

## Walkthrough
| right | char | window counts | condition satisfied? | left moves | maxWindow |
|-------|------|---------------|----------------------|-----------|-----------|
| 0 | a | {a:1} | false (`total['b']-0 < k`) | left→1, window empty | 0 |
| 1 | a | {a:1} | false (still missing 'b','c') | left→2 … | … |
| … | … | … | … | … | … |
| final | – | – | true | – | longest kept segment length = 4 |

## Complexity Analysis
- Time: O(n) where n = |s|, each character is visited at most twice.
- Space: O(1) – only constant‑size counters for three characters.

## Follow‑Up Questions
1. How would the solution change if the string could contain any lowercase letters?
2. Can you solve the problem using a two‑pointer technique without an explicit counter map?
3. What if deletions could be performed from anywhere in the string, not just the ends?

## Key Takeaway
Transform the problem into finding the longest middle window that leaves enough characters on the sides; a sliding window yields the optimal answer in linear time.
