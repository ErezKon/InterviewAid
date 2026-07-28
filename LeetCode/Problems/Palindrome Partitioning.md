# 131. Palindrome Partitioning

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/palindrome-partitioning](https://leetcode.com/problems/palindrome-partitioning)
**Companies:** Accenture, Amazon, Bloomberg, Coupang, Google, Meta, Microsoft, Scaler, Visa

---

## Problem Description
Given a string *s*, partition it into substrings such that every substring is a palindrome. Return all possible palindrome partitionings of *s*.

## Examples
**Example 1:**
```
Input: "aab"
Output: [["a","a","b"],["aa","b"]]
Explanation: The two valid partitions are shown.
```
**Example 2:**
```
Input: "a"
Output: [["a"]]
```

## Approach
Use backtracking to explore all cut positions. At each recursion level, extend the current substring from the start index to every possible end index; if the substring is a palindrome, add it to the path and recurse from the next index. When the start reaches the end of the string, record the current path as a valid partition.

```text
FUNCTION partition(s):
    result ← []
    backtrack(s, 0, [], result)
    RETURN result

FUNCTION backtrack(s, start, path, result):
    IF start = LEN(s):
        APPEND result WITH COPY(path)
        RETURN
    FOR end ← start + 1 TO LEN(s):
        IF isPalindrome(SUBSTRING(s, start, end-1)):
            APPEND path WITH SUBSTRING(s, start, end-1)
            backtrack(s, end, path, result)
            POP path
```

## Walkthrough
For `s = "aab"`:
1. Start=0, try end=1 → "a" palindrome → path=["a"], recurse start=1.
2. At start=1, end=2 → "a" palindrome → path=["a","a"], recurse start=2.
3. At start=2, end=3 → "b" palindrome → path=["a","a","b"], start=3 (end) → record partition.
4. Backtrack, try end=3 at start=1 → substring "ab" not palindrome.
5. Backtrack to start=0, try end=2 → "aa" palindrome → path=["aa"], recurse start=2 → add "b" → record partition.

## Complexity Analysis
- **Time:** O(n·2ⁿ) in the worst case, as each character can be a cut or not.
- **Space:** O(n) recursion stack plus O(n) for the current path.

## Follow-Up Questions
1. How can you modify the algorithm to return the minimum number of cuts (Palindrome Partitioning II)?
2. Can you improve the palindrome check using a pre‑computed DP table?
3. How would you adapt the solution to output partitions in lexicographic order?

## Key Takeaway
Backtracking combined with palindrome checks systematically enumerates all valid partitions, exploring every possible cut point.
