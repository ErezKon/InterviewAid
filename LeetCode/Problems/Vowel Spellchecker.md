# 966. Vowel Spellchecker

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/vowel-spellchecker](https://leetcode.com/problems/vowel-spellchecker)
**Companies:** Amazon, Bloomberg, Google, Grammarly, Meta, Microsoft, Thumbtack

---

```
FUNCTION spellchecker(wordlist, queries):
    wordSet = set(wordlist)
    capMap = {}    // lowercase → first match
    vowelMap = {}  // devoweled → first match

    FOR word IN wordlist:
        low = word.lower()
        IF low NOT IN capMap: capMap[low] = word
        devoweled = replaceVowels(low, '*')
        IF devoweled NOT IN vowelMap: vowelMap[devoweled] = word

    result = []
    FOR q IN queries:
        IF q IN wordSet: result.ADD(q)
        ELSE IF q.lower() IN capMap: result.ADD(capMap[q.lower()])
        ELSE IF replaceVowels(q.lower(), '*') IN vowelMap:
            result.ADD(vowelMap[replaceVowels(q.lower(), '*')])
        ELSE: result.ADD("")

    RETURN result
```
