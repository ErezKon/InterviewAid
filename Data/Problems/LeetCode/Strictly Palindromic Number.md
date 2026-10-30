# 2396. Strictly Palindromic Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/strictly-palindromic-number](https://leetcode.com/problems/strictly-palindromic-number)
**Companies:** Amazon, Google

---

## Problem Description

An integer `n` is **strictly palindromic** if, for **every** base `b` between `2` and `n - 2` (**inclusive**), the string representation of the integer `n` in base `b` is **palindromic**.

Given an integer `n`, return `true` *if *`n`* is **strictly palindromic** and *`false`* otherwise*.

A string is **palindromic** if it reads the same forward and backward.

**Constraints:**
- `4 <= n <= 10^5`

## Examples

**Example 1:**
```
Input: n = 9
Output: false
Explanation: In base 2: 9 = 1001 (base 2), which is palindromic.
In base 3: 9 = 100 (base 3), which is not palindromic.
Therefore, 9 is not strictly palindromic so we return false.
Note that in bases 4, 5, 6, and 7, n = 9 is also not palindromic.
```

**Example 2:**
```
Input: n = 4
Output: false
Explanation: We only consider base 2: 4 = 100 (base 2), which is not palindromic.
Therefore, we return false.
```

## Approach
Observe that for any `n ≥ 4`, the representation in base `n‑2` is always `12`, which is not a palindrome. Hence no number `n ≥ 4` can be strictly palindromic. The only possible candidates are `n = 1, 2, 3`, all of which fail the definition as the range of bases is empty or invalid. Therefore the answer is always `false`.

### Pseudocode
```text
FUNCTION isStrictlyPalindromic(n):
    // By mathematical observation, no n >= 4 satisfies the condition
    RETURN false
```

## Walkthrough
| n | Check base n‑2 | Result |
|---|----------------|--------|
| 4 | representation = 12 (not palindrome) | false |
| 5 | base 3 representation = 12 (not palindrome) | false |
| ... | always fails for n ≥ 4 | false |
Thus the function immediately returns `false` for any input.

## Complexity Analysis
- **Time:** O(1) – constant‑time check.
- **Space:** O(1).

## Follow‑Up Questions
1. How would you verify the property for very small `n` (1‑3) if the definition were adjusted?
2. Can you extend the observation to other numeral systems, such as negative bases?
3. What if the requirement were that the representation be a palindrome for *at least* one base?

## Key Takeaway
A simple mathematical insight shows that no integer `n ≥ 4` can be strictly palindromic, allowing an O(1) solution.
