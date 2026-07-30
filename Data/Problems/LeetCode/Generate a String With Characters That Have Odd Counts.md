# 1374. Generate a String With Characters That Have Odd Counts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts](https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts)
**Companies:** Google

---

## 1. Problem Description

Return a string of length `n` where every character has an odd frequency.

## 2. Approach: Simple Construction — O(n) ✅

```text
FUNCTION generateTheString(n):
    IF n % 2 == 1 THEN RETURN 'a' * n
    ELSE RETURN 'a' * (n - 1) + 'b'
```

## Examples

| n | Output |
|---|--------|
| 5 | "aaaaa" |
| 4 | "aaab" |
| 1 | "a" |

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
