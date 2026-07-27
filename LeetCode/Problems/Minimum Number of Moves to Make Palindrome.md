# 2193. Minimum Number of Moves to Make Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome](https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome)
**Companies:** Amazon, Goldman Sachs, Ibm, Microsoft, Rubrik

---

## Approach: Greedy Two Pointer — O(n²) ✅

```
FUNCTION minMovesToMakePalindrome(s):
    s = list(s)
    moves = 0

    WHILE len(s) > 1:
        // Find matching char for s[0] from the end
        j = len(s) - 1
        WHILE s[j] != s[0]: j -= 1

        IF j == 0:
            // Odd char, move to middle
            moves += len(s) // 2
        ELSE:
            // Swap s[j] to last position
            s.POP(j)
            moves += len(s) - 1 - j
        s.POP(0)

    RETURN moves
```
