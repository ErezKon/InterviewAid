# 3170. Lexicographically Minimum String After Removing Stars

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars](https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars)
**Companies:** Amazon, Bloomberg, Flexera, Google, Meta, Microsoft, Salesforce

---

## 1. Problem Description

You are given a string `s`. It may contain any number of `'*'` characters. Your task is to remove all `'*'` characters.

While there is a `'*'`, do the following operation:

- Delete the leftmost `'*'` and the **smallest** non-`'*'` character to its *left*. If there are several smallest characters, you can delete any of them.

Return the lexicographically smallest resulting string after removing all `'*'` characters.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters and `'*'`.
- The input is generated such that it is possible to delete all `'*'` characters.

---

## 2. Examples

```
Example 1:
  Input: s = "aaba*"
  Output: "aab"
  Explanation: We should delete one of the 'a' characters with '*'. If we choose s[3], s becomes the lexicographically smallest.
```

```
Example 2:
  Input: s = "abc"
  Output: "abc"
  Explanation: There is no '*' in the string.
```

---

## 3. Approach: Stack per Character — O(n) ✅

```text
FUNCTION clearStars(s):
    // For each letter a-z, maintain stack of indices
    SET stacks ← [ [] for _ in range(26) ]
    SET removed ← set()

    FOR i, c IN enumerate(s):
        IF c = '*':
            ADD i TO removed
            // Remove the smallest character (leftmost stack with entries)
            FOR j ← 0 TO 25:
                IF stacks[j] IS NOT EMPTY:
                    SET idx ← POP(stacks[j])
                    ADD idx TO removed
                    BREAK
        ELSE:
            SET idx ← ord(c) - ord('a')
            PUSH i ONTO stacks[idx]

    RETURN JOIN(s[i] FOR i IN range(len(s)) IF i NOT IN removed)
```

---

## 4. Walkthrough

Input `"ab*ac*"` (indices 0-5):
1. `a` → push 0 onto stack[0].
2. `b` → push 1 onto stack[1].
3. `*` → remove index 3 and smallest non-star left: stack[0] has 0 → remove `a` (idx 0).
4. `a` → push 3 onto stack[0].
5. `c` → push 4 onto stack[2].
6. `*` → remove index 5 and smallest left: stack[0] now has 3 → remove `a` (idx 3).
Remaining indices {1,4} → characters `b` and `c` → result `"bc"` (after adjusting for actual tie-break rules, final output `"ac"`).

---

## 5. Complexity Analysis

- **Time:** O(n) – each character processed once, inner loop over 26 letters is constant.
- **Space:** O(n) for stacks and the removed-set.

---

## 6. Follow-Up Questions

- How would the solution change if `*` removed the **largest** preceding character?
- Can the algorithm be adapted to handle Unicode characters beyond `a-z`?
- What is the impact on performance if the input length reaches 10⁶?

---

## 3. Key Takeaway

> Maintain 26 stacks (one per letter). Each star pops from the smallest non-empty stack. Reconstruct by skipping removed indices.
