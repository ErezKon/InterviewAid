# 1374. Generate a String With Characters That Have Odd Counts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts](https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts)
**Companies:** Google

---

## 1. Problem Description

Given an integer `n`, *return a string with `n` characters such that each character in such string occurs **an odd number of times***.

The returned string must contain only lowercase English letters. If there are multiples valid strings, return **any** of them.

**Constraints:**
- `1 <= n <= 500`

## 2. Approach: Simple Construction — O(n) ✅

```text
FUNCTION generateTheString(n):
    IF n % 2 == 1 THEN RETURN 'a' * n
    ELSE RETURN 'a' * (n - 1) + 'b'
```

## Examples

```
Example 1:
  Input: n = 4
  Output: "pppz"
  Explanation: "pppz" is a valid string since the character 'p' occurs three times and the character 'z' occurs once. Note that there are many other valid strings such as "ohhh" and "love".
```
```
Example 2:
  Input: n = 2
  Output: "xy"
  Explanation: "xy" is a valid string since the characters 'x' and 'y' occur once. Note that there are many other valid strings such as "ag" and "ur".
```
```
Example 3:
  Input: n = 7
  Output: "holasss"
```

## Walkthrough

1. Check if `n` is odd.
2. If odd, repeat character `'a'` `n` times – the count of `'a'` is odd.
3. If even, repeat `'a'` `n-1` times (odd count) and append a different character `'b'` once (odd count).
4. The resulting string satisfies the odd‑frequency requirement for all characters.

## Complexity Analysis

- **Time:** O(n) to build the output string.
- **Space:** O(n) for the resulting string.

## Follow‑Up Questions

- How would you modify the solution to use a specific set of characters?
- Can you generate a string where each character appears exactly three times?
- What if the alphabet size is limited to `k` distinct characters?

## Key Takeaway

> If `n` is odd, use one character `n` times. If even, use one character `n-1` times + a different character once. Both counts are odd.
