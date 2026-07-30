# 2030. Smallest K-Length Subsequence With Occurrences of a Letter

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter](https://leetcode.com/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter)
**Companies:** Deutsche Bank

---

## Problem Description
Given a string `s`, an integer `k`, a character `letter`, and an integer `repetition`, return the lexicographically smallest subsequence of `s` of length `k` that contains at least `repetition` occurrences of `letter`. If no such subsequence exists, return an empty string. A subsequence preserves the relative order of characters from the original string.

## Examples
- **Input:** `s = "leetcode", k = 4, letter = "e", repetition = 2`  
  **Output:** `"ecde"`  
  **Explanation:** The subsequence must be length 4 and contain at least two `e`s. Among all valid subsequences, `"ecde"` is lexicographically smallest.
- **Input:** `s = "abacb", k = 3, letter = "a", repetition = 2`  
  **Output:** `"aab"`  
  **Explanation:** Valid subsequences of length 3 with at least two `a`s are `"aab"` and `"aac"`; `"aab"` is smaller.

## Approach
Use a **monotonic stack** to build the smallest possible subsequence while guaranteeing enough remaining characters to satisfy the length and repetition constraints.
1. Iterate through `s` with index `i`.
2. While the stack is not empty and the current character `c` is smaller than the top of the stack, and we can still discard the top character without violating the required number of `letter` occurrences or the total length, pop the stack.
3. Push `c` onto the stack.
4. After processing, truncate the stack to the first `k` characters.
The key insight is to keep track of how many `letter` characters are still needed and how many positions remain.

```text
FUNCTION smallestSubsequence(s, k, letter, repetition):
    stack ← []                     // will hold characters
    neededLetter ← repetition      // how many `letter` we still must include
    remaining ← LENGTH(s)          // characters left to process
    FOR each c IN s:
        // while we can replace a larger char with a smaller one
        WHILE stack NOT EMPTY AND c < TOP(stack) AND 
              (LENGTH(stack) - 1 + remaining) >= k AND 
              (TOP(stack) != letter OR neededLetter < COUNT(letter IN stack)):
            popped ← POP(stack)
            IF popped == letter: neededLetter ← neededLetter + 1
        // decide whether to keep current character
        IF LENGTH(stack) < k:
            PUSH(stack, c)
            IF c == letter: neededLetter ← neededLetter - 1
        remaining ← remaining - 1
    // ensure we have enough `letter`
    WHILE neededLetter > 0:
        // remove non‑letter from the end
        IF TOP(stack) != letter: POP(stack) ELSE BREAK
        neededLetter ← neededLetter - 1
    RETURN JOIN(first k elements of stack)
```

## Walkthrough
Consider `s = "leetcode", k = 4, letter = "e", repetition = 2`.
| i | c | stack after possible pops | neededLetter |
|---|---|---------------------------|--------------|
|0|l|[l]|2|
|1|e|[e] (pop l because e<l and enough chars left)|1|
|2|e|[e, e]|0|
|3|t|[e, e, t]|0|
|4|c|[e, c] (pop t, c< t, enough remaining) |0|
|5|o|[e, c, o]|0|
|6|d|[e, c, d, o]|0 → truncate to first 4 → `ecde`

## Complexity Analysis
- **Time:** `O(n)` where `n = LENGTH(s)`, each character is pushed and popped at most once.
- **Space:** `O(k)` for the stack.

## Follow-Up Questions
1. How would the solution change if the subsequence must be exactly `repetition` occurrences of `letter` (no more, no less)?
2. Can the algorithm be adapted to return the smallest subsequence under a custom ordering of characters?
3. What is the impact on complexity if `k` can be larger than the length of `s`?

## Key Takeaway
A monotonic stack combined with careful bookkeeping of required letter occurrences yields the lexicographically smallest valid subsequence in linear time.
