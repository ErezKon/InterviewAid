# 3582. Generate Tag for Video Caption

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-tag-for-video-caption](https://leetcode.com/problems/generate-tag-for-video-caption)
**Companies:** Bloomberg

---

## 1. Problem Description

Convert a caption string to a camelCase tag: lowercase first word, capitalize first letter of subsequent words, remove spaces. Truncate to 100 chars and append `#` prefix.

## 2. Approach: String Processing — O(n) ✅

```
FUNCTION generateTag(caption):
    words ← caption.strip().split()
    IF LENGTH(words) == 0: RETURN "#"
    tag ← "#" + words[0].lower()
    FOR i ← 1 TO LENGTH(words) - 1 DO
        tag += words[i].capitalize()
    IF LENGTH(tag) > 100: tag ← tag[:100]
    RETURN tag
```

## Key Takeaway

> Split, lowercase first word, capitalize rest, concatenate with `#` prefix. Truncate to 100 chars.
