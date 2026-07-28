# 316. Remove Duplicate Letters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicate-letters](https://leetcode.com/problems/remove-duplicate-letters)
**Companies:** Amazon, Bloomberg, Bytedance, De Shaw, Expedia, Factset, Google, Increff, Meta, Microsoft, Paytm, Tiktok, Zoho

---

## Problem Description
Given a string `s` consisting of lowercase English letters, remove duplicate letters so that every letter appears once and the resulting string is the smallest in lexicographic order among all possible results. Return the resulting string.

## Examples
**Example 1**
```
Input: s = "bcabc"
Output: "abc"
Explanation: The string "abc" is the smallest lexicographic result after removing duplicates.
```
**Example 2**
```
Input: s = "cbacdcbc"
Output: "acdb"
Explanation: Removing duplicates while keeping the smallest lexicographic order yields "acdb".
```

## Approach
Use a monotonic stack to build the answer greedily. Track the last occurrence index of each character. Iterate through the string, and for each character:
- Skip it if already in the stack.
- While the stack top is greater than the current character and the top character appears later (its last index > current index), pop the stack.
- Push the current character onto the stack and mark it as present.
The stack content at the end is the desired string.

```text
FUNCTION removeDuplicateLetters(s):
    lastIdx ← MAP of character → last position in s
    stack ← empty list
    inStack ← empty set
    FOR i FROM 0 TO LENGTH(s) - 1:
        c ← s[i]
        IF c IN inStack: CONTINUE
        WHILE stack NOT EMPTY AND c < stack.TOP() AND lastIdx[stack.TOP()] > i:
            inStack.REMOVE(stack.POP())
        stack.PUSH(c)
        inStack.ADD(c)
    RETURN JOIN(stack)
```

## Walkthrough
For `s = "cbacdcbc"`:
| i | c | Stack before | Action | Stack after |
|---|---|--------------|--------|-------------|
|0|c|[]|push c|[c]
|1|b|[c]|c > b and c appears later → pop c; push b|[b]
|2|a|[b]|b > a and b appears later → pop b; push a|[a]
|3|c|[a]|push c|[a,c]
|4|d|[a,c]|push d|[a,c,d]
|5|c|[a,c,d]|c already in stack → skip
|6|b|[a,c,d]|b < d and d appears later? no → push b|[a,c,d,b]
|7|c|[a,c,d,b]|c already in stack → skip
Result = "acdb".

## Complexity Analysis
Time: `O(n)` where `n` is the length of the string.
Space: `O(1)` extra (arrays of size 26 for counts and stack up to 26).

## Follow-Up Questions
1. How would the algorithm change if uppercase letters were also allowed?
2. Can you adapt the solution to return the lexicographically largest result instead?
3. What is the impact on complexity if the alphabet size is large (e.g., Unicode characters)?

## Key Takeaway
A monotonic stack combined with knowledge of future occurrences yields the lexicographically smallest string with unique letters.
