# 2716. Minimize String Length

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimize-string-length](https://leetcode.com/problems/minimize-string-length)
**Companies:** Bloomberg, Google

---

## Problem Description

Given a string `s`, you have two types of operation:

1. Choose an index `i` in the string, and let `c` be the character in position `i`. **Delete** the **closest occurrence** of `c` to the **left** of `i` (if exists).
2. Choose an index `i` in the string, and let `c` be the character in position `i`. **Delete** the **closest occurrence** of `c` to the **right** of `i` (if exists).

Your task is to **minimize** the length of `s` by performing the above operations zero or more times.

Return an integer denoting the length of the **minimized** string.

**Constraints:**
- `1 <= s.length <= 100`
- `s` contains only lowercase English letters

---

## Examples

```
Example 1:
  Input: s = "aaabc"
  Output: 3
  Explanation:
  1. Operation 2: we choose i = 1 so c is 'a', then we remove s[2] as it is closest 'a' character to the right of s[1].
     s becomes "aabc" after this.
  2. Operation 1: we choose i = 1 so c is 'a', then we remove s[0] as it is closest 'a' character to the left of s[1].
     s becomes "abc" after this.
```

```
Example 2:
  Input: s = "cbbd"
  Output: 3
  Explanation:
  1. Operation 1: we choose i = 2 so c is 'b', then we remove s[1] as it is closest 'b' character to the left of s[1].
     s becomes "cbd" after this.
```

```
Example 3:
  Input: s = "baadccab"
  Output: 4
  Explanation:
  1. Operation 1: we choose i = 6 so c is 'a', then we remove s[2] as it is closest 'a' character to the left of s[6].
     s becomes "badccab" after this.
  2. Operation 2: we choose i = 0 so c is 'b', then we remove s[6] as it is closest 'b' character to the right of s[0].
     s becomes "badcca" after this.
  3. Operation 2: we choose i = 3 so c is 'c', then we remove s[4] as it is closest 'c' character to the right of s[3].
     s becomes "badca" after this.
  4. Operation 1: we choose i = 4 so c is 'a', then we remove s[1] as it is closest 'a' character to the left of s[4].
     s becomes "bdca" after this.
```

---

## Approach

The operation can eliminate any duplicate character by repeatedly removing the nearest duplicate. Consequently, each distinct character will remain exactly once. The minimal possible length is therefore the count of distinct characters in the string.

```text
FUNCTION minimizedStringLength(s):
    // Convert string to a set of characters to keep only unique ones
    SET uniqueChars ← SET(s)
    RETURN LEN(uniqueChars)
```

---

## Walkthrough

Consider the input `"aaabbb"`:

1. Unique characters are `{ 'a', 'b' }`.
2. Length of this set is `2`.
3. No further reductions are possible, so the minimal length is `2`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Count distinct | **O(n)** | **O(1)** (at most 26 lowercase letters) |

---

## Follow-Up Questions

- How would the solution change if the string could contain Unicode characters?
- Can you extend the approach to return the actual minimized string, not just its length?
- What if removal is only allowed for adjacent duplicate characters?

---

## Key Takeaway

> **Duplicate elimination** — the operation removes duplicates until each character appears at most once. The answer is the count of distinct characters.

---