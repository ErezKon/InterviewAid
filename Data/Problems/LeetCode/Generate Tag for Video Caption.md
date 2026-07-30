# 3582. Generate Tag for Video Caption

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-tag-for-video-caption](https://leetcode.com/problems/generate-tag-for-video-caption)
**Companies:** Bloomberg

---

## 1. Problem Description

Convert a caption string to a camelCase tag: lowercase first word, capitalize first letter of subsequent words, remove spaces. Truncate to 100 chars and append `#` prefix.

## 2. Approach: String Processing — O(n) ✅

```text
FUNCTION generateTag(caption):
    words ← caption.strip().split()
    IF LENGTH(words) == 0: RETURN "#"
    tag ← "#" + words[0].lower()
    FOR i ← 1 TO LENGTH(words) - 1 DO
        tag += words[i].capitalize()
    IF LENGTH(tag) > 100: tag ← tag[:100]
    RETURN tag
```

## Examples

| Caption | Expected Tag |
|---------|--------------|
| "Hello World" | "#helloWorld" |
| "  LeetCode   problem   set " | "#leetcodeProblemSet" |

## Walkthrough

1. Input caption is split into words after trimming spaces.
2. The first word is lower‑cased and prefixed with `#`.
3. Each subsequent word has its first character capitalized and is concatenated.
4. If the resulting string exceeds 100 characters, it is truncated.
5. The final tag is returned.

## Complexity Analysis

- **Time:** O(L) where L is the length of the caption (single pass to split and process).
- **Space:** O(L) for the list of words and the output tag.

## Follow‑Up Questions

- How would you handle Unicode characters or emojis?
- Can you generate tags that preserve original punctuation?
- What if the maximum length constraint changes dynamically?

## Key Takeaway

> Split, lowercase first word, capitalize rest, concatenate with `#` prefix. Truncate to 100 chars.
