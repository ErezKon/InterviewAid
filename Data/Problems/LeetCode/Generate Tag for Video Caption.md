# 3582. Generate Tag for Video Caption

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-tag-for-video-caption](https://leetcode.com/problems/generate-tag-for-video-caption)
**Companies:** Bloomberg

---

## 1. Problem Description

You are given a string `caption` representing the caption for a video.

The following actions must be performed **in order** to generate a **valid tag** for the video:

- **Combine all words** in the string into a single *camelCase string* prefixed with `'#'`. A *camelCase string* is one where the first letter of all words *except* the first one is capitalized. All characters after the first character in **each** word must be lowercase.

- **Remove** all characters that are not an English letter, **except** the first `'#'`.

- **Truncate** the result to a maximum of 100 characters.

Return the **tag** after performing the actions on `caption`.

**Constraints:**
- `1 <= caption.length <= 150`
- `caption` consists only of English letters and `' '`.

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

**Example 1:**
```
Input: caption = "Leetcode daily streak achieved"
Output: "#leetcodeDailyStreakAchieved"
Explanation: The first letter for all words except "leetcode" should be capitalized.
```

**Example 2:**
```
Input: caption = "can I Go There"
Output: "#canIGoThere"
Explanation: The first letter for all words except "can" should be capitalized.
```

**Example 3:**
```
Input: caption = "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
Output: "#hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
Explanation: Since the first word has length 101, we need to truncate the last two letters from the word.
```

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
