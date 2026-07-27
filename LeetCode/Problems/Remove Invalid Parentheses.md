# 301. Remove Invalid Parentheses

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-invalid-parentheses](https://leetcode.com/problems/remove-invalid-parentheses)
**Companies:** Amazon, Bloomberg, Deliveroo, Google, Meta, Microsoft, Millennium, Oracle, Rubrik, Tiktok

---

## Approach: BFS — O(2ⁿ) ✅

```
FUNCTION removeInvalidParentheses(s):
    queue = {s}
    result = []

    WHILE queue:
        // Check current level for valid strings
        FOR candidate IN queue:
            IF isValid(candidate):
                result.ADD(candidate)

        IF result: RETURN result    // found at this level = minimum removals

        // Generate next level (remove one char)
        nextLevel = set()
        FOR candidate IN queue:
            FOR i ← 0 TO len(candidate) - 1:
                IF candidate[i] IN '()':
                    nextLevel.ADD(candidate[:i] + candidate[i+1:])
        queue = nextLevel

    RETURN [""]
```

BFS by removal count ensures minimum removals. Use set to avoid duplicates.
