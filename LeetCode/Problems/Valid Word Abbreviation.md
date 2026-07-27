# 408. Valid Word Abbreviation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word-abbreviation](https://leetcode.com/problems/valid-word-abbreviation)
**Companies:** Amazon, Datadog, Google, Meta, Rokt, Snowflake, Tiktok

---

```
FUNCTION validWordAbbreviation(word, abbr):
    i = j = 0
    WHILE i < len(word) AND j < len(abbr):
        IF abbr[j].isdigit():
            IF abbr[j] == '0': RETURN false    // no leading zeros
            num = 0
            WHILE j < len(abbr) AND abbr[j].isdigit():
                num = num * 10 + int(abbr[j])
                j += 1
            i += num
        ELSE:
            IF word[i] != abbr[j]: RETURN false
            i += 1; j += 1
    RETURN i == len(word) AND j == len(abbr)
```
