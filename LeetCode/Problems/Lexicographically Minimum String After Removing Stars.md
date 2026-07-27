# 3170. Lexicographically Minimum String After Removing Stars

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars](https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars)
**Companies:** Amazon, Bloomberg, Flexera, Google, Meta, Microsoft, Salesforce

---

## 1. Problem Description

Each `*` removes the smallest non-star character to its left (ties broken by rightmost). Return the resulting string after all stars are processed.

---

## 2. Approach: Stack per Character — O(n) ✅

```
FUNCTION clearStars(s):
    // For each letter a-z, maintain stack of indices
    stacks = [[] for _ in range(26)]
    removed = set()

    FOR i, c IN enumerate(s):
        IF c == '*':
            removed.ADD(i)
            // Remove the smallest character (leftmost stack with entries)
            FOR j ← 0 TO 25:
                IF stacks[j]:
                    removed.ADD(stacks[j].POP())
                    BREAK
        ELSE:
            stacks[ord(c) - ord('a')].PUSH(i)

    RETURN JOIN(s[i] for i in range(n) if i NOT IN removed)
```

| Time | Space |
|------|-------|
| O(26·n) = O(n) | O(n) |

---

## 3. Key Takeaway

> Maintain 26 stacks (one per letter). Each star pops from the smallest non-empty stack. Reconstruct by skipping removed indices.
