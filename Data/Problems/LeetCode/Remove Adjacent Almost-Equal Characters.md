# 2957. Remove Adjacent Almost-Equal Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-adjacent-almost-equal-characters](https://leetcode.com/problems/remove-adjacent-almost-equal-characters)
**Companies:** Salesforce

---

## Problem Description
You are given a **0-indexed** string `word`.

In one operation, you can pick any index `i` of `word` and change `word[i]` to any lowercase English letter.

Return *the **minimum** number of operations needed to remove all adjacent **almost-equal** characters from* `word`.

Two characters `a` and `b` are **almost-equal** if `a == b` or `a` and `b` are adjacent in the alphabet.

**Constraints:**

- `1 <= word.length <= 100`
- `word` consists only of lowercase English letters.

## Examples

```
Example 1:
  Input: word = "aaaaa"
  Output: 2
  Explanation: We can change word into "acaca" which does not have any adjacent almost-equal characters.
    It can be shown that the minimum number of operations needed to remove all adjacent almost-equal characters from word is 2.
```

```
Example 2:
  Input: word = "abddez"
  Output: 2
  Explanation: We can change word into "ybdoez" which does not have any adjacent almost-equal characters.
    It can be shown that the minimum number of operations needed to remove all adjacent almost-equal characters from word is 2.
```

```
Example 3:
  Input: word = "zyxyxyz"
  Output: 3
  Explanation: We can change word into "zaxaxaz" which does not have any adjacent almost-equal characters.
    It can be shown that the minimum number of operations needed to remove all adjacent almost-equal characters from word is 3.
```

## Approach
**Two-Pointers Greedy** – Use a stack-like pointer to build the result. For each character, if it forms an almost-equal pair with the previous kept character, discard both; otherwise, keep the character.

## Walkthrough
For `"abccba"`:
1. Keep `a` → result `a`.
2. Next `b`: `|a-b| = 1` → remove both → result ``.
3. Next `c`: result empty, keep `c`.
4. Next `c`: `|c-c| = 0` → remove both → result ``.
5. Next `b`: keep `b`.
6. Next `a`: `|b-a| = 1` → remove both → result `` (empty).

## Complexity Analysis
- **Time:** O(n) where n is the length of the string.
- **Space:** O(n) for the result (can be in-place with two pointers).

## Follow-Up Questions
- How would the solution change if the allowed difference threshold were a parameter `k`?
- Can you extend the algorithm to handle Unicode characters?
- What is the effect of processing the string from right to left?

## Key Takeaway
A stack-like two-pointer scan efficiently removes adjacent almost-equal characters in a single pass.
