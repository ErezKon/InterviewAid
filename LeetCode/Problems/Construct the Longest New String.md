# 2745. Construct the Longest New String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-longest-new-string](https://leetcode.com/problems/construct-the-longest-new-string)
**Companies:** Guidewire, Microsoft

---

## 1. Problem Description

Given counts of strings `"AA"` (x), `"BB"` (y), and `"AB"` (z), concatenate them to form the longest string without `"AAA"` or `"BBB"` as a substring. Return the maximum length.

---

## 2. Key Insight

> `"AB"` can be placed freely between any pair. `"AA"` and `"BB"` must alternate: `AA BB AA BB...`. We can use `min(x, y)` pairs of AA+BB, plus one extra of whichever has more, plus all `z` copies of `"AB"`.

---

## 3. Approach: Math — O(1) ✅

```
FUNCTION longestString(x, y, z):
    // AA and BB must alternate, use min(x,y) of each plus 1 extra
    pairs = MIN(x, y)
    result = pairs * 2  // pairs of (AA, BB)
    IF x != y:
        result += 1  // one extra AA or BB
    result += z  // all AB can be used
    RETURN result * 2  // each string has length 2
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> AA and BB must alternate (at most |diff| ≤ 1). AB strings are neutral connectors that can always be included. Total length = `(min(x,y)*2 + (1 if x≠y else 0) + z) * 2`.
