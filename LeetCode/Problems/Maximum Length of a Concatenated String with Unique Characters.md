# 1239. Maximum Length of a Concatenated String with Unique Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 54.0%
**LeetCode:** [https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters](https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters)
**Companies:** Google, Groww, Honey, Meta, Microsoft, Palo Alto Networks

---

## Approach: Backtracking with Bitmask — O(2ⁿ) ✅

```
FUNCTION maxLength(arr):
    // Preprocess: filter strings with duplicate chars, convert to bitmasks
    masks = []
    FOR s IN arr:
        mask = 0
        FOR char IN s:
            bit = 1 << (char - 'a')
            IF mask & bit: mask = -1; BREAK
            mask |= bit
        IF mask != -1:
            masks.ADD((mask, len(s)))

    RETURN backtrack(masks, 0, 0)

FUNCTION backtrack(masks, idx, current):
    IF idx == len(masks):
        RETURN popcount(current)

    result = backtrack(masks, idx + 1, current)    // skip

    IF current & masks[idx].mask == 0:             // no overlap
        result = MAX(result, backtrack(masks, idx + 1, current | masks[idx].mask))

    RETURN result
```

Bitmask represents which characters are used. O(1) overlap check with AND.
