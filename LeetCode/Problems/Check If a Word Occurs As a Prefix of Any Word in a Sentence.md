# 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tcs, Yelp

---

```
FUNCTION isPrefixOfWord(sentence, searchWord):
    FOR i, word IN enumerate(sentence.split()):
        IF word.startswith(searchWord):
            RETURN i + 1
    RETURN -1
```
